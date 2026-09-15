(function () {
  "use strict";

  const $ = id => document.getElementById(id);
  const els = {
    grade: $("grade"), subject: $("subject"), topic: $("topic"), level: $("level"), amount: $("amount"),
    amountLabel: $("amountLabel"), studentNameWrap: $("studentNameWrap"), studentName: $("studentName"),
    roleHint: $("roleHint"), generateBtn: $("generateBtn"), paperSection: $("paperSection"),
    paperTitle: $("paperTitle"), paperMeta: $("paperMeta"), paperStudent: $("paperStudent"),
    sheetTitle: $("sheetTitle"), sheetSubtitle: $("sheetSubtitle"), questionList: $("questionList"),
    answerKey: $("answerKey"), answerList: $("answerList"), scoreBox: $("scoreBox"),
    gradeBtn: $("gradeBtn"), answerBtn: $("answerBtn"), newVersionBtn: $("newVersionBtn"),
    printBtn: $("printBtn"), historyList: $("historyList"), historyEmpty: $("historyEmpty"),
    totalSessions: $("totalSessions"), averageScore: $("averageScore"), bestScore: $("bestScore"),
    lastSubject: $("lastSubject"), clearHistoryBtn: $("clearHistoryBtn"), clearDataTop: $("clearDataTop"),
    confirmDialog: $("confirmDialog"), year: $("year"), explainQuestion: $("explainQuestion"),
    explainBtn: $("explainBtn"), explainOutput: $("explainOutput"), analysisOutput: $("analysisOutput"),
    createPlanBtn: $("createPlanBtn"), planEmpty: $("planEmpty"), dayGrid: $("dayGrid"),
    planProgress: $("planProgress"), planProgressText: $("planProgressText"),
    planEncouragement: $("planEncouragement"), planProgressFill: $("planProgressFill"),
    achievementIcon: $("achievementIcon"), achievementTitle: $("achievementTitle"),
    achievementText: $("achievementText"), stemGrade: $("stemGrade"), stemCategory: $("stemCategory"),
    stemCount: $("stemCount"), stemProjectGrid: $("stemProjectGrid"), stemDetail: $("stemDetail"),
    stemDetailIcon: $("stemDetailIcon"), stemDetailTitle: $("stemDetailTitle"), stemDetailMeta: $("stemDetailMeta"),
    stemMission: $("stemMission"), stemGoals: $("stemGoals"), stemMaterials: $("stemMaterials"),
    stemSteps: $("stemSteps"), stemObserve: $("stemObserve"), stemExplain: $("stemExplain"),
    stemQuestions: $("stemQuestions"), stemSafety: $("stemSafety"), stemPrediction: $("stemPrediction"),
    stemResult: $("stemResult"), stemConclusion: $("stemConclusion"), stemComplete: $("stemComplete"),
    saveStemBtn: $("saveStemBtn"), printStemBtn: $("printStemBtn"), stemSaveStatus: $("stemSaveStatus")
  };

  const STORE_KEY = "hocnhe-v1";
  let currentQuestions = [];
  let currentConfig = null;
  let currentResults = [];
  let currentStemId = null;

  function getState() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY)) || { history: [], preferences: {} };
    } catch (_) {
      return { history: [], preferences: {} };
    }
  }

  function saveState(state) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (_) {}
  }

  function role() {
    return document.querySelector('input[name="role"]:checked').value;
  }

  function topicName(subject, grade, topic) {
    const found = window.HOCNHE.catalog[subject][grade].find(item => item[0] === topic);
    return found ? found[1] : "Tổng hợp";
  }

  function topicValue(subject, grade, label) {
    const options = window.HOCNHE.catalog[subject][grade];
    const found = options.find(item => item[1] === label);
    return found ? found[0] : "all";
  }

  function updateTopics(preferred) {
    const options = window.HOCNHE.catalog[els.subject.value][els.grade.value];
    els.topic.replaceChildren(...options.map(([value, label]) => {
      const opt = document.createElement("option");
      opt.value = value;
      opt.textContent = label;
      return opt;
    }));
    if (preferred && options.some(([value]) => value === preferred)) els.topic.value = preferred;
  }

  function updateRole() {
    const teacher = role() === "teacher";
    els.roleHint.textContent = teacher
      ? "Tạo nhanh phiếu bài tập để in hoặc giao học sinh làm trên thiết bị."
      : "Tạo một buổi luyện ngắn để cùng con học tại nhà.";
    els.amountLabel.childNodes[0].nodeValue = teacher ? "Số câu hỏi " : "Thời lượng ";
    updateAmountOptions(teacher);
    els.studentNameWrap.firstChild.nodeValue = teacher ? "Tên lớp / học sinh " : "Tên gọi của con ";
    els.generateBtn.firstChild.nodeValue = teacher ? "Tạo phiếu cho học sinh " : "Tạo phiếu luyện ngay ";
  }

  function updateAmountOptions(teacher = role() === "teacher") {
    const isVietnamese = els.subject.value === "vietnamese";
    const values = isVietnamese
      ? (teacher ? [["4", "4 câu"], ["6", "6 câu"]] : [["4", "Khoảng 10 phút"], ["6", "Khoảng 15 phút"]])
      : (teacher ? [["6", "6 câu"], ["10", "10 câu"], ["14", "14 câu"]] : [["6", "Khoảng 10 phút"], ["10", "Khoảng 15 phút"], ["14", "Khoảng 20 phút"]]);
    const selected = els.amount.value;
    els.amount.replaceChildren(...values.map(([value, label]) => {
      const opt = document.createElement("option");
      opt.value = value; opt.textContent = label; return opt;
    }));
    els.amount.value = values.some(([value]) => value === selected) ? selected : values[values.length - 1][0];
  }

  function normalize(value) {
    let clean = String(value || "").trim().toLocaleLowerCase("vi").replace(/\s+/g, " ");
    if (/^-?[\d.,]+$/.test(clean)) {
      if (clean.includes(",")) clean = clean.replace(/\./g, "").replace(",", ".");
      else if (/^-?\d{1,3}(\.\d{3})+$/.test(clean)) clean = clean.replace(/\./g, "");
    }
    return clean;
  }

  function escapeText(value) {
    const span = document.createElement("span");
    span.textContent = value;
    return span.innerHTML;
  }

  function plainText(html) {
    const box = document.createElement("div");
    box.innerHTML = html;
    return box.textContent.trim();
  }

  function methodHint(question) {
    if (!currentConfig) return "Đọc kỹ đề và xác định điều cần tìm.";
    if (currentConfig.subject === "vietnamese") {
      if (currentConfig.topic === "doc-hieu") return "Đọc lại đoạn văn, gạch dưới từ khóa trong câu hỏi rồi tìm câu chứa thông tin tương ứng.";
      if (currentConfig.topic === "chinh-ta") return "Đọc chậm từng tiếng, chú ý âm đầu và vần dễ nhầm, sau đó thử đọc lại từ hoàn chỉnh.";
      if (currentConfig.topic === "dau-cau") return "Xác định mục đích của câu: kể, hỏi, cảm hay liệt kê; sau đó chọn dấu câu phù hợp.";
      return "Xác định từ hoặc bộ phận đang được hỏi, rồi loại từng lựa chọn không đúng chức năng hoặc ý nghĩa.";
    }
    if (/chu vi/i.test(question.prompt)) return "Ghi độ dài và chiều rộng, cộng hai số rồi nhân kết quả với 2.";
    if (/diện tích/i.test(question.prompt)) return "Xác định chiều dài và chiều rộng, sau đó lấy chiều dài nhân chiều rộng.";
    if (/%/.test(question.prompt)) return "Đổi phần trăm thành phép chia cho 100, rồi nhân với số đã cho.";
    if (/bằng bao nhiêu|điền số thích hợp/i.test(question.prompt)) return "Nhớ quan hệ giữa hai đơn vị, xác định cần nhân hay chia rồi mới thay số.";
    if (/mỗi|tất cả|bao nhiêu đồng/i.test(question.prompt)) return "Tóm tắt số lượng của một nhóm và số nhóm; thường dùng phép nhân để tìm toàn bộ.";
    if (/[×:]/.test(question.prompt)) return "Dùng bảng nhân/chia tương ứng và kiểm tra ngược bằng phép tính đối lập.";
    return "Đặt các số đúng hàng, chọn phép tính trong đề rồi tính lần lượt từ phải sang trái.";
  }

  function renderQuestions() {
    els.questionList.innerHTML = "";
    els.answerList.innerHTML = "";
    currentQuestions.forEach((q, index) => {
      const li = document.createElement("li");
      li.className = "question";
      li.dataset.index = index;

      const prompt = document.createElement("div");
      prompt.className = "question-prompt";
      prompt.innerHTML = q.prompt;
      li.appendChild(prompt);

      if (q.type === "choice") {
        const choices = document.createElement("div");
        choices.className = "choices";
        q.options.forEach(option => {
          const label = document.createElement("label");
          label.className = "choice";
          const input = document.createElement("input");
          input.type = "radio";
          input.name = "q-" + index;
          input.value = option;
          const text = document.createElement("span");
          text.textContent = option;
          label.append(input, text);
          choices.appendChild(label);
        });
        li.appendChild(choices);
      } else {
        const input = document.createElement("input");
        input.type = "text";
        input.className = "text-answer";
        input.dataset.question = index;
        input.autocomplete = "off";
        input.setAttribute("aria-label", "Câu trả lời cho câu " + (index + 1));
        input.placeholder = "Điền đáp án";
        li.appendChild(input);
      }

      const feedback = document.createElement("p");
      feedback.className = "feedback";
      feedback.hidden = true;
      li.appendChild(feedback);
      els.questionList.appendChild(li);

      const answerLi = document.createElement("li");
      answerLi.innerHTML = `<strong>${escapeText(q.answer)}</strong> — ${escapeText(q.explanation)}`;
      els.answerList.appendChild(answerLi);
    });
    els.explainQuestion.replaceChildren(...currentQuestions.map((q, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = `Câu ${index + 1}: ${plainText(q.prompt).slice(0, 62)}${plainText(q.prompt).length > 62 ? "…" : ""}`;
      return option;
    }));
    els.explainBtn.disabled = currentQuestions.length === 0;
  }

  function generate(scrollToPaper = true) {
    currentConfig = {
      role: role(),
      grade: Number(els.grade.value),
      subject: els.subject.value,
      topic: els.topic.value,
      level: els.level.value,
      amount: Number(els.amount.value),
      student: els.studentName.value.trim()
    };
    currentQuestions = window.HOCNHE.generate(
      currentConfig.subject, currentConfig.grade, currentConfig.topic, currentConfig.level, currentConfig.amount
    );
    const subjectLabel = currentConfig.subject === "math" ? "Toán" : "Tiếng Việt";
    const selectedTopic = topicName(currentConfig.subject, currentConfig.grade, currentConfig.topic);
    const levelLabel = { basic: "Cơ bản", mixed: "Vừa sức", challenge: "Thử thách" }[currentConfig.level];

    els.paperTitle.textContent = `${subjectLabel} lớp ${currentConfig.grade} · ${selectedTopic}`;
    els.paperMeta.textContent = `${currentQuestions.length} câu · Mức ${levelLabel.toLowerCase()}`;
    els.sheetTitle.textContent = `PHIẾU LUYỆN ${subjectLabel.toLocaleUpperCase("vi")} — LỚP ${currentConfig.grade}`;
    els.sheetSubtitle.textContent = `${selectedTopic} · ${currentQuestions.length} câu · Mức ${levelLabel}`;
    els.paperStudent.textContent = currentConfig.student || "________________";
    renderQuestions();
    currentResults = [];
    resetCoachPanels();
    els.answerKey.hidden = true;
    els.answerBtn.textContent = "Xem đáp án";
    els.scoreBox.hidden = true;
    els.scoreBox.textContent = "";
    els.paperSection.hidden = false;

    const state = getState();
    state.preferences = { ...currentConfig };
    saveState(state);
    if (scrollToPaper) els.paperSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function startConfiguredPractice(config) {
    els.grade.value = String(config.grade || 2);
    els.subject.value = config.subject || "math";
    updateTopics(config.topic || "all");
    els.level.value = config.level || "mixed";
    updateAmountOptions();
    const requestedAmount = String(config.amount || (els.subject.value === "vietnamese" ? 4 : 6));
    if ([...els.amount.options].some(option => option.value === requestedAmount)) els.amount.value = requestedAmount;
    generate(true);
  }

  function runQuickAction(action) {
    const state = getState();
    const prefs = currentConfig || state.preferences || {};
    if (action === "achievement") {
      $("progress").scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (action === "challenge") {
      startConfiguredPractice({
        grade: prefs.grade || 2,
        subject: prefs.subject || "math",
        topic: prefs.topic || "all",
        level: "challenge",
        amount: prefs.subject === "vietnamese" ? 4 : 6
      });
      return;
    }
    const history = state.history || [];
    const weakest = history.length ? [...history].sort((a, b) => a.score - b.score)[0] : null;
    startConfiguredPractice(weakest ? {
      grade: weakest.grade,
      subject: weakest.subject,
      topic: topicValue(weakest.subject, weakest.grade, weakest.topic),
      level: "basic",
      amount: weakest.subject === "vietnamese" ? 4 : 6
    } : {
      grade: prefs.grade || 2,
      subject: prefs.subject || "math",
      topic: prefs.topic || "all",
      level: "basic",
      amount: prefs.subject === "vietnamese" ? 4 : 6
    });
  }

  function selectedAnswer(q, index) {
    if (q.type === "choice") {
      const checked = document.querySelector(`input[name="q-${index}"]:checked`);
      return checked ? checked.value : "";
    }
    const input = document.querySelector(`input[data-question="${index}"]`);
    return input ? input.value : "";
  }

  function gradeQuiz() {
    if (!currentQuestions.length) return;
    let correct = 0;
    currentResults = currentQuestions.map((q, index) => {
      const item = els.questionList.querySelector(`[data-index="${index}"]`);
      const feedback = item.querySelector(".feedback");
      const answer = selectedAnswer(q, index);
      const isCorrect = normalize(answer) === normalize(q.answer);
      item.classList.remove("correct", "incorrect");
      item.classList.add(isCorrect ? "correct" : "incorrect");
      feedback.hidden = false;
      if (isCorrect) {
        correct++;
        feedback.textContent = "Đúng. " + q.explanation;
      } else {
        feedback.textContent = answer
          ? `Chưa đúng. Đáp án: ${q.answer}. ${q.explanation}`
          : `Chưa trả lời. Đáp án: ${q.answer}. ${q.explanation}`;
      }
      return { index, answer, isCorrect, unanswered: !answer };
    });

    const score = Math.round(correct / currentQuestions.length * 100);
    els.scoreBox.hidden = false;
    els.scoreBox.innerHTML = `Kết quả: <strong>${correct}/${currentQuestions.length}</strong> · ${score}%`;
    saveResult(correct, currentQuestions.length, score, currentResults);
    renderAnalysis();
    renderHistory();
    els.scoreBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function saveResult(correct, total, score, results) {
    const state = getState();
    const item = {
      id: Date.now(),
      date: new Date().toISOString(),
      grade: currentConfig.grade,
      subject: currentConfig.subject,
      topic: topicName(currentConfig.subject, currentConfig.grade, currentConfig.topic),
      correct, total, score,
      wrong: results.filter(item => !item.isCorrect).length,
      unanswered: results.filter(item => item.unanswered).length
    };
    state.history = [item, ...(state.history || [])].slice(0, 12);
    saveState(state);
  }

  function renderHistory() {
    const history = getState().history || [];
    els.totalSessions.textContent = history.length;
    els.averageScore.textContent = history.length ? Math.round(history.reduce((sum, item) => sum + item.score, 0) / history.length) + "%" : "—";
    els.bestScore.textContent = history.length ? Math.max(...history.map(item => item.score)) + "%" : "—";
    els.lastSubject.textContent = history.length ? (history[0].subject === "math" ? "Toán" : "Tiếng Việt") : "—";
    els.historyEmpty.hidden = history.length > 0;
    els.historyList.innerHTML = "";

    history.forEach(item => {
      const article = document.createElement("article");
      article.className = "history-item";
      const date = new Date(item.date);
      article.innerHTML = `
        <div class="history-score">${item.score}%</div>
        <div class="history-detail">
          <strong>${item.subject === "math" ? "Toán" : "Tiếng Việt"} lớp ${item.grade} · ${escapeText(item.topic)}</strong>
          <small>Đúng ${item.correct}/${item.total} câu</small>
        </div>
        <time class="history-date" datetime="${item.date}">${date.toLocaleDateString("vi-VN")} · ${date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</time>`;
      els.historyList.appendChild(article);
    });
    renderAchievement(history);
  }

  function renderAchievement(history) {
    const sessions = history.length;
    const best = sessions ? Math.max(...history.map(item => item.score)) : 0;
    let badge = ["🌱", "Mầm non chăm học", "Hoàn thành bài đầu tiên để bắt đầu hành trình."];
    if (sessions >= 1) badge = ["⭐", "Ngôi sao khởi động", `Đã hoàn thành ${sessions} lượt học. Cố gắng giữ nhịp mỗi ngày nhé!`];
    if (sessions >= 3) badge = ["🚀", "Nhà thám hiểm kiến thức", `Đã học ${sessions} lượt và điểm cao nhất là ${best}%.`];
    if (sessions >= 7) badge = ["🏆", "Chiến binh học nhẹ", `Đã bền bỉ hoàn thành ${sessions} lượt học. Điểm cao nhất: ${best}%.`];
    if (sessions >= 10 && best >= 90) badge = ["👑", "Bậc thầy tiến bộ", `Tuyệt vời! ${sessions} lượt học và thành tích tốt nhất ${best}%.`];
    els.achievementIcon.textContent = badge[0];
    els.achievementTitle.textContent = badge[1];
    els.achievementText.textContent = badge[2];
  }

  function toggleAnswers() {
    els.answerKey.hidden = !els.answerKey.hidden;
    els.answerBtn.textContent = els.answerKey.hidden ? "Xem đáp án" : "Ẩn đáp án";
  }

  function resetCoachPanels() {
    els.explainOutput.className = "explain-output empty-panel";
    els.explainOutput.innerHTML = '<span aria-hidden="true">?</span><p>Chọn một câu để xem cách làm từng bước.</p>';
    els.analysisOutput.className = "analysis-output empty-panel";
    els.analysisOutput.innerHTML = '<span aria-hidden="true">◎</span><p>Chấm phiếu này để xem phân tích.</p>';
  }

  function renderExplanation() {
    const index = Number(els.explainQuestion.value);
    const question = currentQuestions[index];
    if (!question) return;
    els.explainOutput.className = "explain-output empty-panel has-content";
    els.explainOutput.innerHTML = `
      <p class="explain-question">Câu ${index + 1}: ${question.prompt}</p>
      <ol class="step-list">
        <li><span>1</span><div><strong>Hiểu yêu cầu</strong><br>Đề đang yêu cầu tìm hoặc chọn một kết quả chính xác.</div></li>
        <li><span>2</span><div><strong>Cách suy nghĩ</strong><br>${escapeText(methodHint(question))}</div></li>
        <li><span>3</span><div><strong>Kiểm tra kết quả</strong><br>Đáp án: <b>${escapeText(question.answer)}</b>. ${escapeText(question.explanation)}</div></li>
      </ol>`;
  }

  function renderAnalysis() {
    if (!currentResults.length || !currentConfig) return;
    const correct = currentResults.filter(item => item.isCorrect).length;
    const unanswered = currentResults.filter(item => item.unanswered).length;
    const incorrect = currentResults.length - correct - unanswered;
    const wrongItems = currentResults.filter(item => !item.isCorrect);
    const subjectLabel = currentConfig.subject === "math" ? "Toán" : "Tiếng Việt";
    const focus = topicName(currentConfig.subject, currentConfig.grade, currentConfig.topic);
    const list = wrongItems.length
      ? `<ol class="wrong-list">${wrongItems.map(item => {
          const q = currentQuestions[item.index];
          return `<li>Câu ${item.index + 1}: ${escapeText(plainText(q.prompt).slice(0, 75))} — <strong>${item.unanswered ? "chưa trả lời" : "đã chọn " + escapeText(item.answer)}</strong>; đáp án ${escapeText(q.answer)}.</li>`;
        }).join("")}</ol>`
      : "<p><strong>Rất tốt!</strong> Chưa phát hiện câu sai trong lần làm này.</p>";
    const advice = wrongItems.length
      ? `Nên luyện lại ${focus} trong 10 phút, xem giải thích các câu ${wrongItems.map(item => item.index + 1).join(", ")} rồi tạo một bộ mới.`
      : `Có thể chuyển sang mức cao hơn hoặc chọn chủ đề khác của ${subjectLabel} lớp ${currentConfig.grade}.`;
    els.analysisOutput.className = "analysis-output empty-panel has-content";
    els.analysisOutput.innerHTML = `
      <div class="analysis-summary">
        <div><strong>${correct}</strong><small>Câu đúng</small></div>
        <div><strong>${incorrect}</strong><small>Câu sai</small></div>
        <div><strong>${unanswered}</strong><small>Bỏ trống</small></div>
      </div>
      ${list}<p class="recommendation"><strong>Gợi ý tiếp theo:</strong> ${escapeText(advice)}</p>`;
  }

  function buildSevenDayPlan() {
    const state = getState();
    const history = state.history || [];
    const weakest = history.length ? [...history].sort((a, b) => a.score - b.score)[0] : null;
    const prefs = currentConfig || state.preferences || {};
    const grade = weakest?.grade || prefs.grade || 2;
    const subject = weakest?.subject || prefs.subject || "math";
    const subjectLabel = subject === "math" ? "Toán" : "Tiếng Việt";
    const otherSubject = subject === "math" ? "Tiếng Việt" : "Toán";
    const focus = weakest?.topic || (prefs.topic ? topicName(subject, grade, prefs.topic) : `Tổng hợp ${subjectLabel} lớp ${grade}`);
    const focusTopic = weakest ? topicValue(subject, grade, weakest.topic) : (prefs.topic || "all");
    const otherSubjectKey = subject === "math" ? "vietnamese" : "math";
    const shortAmount = subject === "vietnamese" ? 4 : 6;
    const otherAmount = otherSubjectKey === "vietnamese" ? 4 : 6;
    const days = [
      { title: `Ngày 1 · Ôn nền tảng ${focus}`, detail: "10 phút · Làm mức cơ bản và tự suy nghĩ trước khi xem đáp án.", config: { grade, subject, topic: focusTopic, level: "basic", amount: shortAmount } },
      { title: `Ngày 2 · Luyện ${otherSubject} lớp ${grade}`, detail: "10 phút · Đổi môn để giữ nhịp học cân bằng.", config: { grade, subject: otherSubjectKey, topic: "all", level: "mixed", amount: otherAmount } },
      { title: `Ngày 3 · Sửa phần còn yếu`, detail: `10 phút · Làm lại chủ đề ${focus} ở mức cơ bản.`, config: { grade, subject, topic: focusTopic, level: "basic", amount: shortAmount } },
      { title: `Ngày 4 · Chinh phục lỗi sai`, detail: "10–15 phút · Làm bộ câu hỏi mới, sau đó xem giải thích từng bước.", config: { grade, subject, topic: focusTopic, level: "mixed", amount: shortAmount } },
      { title: `Ngày 5 · Tăng độ chắc`, detail: `15 phút · Luyện ${subjectLabel} mức vừa sức.`, config: { grade, subject, topic: focusTopic, level: "mixed", amount: shortAmount } },
      { title: `Ngày 6 · Ôn tổng hợp lớp ${grade}`, detail: "10–15 phút · Hoàn thành đủ câu, không bỏ trống.", config: { grade, subject, topic: "all", level: "mixed", amount: shortAmount } },
      { title: `Ngày 7 · Kiểm tra tiến bộ`, detail: `15 phút · Làm mức thử thách và so sánh điểm với đầu tuần.`, config: { grade, subject, topic: focusTopic, level: "challenge", amount: shortAmount } }
    ].map((day, index) => ({ ...day, id: index + 1, done: false }));
    state.plan = { createdAt: new Date().toISOString(), grade, focus, days };
    saveState(state);
    renderPlan();
  }

  function renderPlan() {
    const plan = getState().plan;
    if (!plan?.days?.length) {
      els.planEmpty.hidden = false;
      els.dayGrid.hidden = true;
      els.planProgress.hidden = true;
      return;
    }
    if (plan.days.some(day => !day.config)) {
      buildSevenDayPlan();
      return;
    }
    els.planEmpty.hidden = true;
    els.dayGrid.hidden = false;
    els.planProgress.hidden = false;
    const completed = plan.days.filter(day => day.done).length;
    els.planProgressText.textContent = `Đã hoàn thành ${completed}/7 ngày`;
    els.planEncouragement.textContent = completed === 7 ? "Hoàn thành trọn tuần — rất đáng tự hào!" : completed >= 4 ? "Đã đi hơn nửa chặng đường rồi!" : "Mỗi ngày một chút, tiến bộ thật nhiều!";
    els.planProgressFill.style.width = `${completed / 7 * 100}%`;
    const track = els.planProgress.querySelector("[role=progressbar]");
    track.setAttribute("aria-valuenow", String(completed));
    els.dayGrid.innerHTML = "";
    plan.days.forEach(day => {
      const card = document.createElement("article");
      card.className = "day-card" + (day.done ? " done" : "");
      const label = document.createElement("label");
      label.className = "day-check";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = day.done;
      input.dataset.day = day.id;
      input.setAttribute("aria-label", `Đánh dấu hoàn thành ${day.title}`);
      const text = document.createElement("span");
      text.innerHTML = `<strong>${escapeText(day.title)}</strong><small>${escapeText(day.detail)}</small>`;
      const start = document.createElement("button");
      start.type = "button";
      start.className = "day-start-button";
      start.dataset.startDay = day.id;
      start.textContent = "Luyện ngay →";
      label.append(input);
      card.append(label, text, start);
      els.dayGrid.appendChild(card);
    });
  }

  function stemCategoryName(category) {
    return ({ science: "Khoa học", engineering: "Kĩ thuật", technology: "Công nghệ", environment: "Môi trường" })[category] || "STEM";
  }

  function stemNotes() {
    return getState().stemNotes || {};
  }

  function renderStemProjects() {
    if (!window.HOCNHE_STEM || !els.stemProjectGrid) return;
    const grade = Number(els.stemGrade.value);
    const category = els.stemCategory.value;
    const notes = stemNotes();
    const projects = window.HOCNHE_STEM.filter(project => project.grade === grade && (category === "all" || project.category === category));
    els.stemCount.textContent = `${projects.length} dự án phù hợp`;
    els.stemProjectGrid.replaceChildren(...projects.map(project => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "stem-project";
      button.dataset.stemId = project.id;
      const complete = notes[project.id]?.complete ? '<span class="stem-done-badge">✓ Đã hoàn thành</span>' : "";
      button.innerHTML = `<span class="stem-project-icon" aria-hidden="true">${escapeText(project.icon)}</span><h3>${escapeText(project.title)}</h3><p>${escapeText(project.mission)}</p><footer><span>${escapeText(project.time)} · ${escapeText(project.level)}</span>${complete || "<span>Xem dự án →</span>"}</footer>`;
      return button;
    }));
    if (!projects.length) {
      const empty = document.createElement("p");
      empty.className = "history-empty";
      empty.textContent = "Chưa có dự án ở bộ lọc này. Hãy chọn Tất cả.";
      els.stemProjectGrid.appendChild(empty);
    }
  }

  function openStemProject(id, shouldScroll = true) {
    const project = window.HOCNHE_STEM?.find(item => item.id === id);
    if (!project) return;
    currentStemId = id;
    els.stemDetailIcon.textContent = project.icon;
    els.stemDetailTitle.textContent = project.title;
    els.stemDetailMeta.textContent = `Lớp ${project.grade} · ${stemCategoryName(project.category)} · ${project.time} · ${project.level}`;
    els.stemMission.textContent = project.mission;
    const fillList = (element, items) => element.replaceChildren(...items.map(item => { const li = document.createElement("li"); li.textContent = item; return li; }));
    fillList(els.stemGoals, project.goals);
    fillList(els.stemMaterials, project.materials);
    fillList(els.stemSteps, project.steps);
    fillList(els.stemQuestions, project.questions);
    els.stemObserve.replaceChildren(...project.observe.map((item, index) => {
      const box = document.createElement("div");
      box.innerHTML = `<strong>Quan sát ${index + 1}</strong><span>${escapeText(item)}</span>`;
      return box;
    }));
    els.stemExplain.textContent = project.explain;
    els.stemSafety.textContent = project.safety;
    const note = stemNotes()[id] || {};
    els.stemPrediction.value = note.prediction || "";
    els.stemResult.value = note.result || "";
    els.stemConclusion.value = note.conclusion || "";
    els.stemComplete.checked = Boolean(note.complete);
    els.stemSaveStatus.textContent = note.savedAt ? "Đã tải nhật ký đã lưu." : "";
    els.stemDetail.hidden = false;
    if (shouldScroll) els.stemDetail.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function saveStemJournal() {
    if (!currentStemId) return;
    const state = getState();
    state.stemNotes ||= {};
    state.stemNotes[currentStemId] = {
      prediction: els.stemPrediction.value.trim(), result: els.stemResult.value.trim(),
      conclusion: els.stemConclusion.value.trim(), complete: els.stemComplete.checked,
      savedAt: new Date().toISOString()
    };
    saveState(state);
    els.stemSaveStatus.textContent = "✓ Đã lưu trên thiết bị này";
    renderStemProjects();
  }

  function printStemProject() {
    if (!currentStemId) return;
    document.body.classList.add("print-stem");
    window.print();
    setTimeout(() => document.body.classList.remove("print-stem"), 1000);
  }

  function handleToolClick(tool) {
    if (tool === "math" || tool === "vietnamese") {
      els.subject.value = tool;
      updateTopics();
      updateAmountOptions();
      $("workspace").scrollIntoView({ behavior: "smooth" });
      setTimeout(() => els.grade.focus(), 500);
      return;
    }
    if (tool === "practice") {
      (currentQuestions.length ? els.paperSection : $("workspace")).scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (tool === "explain") {
      $("explain").scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (tool === "analysis") {
      $("analysis").scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (tool === "stem") {
      $("stem").scrollIntoView({ behavior: "smooth" });
      setTimeout(() => els.stemGrade.focus(), 500);
      return;
    }
    $("plan").scrollIntoView({ behavior: "smooth" });
  }

  function requestClear(allData) {
    const run = () => {
      const state = getState();
      if (allData) localStorage.removeItem(STORE_KEY);
      else {
        state.history = [];
        saveState(state);
      }
      renderHistory();
      renderPlan();
    };
    if (typeof els.confirmDialog.showModal === "function") {
      els.confirmDialog.dataset.mode = allData ? "all" : "history";
      els.confirmDialog.showModal();
    } else if (window.confirm("Bạn chắc chắn muốn xóa dữ liệu đã lưu?")) run();
  }

  function restorePreferences() {
    const prefs = getState().preferences || {};
    if (prefs.grade) els.grade.value = prefs.grade;
    if (prefs.subject) els.subject.value = prefs.subject;
    updateTopics(prefs.topic);
    if (prefs.level) els.level.value = prefs.level;
    if (prefs.student) els.studentName.value = prefs.student;
    if (prefs.role) {
      const radio = document.querySelector(`input[name="role"][value="${prefs.role}"]`);
      if (radio) radio.checked = true;
    }
    updateRole();
    if (prefs.amount && [...els.amount.options].some(option => option.value === String(prefs.amount))) {
      els.amount.value = prefs.amount;
    }
  }

  els.grade.addEventListener("change", () => updateTopics());
  els.subject.addEventListener("change", () => { updateTopics(); updateAmountOptions(); });
  document.querySelectorAll('input[name="role"]').forEach(input => input.addEventListener("change", updateRole));
  els.generateBtn.addEventListener("click", () => generate(true));
  els.newVersionBtn.addEventListener("click", () => generate(false));
  els.gradeBtn.addEventListener("click", gradeQuiz);
  els.answerBtn.addEventListener("click", toggleAnswers);
  els.explainBtn.addEventListener("click", renderExplanation);
  els.createPlanBtn.addEventListener("click", buildSevenDayPlan);
  els.stemGrade.addEventListener("change", renderStemProjects);
  els.stemCategory.addEventListener("change", renderStemProjects);
  els.stemProjectGrid.addEventListener("click", event => {
    const button = event.target.closest("button[data-stem-id]");
    if (button) openStemProject(button.dataset.stemId);
  });
  els.saveStemBtn.addEventListener("click", saveStemJournal);
  els.printStemBtn.addEventListener("click", printStemProject);
  window.addEventListener("afterprint", () => document.body.classList.remove("print-stem"));
  els.dayGrid.addEventListener("change", event => {
    const input = event.target.closest("input[data-day]");
    if (!input) return;
    const state = getState();
    const day = state.plan?.days?.find(item => item.id === Number(input.dataset.day));
    if (day) { day.done = input.checked; saveState(state); renderPlan(); }
  });
  els.dayGrid.addEventListener("click", event => {
    const button = event.target.closest("button[data-start-day]");
    if (!button) return;
    const day = getState().plan?.days?.find(item => item.id === Number(button.dataset.startDay));
    if (day?.config) startConfiguredPractice(day.config);
  });
  document.querySelectorAll("[data-tool]").forEach(button => button.addEventListener("click", () => handleToolClick(button.dataset.tool)));
  document.querySelectorAll("[data-quick]").forEach(button => button.addEventListener("click", () => runQuickAction(button.dataset.quick)));
  els.printBtn.addEventListener("click", () => window.print());
  els.clearHistoryBtn.addEventListener("click", () => requestClear(false));
  els.clearDataTop.addEventListener("click", () => requestClear(true));
  els.confirmDialog.addEventListener("close", () => {
    if (els.confirmDialog.returnValue !== "confirm") return;
    const allData = els.confirmDialog.dataset.mode === "all";
    const state = getState();
    if (allData) localStorage.removeItem(STORE_KEY);
    else { state.history = []; saveState(state); }
    renderHistory();
    renderPlan();
    renderStemProjects();
    if (allData) restorePreferences();
  });

  els.year.textContent = new Date().getFullYear();
  restorePreferences();
  renderHistory();
  renderPlan();
  renderStemProjects();
})();
