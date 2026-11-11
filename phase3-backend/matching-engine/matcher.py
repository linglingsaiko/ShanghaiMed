#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""ShanghaiMed 医生匹配引擎（纯规则版）。

特点：
1. 只使用 Python 标准库，不调用外部 AI/网络 API；
2. 同时支持中文、英文及中英混合症状描述；
3. 通过“疾病/症状同义词 -> 医生公开擅长领域”的可解释规则进行匹配；
4. 急症、提示注入、空输入等安全检查优先于医生推荐；
5. 不做诊断，不推荐药物或治疗方案，始终返回免责声明。

后续如需接入语义模型，可保留 match_doctors 的公共接口和安全前置流程，
仅替换 _extract_concepts 的概念抽取实现。
"""

from __future__ import annotations

import json
import re
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Sequence, Tuple


# ---------------------------------------------------------------------------
# 基础配置
# ---------------------------------------------------------------------------

DATABASE_DIR = Path(__file__).resolve().parent.parent
DATA_FILES = {
    "orthopedics": DATABASE_DIR / "orthopedics.json",
    "tcm": DATABASE_DIR / "tcm.json",
    "dental": DATABASE_DIR / "dental.json",
}
CATEGORY_LABELS = {
    "orthopedics": "骨科/脊柱外科",
    "tcm": "中医/针灸",
    "dental": "牙科/口腔科",
}
MAX_INPUT_CHARS = 50_000
# 分析上限高于题目要求的 10,000 字；即使输入更长，也能稳定处理。
ANALYSIS_CHARS = MAX_INPUT_CHARS

DISCLAIMER = (
    "本结果仅依据输入文本与医生公开擅长领域进行信息匹配，不构成诊断、治疗或用药建议；"
    "请由接诊医生结合面诊和检查判断，挂号前请向医院核实出诊、接诊年龄及费用信息。"
    "This is informational doctor matching only, not a diagnosis or treatment/medication advice. "
    "Please confirm suitability, availability and fees with the hospital."
)
NO_MATCH_MESSAGE = "未找到匹配专家，建议联系人工咨询。"


@dataclass(frozen=True)
class Concept:
    """一个可匹配的疾病、症状或就诊意图。

    query_terms：用于从患者输入中识别概念，包含中英文同义词。
    match_terms：用于与医生 keyword_tags / specialties / source_categories 匹配。
    department_terms：用于识别医生科室方向，单独命中时分值低于临床关键词命中。
    """

    key: str
    label: str
    category: str
    sub_specialty: str
    query_terms: Tuple[str, ...]
    match_terms: Tuple[str, ...]
    department_terms: Tuple[str, ...] = ()


# 同义词表是规则版“语义理解”的核心。避免把泛化的“疼/痛/病”等单字
# 作为独立概念，以减少无关推荐。
CONCEPTS: Tuple[Concept, ...] = (
    Concept(
        key="cervical_spine",
        label="颈椎/颈椎间盘相关问题",
        category="orthopedics",
        sub_specialty="脊柱外科（颈椎方向）",
        query_terms=(
            "颈椎病", "颈椎间盘", "颈椎管狭窄", "颈肩痛", "颈痛", "脖子痛",
            "手麻", "手痛麻", "上肢麻木", "c3/c4", "c4/c5", "c5/c6",
            "cervical", "neck pain", "neck stiffness", "hand numbness",
            "numbness in hand", "arm numbness",
        ),
        match_terms=(
            "颈椎病", "颈椎间盘", "颈椎管狭窄", "神经根型颈椎病",
            "脊髓型颈椎病", "椎动脉型颈椎病", "颈肩痛", "手麻", "上肢麻木",
        ),
        department_terms=("脊柱外科", "脊柱中心", "骨科", "神经外科"),
    ),
    Concept(
        key="lumbar_spine",
        label="腰椎/腰椎间盘相关问题",
        category="orthopedics",
        sub_specialty="脊柱外科（腰椎方向）",
        query_terms=(
            "腰椎间盘突出", "腰椎间盘退变", "腰椎管狭窄", "腰椎滑脱",
            "腰腿痛", "腰疼", "腰痛", "腰背痛", "腿麻", "腿脚麻木",
            "下肢麻木", "坐骨神经痛", "lumbar", "lower back pain",
            "low back pain", "back pain", "sciatica", "leg numbness",
            "numb leg", "numbness in left leg", "numbness in right leg",
            "numbness in my left leg", "numbness in my right leg",
            "numbness in the left leg", "numbness in the right leg",
        ),
        match_terms=(
            "腰椎间盘突出症", "腰椎间盘突出", "腰椎间盘退变", "腰椎管狭窄",
            "腰椎滑脱", "腰腿痛", "腰痛", "腿麻", "下肢神经损伤", "坐骨神经痛",
        ),
        department_terms=("脊柱外科", "脊柱中心", "骨科", "神经外科"),
    ),
    Concept(
        key="spinal_deformity",
        label="脊柱畸形/脊柱侧弯",
        category="orthopedics",
        sub_specialty="脊柱外科（脊柱畸形方向）",
        query_terms=("脊柱侧弯", "脊柱侧凸", "脊柱后凸", "脊柱畸形", "scoliosis", "spinal deformity"),
        match_terms=("脊柱侧弯", "脊柱侧凸", "脊柱后凸", "脊柱畸形"),
        department_terms=("脊柱外科", "脊柱中心", "骨科"),
    ),
    Concept(
        key="spinal_tumor",
        label="脊柱/椎管占位相关问题",
        category="orthopedics",
        sub_specialty="脊柱外科或神经外科（脊柱/椎管方向）",
        query_terms=("脊柱肿瘤", "椎管肿瘤", "椎管内肿瘤", "脊髓肿瘤", "spinal tumor", "spinal tumour"),
        match_terms=("脊柱肿瘤", "椎管肿瘤", "椎管内肿瘤", "脊髓肿瘤", "神经鞘瘤"),
        department_terms=("脊柱外科", "脊柱中心", "神经外科", "骨科"),
    ),
    Concept(
        key="spinal_fracture",
        label="脊柱骨折/骨质疏松性骨折",
        category="orthopedics",
        sub_specialty="脊柱外科（骨折方向）",
        query_terms=(
            "脊柱骨折", "椎体骨折", "压缩性骨折", "骨质疏松性骨折",
            "spinal fracture", "vertebral fracture", "compression fracture",
        ),
        match_terms=("脊柱骨折", "胸腰椎骨折", "压缩骨折", "椎体成形", "骨质疏松"),
        department_terms=("脊柱外科", "脊柱中心", "骨科", "介入影像科"),
    ),
    Concept(
        key="joint_problem",
        label="髋膝等骨关节问题",
        category="orthopedics",
        sub_specialty="骨关节科/关节外科",
        query_terms=(
            "膝关节炎", "髋关节炎", "骨关节炎", "股骨头坏死", "关节疼痛",
            "knee arthritis", "hip arthritis", "osteoarthritis", "joint pain",
        ),
        match_terms=("膝关节炎", "髋关节炎", "骨关节炎", "股骨头坏死", "关节痛"),
        department_terms=("关节外科", "骨关节", "关节与骨病", "骨科"),
    ),
    Concept(
        key="sports_injury",
        label="运动损伤",
        category="orthopedics",
        sub_specialty="运动医学科",
        query_terms=("运动损伤", "韧带损伤", "半月板损伤", "肩袖损伤", "sports injury", "ligament injury"),
        match_terms=("运动损伤", "韧带损伤", "半月板", "肩袖损伤", "膝关节损伤"),
        department_terms=("运动医学", "骨科"),
    ),
    Concept(
        key="acupuncture_intent",
        label="针灸就诊需求",
        category="tcm",
        sub_specialty="针灸科",
        query_terms=("针灸", "针刺", "acupuncture", "needling"),
        match_terms=("针灸", "针刺"),
        department_terms=("针灸科",),
    ),
    Concept(
        key="migraine",
        label="偏头痛/头痛（中医针灸方向）",
        category="tcm",
        sub_specialty="针灸科/中医科（头痛方向）",
        query_terms=("偏头痛", "血管性头痛", "migraine"),
        match_terms=("偏头痛", "头痛"),
        department_terms=("针灸科", "中医科", "推拿科"),
    ),
    Concept(
        key="facial_paralysis",
        label="面瘫/面神经问题（中医针灸方向）",
        category="tcm",
        sub_specialty="针灸科（面神经方向）",
        query_terms=("面瘫", "面神经炎", "facial paralysis", "bell's palsy", "bells palsy"),
        match_terms=("面瘫", "面神经炎", "面肌痉挛"),
        department_terms=("针灸科", "推拿科"),
    ),
    Concept(
        key="insomnia_tcm",
        label="失眠（中医方向）",
        category="tcm",
        sub_specialty="中医科/针灸科（失眠方向）",
        query_terms=("失眠", "睡眠障碍", "insomnia", "sleep disorder"),
        match_terms=("失眠", "睡眠障碍"),
        department_terms=("中医科", "中医内科", "针灸科", "推拿科"),
    ),
    Concept(
        key="stroke_rehab_tcm",
        label="中风后遗症（中医康复方向）",
        category="tcm",
        sub_specialty="针灸科/推拿科（中风康复方向）",
        query_terms=("中风后遗症", "脑卒中后遗症", "stroke sequela", "stroke rehabilitation"),
        match_terms=("中风后遗症", "脑中风后遗症", "脑卒中", "偏瘫"),
        department_terms=("针灸科", "推拿科", "中医科"),
    ),
    Concept(
        key="tcm_bone",
        label="颈肩腰腿痛（中医骨伤方向）",
        category="tcm",
        sub_specialty="中医骨伤科/推拿科",
        query_terms=("中医骨伤", "推拿治疗", "中医正骨", "tcm orthopedics", "tuina"),
        match_terms=("颈肩腰腿痛", "腰腿痛", "腰肌劳损", "软组织损伤", "推拿"),
        department_terms=("骨伤科", "推拿科", "骨科"),
    ),
    Concept(
        key="dental_caries",
        label="龋齿/蛀牙",
        category="dental",
        sub_specialty="牙体牙髓科（龋齿方向）",
        query_terms=("蛀牙", "龋齿", "虫牙", "牙齿有洞", "cavity", "cavities", "caries", "tooth decay"),
        match_terms=("龋齿", "补牙", "牙体病", "牙体缺损"),
        department_terms=("牙体牙髓", "口腔综合", "口腔科"),
    ),
    Concept(
        key="toothache_pulp",
        label="牙痛/牙髓及根尖周问题",
        category="dental",
        sub_specialty="牙体牙髓科",
        query_terms=(
            "牙疼", "牙痛", "牙髓炎", "根尖周炎", "根管治疗", "冷热刺激痛",
            "toothache", "tooth pain", "pulpitis", "root canal",
        ),
        match_terms=("牙痛", "牙髓炎", "牙髓病", "根尖周炎", "根尖周病", "根管治疗"),
        department_terms=("牙体牙髓", "口腔综合", "口腔科"),
    ),
    Concept(
        key="dental_implant",
        label="缺牙/种植牙修复",
        category="dental",
        sub_specialty="口腔种植科",
        query_terms=(
            "种牙", "种植牙", "牙齿种植", "缺牙", "缺失牙", "牙列缺失",
            "牙列缺损", "牙齿掉了", "dental implant", "implants", "missing tooth",
            "missing teeth", "tooth loss",
        ),
        match_terms=("种植", "牙齿种植", "牙列缺损", "牙列缺失", "牙齿缺损", "牙齿修复"),
        department_terms=("口腔种植", "种植科", "口腔修复", "口腔综合", "口腔科"),
    ),
    Concept(
        key="orthodontics",
        label="牙列不齐/牙齿矫正",
        category="dental",
        sub_specialty="口腔正畸科",
        query_terms=(
            "牙齿矫正", "正畸", "牙列不齐", "牙列拥挤", "龅牙", "地包天",
            "orthodontic", "braces", "malocclusion", "crooked teeth",
        ),
        match_terms=("牙齿矫正", "正畸", "牙列不齐", "牙列拥挤", "牙颌畸形", "上颌前突", "隐形矫正"),
        department_terms=("口腔正畸", "正畸科"),
    ),
    Concept(
        key="periodontal",
        label="牙周/牙龈问题",
        category="dental",
        sub_specialty="牙周科",
        query_terms=(
            "牙周炎", "牙周病", "牙龈出血", "牙龈萎缩", "牙齿松动",
            "periodontal", "periodontitis", "bleeding gums", "gum disease",
        ),
        match_terms=("牙周炎", "牙周病", "牙龈炎", "牙龈出血", "牙龈萎缩", "牙齿松动"),
        department_terms=("牙周", "口腔综合", "口腔科"),
    ),
    Concept(
        key="wisdom_tooth",
        label="智齿/复杂拔牙",
        category="dental",
        sub_specialty="口腔外科/口腔颌面外科",
        query_terms=("智齿", "阻生齿", "拔牙", "wisdom tooth", "wisdom teeth", "tooth extraction"),
        match_terms=("智齿", "阻生齿", "智齿冠周炎", "拔牙"),
        department_terms=("口腔外科", "口腔颌面外科", "口腔科"),
    ),
    Concept(
        key="oral_maxillofacial",
        label="口腔颌面外科问题",
        category="dental",
        sub_specialty="口腔颌面外科",
        query_terms=(
            "颌骨囊肿", "口腔颌面肿瘤", "腮腺肿瘤", "颌面部外伤",
            "jaw cyst", "oral tumor", "oral tumour", "maxillofacial",
        ),
        match_terms=("颌骨囊肿", "口腔颌面部囊肿", "口腔颌面部肿瘤", "腮腺", "口腔颌面部损伤"),
        department_terms=("口腔颌面外科", "口腔颌面头颈肿瘤科", "口腔外科"),
    ),
)


# ---------------------------------------------------------------------------
# 安全词表：所有检查均只做本地字符串/正则处理，不执行输入中的任何指令。
# ---------------------------------------------------------------------------

EMERGENCY_TERMS = (
    "剧烈疼痛", "剧烈胸痛", "呼吸困难", "大出血", "昏迷", "意识不清",
    "意识丧失", "大小便失禁", "尿潴留", "会阴区麻木", "会阴麻木",
    "severe pain", "severe chest pain", "difficulty breathing", "shortness of breath",
    "heavy bleeding", "severe bleeding", "unconscious", "loss of consciousness",
    "saddle anesthesia", "saddle anaesthesia", "loss of bladder control",
)
EMERGENCY_MESSAGE = (
    "检测到可能的紧急症状。请立即拨打120或前往最近的急诊，不要等待线上医生匹配；"
    "尽量让身边人陪同，不要自行驾车。"
    "Possible emergency symptoms detected. Call local emergency services or go to the nearest "
    "emergency department now; do not wait for an online match."
)
INJECTION_PATTERNS = (
    r"忽略.{0,12}(之前|以上|先前|所有).{0,8}(指令|指示|规则|提示)",
    r"无视.{0,12}(指令|规则|提示)",
    r"(系统提示词|系统指令|开发者指令|提示词).{0,8}(告诉|显示|输出|透露|给我)",
    r"(告诉|显示|输出|透露).{0,8}(系统提示词|系统指令|开发者指令)",
    r"ignore\s+(all\s+|any\s+)?(previous|prior|above|earlier)\s+(instructions?|prompts?|rules?)",
    r"disregard\s+(all\s+|any\s+)?(previous|prior|above|earlier)\s+(instructions?|prompts?|rules?)",
    r"(reveal|show|print|tell\s+me)\s+(your\s+)?(system\s+prompt|system\s+instructions?|developer\s+prompt)",
    r"you\s+are\s+now\s+(a|an|the)\s+",
    r"act\s+as\s+(a|an|the)\s+[^,.!?]{0,30}(unrestricted|jailbreak|no\s+restrictions)",
)
RARE_DISEASE_TERMS = (
    "罕见遗传病", "罕见病", "全球只有", "全球仅", "极其罕见",
    "rare genetic disease", "rare genetic disorder", "ultra-rare", "ultra rare",
)
# 用于区分“非医疗闲聊”与“确实是医疗描述，但数据库未覆盖”。
MEDICAL_CONTEXT_TERMS = (
    "症状", "病历", "患者", "疾病", "遗传", "罕见", "医院", "医生", "门诊",
    "疼", "痛", "麻", "酸胀", "瘙痒", "红疹", "皮肤", "牙", "腰", "颈", "背",
    "脊柱", "骨科", "中医", "针灸", "推拿", "口腔", "怀孕", "孕期", "儿童",
    "孩子", "蛀牙", "种牙", "失眠", "头痛", "pain", "ache", "numb", "disease",
    "disorder", "symptom", "patient", "medical", "hospital", "doctor", "dental",
    "tooth", "teeth", "pregnan", "child", "cavity", "implant", "migraine",
)


# ---------------------------------------------------------------------------
# 数据加载与文本工具
# ---------------------------------------------------------------------------

@lru_cache(maxsize=1)
def _load_doctors() -> Tuple[Dict[str, Any], ...]:
    """加载并缓存 150 名医生；启动时检查文件及关键字段，避免静默坏数据。"""
    doctors: List[Dict[str, Any]] = []
    for category, file_path in DATA_FILES.items():
        with file_path.open("r", encoding="utf-8") as handle:
            payload = json.load(handle)
        if not isinstance(payload.get("doctors"), list):
            raise ValueError(f"医生数据库格式错误：{file_path}")
        for raw in payload["doctors"]:
            if not raw.get("doctor_id") or not raw.get("name"):
                continue
            doctor = dict(raw)
            doctor["_category"] = category
            doctors.append(doctor)
    return tuple(doctors)


def _normalize(value: Any) -> str:
    """统一大小写和空白；保留医学原文中的数字、斜杠与中文。"""
    if value is None:
        return ""
    return re.sub(r"\s+", " ", str(value).strip().lower())


def _as_list(value: Any) -> List[str]:
    if isinstance(value, list):
        return [str(item) for item in value if item is not None]
    if value is None:
        return []
    return [str(value)]


def _prefix_is_negated(prefix: str) -> bool:
    """判断紧邻症状词的前缀是否构成否定。

    否定词必须贴近症状词，不能在整个前文窗口内简单搜索“无/no”。否则
    “腰痛无好转，现在呼吸困难”会被错误地当成否定呼吸困难，造成安全漏报。
    """
    chinese_pattern = (
        r"(?:没有|并无|无|否认|未见|未出现|不伴|除外)"
        r"(?:有|明显|任何|相关|上述|下述|异常|特殊|\s){0,4}$"
    )
    english_pattern = (
        r"(?:^|[^a-z])(?:no|not|without|denies|denied)"
        r"(?:\s+(?:any|having|of|the|a|an)){0,3}\s*$"
    )
    return bool(re.search(chinese_pattern, prefix) or re.search(english_pattern, prefix))


def _contains_unnegated(text: str, term: str) -> bool:
    """查找未被邻近否定词修饰的急症词；后文再次出现时仍会重新判断。"""
    start = 0
    while True:
        index = text.find(term, start)
        if index < 0:
            return False
        prefix = text[max(0, index - 24):index]
        if not _prefix_is_negated(prefix):
            return True
        start = index + len(term)


def _find_emergency(text: str) -> Optional[str]:
    for term in EMERGENCY_TERMS:
        if _contains_unnegated(text, term):
            return term
    # 英文中“severe ... pain”可能插入身体部位，补一条有界规则。
    if re.search(r"\bsevere\s+(?:\w+\s+){0,3}pain\b", text):
        match = re.search(r"\bsevere\s+(?:\w+\s+){0,3}pain\b", text)
        if match and not _is_match_negated(text, match.start()):
            return match.group(0)
    return None


def _is_match_negated(text: str, index: int) -> bool:
    prefix = text[max(0, index - 24):index]
    return _prefix_is_negated(prefix)


def _has_prompt_injection(text: str) -> bool:
    return any(re.search(pattern, text, flags=re.IGNORECASE) for pattern in INJECTION_PATTERNS)


def _is_vague_input(text: str) -> bool:
    """仅拦截缺乏定位信息的极短泛化描述，不误伤“偏头痛”等明确概念。"""
    compact = re.sub(r"[\s，。！？!?,.、~～]", "", text)
    chinese_patterns = (
        r"(?:我|本人)?(?:最近|有点|一直|总是|就是)?(?:头疼|头痛|头晕)",
        r"(?:我|本人)?(?:最近|有点|一直|总是|就是)?(?:不舒服|难受)",
    )
    if any(re.fullmatch(pattern, compact) for pattern in chinese_patterns):
        return True
    english_vague = {
        "i have a headache", "my head hurts", "headache", "i feel unwell",
        "i am unwell", "i feel sick", "not feeling well",
    }
    return text.strip(" .!?") in english_vague


def _has_medical_context(text: str) -> bool:
    return any(term in text for term in MEDICAL_CONTEXT_TERMS)


def _extract_concepts(text: str) -> List[Concept]:
    concepts = [concept for concept in CONCEPTS if any(term in text for term in concept.query_terms)]
    # 英文屈折变化较多：numb/numbness/numbness in ... leg 统一补为腰椎症状线索，
    # 但只有同时出现 back/lumbar 或下肢描述时才补充，避免单独“腿麻”过度扩展。
    keys = {concept.key for concept in concepts}
    if "lumbar_spine" not in keys and "numb" in text and "leg" in text and (
        "back" in text or "lumbar" in text or "sciatica" in text
    ):
        concepts.append(next(concept for concept in CONCEPTS if concept.key == "lumbar_spine"))
    return concepts


# ---------------------------------------------------------------------------
# 评分与结果组装
# ---------------------------------------------------------------------------

def _title_bonus(title: str) -> float:
    # 必须精确判断，避免“副主任医师”因包含“主任医师”而拿到主任分值。
    if title == "主任医师":
        return 2.0
    if title == "副主任医师":
        return 1.0
    return 0.0


def _fudan_bonus(rank: Any) -> float:
    normalized = _normalize(rank).upper()
    if "A++++" in normalized:
        return 3.0
    if "A+++" in normalized:
        return 2.0
    if "A++" in normalized:
        return 1.0
    return 0.0


def _matching_source_categories(term: str, source_categories: Sequence[str]) -> List[str]:
    """返回实际命中的来源分类，例如“种植”命中并返回“种植科”。"""
    return [category for category in source_categories if category and (term in category or category in term)]


def _score_doctor(
    doctor: Dict[str, Any],
    concepts: Sequence[Concept],
    pediatric_context: bool,
    acupuncture_intent: bool,
) -> Optional[Dict[str, Any]]:
    tags = [_normalize(item) for item in _as_list(doctor.get("keyword_tags"))]
    categories = [_normalize(item) for item in _as_list(doctor.get("source_categories"))]
    specialties = _normalize(doctor.get("specialties"))
    department = _normalize(doctor.get("department"))
    title = str(doctor.get("title") or "")

    clinical_score = 0.0
    reasons: List[str] = []
    matched_concept_keys: List[str] = []

    for concept in concepts:
        # 疾病概念只在所属科室库内评分，避免“偏头痛”误匹配疼痛介入等其他库。
        if doctor.get("_category") != concept.category:
            continue

        exact_tags = [term for term in concept.match_terms if term in tags]
        source_hits = list(dict.fromkeys(
            category
            for term in concept.match_terms
            for category in _matching_source_categories(term, categories)
        ))
        specialty_hits = [term for term in concept.match_terms if term in specialties]
        department_hits = [term for term in concept.department_terms if _normalize(term) in department]

        concept_score = 0.0
        concept_reasons: List[str] = []
        if exact_tags:
            # 同一概念只计一次主分，额外标签少量加分，避免长病历/重复词刷分。
            concept_score += 12.0 + min(3, len(exact_tags) - 1) * 1.0
            concept_reasons.append(f"{concept.label}：医生关键词精确匹配“{'、'.join(exact_tags[:3])}”")
        if source_hits:
            concept_score += 8.0
            concept_reasons.append(f"{concept.label}：来源亚专科分类匹配“{'、'.join(source_hits[:2])}”")
        if specialty_hits:
            concept_score += 5.0 + min(2, len(specialty_hits) - 1) * 0.5
            concept_reasons.append(f"{concept.label}：公开擅长领域包含“{'、'.join(specialty_hits[:3])}”")
        if department_hits:
            concept_score += 4.0
            concept_reasons.append(f"科室方向匹配：{doctor.get('department', '')}")

        # 科室方向单独命中只有 4 分，不足以进入推荐；必须至少有公开擅长、
        # 标签或来源分类的实质命中，减少仅因“大医院/大科室”产生的泛推荐。
        if concept_score >= 5.0:
            clinical_score += concept_score
            matched_concept_keys.append(concept.key)
            reasons.extend(concept_reasons)

    if clinical_score <= 0.0:
        return None

    score = clinical_score
    title_points = _title_bonus(title)
    if title_points:
        score += title_points
        reasons.append(f"职称加分：{title}")
    fudan_points = _fudan_bonus(doctor.get("fudan_rank"))
    if fudan_points:
        score += fudan_points
        reasons.append(f"复旦榜加分：{doctor.get('fudan_rank')}")

    profile_text = " ".join(tags + [specialties, department])
    if acupuncture_intent and doctor.get("_category") == "tcm" and "针灸" in profile_text:
        score += 3.0
        reasons.append("符合针灸就诊意向")

    if pediatric_context and doctor.get("_category") == "dental" and any(
        term in profile_text for term in ("儿童", "青少年", "小儿", "儿牙")
    ):
        # 仅作为同等龋齿/牙体牙髓能力下的次级加分，不能把单纯正畸医生
        # 排成低龄儿童蛀牙的首选。
        score += 2.0
        reasons.append("公开资料提及儿童/青少年口腔接诊经验")

    result = {
        "doctor_id": str(doctor.get("doctor_id") or ""),
        "name": str(doctor.get("name") or ""),
        "title": title,
        "hospital": str(doctor.get("hospital") or ""),
        "department": str(doctor.get("department") or ""),
        "match_score": round(float(score), 2),
        "match_reasons": list(dict.fromkeys(reasons)),
        "registration_fee": doctor.get("registration_fee"),
        "specialties": str(doctor.get("specialties") or ""),
        "academic_titles": _as_list(doctor.get("academic_titles")),
        "fudan_rank": doctor.get("fudan_rank"),
        "doctor_url": doctor.get("doctor_url"),
        "_matched_concept_keys": matched_concept_keys,
    }
    return result


def _base_result(status: str, message: str = "") -> Dict[str, Any]:
    return {
        "status": status,
        "emergency_message": None,
        "department": "",
        "sub_specialty": "",
        "doctors": [],
        "message": message,
        "safety_notes": [],
        "disclaimer": DISCLAIMER,
    }


def _safety_notes(text: str, concepts: Sequence[Concept]) -> List[str]:
    notes: List[str] = []
    keys = {concept.key for concept in concepts}
    has_leg_numbness = any(term in text for term in ("腿麻", "下肢麻木", "腿脚麻木", "leg numb", "numbness in my left leg", "numbness in my right leg", "numbness in the left leg", "numbness in the right leg"))
    if "lumbar_spine" in keys and has_leg_numbness:
        notes.append(
            "腰痛伴腿麻可能涉及脊柱或神经相关问题；如脊柱外科评估后仍需鉴别，"
            "可按接诊医生意见转诊神经内科。若出现进行性肌力下降、大小便功能异常或会阴区麻木，应立即急诊。"
        )
    if any(term in text for term in ("怀孕", "孕期", "孕周", "pregnan")):
        notes.append(
            "就诊时务必主动告知孕期/孕周及产科情况；具体检查与处理时机需由口腔科医生结合产科意见评估。"
        )
    if any(term in text for term in ("孩子", "儿童", "小儿", "幼儿", "child", "kid")) or re.search(
        r"(?:[1-9]|1[0-2])\s*岁", text
    ):
        notes.append("低龄儿童就诊前请向医院确认接诊年龄，并优先选择儿童口腔或具备相应儿童接诊经验的科室。")
    return notes


def _build_success_result(
    text: str,
    concepts: Sequence[Concept],
    ranked_doctors: List[Dict[str, Any]],
) -> Dict[str, Any]:
    categories = list(dict.fromkeys(concept.category for concept in concepts))
    sub_specialties = list(dict.fromkeys(concept.sub_specialty for concept in concepts))
    notes = _safety_notes(text, concepts)
    pediatric_dental = any(term in text for term in ("孩子", "儿童", "小儿", "幼儿", "child", "kid")) or bool(
        re.search(r"(?:[1-9]|1[0-2])\s*岁", text)
    )
    pediatric_dental = pediatric_dental and categories == ["dental"]
    if pediatric_dental:
        caries = any(concept.key == "dental_caries" for concept in concepts)
        sub_specialties = ["儿童口腔（龋齿/牙体牙髓方向）" if caries else "儿童口腔方向"]
        notes.insert(
            0,
            "当前数据库未收录明确的专职儿童口腔医师；以下为相关口腔专业专家，"
            "不能直接视为儿童口腔专科推荐，预约前必须确认是否接诊低龄儿童。",
        )

    clean_doctors: List[Dict[str, Any]] = []
    for doctor in ranked_doctors:
        clean = {key: value for key, value in doctor.items() if not key.startswith("_")}
        clean_doctors.append(clean)

    return {
        "status": "success",
        "emergency_message": None,
        "department": "、".join(CATEGORY_LABELS[category] for category in categories),
        "sub_specialty": "；".join(sub_specialties),
        "doctors": clean_doctors,
        "message": f"已按症状相关度、亚专科方向、职称及复旦榜信息匹配到 {len(clean_doctors)} 名医生。",
        "safety_notes": list(dict.fromkeys(notes)),
        "disclaimer": DISCLAIMER,
    }


# ---------------------------------------------------------------------------
# 公共入口
# ---------------------------------------------------------------------------

def match_doctors(patient_input: str, top_n: int = 5) -> dict:
    """输入患者症状/病历描述，返回匹配的结构化医生推荐。

    Args:
        patient_input: 中文、英文或中英混合症状/病历文本；不会执行其中指令。
        top_n: 返回医生数量，允许 3–5，默认 5。

    Returns:
        status 为 success / emergency / no_match / invalid_input。
        所有状态均包含 doctors、message、safety_notes 和 disclaimer，便于前端统一渲染。
    """
    if isinstance(top_n, bool) or not isinstance(top_n, int) or not 3 <= top_n <= 5:
        return _base_result("invalid_input", "top_n 必须是 3 到 5 之间的整数。")
    if not isinstance(patient_input, str):
        return _base_result("invalid_input", "输入格式无效，请输入文字形式的症状或病历描述。")
    if not patient_input.strip():
        return _base_result("invalid_input", "输入为空，请描述症状部位、持续时间及伴随症状。")
    if len(patient_input) > MAX_INPUT_CHARS:
        return _base_result(
            "invalid_input",
            f"输入过长，请将病历摘要控制在 {MAX_INPUT_CHARS} 字以内，保留主要症状、病程和检查结论。",
        )

    normalized = _normalize(patient_input)
    analysis_text = normalized[:ANALYSIS_CHARS]

    # 1) 急症优先于提示注入与推荐：即使同一句话包含恶意指令，也不能淹没急症提示。
    emergency_term = _find_emergency(analysis_text)
    if emergency_term:
        result = _base_result("emergency", "已停止医生匹配。")
        result["emergency_message"] = EMERGENCY_MESSAGE
        result["safety_notes"] = [f"触发安全词：{emergency_term}"]
        return result

    # 2) 明确拒绝角色劫持/系统信息索取，不回显或执行输入中的指令。
    if _has_prompt_injection(analysis_text):
        return _base_result(
            "invalid_input",
            "无法处理该请求。请仅输入与就诊相关的症状、病程或病历摘要，不要包含系统指令。",
        )

    # 3) 极短且泛化的主诉不应直接推荐医生。
    if _is_vague_input(analysis_text):
        return _base_result(
            "invalid_input",
            "症状描述较笼统，暂时无法可靠匹配。请补充具体部位、持续时间、加重或缓解因素、伴随症状及患者年龄。",
        )

    # 4) 罕见病采用诚实兜底，不因“腰/痛”等偶然词给出貌似精确的推荐。
    if any(term in analysis_text for term in RARE_DISEASE_TERMS):
        result = _base_result(
            "no_match",
            NO_MATCH_MESSAGE + "当前数据库主要覆盖骨科/脊柱外科、中医/针灸和牙科/口腔科，无法可靠匹配该罕见病。",
        )
        result["safety_notes"] = ["罕见或复杂疾病建议由人工协助对接具备相应诊疗能力的综合医院。"]
        return result

    concepts = _extract_concepts(analysis_text)
    if not concepts:
        if not _has_medical_context(analysis_text):
            return _base_result(
                "invalid_input",
                "未识别到医疗症状描述。请说明不适部位、症状、持续时间及伴随情况，或提供病历摘要。",
            )
        return _base_result(
            "no_match",
            NO_MATCH_MESSAGE + "当前数据库仅覆盖骨科/脊柱外科、中医/针灸和牙科/口腔科。",
        )

    pediatric_context = any(term in analysis_text for term in ("孩子", "儿童", "小儿", "幼儿", "child", "kid")) or bool(
        re.search(r"(?:[1-9]|1[0-2])\s*岁", analysis_text)
    )
    acupuncture_intent = any(concept.key == "acupuncture_intent" for concept in concepts)

    scored: List[Dict[str, Any]] = []
    for doctor in _load_doctors():
        result = _score_doctor(doctor, concepts, pediatric_context, acupuncture_intent)
        if result is not None:
            scored.append(result)

    if not scored:
        return _base_result("no_match", NO_MATCH_MESSAGE)

    # 同一医生可能同时存在于骨科和中医来源库，按 doctor_id 去重并保留最高分。
    best_by_id: Dict[str, Dict[str, Any]] = {}
    for doctor in scored:
        doctor_id = doctor["doctor_id"] or f"{doctor['name']}@{doctor['hospital']}"
        previous = best_by_id.get(doctor_id)
        if previous is None or doctor["match_score"] > previous["match_score"]:
            best_by_id[doctor_id] = doctor

    ranked = sorted(
        best_by_id.values(),
        key=lambda item: (-item["match_score"], item["name"], item["doctor_id"]),
    )[:top_n]
    if not ranked:
        return _base_result("no_match", NO_MATCH_MESSAGE)

    return _build_success_result(analysis_text, concepts, ranked)


if __name__ == "__main__":
    # 简单本地调试入口：python matcher.py "腰痛伴左腿麻木"
    import sys

    query = " ".join(sys.argv[1:]).strip()
    if not query:
        print('用法：python matcher.py "症状或病历描述"')
        raise SystemExit(2)
    print(json.dumps(match_doctors(query), ensure_ascii=False, indent=2))
