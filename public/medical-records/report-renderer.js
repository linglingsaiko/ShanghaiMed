(() => {
  "use strict";

  const SCRIPT_URL = document.currentScript && document.currentScript.src ? document.currentScript.src : window.location.href;
  const OUTCOME_LABELS = { improved: "好转", worsened: "恶化", stable: "稳定", adjusted: "调整" };
  let styleRequested = false;

  function isStructuredPreviewRequested(search) {
    try {
      return new URLSearchParams(search || "").get("report_renderer") === "structured";
    } catch (_error) {
      return false;
    }
  }

  function ensureStyles() {
    if (styleRequested || !document.head) return;
    styleRequested = true;
    const link = document.createElement("link");
    link.id = "medimatch-phase0-renderer-styles";
    link.rel = "stylesheet";
    link.href = new URL("report-renderer.css", SCRIPT_URL).href;
    link.setAttribute("data-medimatch-renderer", "phase0");
    document.head.appendChild(link);
  }

  function el(tag, className, value) {
    const item = document.createElement(tag);
    if (className) item.className = className;
    if (value !== undefined && value !== null) item.textContent = String(value);
    return item;
  }

  function present(value) {
    return value !== undefined && value !== null && String(value).trim() !== "";
  }

  function text(value, fallback = "—") {
    return present(value) ? String(value) : fallback;
  }

  function array(value) {
    if (Array.isArray(value)) return value;
    return present(value) ? [value] : [];
  }

  function chapter(root, title) {
    const article = el("article", "report-chapter mmr-chapter");
    const heading = el("div", "chapter-heading");
    const number = el("span", "chapter-number", String(root.children.length + 1).padStart(2, "0"));
    heading.append(number, el("h3", "", title || "报告内容"));
    article.appendChild(heading);
    root.appendChild(article);
    return article;
  }

  function paragraph(parent, value, className = "chapter-body mmr-paragraph") {
    if (!present(value)) return null;
    const item = el("p", className, value);
    parent.appendChild(item);
    return item;
  }

  function labelledParagraph(parent, label, value) {
    if (!present(value)) return;
    const item = el("p", "mmr-paragraph");
    item.append(el("strong", "", label), el("span", "", String(value)));
    parent.appendChild(item);
  }

  function table(parent, headers, rows) {
    if (!rows.length) return;
    const wrapper = el("div", "mmr-table-wrap");
    const grid = el("table", "mmr-table keep-together");
    const head = el("thead");
    const headerRow = el("tr");
    headers.forEach((label) => {
      const cell = el("th", "", label);
      cell.setAttribute("scope", "col");
      headerRow.appendChild(cell);
    });
    head.appendChild(headerRow);
    const body = el("tbody");
    rows.forEach((row) => {
      const line = el("tr");
      row.forEach((value) => line.appendChild(el("td", "", text(value))));
      body.appendChild(line);
    });
    grid.append(head, body);
    wrapper.appendChild(grid);
    parent.appendChild(wrapper);
  }

  function infoBox(parent, values, alert = false) {
    const items = array(values).filter(present);
    if (!items.length) return;
    const box = el("div", alert ? "mmr-alert-box" : "mmr-info-box");
    if (alert) box.appendChild(el("strong", "", "需关注的问题："));
    items.forEach((value) => paragraph(box, value, "mmr-paragraph"));
    parent.appendChild(box);
  }

  function renderPatientInfo(root, info) {
    if (Array.isArray(info) && info.length) {
      const target = chapter(root, "患者基本信息");
      const hasSource = info.some((item) => present(item && item.source));
      table(target, hasSource ? ["项目", "内容", "来源"] : ["项目", "内容"], info.map((item) => {
        const row = [text(item && item.item, "未提供"), text(item && item.content, "未提供")];
        if (hasSource) row.push(text(item && item.source));
        return row;
      }));
      return;
    }
    if (!info || typeof info !== "object" || !Object.keys(info).length) return;
    const labels = {
      name: "姓名", gender_age: "性别 / 年龄", occupation: "职业", residence: "居住地",
      diagnosis: "确诊疾病", disease_course: "病程", current_hospital: "目前就诊医院"
    };
    const rows = Object.entries(labels).filter(([key]) => Object.prototype.hasOwnProperty.call(info, key))
      .map(([key, label]) => [label, text(info[key], "未提供")]);
    if (rows.length) table(chapter(root, "患者基本信息"), ["项目", "内容"], rows);
  }

  function renderTimeline(root, timeline) {
    if (!Array.isArray(timeline) || !timeline.length) return;
    const detailed = timeline.some((item) => item && (present(item.visit_type) || present(item.findings) || present(item.treatment)));
    const rows = timeline.map((item) => detailed
      ? [text(item && item.date), text(item && (item.visit_type || item.event)), text(item && (item.findings || item.details)), text(item && item.treatment)]
      : [text(item && item.date), text(item && item.event), text(item && item.details)]);
    table(chapter(root, "就诊时间线"), detailed ? ["日期", "就诊类型", "主要发现", "处置"] : ["日期", "事件", "详情"], rows);
  }

  function renderCurrentLabs(root, labs) {
    const dates = Array.isArray(labs.dates) ? labs.dates : [];
    const rows = Array.isArray(labs.rows) ? labs.rows : [];
    if (!dates.length || !rows.length) return null;
    const target = chapter(root, "检验趋势");
    table(target, ["检验项", "参考范围", "单位", ...dates], rows.map((row) => [
      text(row.indicator), text(row.reference), text(row.unit),
      ...dates.map((date) => {
        const cell = row.values && row.values[date];
        if (!present(cell)) return "—";
        if (typeof cell === "object") return [text(cell.value, ""), present(cell.flag) ? String(cell.flag) : ""].filter(Boolean).join(" ") || "—";
        return String(cell);
      })
    ]));
    rows.forEach((row) => {
      if (present(row.interpretation)) paragraph(target, text(row.indicator, "检验项") + "：" + String(row.interpretation), "mmr-table-note");
    });
    return target;
  }

  function renderV2Labs(root, labs) {
    const tests = Array.isArray(labs.tests) ? labs.tests : [];
    const rows = Array.isArray(labs.rows) ? labs.rows : [];
    if (!tests.length || !rows.length) return null;
    const target = chapter(root, "检验趋势");
    table(target, ["日期", ...tests.map((item) => text(item.name, "检验项") + (present(item.unit) ? "（" + item.unit + "）" : ""))], rows.map((row) => [
      text(row.date),
      ...tests.map((definition) => {
        const value = row.values && row.values[definition.name];
        const flag = row.flags && row.flags[definition.name];
        return [present(value) ? String(value) : "", present(flag) ? String(flag) : ""].filter(Boolean).join(" ") || "—";
      })
    ]));
    const reference = tests.map((item) => [item.name, item.ref_range, item.unit].filter(present).join(" ")).filter(Boolean).join("；");
    if (reference) paragraph(target, "参考范围：" + reference, "mmr-table-note");
    return target;
  }

  function renderLabs(root, labs) {
    if (!labs || typeof labs !== "object") return;
    const target = Array.isArray(labs.tests) ? renderV2Labs(root, labs) : renderCurrentLabs(root, labs);
    if (target && present(labs.note)) paragraph(target, labs.note, "mmr-table-note");
  }

  function renderImaging(root, imaging) {
    if (!Array.isArray(imaging) || !imaging.length) return;
    table(chapter(root, "影像所见"), ["类型", "日期", "主要发现", "临床意义"], imaging.map((item) => [
      text(item && item.type), text(item && item.date), text(item && item.findings), text(item && item.clinical_significance)
    ]));
  }

  function renderMedications(root, medications) {
    if (!Array.isArray(medications) || !medications.length) return;
    const target = chapter(root, "目前用药方案");
    table(target, ["药物", "剂量", "给药途径", "说明"], medications.map((item) => [
      text(item && item.drug), text(item && item.dose), text(item && item.route), text(item && item.note)
    ]));
    paragraph(target, "以上药物信息按现有结构化数据展示，仅供接诊医生核对，不构成用药建议。", "mmr-table-note");
  }

  function renderPhases(root, phases) {
    if (!Array.isArray(phases) || !phases.length) return;
    const target = chapter(root, "治疗经过与病情起伏分析");
    phases.forEach((phase) => {
      if (!phase || typeof phase !== "object") return;
      const card = el("section", "mmr-phase");
      const heading = el("div", "mmr-phase-heading");
      heading.appendChild(el("span", "mmr-phase-title", text(phase.title, "治疗阶段")));
      if (OUTCOME_LABELS[phase.outcome]) heading.appendChild(el("span", "mmr-phase-result " + phase.outcome, OUTCOME_LABELS[phase.outcome]));
      card.appendChild(heading);
      labelledParagraph(card, "时间：", phase.period);
      labelledParagraph(card, "经过：", phase.description);
      labelledParagraph(card, "原因：", phase.reason);
      if (phase.ebm_note && present(phase.ebm_note.text)) {
        const note = el("div", "mmr-ebm-note");
        note.appendChild(el("strong", "", "循证注释："));
        paragraph(note, phase.ebm_note.text, "mmr-paragraph");
        card.appendChild(note);
      }
      target.appendChild(card);
    });
  }

  function renderAssessment(root, assessment) {
    if (!assessment || typeof assessment !== "object") return;
    const hasInfo = array(assessment.info_box).some(present);
    const hasAlert = array(assessment.alert_box).some(present);
    if (!hasInfo && !hasAlert) return;
    const target = chapter(root, "目前病情评估");
    infoBox(target, assessment.info_box);
    infoBox(target, assessment.alert_box, true);
  }

  function safeLink(parent, label, raw) {
    if (!present(raw)) return;
    let url;
    try {
      url = new URL(String(raw));
      if (!["https:", "http:"].includes(url.protocol)) return;
    } catch (_error) {
      return;
    }
    const line = el("p", "mmr-doctor-detail mmr-url");
    const anchor = el("a", "", url.href);
    anchor.href = url.href;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer nofollow";
    line.append(el("span", "", label + "："), anchor);
    parent.appendChild(line);
  }

  function doctorCards(parent, doctors) {
    doctors.forEach((doctor, index) => {
      if (!doctor || typeof doctor !== "object") return;
      const card = el("section", "mmr-doctor-card");
      const rank = present(doctor.rank) ? doctor.rank : index + 1;
      card.appendChild(el("div", "mmr-doctor-name", "推荐 " + rank + "：" + [doctor.name, doctor.title].filter(present).join(" · ")));
      card.appendChild(el("div", "mmr-doctor-hospital", [doctor.hospital, doctor.department, doctor.hospital_level].filter(present).join(" · ")));
      const specialties = Array.isArray(doctor.specialties) ? doctor.specialties.join("、") : doctor.specialties;
      if (present(specialties)) paragraph(card, "擅长：" + String(specialties), "mmr-doctor-detail");
      if (present(doctor.fudan_rank)) paragraph(card, "复旦榜：" + String(doctor.fudan_rank), "mmr-doctor-detail");
      if (present(doctor.match_reason)) paragraph(card, "匹配理由：" + String(doctor.match_reason), "mmr-doctor-detail");
      safeLink(card, "医院官网", doctor.hospital_website);
      safeLink(card, "第三方医生资料", doctor.doctor_url);
      parent.appendChild(card);
    });
  }

  function recommendedSpecialty(parent, specialty) {
    if (!specialty || typeof specialty !== "object") return;
    const items = [];
    if (present(specialty.department)) items.push("推荐科室：" + String(specialty.department));
    if (present(specialty.sub_specialty)) items.push("推荐亚专科：" + String(specialty.sub_specialty));
    infoBox(parent, items);
  }

  function listGroup(parent, label, value) {
    const items = array(value).filter(present);
    if (!items.length) return;
    const group = el("section", "mmr-list-group");
    group.appendChild(el("h4", "mmr-subheading", label));
    const list = el("ul", "mmr-list");
    items.forEach((item) => list.appendChild(el("li", "", item)));
    group.appendChild(list);
    parent.appendChild(group);
  }

  function groupedChapter(root, title, value, groups, paragraphKey) {
    if (!value || typeof value !== "object") return;
    const hasGroups = groups.some(([, key]) => array(value[key]).some(present));
    if (!hasGroups && (!paragraphKey || !present(value[paragraphKey]))) return;
    const target = chapter(root, title);
    groups.forEach(([label, key]) => listGroup(target, label, value[key]));
    if (paragraphKey) paragraph(target, value[paragraphKey]);
  }

  function sectionChapter(root, section, report, doctors) {
    const target = chapter(root, section && section.title ? String(section.title) : "报告章节");
    if (section && section.id === "specialty_analysis") recommendedSpecialty(target, report.recommended_specialty);
    const isExpertWithCards = section && section.id === "expert_recommendation" && doctors.length;
    if (isExpertWithCards) {
      const details = el("details", "mmr-source-details");
      details.appendChild(el("summary", "", "查看原始专家推荐文本"));
      paragraph(details, section.content || "");
      target.appendChild(details);
      doctorCards(target, doctors);
    } else {
      paragraph(target, section && section.content ? section.content : "");
    }
  }

  function renderChiefComplaint(root, report, summarySections, consumed) {
    if (!report.chief_complaint || typeof report.chief_complaint !== "object") return false;
    const target = chapter(root, "病情摘要与主诉");
    paragraph(target, present(report.chief_complaint.text) ? report.chief_complaint.text : "现有资料不足");
    summarySections.forEach((section) => {
      consumed.add(section);
      paragraph(target, section.content || "");
    });
    return true;
  }

  function renderSpecialtyObject(root, report) {
    const specialty = report.specialty_analysis;
    if (!specialty || typeof specialty !== "object") return;
    const recommendation = specialty.recommended_specialty || report.recommended_specialty;
    if (!present(specialty.analysis) && (!recommendation || typeof recommendation !== "object")) return;
    const target = chapter(root, "上海专家专科选择分析");
    recommendedSpecialty(target, recommendation);
    paragraph(target, specialty.analysis);
  }

  function renderReferences(root, report) {
    const boundary = report.references_boundary && typeof report.references_boundary === "object" ? report.references_boundary : {};
    const notes = boundary.guideline_notes;
    const disclaimer = present(boundary.disclaimer) ? boundary.disclaimer : report.disclaimer;
    if (!present(notes) && !present(disclaimer)) return;
    const target = chapter(root, "引用与事实边界");
    paragraph(target, notes);
    if (present(disclaimer)) {
      const box = el("div", "mmr-alert-box mmr-disclaimer");
      box.appendChild(el("strong", "", "免责声明与急症提示："));
      paragraph(box, disclaimer, "mmr-paragraph");
      target.appendChild(box);
    }
  }

  function hasRenderableContent(report, sections, doctors) {
    return Boolean(
      sections.length || doctors.length || array(report.paragraphs).length || report.chief_complaint ||
      (Array.isArray(report.patient_info) ? report.patient_info.length : report.patient_info && Object.keys(report.patient_info).length) ||
      array(report.timeline).length || array(report.imaging).length || array(report.medications).length ||
      array(report.treatment_phases).length || report.assessment || report.local_doctor_conclusion ||
      report.specialty_analysis || report.selection_advice || report.visit_preparation || report.travel_checklist ||
      (report.lab_trends && (array(report.lab_trends.rows).length || array(report.lab_trends.tests).length)) ||
      report.references_boundary
    );
  }

  function render(container, report) {
    if (!container || !report || typeof report !== "object") return false;
    const sections = Array.isArray(report.sections) ? report.sections.filter((item) => item && typeof item === "object") : [];
    const doctors = Array.isArray(report.matched_doctors) && report.matched_doctors.length
      ? report.matched_doctors : (Array.isArray(report.doctors) ? report.doctors : []);
    if (!hasRenderableContent(report, sections, doctors)) return false;
    try {
      ensureStyles();
      const root = el("div", "mmr-report");
      root.setAttribute("data-renderer", "phase0-structured");
      renderPatientInfo(root, report.patient_info);
      const consumed = new Set();
      const renderId = (id) => {
        let count = 0;
        sections.forEach((section) => {
          if (section.id !== id) return;
          consumed.add(section);
          count += 1;
          sectionChapter(root, section, report, id === "expert_recommendation" ? doctors : []);
        });
        return count;
      };
      const summarySections = sections.filter((section) => section.id === "summary");
      if (!renderChiefComplaint(root, report, summarySections, consumed)) renderId("summary");
      if (!sections.length && !report.chief_complaint && array(report.paragraphs).length) {
        const target = chapter(root, report.title || "完整报告");
        array(report.paragraphs).forEach((value) => paragraph(target, value));
      }
      renderTimeline(root, report.timeline);
      renderLabs(root, report.lab_trends);
      renderImaging(root, report.imaging);
      renderPhases(root, report.treatment_phases);
      renderMedications(root, report.medications);
      renderAssessment(root, report.assessment);
      if (present(report.local_doctor_conclusion)) paragraph(chapter(root, "当地医生结论"), report.local_doctor_conclusion);
      if (!renderId("specialty_analysis")) renderSpecialtyObject(root, report);
      const renderedExpert = renderId("expert_recommendation");
      if (doctors.length && !renderedExpert) doctorCards(chapter(root, "匹配专家"), doctors);
      if (!renderId("selection_advice")) groupedChapter(root, "如何选择专家", report.selection_advice, [
        ["考虑专家 A 的情形", "when_a"], ["考虑专家 B 的情形", "when_b"], ["如仍无法确定", "when_unsure"]
      ], "how_to_choose");
      if (!renderId("visit_preparation")) groupedChapter(root, "就诊前准备", report.visit_preparation, [
        ["需要携带", "bring"], ["需要整理", "organize"], ["需要确认", "confirm"]
      ]);
      groupedChapter(root, "旅行与陪同注意事项", report.travel_checklist, [
        ["病历资料", "medical_documents"], ["翻译与沟通", "translation"], ["随访", "followup"]
      ]);
      sections.forEach((section) => {
        if (!consumed.has(section)) {
          consumed.add(section);
          sectionChapter(root, section, report, []);
        }
      });
      renderReferences(root, report);
      if (!root.children.length) return false;
      container.replaceChildren(root);
      return true;
    } catch (_error) {
      return false;
    }
  }

  window.MediMatchReportRenderer = Object.freeze({ isStructuredPreviewRequested, render });
})();
