(function () {
  "use strict";

  if (!document.body.classList.contains("project-detail-page")) return;

  const VERSION = "20260826-2";
  const KATEX_VERSION = "0.16.11";

  function addStylesheet(href, id) {
    if (id && document.getElementById(id)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    if (id) link.id = id;
    document.head.appendChild(link);
  }

  function loadScript(src, id) {
    return new Promise((resolve, reject) => {
      const existing = id ? document.getElementById(id) : null;
      if (existing) {
        if (existing.dataset.loaded === "true") resolve();
        else {
          existing.addEventListener("load", resolve, { once: true });
          existing.addEventListener("error", reject, { once: true });
        }
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.defer = true;
      if (id) script.id = id;
      script.addEventListener("load", () => {
        script.dataset.loaded = "true";
        resolve();
      }, { once: true });
      script.addEventListener("error", reject, { once: true });
      document.head.appendChild(script);
    });
  }

  function renderLatex(element, latex, displayMode) {
    if (!element) return;
    element.dataset.latex = latex;
    element.setAttribute("aria-label", latex);
    if (window.katex && typeof window.katex.render === "function") {
      try {
        window.katex.render(latex, element, {
          displayMode: displayMode !== false,
          throwOnError: false,
          strict: "ignore",
          output: "htmlAndMathml"
        });
        return;
      } catch (error) {
        console.warn("KaTeX render fallback:", error);
      }
    }
    element.textContent = latex;
  }

  function makeMathBlock(latex, className) {
    const block = document.createElement("div");
    block.className = className;
    renderLatex(block, latex, true);
    return block;
  }

  function contextCard(title, items) {
    const article = document.createElement("article");
    article.className = "math-context-card";
    const heading = document.createElement("h3");
    heading.textContent = title;
    const list = document.createElement("ul");
    items.filter(Boolean).forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
    article.append(heading, list);
    return article;
  }

  function addNote(dl, label, text, key) {
    if (!dl || !text || dl.querySelector(`[data-math-note="${key}"]`)) return;
    const row = document.createElement("div");
    row.dataset.mathNote = key;
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = label;
    dd.textContent = text;
    row.append(dt, dd);
    dl.appendChild(row);
  }

  function noteRow(label, text) {
    const row = document.createElement("div");
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = label;
    dd.textContent = text;
    row.append(dt, dd);
    return row;
  }

  function advancedCard(item, index) {
    const card = document.createElement("article");
    card.className = "theory-card theory-card--advanced";

    const header = document.createElement("header");
    const badge = document.createElement("span");
    const title = document.createElement("h3");
    badge.textContent = `A${String(index + 1).padStart(2, "0")}`;
    title.textContent = item.title;
    header.append(badge, title);

    const equation = makeMathBlock(item.latex, "math-display math-display--theory");
    const notes = document.createElement("dl");
    notes.className = "theory-notes";
    notes.append(
      noteRow("Variables / conditions", item.variables),
      noteRow("Derived meaning", item.meaning),
      noteRow("Verification gate", item.verification)
    );

    card.append(header, equation, notes);
    return card;
  }

  function appendAdvancedDepth(mathSection, theoryGrid, slug) {
    const depthItems = window.PROJECT_MATH_DEPTH && window.PROJECT_MATH_DEPTH[slug];
    if (!Array.isArray(depthItems) || !depthItems.length || mathSection.querySelector(".advanced-math-block")) return;

    const block = document.createElement("div");
    block.className = "advanced-math-block";

    const heading = document.createElement("div");
    heading.className = "advanced-math-heading";
    const title = document.createElement("h3");
    title.textContent = "Derived Relationships & Engineering Sensitivity";
    const intro = document.createElement("p");
    intro.textContent = "Additional derivations expose sensitivity, identifiability, uncertainty, physical limits, or implementation loss beyond the primary governing equations.";
    heading.append(title, intro);

    const grid = document.createElement("div");
    grid.className = "advanced-theory-grid";
    depthItems.forEach((item, index) => grid.appendChild(advancedCard(item, index)));

    block.append(heading, grid);
    theoryGrid.insertAdjacentElement("afterend", block);
  }

  function enhanceProjectMath() {
    const slug = document.body.dataset.project;
    const mathRecord = window.PROJECT_MATH && window.PROJECT_MATH[slug];
    const project = Array.isArray(window.PROJECTS) ? window.PROJECTS.find((item) => item.slug === slug) : null;
    const technical = window.PROJECT_TECHNICAL && window.PROJECT_TECHNICAL[slug];
    if (!mathRecord || !project || !technical) return;

    const formulaPanel = document.querySelector(".formula-panel");
    if (formulaPanel && mathRecord.c) {
      formulaPanel.classList.add("math-enhanced");
      const label = formulaPanel.querySelector(":scope > span");
      if (label) label.textContent = "GOVERNING RELATION";
      const oldCode = formulaPanel.querySelector("code");
      if (oldCode) oldCode.replaceWith(makeMathBlock(mathRecord.c, "math-display math-display--core"));
    }

    const mathSection = document.getElementById("mathematics");
    const theoryGrid = mathSection && mathSection.querySelector(".theory-grid");
    if (!mathSection || !theoryGrid) return;

    const sectionIntro = mathSection.querySelector(".section-intro");
    if (sectionIntro) {
      sectionIntro.textContent = "This section states the governing mathematical model, defines every important variable, explains the physical interpretation, and ties each relationship to an explicit validity domain and verification gate. Equations are evidence only when their observables close against independent simulation, holdout data, or calibrated measurement.";
    }

    if (!mathSection.querySelector(".math-context-grid")) {
      const context = document.createElement("div");
      context.className = "math-context-grid";

      const scopeItems = (project.limitations || []).slice(0, 3);
      const workflow = Array.isArray(technical.workflow) ? technical.workflow : [];
      const verificationItems = workflow.slice(Math.max(0, workflow.length - 3)).map((item) => `${item.title}: ${item.text}`);

      context.append(
        contextCard("Model scope & validity", scopeItems),
        contextCard("Verification protocol", verificationItems)
      );

      if (sectionIntro && sectionIntro.nextSibling) sectionIntro.parentNode.insertBefore(context, sectionIntro.nextSibling);
      else theoryGrid.parentNode.insertBefore(context, theoryGrid);
    }

    const cards = Array.from(theoryGrid.querySelectorAll(".theory-card"));
    cards.forEach((card, index) => {
      const latex = Array.isArray(mathRecord.e) ? mathRecord.e[index] : null;
      if (latex) {
        const oldCode = card.querySelector(":scope > code");
        if (oldCode) oldCode.replaceWith(makeMathBlock(latex, "math-display math-display--theory"));
      }

      const notes = card.querySelector(".theory-notes");
      const source = Array.isArray(technical.theory) ? technical.theory[index] : null;
      if (notes && source) {
        addNote(
          notes,
          "Validity / assumption",
          `This relationship is interpreted only inside the project's stated model, calibration, geometry, bandwidth, numerical, and measurement boundaries; ${project.limitations && project.limitations[0] ? project.limitations[0] : "transfer outside the verified domain requires revalidation."}`,
          "validity"
        );
        addNote(
          notes,
          "Verification gate",
          "The equation is not treated as evidence by itself: the associated observable must close against an independent simulation, holdout dataset, calibrated measurement, or stated acceptance gate before the engineering claim is accepted.",
          "verification"
        );
      }
    });

    appendAdvancedDepth(mathSection, theoryGrid, slug);

    const rigor = document.createElement("aside");
    rigor.className = "math-rigor-panel";
    rigor.innerHTML = "<strong>MATHEMATICAL EVIDENCE DISCIPLINE</strong><span>Units and reference planes · limiting-case checks · sensitivity and conditioning · uncertainty · independent holdout or calibrated measurement closure</span>";
    if (!mathSection.querySelector(".math-rigor-panel")) {
      const advanced = mathSection.querySelector(".advanced-math-block");
      (advanced || theoryGrid).insertAdjacentElement("afterend", rigor);
    }

    mathSection.classList.add("math-foundation--enhanced");
  }

  addStylesheet(`/assets/css/projects-math.css?v=${VERSION}`, "projects-math-css");
  addStylesheet(`/assets/css/projects-math-depth.css?v=${VERSION}`, "projects-math-depth-css");
  addStylesheet(`https://cdn.jsdelivr.net/npm/katex@${KATEX_VERSION}/dist/katex.min.css`, "katex-css");

  const dataPromise = window.PROJECT_MATH
    ? Promise.resolve()
    : loadScript(`/assets/js/projects-math.js?v=${VERSION}`, "projects-math-data");

  const depthPromise = window.PROJECT_MATH_DEPTH
    ? Promise.resolve()
    : loadScript(`/assets/js/projects-math-depth.js?v=${VERSION}`, "projects-math-depth-data");

  const katexPromise = window.katex
    ? Promise.resolve()
    : loadScript(`https://cdn.jsdelivr.net/npm/katex@${KATEX_VERSION}/dist/katex.min.js`, "katex-js");

  Promise.allSettled([dataPromise, depthPromise, katexPromise]).then(enhanceProjectMath);
})();
