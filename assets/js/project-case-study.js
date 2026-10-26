/* Case-study reorganization: no equations, evidence or source content discarded. */
(function () {
 "use strict";
 const root=document.getElementById("project-detail");
 if(!root||!document.body.classList.contains("project-detail-page"))return;
 const slug=document.body.dataset.project||"";
 const project=(window.PROJECTS||[]).find(p=>p.slug===slug);
 const guide=(window.PROJECT_CASE_GUIDES||{})[slug];
 if(!project||!guide||root.dataset.caseStudyReady==="true")return;
 const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const create=(tag,cls,html)=>{
   const e=document.createElement(tag);e.className=cls;
   if(html!==undefined)e.innerHTML=html;
   return e;
 };
 const chapter=(num,id,title,subtitle)=>{
   const outer=create("section","case-chapter");
   outer.id=id;outer.setAttribute("aria-labelledby",id+"-title");
   outer.innerHTML=`<header class="case-chapter__header">
     <span class="case-chapter__number">${String(num).padStart(2,"0")}</span>
     <div><span class="case-chapter__eyebrow">Engineering case study</span>
     <h2 id="${id}-title">${esc(title)}</h2><p>${esc(subtitle)}</p></div>
   </header>`;
   const body=create("div","case-chapter__body");outer.appendChild(body);
   return {outer,body};
 };
 const move=(parent,selector)=>{
   const e=root.querySelector(selector);
   if(e){e.classList.add("case-record-subsection");parent.appendChild(e);}
 };
 const detail=(title,note,selectors)=>{
   const d=create("details","case-disclosure");
   d.appendChild(create("summary","case-disclosure__summary",
     `<span>${esc(title)}</span><small>${esc(note)}</small><b aria-hidden="true">+</b>`));
   const body=create("div","case-disclosure__body");
   selectors.forEach(q=>move(body,q));
   d.appendChild(body);
   return d;
 };
 const old=root.querySelector(".technical-index");
 if(!old)return;
 const links=[
  ["case-overview","Overview"],["case-principles","Principles & theory"],
  ["case-system","Architecture"],["case-method","Methodology"],
  ["case-evidence","Results & validation"],["case-appendix","Technical archive"]];
 const nav=create("nav","case-index",
   `<div class="case-index__identity"><span>PROJECT RECORD</span><strong>${esc(project.id)}</strong></div>
   <div class="case-index__links">${links.map((a,i)=>
    `<a href="#${a[0]}"><span>${String(i+1).padStart(2,"0")}</span>${esc(a[1])}</a>`).join("")}</div>`);
 nav.setAttribute("aria-label","Engineering case-study sections");
 old.replaceWith(nav);

 const overview=chapter(1,"case-overview","Project overview",
   "The problem, objective, engineering idea and what the current record demonstrates.");
 overview.body.appendChild(create("div","case-question",
   `<span>Core research question</span><h3>${esc(guide.question)}</h3><p>${esc(guide.plain)}</p>`));
 move(overview.body,"#scope");

 const theory=chapter(2,"case-principles","Physical principles & mathematics",
   "The intuitive mechanism, complete physical models, variables, derivations and assumptions.");
 theory.body.appendChild(create("div","case-concept",
   `<div><span>Physical intuition</span><p>${esc(guide.math)}</p></div>
      <aside><strong>How to read the equations</strong><p>Start from the governing law; check each symbol, modeling assumption and verification condition. The original mathematical dossier below is preserved in full.</p></aside>`));
 move(theory.body,".formula-panel");
 move(theory.body,"#mathematics");

 const system=chapter(3,"case-system","System architecture",
   "A signal, field, data or energy path followed by the component-level architecture.");
 system.body.appendChild(create("ol","case-flow",guide.steps.map((step,i)=>
   `<li><span>${String(i+1).padStart(2,"0")}</span><p>${esc(step)}</p></li>`).join("")));
 move(system.body,"#architecture");

 const method=chapter(4,"case-method","Engineering methodology",
   "The implementation approach, execution sequence and design trade-offs.");
 move(method.body,"#methodology");
 method.body.appendChild(detail("Implementation record and engineering workflow",
   "Full execution notes and step-by-step work",["#execution","#workflow"]));
 method.body.appendChild(detail("Engineering decisions & trade-offs",
   "Rationale, limitations and alternatives",["#decisions"]));

 const evidence=chapter(5,"case-evidence","Results & validation",
   "A transparent separation of design targets, models, software and hardware evidence.");
 evidence.body.appendChild(create("div","case-evidence",
   `<div><span>Evidence classification</span><strong>${esc(guide.evidence)}</strong></div>
      <div><span>Interpretation boundary</span><p>${esc(guide.caution)}</p></div>`));
 move(evidence.body,"#validation");
 move(evidence.body,"#boundaries");

 const archive=chapter(6,"case-appendix","Technical archive & reproducibility",
   "Tools, existing detailed derivations, source record and remaining verification gates.");
 archive.body.appendChild(create("p","case-archive-note",
   "All existing theoretical equations, symbol definitions, expanded mathematical derivations, engineering procedures, decisions, numerical findings and limitations remain part of this record. A design target or simulation must not be read as a measured result."));
 move(archive.body,"#stack");
 if(project.github) archive.body.appendChild(create("div","case-source",
   `<div><strong>Source repository</strong><p>Implementation files and available technical artifacts.</p></div>
     <a href="${esc(project.github)}" target="_blank" rel="noopener noreferrer">Open repository ↗</a>`));
 else archive.body.appendChild(create("div","case-source",
   "<div><strong>Public repository</strong><p>No public source link is recorded for this project; availability is not implied.</p></div>"));

 let cursor=nav;
 for(const item of [overview,theory,system,method,evidence,archive]){
   cursor.after(item.outer);cursor=item.outer;
 }
 root.dataset.caseStudyReady="true";
})();
