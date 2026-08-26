(function () {
  "use strict";

  const covers = {
    "PUB-01": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Two-loop_one-gap_LGR.jpg?width=1200",
      alt: "Physical RF loop-gap resonator hardware with planar split-ring resonators",
      label: "RESONANT RF HARDWARE",
      source: "https://commons.wikimedia.org/wiki/File:Two-loop_one-gap_LGR.jpg",
      credit: "BlizzPhyz · Wikimedia Commons · CC BY-SA 4.0"
    },
    "PUB-02": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Rtl-sdr.jpg?width=1200",
      alt: "RTL-SDR V3 software-defined radio receiver with RF adapters",
      label: "SOFTWARE-DEFINED RADIO",
      source: "https://commons.wikimedia.org/wiki/File:Rtl-sdr.jpg",
      credit: "Joeceads · Wikimedia Commons · CC BY-SA 4.0"
    },
    "PUB-03": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Reverberation_chamber.jpg?width=1200",
      alt: "Electromagnetic reverberation chamber at the IETR laboratory in Rennes",
      label: "MULTIPATH RF ENVIRONMENT",
      source: "https://commons.wikimedia.org/wiki/File:Reverberation_chamber.jpg",
      credit: "Manuamador · Wikimedia Commons · CC BY-SA 3.0"
    },
    "PUB-04": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Advanced_Technology_Demonstrator_radar_antenna_array_01.jpg?width=1200",
      alt: "NOAA Advanced Technology Demonstrator phased-array radar flat-panel antenna",
      label: "PHASED-ARRAY APERTURE",
      source: "https://commons.wikimedia.org/wiki/File:Advanced_Technology_Demonstrator_radar_antenna_array_01.jpg",
      credit: "NOAA · Wikimedia Commons · Public Domain"
    },
    "PUB-05": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Rotatable_log-periodic_antenna.jpg?width=1200",
      alt: "United States Air Force rotatable directional log-periodic antenna installation",
      label: "LOG-PERIODIC ANTENNA",
      source: "https://commons.wikimedia.org/wiki/File:Rotatable_log-periodic_antenna.jpg",
      credit: "Josh Plueger / USAF · Wikimedia Commons · Public Domain"
    },
    "PUB-06": {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/PCB_Vivaldi_Antenna.jpg?width=1200",
      alt: "Physical printed-circuit-board Vivaldi antenna with coaxial feed and SMA connector",
      label: "WIDEBAND PCB ANTENNA",
      source: "https://commons.wikimedia.org/wiki/File:PCB_Vivaldi_Antenna.jpg",
      credit: "FarField · Wikimedia Commons · CC BY-SA 4.0"
    }
  };

  function getRecordId(card) {
    const marker = card.querySelector(".research-card-meta span:first-child");
    return marker ? marker.textContent.trim() : "";
  }

  function installCover(card, media) {
    const figure = card.querySelector("figure");
    if (!figure || figure.querySelector(".research-card-photo")) return;

    const image = document.createElement("img");
    image.className = "research-card-photo";
    image.src = media.src;
    image.alt = media.alt;
    image.loading = "lazy";
    image.decoding = "async";

    const shade = document.createElement("span");
    shade.className = "research-card-photo-shade";
    shade.setAttribute("aria-hidden", "true");

    const label = document.createElement("span");
    label.className = "research-card-photo-label";
    label.textContent = media.label;
    label.setAttribute("aria-hidden", "true");

    image.addEventListener("load", function () {
      figure.classList.add("has-real-cover");
    });

    image.addEventListener("error", function () {
      image.remove();
      shade.remove();
      label.remove();
      figure.classList.remove("has-real-cover");
    });

    figure.appendChild(image);
    figure.appendChild(shade);
    figure.appendChild(label);
  }

  function populateSources() {
    const list = document.getElementById("research-image-source-list");
    if (!list) return;

    list.innerHTML = Object.entries(covers).map(function (entry) {
      const id = entry[0];
      const media = entry[1];
      return '<a href="' + media.source + '" target="_blank" rel="noopener noreferrer"><span>' + id + '</span><strong>' + media.label + '</strong><small>' + media.credit + '</small></a>';
    }).join("");
  }

  function enhance() {
    document.querySelectorAll(".research-card").forEach(function (card) {
      const media = covers[getRecordId(card)];
      if (media) installCover(card, media);
    });
    populateSources();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhance, { once: true });
  } else {
    enhance();
  }
})();
