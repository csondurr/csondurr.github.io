(function () {
  "use strict";

  const projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
  const technicalRecords = window.PROJECT_TECHNICAL && typeof window.PROJECT_TECHNICAL === "object" ? window.PROJECT_TECHNICAL : {};

  const PROJECT_MEDIA = Object.freeze({
    "engram": {
      src: "https://raw.githubusercontent.com/csondurr/ENGRAM/main/results/figures/06_near_field_focus.png",
      alt: "ENGRAM near-field focusing result from the project simulation archive",
      credit: "Cem Sondur · ENGRAM project archive",
      source: "https://github.com/csondurr/ENGRAM/blob/main/results/figures/06_near_field_focus.png",
      position: "center"
    },
    "genesis-dsp": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Spectrum_analyzer_at_868.8_MHz.jpg?width=1400",
      alt: "A laboratory spectrum analyzer displaying a measured radio-frequency signal",
      credit: "Giacomo Alessandroni · Wikimedia Commons · CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:Spectrum_analyzer_at_868.8_MHz.jpg",
      position: "center"
    },
    "microwave-signal-loss-prediction": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Microwave_tower_silhouette.jpg?width=1400",
      alt: "A real microwave telecommunications relay tower with directional antennas",
      credit: "Tony Wills · Wikimedia Commons",
      source: "https://commons.wikimedia.org/wiki/File:Microwave_tower_silhouette.jpg",
      position: "center 42%"
    },
    "csrr-microwave-dielectric-sensor": {
      src: "https://www.mdpi.com/sensors/sensors-24-01840/article_deploy/html/images/sensors-24-01840-g004.png",
      alt: "Fabricated complementary split-ring resonator microwave sensor connected through SMA ports",
      credit: "Sensors 2024 · MDPI · CC BY 4.0",
      source: "https://www.mdpi.com/1424-8220/24/6/1840",
      position: "center"
    },
    "gps-receiver-rtl-sdr": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Rtl-sdr.jpg?width=1400",
      alt: "RTL-SDR receiver hardware with RF adapters",
      credit: "Joeceads · Wikimedia Commons",
      source: "https://commons.wikimedia.org/wiki/File:Rtl-sdr.jpg",
      position: "center"
    },
    "luxmeter": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Arduino_Uno%2C_Breadboard%2C_and_5DOF_Sensor_on_Seesaw.jpg?width=1400",
      alt: "Arduino Uno instrumentation prototype with a wired sensor and breadboard",
      credit: "Shatton8111 · Wikimedia Commons · CC BY-SA 3.0",
      source: "https://commons.wikimedia.org/wiki/File:Arduino_Uno,_Breadboard,_and_5DOF_Sensor_on_Seesaw.jpg",
      position: "center"
    },
    "100wpa": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/QCPM8893_02.jpg?width=1400",
      alt: "A real RF power amplifier module photographed at component level",
      credit: "Mister rf · Wikimedia Commons · CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:QCPM8893_02.jpg",
      position: "center"
    },
    "cem-computable-electromagnetic-medium": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Split-ring_resonator_array_10K_sq_nm.jpg?width=1400",
      alt: "Physical split-ring resonator metamaterial array constructed on fiberglass circuit boards",
      credit: "NASA Glenn Research · Public domain",
      source: "https://commons.wikimedia.org/wiki/File:Split-ring_resonator_array_10K_sq_nm.jpg",
      position: "center"
    },
    "entropy-vna": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Netzwerkanalysator_Bode_100.jpg?width=1400",
      alt: "Portable vector network analyzer configured for an RF measurement",
      credit: "Bernhard Baumgartner / OMICRON Lab · CC BY 3.0",
      source: "https://commons.wikimedia.org/wiki/File:Netzwerkanalysator_Bode_100.jpg",
      position: "center"
    },
    "lpda-antenna": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/LPDA-Antenna.jpg?width=1400",
      alt: "Physical log-periodic dipole array antenna used for wideband RF work",
      credit: "BAZ Antennas · Wikimedia Commons · CC BY-SA 3.0",
      source: "https://commons.wikimedia.org/wiki/File:LPDA-Antenna.jpg",
      position: "center"
    },
    "morpheus": {
      src: "https://raw.githubusercontent.com/csondurr/MORPHEUS/main/results/final_plots/error_cube_projection.png",
      alt: "MORPHEUS electromagnetic identity error-cube projection from the project results",
      credit: "Cem Sondur · MORPHEUS project archive",
      source: "https://github.com/csondurr/MORPHEUS/blob/main/results/final_plots/error_cube_projection.png",
      position: "center"
    },
    "rf-filter-ai-synthesizer": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Microstrip_Hairpin_Filter_And_Low_Pass_Stub_Filter.jpg?width=1400",
      alt: "Fabricated microstrip hairpin and low-pass stub filters inside RF test equipment",
      credit: "Binarysequence · Wikimedia Commons",
      source: "https://commons.wikimedia.org/wiki/File:Microstrip_Hairpin_Filter_And_Low_Pass_Stub_Filter.jpg",
      position: "center"
    },
    "rfshield-lpf": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Microstrip_Low_Pass_Bowtie_Stub_Filter_%28vertical%29.jpg?width=1400",
      alt: "Fabricated microstrip low-pass bow-tie stub filter on a printed circuit board",
      credit: "Binarysequence · Wikimedia Commons · CC BY-SA 3.0",
      source: "https://commons.wikimedia.org/wiki/File:Microstrip_Low_Pass_Bowtie_Stub_Filter_(vertical).jpg",
      position: "center"
    },
    "spectra-stm32": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/STM32F4_Discovery_%289067300323%29.jpg?width=1400",
      alt: "STM32F4 Discovery embedded development board photographed in detail",
      credit: "Teardown Central · Wikimedia Commons · CC BY-SA 2.0",
      source: "https://commons.wikimedia.org/wiki/File:STM32F4_Discovery_(9067300323).jpg",
      position: "center"
    },
    "solar-power-generation": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Nellis_AFB_Solar_panels.jpg?width=1400",
      alt: "Large photovoltaic solar array installed at Nellis Air Force Base",
      credit: "United States Air Force · Public domain",
      source: "https://commons.wikimedia.org/wiki/File:Nellis_AFB_Solar_panels.jpg",
      position: "center"
    },
    "vanta": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/DVB-T_USB_dongle_with_RTL2832U_and_R820T.jpg?width=1400",
      alt: "Internal RF signal-chain hardware of an RTL2832U and R820T software-defined radio receiver",
      credit: "Dsimic · Wikimedia Commons",
      source: "https://commons.wikimedia.org/wiki/File:DVB-T_USB_dongle_with_RTL2832U_and_R820T.jpg",
      position: "center"
    },
    "vivaldi-antenna-balun": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/PCB_Vivaldi_Antenna.jpg?width=1400",
      alt: "Fabricated printed-circuit Vivaldi antenna with coaxial feed and SMA connector",
      credit: "FarField · Wikimedia Commons · CC BY-SA 4.0",
      source: "https://commons.wikimedia.org/wiki/File:PCB_Vivaldi_Antenna.jpg",
      position: "center"
    }
  });

  const svgParts = {
    aperture: () => {
      let cells = "";
      for (let row = 0; row < 8; row += 1) {
        for (let col = 0; col < 12; col += 1) {
          const x = 118 + col * 27;
          const y = 74 + row * 25;
          const active = (row * 7 + col * 3) % 11 < 3;
          cells += `<rect x="${x}" y="${y}" width="18" height="16" rx="1" class="${active ? "v-hot" : "v-line"}"/>`;
        }
      }
      return `${cells}<path d="M92 287 Q320 186 548 287" class="v-beam"/><circle cx="320" cy="182" r="7" class="v-node"/><circle cx="320" cy="182" r="39" class="v-ring"/><circle cx="320" cy="182" r="78" class="v-ring faint"/>`;
    },
    dsp: () => `<path d="M56 196 C88 196 91 98 122 98s36 194 68 194 38-154 68-154 38 96 69 96 38-151 70-151 35 208 68 208 37-115 68-115 37 20 70 20" class="v-signal"/><g class="v-blocks"><rect x="104" y="42" width="96" height="42"/><rect x="272" y="42" width="96" height="42"/><rect x="440" y="42" width="96" height="42"/><path d="M200 63h72M368 63h72"/></g><circle cx="122" cy="98" r="6" class="v-node"/><circle cx="258" cy="138" r="6" class="v-node"/><circle cx="397" cy="83" r="6" class="v-node"/><circle cx="533" cy="176" r="6" class="v-node"/>`,
    propagation: () => `<path d="M84 275h116l-19-23h-79zM118 252l24-143 24 143M111 159h62M104 198h76" class="v-strong"/><path d="M440 275h116l-19-23h-79zM474 252l24-143 24 143M467 159h62M460 198h76" class="v-strong"/><path d="M155 126 Q320 12 485 126M161 151 Q320 53 479 151M175 181 Q320 101 465 181" class="v-beam"/><path d="M269 90c18-33 69-35 88-4 35-9 63 16 60 45H236c-4-25 11-39 33-41z" class="v-cloud"/><path d="M270 143l-10 28M310 143l-11 34M351 143l-9 24M390 143l-11 35" class="v-rain"/>`,
    resonator: () => `<path d="M58 180h190M392 180h190" class="v-feed"/><path d="M248 180h44M348 180h44" class="v-feed"/><path d="M292 180v-46h57v46" class="v-feed"/><path d="M320 90a90 90 0 1 0 90 90h-52a38 38 0 1 1-38-38z" class="v-resonator"/><path d="M319 117a63 63 0 1 0 63 63h-31a32 32 0 1 1-32-32z" class="v-resonator thin"/><path d="M294 181h52" class="v-gap"/><path d="M463 66v81M450 78h26M450 90h26M450 102h26" class="v-cap"/>`,
    satellite: () => `<circle cx="319" cy="206" r="72" class="v-earth"/><path d="M259 187c31 20 48 16 65 43 17-15 42-20 58-5M286 147c8 17 4 37-11 52M355 153c-13 20-10 37 6 52" class="v-map"/><ellipse cx="319" cy="206" rx="217" ry="104" class="v-orbit" transform="rotate(-17 319 206)"/><g transform="translate(472 73) rotate(16)"><rect x="-27" y="-13" width="54" height="26" class="v-sat"/><rect x="-75" y="-17" width="42" height="34" class="v-panel"/><rect x="33" y="-17" width="42" height="34" class="v-panel"/><path d="M0 13v33M-17 45h34" class="v-strong"/></g><path d="M461 111Q410 150 376 173M446 99Q384 121 357 158" class="v-beam"/>`,
    lux: () => `<path d="M320 38v38M217 82l27 27M423 82l-27 27M175 181h39M426 181h39" class="v-ray"/><circle cx="320" cy="181" r="69" class="v-sun"/><path d="M264 245h112l-13 66h-86z" class="v-meter"/><rect x="289" y="259" width="62" height="22" class="v-screen"/><path d="M302 292h36" class="v-strong"/><path d="M111 278c61-55 109-48 154-19M529 278c-61-55-109-48-154-19" class="v-gridline"/>`,
    pa: () => `<path d="M43 181h72M525 181h72" class="v-feed"/><g class="v-blocks"><rect x="115" y="137" width="91" height="88"/><rect x="274" y="137" width="91" height="88"/><rect x="434" y="137" width="91" height="88"/><path d="M206 181h68M365 181h69"/></g><path d="M140 202l22-42 22 42zM299 202l22-42 22 42zM459 202l22-42 22 42z" class="v-amp"/><path d="M153 94h336" class="v-bus"/><path d="M160 94v43M321 94v43M481 94v43" class="v-bus"/><text x="320" y="67" class="v-label" text-anchor="middle">0.1 — 10 GHz / 100 W CLASS</text>`,
    reservoir: () => {
      const pts = [[118,80],[198,126],[129,205],[233,240],[305,87],[320,187],[390,246],[434,112],[516,183],[511,276]];
      let links = "";
      pts.forEach((a, i) => pts.forEach((b, j) => { if (j > i && (i * 3 + j * 5) % 7 < 2) links += `<path d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}"/>`; }));
      return `<g class="v-network">${links}</g>${pts.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="${i===5?10:6}" class="${i===5?"v-node hot":"v-node"}"/>`).join("")}<path d="M40 180h67M526 180h74" class="v-feed"/><path d="M542 162l32 18-32 18z" class="v-arrow"/>`;
    },
    vna: () => `<rect x="224" y="102" width="192" height="156" rx="4" class="v-dut"/><path d="M42 142h182M42 218h182M416 142h182M416 218h182" class="v-feed"/><text x="320" y="171" class="v-label large" text-anchor="middle">S</text><text x="278" y="216" class="v-label" text-anchor="middle">COV</text><text x="362" y="216" class="v-label" text-anchor="middle">2×2</text><path d="M76 91c18-22 35 22 53 0s35 22 53 0M458 292c18-22 35 22 53 0s35 22 53 0" class="v-signal"/><circle cx="224" cy="142" r="7" class="v-node"/><circle cx="224" cy="218" r="7" class="v-node"/><circle cx="416" cy="142" r="7" class="v-node"/><circle cx="416" cy="218" r="7" class="v-node"/>`,
    lpda: () => {
      let e = "";
      for (let i=0;i<16;i+=1) { const x=122+i*25; const h=124*Math.pow(.91,i)+18; e += `<path d="M${x} ${180-h/2}v${h}"/>`; }
      return `<g class="v-antenna"><path d="M92 174L522 189M92 186L522 171"/>${e}</g><path d="M524 180h72" class="v-feed"/><path d="M105 180H46" class="v-feed"/><path d="M74 111Q21 180 74 249M91 128Q55 180 91 232" class="v-beam"/>`;
    },
    shell: () => {
      let nodes = "";
      for (let i=0;i<26;i+=1){ const a=i*2.39996; const rx=205*Math.sqrt((i+.5)/26); const x=320+Math.cos(a)*rx; const y=180+Math.sin(a)*rx*.58; nodes+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" class="${i%5===0?"v-node hot":"v-node"}"/>`; }
      return `<ellipse cx="320" cy="180" rx="230" ry="134" class="v-shell"/><ellipse cx="320" cy="180" rx="145" ry="84" class="v-shell inner"/><path d="M259 132h121l45 48-45 48H259l-45-48z" class="v-target"/>${nodes}<path d="M47 180h150M443 180h150" class="v-beam"/>`;
    },
    "ai-filter": () => `<path d="M62 280V72M62 280h516" class="v-axis"/><path d="M72 254c88-2 118-8 154-32 43-30 58-133 95-133s53 104 94 133c35 25 75 30 151 32" class="v-mag"/><path d="M72 100c97 1 127 8 160 35 43 34 58 123 91 123s52-88 91-122c34-29 75-36 152-36" class="v-phase"/><g class="v-ai"><circle cx="472" cy="58" r="15"/><circle cx="520" cy="58" r="15"/><path d="M487 58h18"/></g><text x="485" y="103" class="v-label" text-anchor="middle">CNN</text>`,
    lpf: () => `<path d="M40 180h61" class="v-feed"/><g class="v-ladder"><path d="M101 180c8-23 16-23 24 0s16 23 24 0 16-23 24 0s16 23 24 0"/><path d="M245 180c8-23 16-23 24 0s16 23 24 0 16-23 24 0s16 23 24 0"/><path d="M389 180c8-23 16-23 24 0s16 23 24 0 16-23 24 0s16 23 24 0"/><path d="M533 180h67"/><path d="M221 180v47M209 227h24M209 238h24M221 238v32M365 180v47M353 227h24M353 238h24M365 238v32M509 180v47M497 227h24M497 238h24M509 238v32"/><path d="M193 270h344"/></g><path d="M68 93h154l47 0 38 28 32 61 35 80h194" class="v-response"/>`,
    embedded: () => `<rect x="224" y="88" width="192" height="184" rx="6" class="v-chip"/><g class="v-pins">${Array.from({length:7},(_,i)=>`<path d="M${246+i*24} 88V58M${246+i*24} 272v30"/>`).join("")}${Array.from({length:6},(_,i)=>`<path d="M224 ${112+i*28}h-31M416 ${112+i*28}h31"/>`).join("")}</g><text x="320" y="158" class="v-label large" text-anchor="middle">STM32</text><path d="M267 197h106M267 218h73" class="v-bus"/><path d="M47 97h104v36H47zM47 151h145v36H47zM47 205h124v36H47zM467 112h126v36H467zM467 176h98v36H467z" class="v-bands"/>`,
    solar: () => `<circle cx="493" cy="81" r="39" class="v-sun"/><path d="M493 22v24M493 116v24M434 81h24M528 81h24M451 39l17 17M518 106l17 17M535 39l-17 17" class="v-ray"/><path d="M116 119h274l57 154H71z" class="v-panel"/><path d="M102 158h301M88 198h330M76 238h357M160 119l-23 154M218 119l-8 154M276 119l8 154M334 119l23 154" class="v-panel-grid"/><path d="M252 273v45M150 318h208" class="v-strong"/><path d="M444 176h95v76h-95zM462 196h59M491 176v76" class="v-converter"/>`,
    nonlinear: () => `<path d="M43 200c36 0 43-94 79-94s43 188 79 188 44-151 80-151 44 70 80 70" class="v-signal"/><path d="M374 268V76M374 268h225" class="v-axis"/><path d="M391 246h13v-91h-13zM427 246h13v-40h-13zM463 246h13v-151h-13zM499 246h13v-63h-13zM535 246h13v-120h-13zM571 246h13v-31h-13z" class="v-spectrum"/><path d="M386 63l197 0" class="v-threshold"/><circle cx="280" cy="143" r="8" class="v-node hot"/>`,
    vivaldi: () => `<path d="M95 178h129C316 178 350 81 542 66C412 126 384 171 367 180C384 189 412 234 542 294C350 279 316 182 224 182H95z" class="v-vivaldi"/><path d="M43 180h180" class="v-feed"/><path d="M516 94Q591 180 516 266M494 116Q550 180 494 244" class="v-beam"/><path d="M119 145v70M139 154v52" class="v-balun"/>`
  };

  function technicalVisual(project, compact) {
    const content = (svgParts[project.visual] || svgParts.dsp)();
    const cls = compact ? "project-illustration is-compact" : "project-illustration";
    return `<svg class="${cls}" viewBox="0 0 640 360" role="img" aria-label="Technical illustration for ${project.title}">
      <defs>
        <linearGradient id="bg-${project.slug}-${compact ? "c" : "d"}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#26301d"/><stop offset="0.55" stop-color="#10160d"/><stop offset="1" stop-color="#080c07"/>
        </linearGradient>
        <pattern id="grid-${project.slug}-${compact ? "c" : "d"}" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="rgba(177,194,133,.075)" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="640" height="360" fill="url(#bg-${project.slug}-${compact ? "c" : "d"})"/>
      <rect width="640" height="360" fill="url(#grid-${project.slug}-${compact ? "c" : "d"})"/>
      <circle cx="320" cy="180" r="145" class="v-ring backdrop"/><circle cx="320" cy="180" r="96" class="v-ring backdrop"/>
      <path d="M0 180h640M320 0v360" class="v-cross"/>
      <g>${content}</g>
      <path d="M18 42V18h24M598 18h24v24M18 318v24h24M598 342h24v-24" class="v-corners"/>
      <text x="25" y="329" class="v-caption">${project.id} · ${project.category.toUpperCase()}</text>
    </svg>`;
  }

  function visual(project, compact) {
    const media = PROJECT_MEDIA[project.slug];
    if (!media) return technicalVisual(project, compact);
    const loading = compact ? "lazy" : "eager";
    const priority = compact ? "auto" : "high";
    const attribution = compact
      ? `<span class="project-media-credit">${media.credit}</span>`
      : `<a class="project-media-credit project-media-credit--link" href="${media.source}" target="_blank" rel="noopener noreferrer">Image source · ${media.credit}</a>`;
    return `<img class="project-photo" src="${media.src}" alt="${media.alt}" loading="${loading}" decoding="async" fetchpriority="${priority}" style="--project-image-position: ${media.position || "center"}">
      <span class="project-media-fallback" hidden>${technicalVisual(project, compact)}</span>
      <span class="project-media-overlay" aria-hidden="true"></span>
      ${attribution}`;
  }

  function bindProjectMedia(root) {
    root.querySelectorAll("img.project-photo").forEach((image) => {
      const showFallback = () => {
        image.hidden = true;
        const fallback = image.nextElementSibling;
        if (fallback) fallback.hidden = false;
        image.parentElement.classList.add("media-failed");
      };
      image.addEventListener("error", showFallback, { once: true });
      if (image.complete && image.naturalWidth === 0) showFallback();
    });
  }

  function sourceListMarkup() {
    return projects.map((project) => {
      const media = PROJECT_MEDIA[project.slug];
      if (!media) return "";
      return `<a href="${media.source}" target="_blank" rel="noopener noreferrer"><b>${project.id}</b><span>${project.title}</span><small>${media.credit}</small></a>`;
    }).join("");
  }

  function icon(name) {
    const icons = {
      arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 7l5 5-5 5"/></svg>',
      back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H6M11 7l-5 5 5 5"/></svg>',
      github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8a9.2 9.2 0 0 0-2.91 17.93c.46.08.63-.2.63-.44v-1.8c-2.57.56-3.11-1.09-3.11-1.09-.42-1.07-1.03-1.36-1.03-1.36-.84-.58.06-.57.06-.57.93.07 1.42.96 1.42.96.83 1.42 2.17 1.01 2.7.77.08-.6.32-1.01.59-1.24-2.05-.23-4.2-1.03-4.2-4.56 0-1.01.36-1.83.95-2.48-.1-.23-.41-1.17.09-2.44 0 0 .78-.25 2.53.95A8.8 8.8 0 0 1 12 7.12a8.8 8.8 0 0 1 2.3.31c1.76-1.2 2.53-.95 2.53-.95.5 1.27.19 2.21.09 2.44.59.65.95 1.47.95 2.48 0 3.54-2.16 4.32-4.21 4.55.33.29.62.85.62 1.72v2.62c0 .24.17.53.63.44A9.2 9.2 0 0 0 12 2.8Z"/></svg>'
    };
    return icons[name] || icons.arrow;
  }

  function projectUrl(project) {
    return `/projects/${project.slug}/`;
  }

  function projectCard(project, related) {
    return `<article class="project-card${related ? " project-card--related" : ""}" data-group="${project.group}">
      <a class="project-card-link" href="${projectUrl(project)}" aria-label="Open ${project.title} project page">
        <figure class="project-card-visual">${visual(project, true)}</figure>
        <div class="project-card-body">
          <div class="project-card-meta"><span>${project.id}</span><span>${project.status}</span></div>
          <h3>${project.title}</h3>
          <p class="project-card-subtitle">${project.subtitle}</p>
          <p class="project-card-summary">${project.summary}</p>
          <div class="project-card-footer">
            <span>${project.category}</span>
            <span class="card-open">View project ${icon("arrow")}</span>
          </div>
        </div>
      </a>
    </article>`;
  }

  function renderIndex() {
    const grid = document.getElementById("project-grid");
    const filters = document.getElementById("project-filters");
    if (!grid || !filters) return;

    const formatCount = (value) => String(value).padStart(2, "0");
    const totalCount = projects.length;
    const sourceCount = projects.filter((project) => Boolean(project.github)).length;
    const domainCount = new Set(projects.map((project) => project.group).filter(Boolean)).size;
    const visibleCount = document.getElementById("visible-project-count");
    const sourceArchiveCount = document.getElementById("source-archive-count");
    const engineeringDomainCount = document.getElementById("domain-count");
    if (visibleCount) visibleCount.textContent = formatCount(totalCount);
    if (sourceArchiveCount) sourceArchiveCount.textContent = formatCount(sourceCount);
    if (engineeringDomainCount) engineeringDomainCount.textContent = formatCount(domainCount);

    grid.innerHTML = projects.map((project) => projectCard(project, false)).join("");
    bindProjectMedia(grid);
    const sourceList = document.getElementById("project-image-source-list");
    if (sourceList) sourceList.innerHTML = sourceListMarkup();

    filters.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-filter]");
      if (!button) return;
      const filter = button.dataset.filter;
      filters.querySelectorAll("button").forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      grid.querySelectorAll(".project-card").forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.group !== filter;
      });
      const visible = grid.querySelectorAll(".project-card:not([hidden])").length;
      const count = document.getElementById("visible-project-count");
      if (count) count.textContent = String(visible).padStart(2, "0");
    });
  }

  function metricMarkup(metrics) {
    return metrics.map((metric) => `<div class="metric-card"><strong>${metric.value}</strong><span>${metric.label}</span></div>`).join("");
  }

  function architectureMarkup(items) {
    return items.map((item, index) => `<article class="architecture-step">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>`).join("");
  }

  function methodsMarkup(items) {
    return items.map((item) => `<article class="method-card"><h3>${item.title}</h3><p>${item.text}</p></article>`).join("");
  }

  function bullets(items, className) {
    return `<ul class="${className}">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[character]);
  }

  function paragraphsMarkup(items) {
    if (!Array.isArray(items) || !items.length) return "";
    return items.map((item) => `<p>${escapeHtml(item)}</p>`).join("");
  }

  function theoryMarkup(items) {
    if (!Array.isArray(items) || !items.length) return "";
    return items.map((item, index) => `<article class="theory-card">
      <header><span>M${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(item.title)}</h3></header>
      <code>${escapeHtml(item.equation)}</code>
      <dl class="theory-notes">
        <div><dt>Variables</dt><dd>${escapeHtml(item.variables)}</dd></div>
        <div><dt>Physical meaning</dt><dd>${escapeHtml(item.explanation)}</dd></div>
        <div><dt>Why this model</dt><dd>${escapeHtml(item.why)}</dd></div>
      </dl>
    </article>`).join("");
  }

  function workflowMarkup(items) {
    if (!Array.isArray(items) || !items.length) return "";
    return items.map((item, index) => `<article class="workflow-step">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></div>
    </article>`).join("");
  }

  function decisionsMarkup(items) {
    if (!Array.isArray(items) || !items.length) return "";
    return items.map((item) => `<article class="decision-card">
      <h3>${escapeHtml(item.decision)}</h3>
      <dl>
        <div><dt>Engineering rationale</dt><dd>${escapeHtml(item.rationale)}</dd></div>
        <div><dt>Trade-off</dt><dd>${escapeHtml(item.tradeoff)}</dd></div>
      </dl>
    </article>`).join("");
  }

  function technicalIndexMarkup() {
    const links = [
      ["scope", "Scope"],
      ["execution", "Execution"],
      ["mathematics", "Mathematics"],
      ["architecture", "Architecture"],
      ["workflow", "Workflow"],
      ["methodology", "Methodology"],
      ["validation", "Evidence"],
      ["decisions", "Trade-offs"],
      ["boundaries", "Boundaries"]
    ];
    return `<nav class="technical-index" aria-label="Technical record index">
      <span>Technical record</span>
      <div>${links.map((item, index) => `<a href="#${item[0]}"><b>${String(index + 1).padStart(2, "0")}</b>${item[1]}</a>`).join("")}</div>
    </nav>`;
  }

  function renderDetail() {
    const root = document.getElementById("project-detail");
    const slug = document.body.dataset.project;
    if (!root || !slug) return;
    const project = projects.find((item) => item.slug === slug);
    if (!project) {
      root.innerHTML = '<section class="project-error"><p>Project record not found.</p><a href="/projects/">Return to Projects</a></section>';
      return;
    }
  
    const technical = technicalRecords[slug] || {};
    document.title = `${project.title} | Projects — Cem Sondur`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", project.summary);
  
    const github = project.github ? `<a class="project-action project-action--primary" href="${project.github}" target="_blank" rel="noopener noreferrer">${icon("github")}<span>Open GitHub Repository</span></a>` : "";
    const related = (project.related || []).map((relatedSlug) => projects.find((item) => item.slug === relatedSlug)).filter(Boolean);
    const currentIndex = projects.findIndex((item) => item.slug === slug);
    const previous = projects[(currentIndex - 1 + projects.length) % projects.length];
    const next = projects[(currentIndex + 1) % projects.length];
  
    root.innerHTML = `
      <nav class="project-breadcrumb" aria-label="Breadcrumb">
        <a href="/projects/">Projects</a><span>/</span><span>${project.id}</span>
      </nav>
  
      <section class="project-hero">
        <div class="project-hero-copy">
          <p class="project-kicker">${project.id} · ${project.category}</p>
          <h2>${project.title}</h2>
          <p class="project-subtitle">${project.subtitle}</p>
          <p class="project-lead">${project.summary}</p>
          <div class="project-actions">
            ${github}
            <a class="project-action" href="/projects/">${icon("back")}<span>Project Directory</span></a>
          </div>
          <div class="project-status-line"><span>${project.period}</span><span>${project.status}</span></div>
        </div>
        <figure class="project-hero-visual">${visual(project, false)}</figure>
      </section>
  
      <section class="project-metrics" aria-label="Key project metrics">${metricMarkup(project.metrics)}</section>
      ${technicalIndexMarkup()}
  
      <section class="project-section project-section--split" id="scope">
        <article>
          <div class="section-label"><span>01</span><h2>Mission Objective</h2></div>
          <p>${project.mission}</p>
        </article>
        <article>
          <div class="section-label"><span>02</span><h2>Engineering Challenge</h2></div>
          <p>${project.challenge}</p>
        </article>
      </section>
  
      <aside class="formula-panel" aria-label="Core engineering relationship">
        <span>CORE RELATIONSHIP</span><code>${project.formula}</code>
      </aside>
  
      <section class="project-section" id="execution">
        <div class="section-label"><span>03</span><h2>Technical Execution — What Was Done</h2></div>
        <div class="technical-prose">${paragraphsMarkup(technical.workDone)}</div>
      </section>
  
      <section class="project-section" id="mathematics">
        <div class="section-label"><span>04</span><h2>Mathematical & Physical Foundation</h2></div>
        <p class="section-intro">The relationships below define the project's governing model, the meaning of its variables, and the engineering reason each model was selected.</p>
        <div class="theory-grid">${theoryMarkup(technical.theory)}</div>
      </section>
  
      <section class="project-section" id="architecture">
        <div class="section-label"><span>05</span><h2>System Architecture</h2></div>
        <div class="architecture-grid">${architectureMarkup(project.architecture)}</div>
      </section>
  
      <section class="project-section" id="workflow">
        <div class="section-label"><span>06</span><h2>Engineering Workflow</h2></div>
        <div class="workflow-list">${workflowMarkup(technical.workflow)}</div>
      </section>
  
      <section class="project-section" id="methodology">
        <div class="section-label"><span>07</span><h2>Design & Implementation Methodology</h2></div>
        <div class="methods-grid">${methodsMarkup(project.methods)}</div>
      </section>
  
      <section class="project-section" id="validation">
        <div class="section-label"><span>08</span><h2>Validation Evidence & Results</h2></div>
        ${bullets(project.results, "evidence-list")}
      </section>
  
      <section class="project-section" id="decisions">
        <div class="section-label"><span>09</span><h2>Design Decisions & Engineering Trade-offs</h2></div>
        <div class="decision-grid">${decisionsMarkup(technical.decisions)}</div>
      </section>
  
      <section class="project-section" id="boundaries">
        <div class="section-label"><span>10</span><h2>Current Boundaries & Next Verification Gates</h2></div>
        ${bullets(project.limitations, "boundary-list")}
      </section>
  
      <section class="project-section technology-section" id="stack">
        <div class="section-label"><span>11</span><h2>Engineering Stack</h2></div>
        <div class="technology-list">${project.tools.map((tool) => `<span>${tool}</span>`).join("")}</div>
      </section>
  
      <section class="related-section" id="related">
        <div class="section-label"><span>12</span><h2>Related Projects</h2></div>
        <div class="related-grid">${related.map((item) => projectCard(item, true)).join("")}</div>
      </section>
  
      <nav class="project-pagination" aria-label="Project pagination">
        <a href="${projectUrl(previous)}"><small>Previous project</small><strong>${previous.title}</strong></a>
        <a href="${projectUrl(next)}"><small>Next project</small><strong>${next.title}</strong></a>
      </nav>
    `;
    bindProjectMedia(root);
  }
  renderIndex();
  renderDetail();
})();
