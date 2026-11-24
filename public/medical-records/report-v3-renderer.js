(() => {
  "use strict";

  const SCRIPT_URL = document.currentScript && document.currentScript.src ? document.currentScript.src : window.location.href;
  const CHAPTER_ORDER = Object.freeze([
    "patient_info", "chief_complaint", "timeline", "lab_trends", "imaging",
    "treatment_phases", "medications", "assessment", "local_doctor_conclusion",
    "subspecialty_analysis", "matched_doctors", "selection_advice",
    "visit_preparation", "travel_checklist", "references_boundary"
  ]);
  const OUTER_ORDER = Object.freeze(["language", "generated_at", "version", ...CHAPTER_ORDER, "chapter_status"]);
  const CHAPTER_TITLES = Object.freeze({
    patient_info: "患者基本信息",
    chief_complaint: "主诉与核心临床问题",
    timeline: "就诊时间线",
    lab_trends: "检验趋势",
    imaging: "影像所见",
    treatment_phases: "治疗经过与病情起伏分析",
    medications: "目前用药方案",
    assessment: "目前病情评估",
    local_doctor_conclusion: "当地医生结论",
    subspecialty_analysis: "上海专家专科选择分析",
    matched_doctors: "匹配专家",
    selection_advice: "如何选择专家",
    visit_preparation: "就诊前准备",
    travel_checklist: "旅行与陪同注意事项",
    references_boundary: "引用与事实边界"
  });
  const STATUS_LABELS = Object.freeze({
    complete: "完整",
    insufficient_data: "现有资料不足",
    not_applicable: "不适用"
  });
  const OUTCOME_LABELS = Object.freeze({ improved: "好转", worsened: "恶化", stable: "稳定", adjusted: "调整" });
  const SOURCE_ID = /^(?:[a-z0-9][a-z0-9_:-]{0,127}|PMID_[0-9]+)$/;
  const ISO_DATE_TIME = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d+))?)?(Z|[+-]\d{2}:?\d{2})$/;
  let styleRequested = false;

  function isV3PreviewRequested(search) {
    try {
      return new URLSearchParams(search || "").get("report_renderer") === "v3";
    } catch (_error) {
      return false;
    }
  }

  function invalid(path) {
    throw new Error("Invalid v3 report at " + path);
  }

  function objectWithKeys(value, keys, path, ordered = false) {
    if (value === null || typeof value !== "object" || Array.isArray(value)) invalid(path + ": expected object");
    const actual = Reflect.ownKeys(value);
    if (actual.length !== keys.length) invalid(path + ": keys mismatch");
    if (ordered) {
      for (let index = 0; index < keys.length; index += 1) {
        if (actual[index] !== keys[index]) invalid(path + ": key order mismatch");
      }
    } else {
      const present = new Set(actual);
      keys.forEach((key) => {
        if (!present.has(key)) invalid(path + ": keys mismatch");
      });
    }
    return value;
  }

  function string(value, path, nonempty = false) {
    if (typeof value !== "string" || (nonempty && !value.trim())) invalid(path + ": invalid string");
    return value;
  }

  function array(value, path) {
    if (!Array.isArray(value)) invalid(path + ": expected array");
    return value;
  }

  function stringArray(value, path) {
    array(value, path).forEach((item, index) => string(item, path + "[" + index + "]", true));
  }

  function ebm(value, path) {
    if (value === null) return;
    objectWithKeys(value, ["source_id", "text"], path);
    const source = string(value.source_id, path + ".source_id", true);
    if (!SOURCE_ID.test(source)) invalid(path + ".source_id: invalid id");
    string(value.text, path + ".text", true);
  }

  function empty(value) {
    if (value === null || value === "") return true;
    if (Array.isArray(value)) return value.length === 0;
    if (value !== null && typeof value === "object") return Object.values(value).every(empty);
    return false;
  }

  function validGeneratedAt(value) {
    const match = ISO_DATE_TIME.exec(value);
    if (!match) return false;
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const hour = Number(match[4]);
    const minute = Number(match[5]);
    const second = match[6] === undefined ? 0 : Number(match[6]);
    if (year < 1 || month < 1 || month > 12 || hour > 23 || minute > 59 || second > 59) return false;
    const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day < 1 || day > days[month - 1]) return false;
    const zone = match[8];
    if (zone !== "Z") {
      const zoneHour = Number(zone.slice(1, 3));
      const zoneMinute = Number(zone.slice(-2));
      if (zoneHour > 23 || zoneMinute > 59) return false;
    }
    return true;
  }

  function validateReportV3(report) {
    objectWithKeys(report, OUTER_ORDER, "report", true);
    if (report.language !== "zh") invalid("language: expected zh");
    if (report.version !== "v3") invalid("version: expected v3");
    const generatedAt = string(report.generated_at, "generated_at", true);
    if (!validGeneratedAt(generatedAt)) invalid("generated_at: expected ISO 8601 with timezone");

    const patient = objectWithKeys(report.patient_info, [
      "name", "gender_age", "occupation", "residence", "diagnosis", "disease_course", "current_hospital"
    ], "patient_info");
    Object.keys(patient).forEach((key) => string(patient[key], "patient_info." + key));

    const chief = objectWithKeys(report.chief_complaint, ["chief", "core_problem"], "chief_complaint");
    Object.keys(chief).forEach((key) => string(chief[key], "chief_complaint." + key));

    array(report.timeline, "timeline").forEach((item, index) => {
      const path = "timeline[" + index + "]";
      const row = objectWithKeys(item, ["date", "visit_type", "findings", "treatment"], path);
      Object.keys(row).forEach((key) => string(row[key], path + "." + key));
    });

    const lab = objectWithKeys(report.lab_trends, ["tests", "rows", "note"], "lab_trends");
    const names = [];
    array(lab.tests, "lab_trends.tests").forEach((item, index) => {
      const path = "lab_trends.tests[" + index + "]";
      const test = objectWithKeys(item, ["name", "unit", "ref_range"], path);
      names.push(string(test.name, path + ".name", true));
      string(test.unit, path + ".unit");
      string(test.ref_range, path + ".ref_range");
    });
    if (new Set(names).size !== names.length) invalid("lab_trends.tests: duplicate name");
    const expectedNames = new Set(names);
    const dates = [];
    array(lab.rows, "lab_trends.rows").forEach((item, index) => {
      const path = "lab_trends.rows[" + index + "]";
      const row = objectWithKeys(item, ["date", "values", "flags"], path);
      dates.push(string(row.date, path + ".date", true));
      const values = objectWithKeys(row.values, names, path + ".values");
      const flags = objectWithKeys(row.flags, names, path + ".flags");
      if (Reflect.ownKeys(values).some((key) => !expectedNames.has(key)) || Reflect.ownKeys(flags).some((key) => !expectedNames.has(key))) {
        invalid(path + ": lab keys must equal tests names");
      }
      names.forEach((name) => {
        const value = string(values[name], path + ".values." + name);
        const flag = string(flags[name], path + ".flags." + name);
        if (!["", "↑", "↓"].includes(flag) || (flag && !value)) invalid(path + ": invalid flag");
      });
    });
    if (new Set(dates).size !== dates.length) invalid("lab_trends.rows: duplicate date");
    string(lab.note, "lab_trends.note");

    array(report.imaging, "imaging").forEach((item, index) => {
      const path = "imaging[" + index + "]";
      const row = objectWithKeys(item, ["type", "date", "findings", "clinical_significance"], path);
      Object.keys(row).forEach((key) => string(row[key], path + "." + key));
    });

    array(report.treatment_phases, "treatment_phases").forEach((item, index) => {
      const path = "treatment_phases[" + index + "]";
      const row = objectWithKeys(item, ["title", "period", "outcome", "description", "reason", "ebm_note"], path);
      ["title", "period", "description", "reason"].forEach((key) => string(row[key], path + "." + key));
      if (typeof row.outcome !== "string" || !Object.prototype.hasOwnProperty.call(OUTCOME_LABELS, row.outcome)) invalid(path + ".outcome: invalid enum");
      ebm(row.ebm_note, path + ".ebm_note");
    });

    array(report.medications, "medications").forEach((item, index) => {
      const path = "medications[" + index + "]";
      const row = objectWithKeys(item, ["drug", "dose", "route", "note"], path);
      Object.keys(row).forEach((key) => string(row[key], path + "." + key));
    });

    const assessment = objectWithKeys(report.assessment, ["info_box", "alert_box"], "assessment");
    stringArray(assessment.info_box, "assessment.info_box");
    stringArray(assessment.alert_box, "assessment.alert_box");
    string(report.local_doctor_conclusion, "local_doctor_conclusion");

    const specialty = objectWithKeys(report.subspecialty_analysis, ["direction", "points"], "subspecialty_analysis");
    string(specialty.direction, "subspecialty_analysis.direction");
    array(specialty.points, "subspecialty_analysis.points").forEach((item, index) => {
      const path = "subspecialty_analysis.points[" + index + "]";
      const point = objectWithKeys(item, ["title", "content", "ebm_note"], path);
      string(point.title, path + ".title", true);
      string(point.content, path + ".content", true);
      ebm(point.ebm_note, path + ".ebm_note");
    });

    array(report.matched_doctors, "matched_doctors").forEach((item, index) => {
      const path = "matched_doctors[" + index + "]";
      const doctor = objectWithKeys(item, [
        "rank", "name", "title", "hospital", "department", "specialties", "fudan_rank", "hospital_website", "match_reason"
      ], path);
      if (typeof doctor.rank !== "number" || !Number.isInteger(doctor.rank) || doctor.rank !== index + 1) {
        invalid(path + ".rank: expected sequential integer");
      }
      ["name", "title", "hospital", "department", "specialties", "match_reason"].forEach((key) => string(doctor[key], path + "." + key));
      if (doctor.fudan_rank !== null) string(doctor.fudan_rank, path + ".fudan_rank");
      if (doctor.hospital_website !== null) invalid(path + ".hospital_website: phase 2 requires null");
    });

    const selection = objectWithKeys(report.selection_advice, ["priority", "dimensions", "continuity"], "selection_advice");
    Object.keys(selection).forEach((key) => string(selection[key], "selection_advice." + key));
    const visit = objectWithKeys(report.visit_preparation, ["materials", "to_supplement"], "visit_preparation");
    stringArray(visit.materials, "visit_preparation.materials");
    stringArray(visit.to_supplement, "visit_preparation.to_supplement");
    const travel = objectWithKeys(report.travel_checklist, ["documents", "pre_trip", "on_site"], "travel_checklist");
    Object.keys(travel).forEach((key) => stringArray(travel[key], "travel_checklist." + key));
    const boundary = objectWithKeys(report.references_boundary, ["guideline_notes", "disclaimer"], "references_boundary");
    string(boundary.guideline_notes, "references_boundary.guideline_notes");
    string(boundary.disclaimer, "references_boundary.disclaimer", true);

    const statuses = objectWithKeys(report.chapter_status, CHAPTER_ORDER, "chapter_status", true);
    CHAPTER_ORDER.forEach((chapter) => {
      const status = statuses[chapter];
      if (typeof status !== "string" || !Object.prototype.hasOwnProperty.call(STATUS_LABELS, status)) invalid("chapter_status." + chapter + ": invalid status");
      if (status === "complete" && empty(report[chapter])) invalid(chapter + ": empty payload cannot be complete");
      if (status === "not_applicable" && !empty(report[chapter])) invalid(chapter + ": not_applicable payload must be empty");
    });
  }

  function ensureStyles() {
    if (styleRequested || !document.head) return;
    styleRequested = true;
    const link = document.createElement("link");
    link.id = "medimatch-v3-renderer-styles";
    link.rel = "stylesheet";
    link.href = new URL("report-renderer.css", SCRIPT_URL).href;
    link.setAttribute("data-medimatch-renderer", "v3");
    document.head.appendChild(link);
  }

  function el(tag, className, value) {
    const item = document.createElement(tag);
    if (className) item.className = className;
    if (value !== undefined && value !== null) item.textContent = String(value);
    return item;
  }

  function present(value) {
    return typeof value === "string" && value.trim() !== "";
  }

  function text(value) {
    return present(value) ? value : "—";
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
    item.append(el("strong", "", label), el("span", "", value));
    parent.appendChild(item);
  }

  function table(parent, headers, rows) {
    if (!rows.length) return;
    const wrapper = el("div", "mmr-table-wrap");
    const grid = el("table", "mmr-table keep-together");
    const head = document.createElement("thead");
    const headerRow = el("tr");
    headers.forEach((label) => {
      const cell = el("th", "", label);
      cell.setAttribute("scope", "col");
      headerRow.appendChild(cell);
    });
    head.appendChild(headerRow);
    const body = document.createElement("tbody");
    rows.forEach((row) => {
      const line = el("tr");
      row.forEach((value) => line.appendChild(el("td", "", value)));
      body.appendChild(line);
    });
    grid.append(head, body);
    wrapper.appendChild(grid);
    parent.appendChild(wrapper);
  }

  function infoBox(parent, values, alert = false) {
    if (!values.length) return;
    const box = el("div", alert ? "mmr-alert-box" : "mmr-info-box");
    if (alert) box.appendChild(el("strong", "", "需关注的问题："));
    values.forEach((value) => paragraph(box, value, "mmr-paragraph"));
    parent.appendChild(box);
  }

  function listGroup(parent, label, values) {
    if (!values.length) return;
    const group = el("section", "mmr-list-group");
    group.appendChild(el("h4", "mmr-subheading", label));
    const list = el("ul", "mmr-list");
    values.forEach((value) => list.appendChild(el("li", "", value)));
    group.appendChild(list);
    parent.appendChild(group);
  }

  function ebmNote(parent, value) {
    if (value === null) return;
    const note = el("div", "mmr-ebm-note");
    note.appendChild(el("strong", "", "循证注释："));
    paragraph(note, "来源 ID：" + value.source_id, "mmr-table-note");
    paragraph(note, value.text, "mmr-paragraph");
    parent.appendChild(note);
  }

  function chapter(root, id, index, status) {
    const article = el("article", "report-chapter mmr-chapter mmr-v3-chapter");
    article.setAttribute("data-chapter", id);
    article.setAttribute("data-chapter-status", status);
    const heading = el("div", "chapter-heading mmr-v3-heading");
    heading.append(
      el("span", "chapter-number", String(index + 1).padStart(2, "0")),
      el("h3", "", CHAPTER_TITLES[id]),
      el("span", "mmr-v3-status mmr-v3-status-" + status, STATUS_LABELS[status])
    );
    article.appendChild(heading);
    if (status === "insufficient_data") {
      paragraph(article, "现有资料不足：仅展示已提供的信息，空缺内容不作推断。", "mmr-table-note mmr-v3-state-notice");
    } else if (status === "not_applicable") {
      paragraph(article, "本章不适用：保留章节位置，不生成医疗内容。", "mmr-table-note mmr-v3-state-notice");
    }
    root.appendChild(article);
    return article;
  }

  function renderPatientInfo(parent, value) {
    const rows = [
      ["姓名", text(value.name)], ["性别 / 年龄", text(value.gender_age)], ["职业", text(value.occupation)],
      ["居住地", text(value.residence)], ["确诊疾病", text(value.diagnosis)], ["病程", text(value.disease_course)],
      ["目前就诊医院", text(value.current_hospital)]
    ];
    table(parent, ["项目", "内容"], rows);
  }

  function renderChiefComplaint(parent, value) {
    labelledParagraph(parent, "主诉：", value.chief);
    labelledParagraph(parent, "核心临床问题：", value.core_problem);
  }

  function renderTimeline(parent, value) {
    table(parent, ["日期", "就诊类型", "主要发现", "处置"], value.map((item) => [
      text(item.date), text(item.visit_type), text(item.findings), text(item.treatment)
    ]));
  }

  function renderLabTrends(parent, value) {
    if (value.rows.length) {
      table(parent, ["日期", ...value.tests.map((test) => test.name + (present(test.unit) ? "（" + test.unit + "）" : ""))], value.rows.map((row) => [
        text(row.date),
        ...value.tests.map((test) => {
          const raw = row.values[test.name];
          const flag = row.flags[test.name];
          return [present(raw) ? raw : "", flag].filter(Boolean).join(" ") || "—";
        })
      ]));
      const definitions = value.tests.map((test) => {
        const details = [test.ref_range, test.unit].filter(present).join(" ");
        return details ? test.name + " " + details : "";
      }).filter(present);
      if (definitions.length) paragraph(parent, "检验项目、参考范围与单位：" + definitions.join("；"), "mmr-table-note");
    } else {
      table(parent, ["检验项", "单位", "参考范围"], value.tests.map((test) => [test.name, text(test.unit), text(test.ref_range)]));
    }
    paragraph(parent, value.note, "mmr-table-note");
  }

  function renderImaging(parent, value) {
    table(parent, ["类型", "日期", "主要发现", "临床意义"], value.map((item) => [
      text(item.type), text(item.date), text(item.findings), text(item.clinical_significance)
    ]));
  }

  function renderTreatmentPhases(parent, value) {
    value.forEach((phase) => {
      const card = el("section", "mmr-phase");
      const heading = el("div", "mmr-phase-heading");
      heading.append(
        el("span", "mmr-phase-title", present(phase.title) ? phase.title : "治疗阶段"),
        el("span", "mmr-phase-result " + phase.outcome, OUTCOME_LABELS[phase.outcome])
      );
      card.appendChild(heading);
      labelledParagraph(card, "时间：", phase.period);
      labelledParagraph(card, "经过：", phase.description);
      labelledParagraph(card, "原因：", phase.reason);
      ebmNote(card, phase.ebm_note);
      parent.appendChild(card);
    });
  }

  function renderMedications(parent, value) {
    table(parent, ["药物", "剂量", "给药途径", "说明"], value.map((item) => [
      text(item.drug), text(item.dose), text(item.route), text(item.note)
    ]));
  }

  function renderAssessment(parent, value) {
    infoBox(parent, value.info_box);
    infoBox(parent, value.alert_box, true);
  }

  function renderSubspecialty(parent, value) {
    labelledParagraph(parent, "推荐方向：", value.direction);
    value.points.forEach((point) => {
      const card = el("section", "mmr-phase mmr-v3-analysis-point");
      card.appendChild(el("h4", "mmr-subheading", point.title));
      paragraph(card, point.content);
      ebmNote(card, point.ebm_note);
      parent.appendChild(card);
    });
  }

  function renderDoctors(parent, value) {
    value.forEach((doctor) => {
      const card = el("section", "mmr-doctor-card");
      const identity = [doctor.name, doctor.title].filter(present).join(" · ");
      card.appendChild(el("div", "mmr-doctor-name", "推荐 " + doctor.rank + (identity ? "：" + identity : "")));
      const affiliation = [doctor.hospital, doctor.department].filter(present).join(" · ");
      if (affiliation) card.appendChild(el("div", "mmr-doctor-hospital", affiliation));
      paragraph(card, present(doctor.specialties) ? "擅长：" + doctor.specialties : "", "mmr-doctor-detail");
      paragraph(card, present(doctor.fudan_rank) ? "复旦榜：" + doctor.fudan_rank : "", "mmr-doctor-detail");
      paragraph(card, present(doctor.match_reason) ? "匹配理由：" + doctor.match_reason : "", "mmr-doctor-detail");
      parent.appendChild(card);
    });
  }

  function renderSelectionAdvice(parent, value) {
    labelledParagraph(parent, "优先事项：", value.priority);
    labelledParagraph(parent, "选择维度：", value.dimensions);
    labelledParagraph(parent, "连续随访：", value.continuity);
  }

  function renderVisitPreparation(parent, value) {
    listGroup(parent, "需要携带的材料", value.materials);
    listGroup(parent, "需要补充的资料", value.to_supplement);
  }

  function renderTravelChecklist(parent, value) {
    listGroup(parent, "证件与病历资料", value.documents);
    listGroup(parent, "行前事项", value.pre_trip);
    listGroup(parent, "到院事项", value.on_site);
  }

  function renderReferences(parent, value) {
    paragraph(parent, value.guideline_notes);
    const box = el("div", "mmr-alert-box mmr-disclaimer");
    box.appendChild(el("strong", "", "免责声明与事实边界："));
    paragraph(box, value.disclaimer, "mmr-paragraph");
    parent.appendChild(box);
  }

  const RENDERERS = Object.freeze({
    patient_info: renderPatientInfo,
    chief_complaint: renderChiefComplaint,
    timeline: renderTimeline,
    lab_trends: renderLabTrends,
    imaging: renderImaging,
    treatment_phases: renderTreatmentPhases,
    medications: renderMedications,
    assessment: renderAssessment,
    local_doctor_conclusion: (parent, value) => paragraph(parent, value),
    subspecialty_analysis: renderSubspecialty,
    matched_doctors: renderDoctors,
    selection_advice: renderSelectionAdvice,
    visit_preparation: renderVisitPreparation,
    travel_checklist: renderTravelChecklist,
    references_boundary: renderReferences
  });

  function renderV3(container, report) {
    if (!container || typeof container.replaceChildren !== "function") return false;
    try {
      validateReportV3(report);
    } catch (_error) {
      return false;
    }
    try {
      ensureStyles();
      const root = el("div", "mmr-report mmr-v3-report");
      root.setAttribute("data-renderer", "v3-strict");
      root.setAttribute("data-version", "v3");
      root.setAttribute("data-language", "zh");
      CHAPTER_ORDER.forEach((id, index) => {
        const status = report.chapter_status[id];
        const target = chapter(root, id, index, status);
        if (status !== "not_applicable") RENDERERS[id](target, report[id]);
      });
      container.replaceChildren(root);
      return true;
    } catch (_error) {
      return false;
    }
  }

  window.MediMatchReportV3Renderer = Object.freeze({ isV3PreviewRequested, renderV3 });
})();
