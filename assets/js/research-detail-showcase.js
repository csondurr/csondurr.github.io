(function () {
  "use strict";

  const mediaBySlug = {
    "ai-enhanced-csrr-microwave-sensor": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Two-loop_one-gap_LGR.jpg?width=1600",
      alt: "Physical RF loop-gap resonator hardware with planar split-ring resonators",
      label: "RESONANT RF HARDWARE",
      source: "https://commons.wikimedia.org/wiki/File:Two-loop_one_gap_LGR.jpg",
      credit: "BlizzPhyz · Wikimedia Commons · CC BY-SA 4.0",
      position: "center"
    },
    "vanta": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Rtl-sdr.jpg?width=1600",
      alt: "RTL-SDR software-defined radio receiver with RF adapters",
      label: "SOFTWARE-DEFINED RADIO",
      source: "https://commons.wikimedia.org/wiki/File:Rtl-sdr.jpg",
      credit: "Joeceads · Wikimedia Commons · CC BY-SA 4.0",
      position: "center"
    },
    "aethercore": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Reverberation_chamber.jpg?width=1600",
      alt: "Electromagnetic reverberation chamber at the IETR laboratory in Rennes",
      label: "MULTIPATH RF ENVIRONMENT",
      source: "https://commons.wikimedia.org/wiki/File:Reverberation_chamber.jpg",
      credit: "Manuamador · Wikimedia Commons · CC BY-SA 3.0",
      position: "center"
    },
    "engram": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Advanced_Technology_Demonstrator_radar_antenna_array_01.jpg?width=1600",
      alt: "NOAA Advanced Technology Demonstrator phased-array radar flat-panel antenna",
      label: "PHASED-ARRAY APERTURE",
      source: "https://commons.wikimedia.org/wiki/File:Advanced_Technology_Demonstrator_radar_antenna_array_01.jpg",
      credit: "NOAA · Wikimedia Commons · Public Domain",
      position: "center"
    },
    "radiova-et-lpda": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Rotatable_log-periodic_antenna.jpg?width=1600",
      alt: "United States Air Force rotatable directional log-periodic antenna installation",
      label: "LOG-PERIODIC ANTENNA",
      source: "https://commons.wikimedia.org/wiki/File:Rotatable_log-periodic_antenna.jpg",
      credit: "Josh Plueger / USAF · Wikimedia Commons · Public Domain",
      position: "center"
    },
    "vivaldi-antenna-balun": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/PCB_Vivaldi_Antenna.jpg?width=1600",
      alt: "Physical printed-circuit-board Vivaldi antenna with coaxial feed and SMA connector",
      label: "WIDEBAND PCB ANTENNA",
      source: "https://commons.wikimedia.org/wiki/File:PCB_Vivaldi_Antenna.jpg",
      credit: "FarField · Wikimedia Commons · CC BY-SA 4.0",
      position: "center"
    }
  };

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (character) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      }[character];
    });
  }

  function enhanceDetail() {
    const slug = document.body && document.body.dataset ? document.body.dataset.research : "";
    const media = mediaBySlug[slug];
    if (!slug || !media) return;

    const records = Array.isArray(window.RESEARCH_RECORDS) ? window.RESEARCH_RECORDS : [];
    const record = records.find(function (item) { return item.slug === slug; });
    const hero = document.querySelector(".research-detail-hero");
    const figure = hero ? hero.querySelector(":scope > figure") : null;
    const heading = hero ? hero.querySelector(".research-detail-copy h2") : null;
    if (!hero || !figure) return;

    if (record && heading) {
      const fullTitle = record.title || "";
      const shortTitle = record.shortTitle || fullTitle;
      heading.textContent = shortTitle;

      if (fullTitle && fullTitle !== shortTitle && !hero.querySelector(".research-detail-full-title")) {
        const full = document.createElement("p");
        full.className = "research-detail-full-title";
        full.textContent = fullTitle;
        heading.insertAdjacentElement("afterend", full);
      }
    }

    const fallback = figure.innerHTML;
    figure.className = "research-detail-media";
    figure.style.setProperty("--detail-image-position", media.position || "center");
    figure.setAttribute("aria-label", media.alt);

    const title = record ? (record.shortTitle || record.title) : media.label;
    const detail = record ? [record.category, record.evidenceType].filter(Boolean).join(" · ") : "Engineering research record";

    figure.innerHTML =
      '<img class="research-detail-photo" src="' + escapeHtml(media.src) + '" alt="' + escapeHtml(media.alt) + '" loading="eager" decoding="async" fetchpriority="high">' +
      '<span class="research-detail-photo-shade" aria-hidden="true"></span>' +
      '<div class="research-detail-evidence" aria-hidden="true">' +
        '<span>' + escapeHtml(media.label) + '</span>' +
        '<strong>' + escapeHtml(title) + '</strong>' +
        '<small>' + escapeHtml(detail) + '</small>' +
      '</div>' +
      '<figcaption><a href="' + escapeHtml(media.source) + '" target="_blank" rel="noopener noreferrer">Reference image · ' + escapeHtml(media.credit) + '</a></figcaption>';

    const image = figure.querySelector(".research-detail-photo");
    if (image) {
      image.addEventListener("error", function () {
        figure.className = "";
        figure.removeAttribute("style");
        figure.innerHTML = fallback;
      }, { once: true });
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute("content", media.src);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhanceDetail, { once: true });
  } else {
    enhanceDetail();
  }
})();
