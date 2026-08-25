(function () {
  "use strict";

  const records = Array.isArray(window.RESEARCH_RECORDS) ? window.RESEARCH_RECORDS : [];

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[character]);
  }

  function icon(name) {
    const icons = {
      arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 7l5 5-5 5"/></svg>',
      project: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5.5"/><circle cx="12" cy="12" r="1.7"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>',
      pdf: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2.8h8l4 4V21H6z"/><path d="M14 2.8V7h4M8.5 15.5h7M8.5 12.5h7"/></svg>',
      back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H6M11 7l-5 5 5 5"/></svg>'
    };
    return icons[name] || icons.arrow;
  }

  const visualParts = {
    resonator: () => '<path d="M58 181h186M396 181h186" class="rv-feed"/><path d="M244 181h48M348 181h48" class="rv-feed"/><path d="M292 181v-49h58v49" class="rv-feed"/><path d="M320 87a94 94 0 1 0 94 94h-54a40 40 0 1 1-40-40z" class="rv-primary"/><path d="M320 116a65 65 0 1 0 65 65h-33a32 32 0 1 1-32-32z" class="rv-secondary"/><path d="M295 181h50" class="rv-hot"/><path d="M470 67v84M456 80h28M456 94h28M456 108h28" class="rv-line"/><text x="320" y="326">CSRR · S21 · εr</text>',
    nonlinear: () => '<path d="M38 206c36 0 45-101 82-101s44 197 81 197 44-158 82-158 44 72 81 72" class="rv-wave"/><path d="M378 275V72M378 275h222" class="rv-axis"/><path d="M395 253h14v-94h-14zM432 253h14v-44h-14zM469 253h14V94h-14zM506 253h14v-68h-14zM543 253h14V127h-14zM580 253h14v-35h-14z" class="rv-bars"/><path d="M391 61h202" class="rv-threshold"/><circle cx="282" cy="144" r="8" class="rv-node"/><text x="488" y="326">STATE · IM3 · IQ</text>',
    reservoir: () => {
      const points = [[106,82],[181,128],[119,207],[216,258],[287,91],[320,185],[391,253],[447,112],[526,178],[510,282]];
      let links = "";
      points.forEach((a,i) => points.forEach((b,j) => { if (j > i && (i * 5 + j * 3) % 7 < 2) links += '<path d="M'+a[0]+' '+a[1]+'L'+b[0]+' '+b[1]+'"/>'; }));
      return '<g class="rv-network">'+links+'</g>'+points.map((p,i)=>'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+(i===5?10:6)+'" class="'+(i===5?'rv-node rv-node-hot':'rv-node')+'"/>').join("")+'<path d="M38 185h57M537 185h65" class="rv-feed"/><text x="320" y="326">MULTIPATH · MEMORY · READOUT</text>';
    },
    aperture: () => {
      let cells = "";
      for (let row=0; row<8; row+=1) {
        for (let col=0; col<12; col+=1) {
          const x=118+col*27, y=72+row*25;
          cells += '<rect x="'+x+'" y="'+y+'" width="18" height="16" class="'+(((row*7+col*3)%11<3)?"rv-cell-hot":"rv-cell")+'"/>';
        }
      }
      return cells+'<path d="M87 290Q320 174 553 290" class="rv-beam"/><circle cx="320" cy="171" r="8" class="rv-node rv-node-hot"/><circle cx="320" cy="171" r="42" class="rv-ring"/><circle cx="320" cy="171" r="82" class="rv-ring rv-faint"/><text x="320" y="326">WRITE · RECALL · RECONFIGURE</text>';
    },
    lpda: () => {
      let elements="";
      for(let i=0;i<18;i+=1){ const x=106+i*26, h=145*Math.pow(.91,i)+16; elements+='<path d="M'+x+' '+(181-h/2)+'v'+h+'"/>'; }
      return '<g class="rv-antenna"><path d="M76 174L560 190M76 187L560 170"/>'+elements+'</g><path d="M560 180h43" class="rv-feed"/><path d="M77 180H39" class="rv-feed"/><path d="M66 105Q10 180 66 255M84 124Q45 180 84 236" class="rv-beam"/><text x="320" y="326">2.4–5.8 GHz · TWIN BOOM</text>';
    },
    vivaldi: () => '<path d="M88 179h139C318 179 351 79 552 62C414 124 383 171 365 180C383 189 414 236 552 298C351 281 318 181 227 181H88z" class="rv-vivaldi"/><path d="M38 180h188" class="rv-feed"/><path d="M522 92Q603 180 522 268M497 118Q554 180 497 242" class="rv-beam"/><path d="M117 143v74M139 153v54" class="rv-line"/><text x="320" y="326">2–6 GHz · DIFFERENTIAL APERTURE</text>'
  };

  function visual(record, compact) {
    const suffix = record.slug + (compact ? "-card" : "-detail");
    const content = (visualParts[record.visual] || visualParts.resonator)();
    return '<svg class="research-visual'+(compact ? " is-compact" : "")+'" viewBox="0 0 640 360" role="img" aria-label="Technical illustration for '+escapeHtml(record.shortTitle)+'">'+
      '<defs><linearGradient id="rbg-'+suffix+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2c3621"/><stop offset=".55" stop-color="#11170e"/><stop offset="1" stop-color="#070b06"/></linearGradient>'+
      '<pattern id="rgrid-'+suffix+'" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="rgba(177,194,133,.075)" stroke-width="1"/></pattern></defs>'+
      '<rect width="640" height="360" fill="url(#rbg-'+suffix+')"/><rect width="640" height="360" fill="url(#rgrid-'+suffix+')"/>'+
      '<circle cx="320" cy="180" r="146" class="rv-ring rv-backdrop"/><circle cx="320" cy="180" r="98" class="rv-ring rv-backdrop"/>'+
      '<path d="M0 180h640M320 0v360" class="rv-cross"/><g>'+content+'</g>'+
      '<path d="M18 42V18h24M598 18h24v24M18 318v24h24M598 342h24v-24" class="rv-corners"/>'+
      '<text x="24" y="33" class="rv-id">'+escapeHtml(record.id)+' · '+escapeHtml(record.typeLabel.toUpperCase())+'</text></svg>';
  }

  function recordUrl(record) {
    return "/thesis-researches/" + record.slug + "/";
  }

  function card(record) {
    return '<article class="research-card" data-type="'+escapeHtml(record.typeKey)+'">'+
      '<a href="'+recordUrl(record)+'" class="research-card-link" aria-label="Read '+escapeHtml(record.shortTitle)+'">'+
        '<figure>'+visual(record,true)+'</figure>'+
        '<div class="research-card-body">'+
          '<div class="research-card-meta"><span>'+escapeHtml(record.id)+'</span><span>'+escapeHtml(record.date)+'</span></div>'+
          '<p class="research-card-type">'+escapeHtml(record.typeLabel)+'</p>'+
          '<h3>'+escapeHtml(record.title)+'</h3>'+
          '<p class="research-card-subtitle">'+escapeHtml(record.subtitle)+'</p>'+
          '<p class="research-card-summary">'+escapeHtml(record.summary)+'</p>'+
          '<div class="research-card-tags">'+record.keywords.slice(0,3).map((tag)=>'<span>'+escapeHtml(tag)+'</span>').join("")+'</div>'+
          '<div class="research-card-footer"><span>'+escapeHtml(record.category)+'</span><b>Read publication '+icon("arrow")+'</b></div>'+
        '</div>'+
      '</a>'+
    '</article>';
  }

  function setCount(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = String(value).padStart(2, "0");
  }

  function renderIndex() {
    const grid = document.getElementById("research-grid");
    const filters = document.getElementById("research-filters");
    if (!grid || !filters) return;

    setCount("visible-research-count", records.length);
    setCount("linked-project-count", records.filter((record)=>record.projectUrl).length);
    setCount("research-domain-count", new Set(records.map((record)=>record.domain)).size);
    grid.innerHTML = records.map(card).join("");

    filters.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-filter]");
      if (!button) return;
      const filter = button.dataset.filter;
      filters.querySelectorAll("button").forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      grid.querySelectorAll(".research-card").forEach((item) => {
        item.hidden = filter !== "all" && item.dataset.type !== filter;
      });
      setCount("visible-research-count", grid.querySelectorAll(".research-card:not([hidden])").length);
    });
  }

  function sectionLabel(number, title) {
    return '<div class="research-section-label"><span>'+number+'</span><h2>'+escapeHtml(title)+'</h2></div>';
  }

  function methodsMarkup(items) {
    return items.map((item,index)=>'<article class="research-method"><span>M'+String(index+1).padStart(2,"0")+'</span><h3>'+escapeHtml(item.title)+'</h3><p>'+escapeHtml(item.text)+'</p></article>').join("");
  }

  function numberedMarkup(items) {
    return items.map((item,index)=>'<li><span>'+String(index+1).padStart(2,"0")+'</span><p>'+escapeHtml(item)+'</p></li>').join("");
  }

  function factsMarkup(record) {
    const facts = [
      ["Document",record.typeLabel],
      ["Published",record.date],
      ["Evidence",record.evidenceType],
      ["Domain",record.category]
    ];
    if (record.pages) facts.push(["Length",record.pages]);
    if (record.language) facts.push(["Language",record.language]);
    return facts.map((fact)=>'<div><small>'+escapeHtml(fact[0])+'</small><strong>'+escapeHtml(fact[1])+'</strong></div>').join("");
  }

  function documentMarkup(record, readyOverride) {
    const ready = readyOverride === true || record.pdfReady === true;
    if (ready) {
      return '<section class="research-section research-document" id="document">'+
        sectionLabel("08","Read the Original Document")+
        '<div class="document-toolbar"><div><strong>'+escapeHtml(record.shortTitle)+'</strong><span>Permanent PDF edition</span></div>'+
        '<div><a href="'+escapeHtml(record.pdfPath)+'" target="_blank" rel="noopener">'+icon("pdf")+'Open PDF</a><a href="'+escapeHtml(record.pdfPath)+'" download>'+icon("arrow")+'Download</a></div></div>'+
        '<object class="pdf-reader" data="'+escapeHtml(record.pdfPath)+'#view=FitH" type="application/pdf"><p>Your browser cannot display the embedded document. <a href="'+escapeHtml(record.pdfPath)+'">Open the PDF directly.</a></p></object>'+
      '</section>';
    }
    return '<section class="research-section research-document research-document--pending" id="document">'+
      sectionLabel("08","Original PDF Edition")+
      '<div class="document-pending"><span>'+icon("pdf")+'</span><div><strong>Permanent document slot prepared</strong><p>The structured web edition is available above. The original PDF will be activated here when its binary archive is transferred to the public repository.</p></div><em>PDF archive pending</em></div>'+
    '</section>';
  }

  function activateDocument(record) {
    if (record.pdfReady !== "auto" || typeof window.fetch !== "function") return;
    window.fetch(record.pdfPath, { method: "HEAD", cache: "no-store" })
      .then((response) => {
        if (!response.ok) return;
        const section = document.getElementById("document");
        if (section) section.outerHTML = documentMarkup(record, true);
      })
      .catch(() => {});
  }

  function renderDetail() {
    const root = document.getElementById("research-detail");
    const slug = document.body.dataset.research;
    if (!root || !slug) return;
    const record = records.find((item)=>item.slug===slug);
    if (!record) {
      root.innerHTML='<section class="research-error"><p>Research record not found.</p><a href="/thesis-researches/">Return to the archive</a></section>';
      return;
    }

    document.title=record.shortTitle+" | Thesis and Researches — Cem Sondur";
    const description=document.querySelector('meta[name="description"]');
    if(description) description.setAttribute("content",record.summary);

    const current=records.indexOf(record);
    const previous=records[(current-1+records.length)%records.length];
    const next=records[(current+1)%records.length];

    root.innerHTML=
      '<nav class="research-breadcrumb" aria-label="Breadcrumb"><a href="/thesis-researches/">Thesis and Researches</a><span>/</span><span>'+escapeHtml(record.id)+'</span></nav>'+
      '<article class="research-detail-hero">'+
        '<div class="research-detail-copy"><p class="research-kicker">'+escapeHtml(record.typeLabel)+' · '+escapeHtml(record.category)+'</p><h2>'+escapeHtml(record.title)+'</h2><p class="research-detail-subtitle">'+escapeHtml(record.subtitle)+'</p><p class="research-lead">'+escapeHtml(record.summary)+'</p>'+
        '<div class="research-actions"><a class="research-action research-action--primary" href="#abstract">'+icon("arrow")+'Read web edition</a><a class="research-action" href="'+escapeHtml(record.projectUrl)+'">'+icon("project")+'Project details</a></div>'+
        '<div class="research-status"><span>'+escapeHtml(record.date)+'</span><span>'+escapeHtml(record.evidenceType)+'</span></div></div>'+
        '<figure>'+visual(record,false)+'</figure>'+
      '</article>'+
      '<section class="research-facts" aria-label="Publication facts">'+factsMarkup(record)+'</section>'+
      '<nav class="research-toc" aria-label="Research record index"><span>Publication record</span><div>'+
        [["abstract","Abstract"],["frame","Research frame"],["model","Core model"],["methods","Methodology"],["contributions","Contributions"],["evidence","Evidence"],["boundaries","Boundaries"],["document","PDF"]].map((item,index)=>'<a href="#'+item[0]+'"><b>'+String(index+1).padStart(2,"0")+'</b>'+item[1]+'</a>').join("")+
      '</div></nav>'+
      '<section class="research-section" id="abstract">'+sectionLabel("01","Research Abstract")+'<div class="research-prose">'+record.abstract.map((paragraph)=>'<p>'+escapeHtml(paragraph)+'</p>').join("")+'</div></section>'+
      '<section class="research-section research-split" id="frame"><article>'+sectionLabel("02","Research Question")+'<p>'+escapeHtml(record.question)+'</p></article><article>'+sectionLabel("03","Research Objective")+'<p>'+escapeHtml(record.objective)+'</p></article></section>'+
      '<section class="research-model" id="model"><span>CORE MATHEMATICAL MODEL</span><code>'+escapeHtml(record.coreModel)+'</code><p>'+escapeHtml(record.modelExplanation)+'</p></section>'+
      '<section class="research-section" id="methods">'+sectionLabel("04","Methodology")+'<div class="research-method-grid">'+methodsMarkup(record.methods)+'</div></section>'+
      '<section class="research-section" id="contributions">'+sectionLabel("05","Original Contributions")+'<ol class="research-numbered">'+numberedMarkup(record.contributions)+'</ol></section>'+
      '<section class="research-section" id="evidence">'+sectionLabel("06","Verified Evidence")+'<ol class="research-numbered research-numbered--evidence">'+numberedMarkup(record.evidence)+'</ol></section>'+
      '<section class="research-section" id="boundaries">'+sectionLabel("07","Claim Boundary & Next Work")+'<ol class="research-numbered research-numbered--boundary">'+numberedMarkup(record.boundaries)+'</ol></section>'+
      '<aside class="project-bridge"><div><span>RELATED ENGINEERING RECORD</span><h2>'+escapeHtml(record.projectTitle)+'</h2><p>Implementation architecture, technical decisions, validation details, engineering trade-offs, and the project repository are documented in the Projects section.</p></div><a href="'+escapeHtml(record.projectUrl)+'">'+icon("project")+'Open project details</a></aside>'+
      documentMarkup(record)+
      '<section class="research-keywords"><span>Indexed terms</span><div>'+record.keywords.map((item)=>'<b>'+escapeHtml(item)+'</b>').join("")+'</div></section>'+
      '<nav class="research-pagination" aria-label="Publication pagination"><a href="'+recordUrl(previous)+'"><small>Previous publication</small><strong>'+escapeHtml(previous.shortTitle)+'</strong></a><a href="'+recordUrl(next)+'"><small>Next publication</small><strong>'+escapeHtml(next.shortTitle)+'</strong></a></nav>';
    activateDocument(record);
  }

  renderIndex();
  renderDetail();
})();
