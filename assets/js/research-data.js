window.RESEARCH_RECORDS = [
  {
    "abstract": [
      "This bachelor degree project develops a two-port complementary split-ring resonator sensor for dielectric characterization. A 50 Ω microstrip line is implemented on a lossy FR4 substrate while the CSRR is etched in the ground plane, concentrating electric-field energy in a region whose loading changes the transmission resonance. The objective is not chemical identification; it is the estimation of effective relative dielectric constant from a calibrated frequency-domain response.",
      "CST Studio Suite supplies the electromagnetic model and MATLAB manages the parameter sweep, S21 export, resonance-feature extraction, and ensemble-regression stage. Relative permittivity is swept from 1.0 to 10.0 in 0.1 increments, producing 91 successfully exported response files. The study connects Maxwell-based field behavior, equivalent resonance physics, S-parameters, quality factor, and data-driven inference in one traceable workflow."
    ],
    "boundaries": [
      "Materials with similar effective permittivity may be indistinguishable from a single response and cannot be assigned unique chemical identity.",
      "Real liquids introduce loss, dispersion, temperature dependence, sample-volume effects, fixture uncertainty, and placement repeatability not closed by the virtual sweep.",
      "Hardware validation requires fabrication, calibrated two-port measurement, reference materials, repeated placement, environmental control, and an uncertainty budget."
    ],
    "category": "Microwave Sensing",
    "contributions": [
      "Unifies CSRR resonance physics, CST simulation, parameter management, response export, feature extraction, and inference in one end-to-end sensing workflow.",
      "Preserves a clear distinction between effective dielectric characterization and unsupported direct chemical identification.",
      "Uses a dense 91-point permittivity sweep to establish response continuity and calibration traceability.",
      "Frames the optional MATLAB interface as a visualization and inference layer rather than independent experimental evidence."
    ],
    "coreModel": "fr ≈ 1 / [2π√(Lr(Cr + Csample))]",
    "date": "June 2026",
    "domain": "sensing",
    "evidence": [
      "The complete εr = 1.0–10.0 sweep generated 91 successful S21 exports with zero failed cases.",
      "Increasing dielectric loading produced the expected downward movement of the resonant transmission notch.",
      "The εr = 10 configuration retained a clearly identifiable notch suitable for feature extraction.",
      "All reported evidence is numerical/simulation-based; no fabricated sensor or calibrated VNA dataset is claimed."
    ],
    "evidenceType": "CST full-wave simulation + MATLAB inference",
    "id": "PUB-01",
    "keywords": [
      "CSRR",
      "Microwave Sensor",
      "Dielectric Characterization",
      "S21",
      "CST Studio Suite",
      "MATLAB",
      "Bagged Trees"
    ],
    "language": "English",
    "methods": [
      {
        "text": "A two-port 50 Ω microstrip/CSRR structure is modeled in CST with a lossy FR4 substrate, open boundaries, port excitation, and frequency-domain S-parameter extraction.",
        "title": "Electromagnetic model"
      },
      {
        "text": "Effective relative permittivity is varied from 1.0 to 10.0 at 0.1 intervals while geometry and solver settings remain controlled, creating a traceable labeled response set.",
        "title": "Parametric calibration sweep"
      },
      {
        "text": "MATLAB detects the S21 notch and derives frequency, shift, depth, bandwidth, loaded-Q and curve-shape descriptors suitable for physical inspection and regression.",
        "title": "Resonance feature engineering"
      },
      {
        "text": "A Random Forest–style bagged-tree regressor with 100 learning cycles maps the feature vector to effective permittivity within the simulated calibration range.",
        "title": "Ensemble inference"
      }
    ],
    "modelExplanation": "Additional dielectric loading increases effective capacitance in the high-electric-field region and shifts the resonant notch downward. The regression stage estimates εr from this physically motivated response rather than replacing the electromagnetic model.",
    "objective": "Develop a reproducible virtual sensor whose electromagnetic response, extracted features, and regression estimate remain physically interpretable and whose claims are explicitly bounded to the simulated calibration domain.",
    "pages": "70 pages",
    "pdfPath": "/assets/research/TEZFINAL.pdf",
    "pdfReady": "auto",
    "projectTitle": "CSRR-Based Microwave Dielectric Sensor",
    "projectUrl": "/projects/csrr-microwave-dielectric-sensor/",
    "question": "Can a CSRR-loaded two-port microwave structure provide a stable and learnable mapping from its S21 resonance to the effective relative permittivity of an unknown dielectric load?",
    "shortTitle": "AI-Enhanced CSRR Microwave Sensor",
    "slug": "ai-enhanced-csrr-microwave-sensor",
    "subtitle": "Simulation-Based Dielectric Estimation Through Resonant S21 Features and Ensemble Regression",
    "summary": "A simulation-based intelligent microwave-sensing framework that estimates effective relative permittivity from the resonant transmission response of a two-port CSRR structure.",
    "title": "Development of an AI-Enhanced CSRR-Based Microwave Sensor for Dielectric Characterization",
    "typeKey": "thesis",
    "typeLabel": "Bachelor Degree Project",
    "visual": "resonator"
  },
  {
    "abstract": [
      "VANTA reverses the conventional receiver-design question. Instead of treating every nonlinear artifact solely as an error to be removed, it asks whether gain-dependent compression, spectral redistribution, harmonics, and intermodulation structure can provide additional observations of an RF scene. A behavioral model is first used to establish identifiability under controlled conditions; the concept is then challenged with direct asynchronous IQ captures from an RTL-SDR Blog V4.",
      "The thesis distinguishes four research questions. State-dependent response, residual spectral redistribution, and local-oscillator coordinate tracking are supported under the stated gates. Ambient candidate features do not establish causal IM3 parent reconstruction, so that question is reported as negative. This claim discipline is central to the work: measured receiver nonlinearity is demonstrated, while an unverified ambient hidden-source reconstruction claim is explicitly rejected."
    ],
    "boundaries": [
      "The numerical model is a constructive identifiability example, not a universal theorem for arbitrary receivers or scenes.",
      "The ambient campaign is not a calibrated two-tone power sweep and therefore does not establish IP3 or causal IM3 products.",
      "Transfer to other receivers requires device-to-device, temperature, gain-table, calibration, aliasing, and blind-scene studies."
    ],
    "category": "Nonlinear RF Sensing",
    "contributions": [
      "Defines nonlinear receiver states as candidate measurement channels while retaining the least-distorted state as the reference observation.",
      "Derives the ideal IM3 inverse map and verifies exact on-grid parent recovery in the constructive numerical case.",
      "Introduces LO-coordinate control to distinguish real RF structure from artifacts tied to the receiver baseband origin.",
      "Documents a negative ambient reconstruction outcome rather than converting receiver nonlinearity into an unsupported source-identification claim."
    ],
    "coreModel": "yₖ = Fθₖ(x) + nₖ;  g₁ = 2f₁ − f₂,  g₂ = 2f₂ − f₁",
    "date": "14 August 2026",
    "domain": "sdr",
    "evidence": [
      "All seven numerical acceptance gates passed; maximum amplitude relative error was approximately 1.7×10⁻⁶%.",
      "The local identifiability Jacobian rank increased from 0 to 2 and Monte Carlo recovery remained complete at input SNR values of −5 dB and above.",
      "The 95.097007 MHz hardware target reached 34.339 dB prominence; the safe model achieved R² = 0.974319 and correlation ρ = 0.987076.",
      "Compression onset was 25.4 dB with 22.719 dB compression depth, while ambient IM3 parent reconstruction remained unestablished."
    ],
    "evidenceType": "Numerical validation + RTL-SDR measurements",
    "id": "PUB-02",
    "keywords": [
      "RTL-SDR Blog V4",
      "Nonlinear RF",
      "IM3",
      "Receiver States",
      "IQ Measurement",
      "Identifiability",
      "Spectrum Analysis"
    ],
    "language": "English",
    "methods": [
      {
        "text": "Linear, second-order, and third-order response terms generate controlled spectral artifacts and provide a constructive test of parent-frequency recovery and local Jacobian rank.",
        "title": "Behavioral nonlinear model"
      },
      {
        "text": "Grid recovery, amplitude accuracy, rank growth, noise robustness, and mapping consistency are evaluated before any hardware interpretation is attempted.",
        "title": "Simulation acceptance gates"
      },
      {
        "text": "Direct asynchronous IQ is captured at 2.048 MS/s with 250,000 complex samples per record across 28 overlapping centers from 88–108 MHz and five tuner-gain states.",
        "title": "Wideband hardware campaign"
      },
      {
        "text": "LO-coordinate tracking, repeated captures, compression analysis, safe-model fitting, and residual thresholds distinguish receiver behavior from unsupported ambient IM3 attribution.",
        "title": "Claim-separation controls"
      }
    ],
    "modelExplanation": "Each receiver state θₖ produces a different nonlinear transfer observation. For ideal third-order products, parent frequencies can be inverted as f₁=(2g₁+g₂)/3 and f₂=(g₁+2g₂)/3, but that inversion is meaningful only when the observed products are causally established.",
    "objective": "Establish a mathematically testable virtual-aperture interpretation, validate its constructive inverse model, characterize real receiver-state behavior, and separate verified nonlinear observables from unsupported causal claims.",
    "pages": null,
    "pdfPath": "/assets/research/VANTA.pdf",
    "pdfReady": "auto",
    "projectTitle": "VANTA",
    "projectUrl": "/projects/vanta/",
    "question": "Can repeatable nonlinear receiver-state artifacts be treated as additional sensing coordinates, and under what conditions do those coordinates remain identifiable rather than becoming uncontrolled distortion?",
    "shortTitle": "VANTA",
    "slug": "vanta",
    "subtitle": "Virtual Aperture from Nonlinear Transfer Artifacts",
    "summary": "A receiver-state sensing study that investigates whether nonlinear transfer artifacts can serve as repeatable auxiliary observables without overstating ambient intermodulation evidence.",
    "title": "VANTA",
    "typeKey": "thesis",
    "typeLabel": "Research Thesis",
    "visual": "nonlinear"
  },
  {
    "abstract": [
      "AETHERCORE examines an electromagnetic environment as a potential computational medium. Multiple delayed propagation paths and receive observations transform an injected temporal sequence into a high-dimensional state. Rather than training the medium itself, the work fits a linear or ridge-regularized readout and asks how much memory, separability, nonlinear task performance, and operator information are already present in the physical channel.",
      "The GNU Radio proof of concept includes controlled FIR-like multipath, several excitation families, magnitude and nonlinear receiver observables, strict train/validation/test separation, singular-value analysis, fading-memory capacity, NARMA10, temporal parity, drift and recalibration, ablation, impairment sweeps, dimension scaling, and complex-operator reconstruction. The final verdict is conditional pass because the severe-impairment worst case narrowly misses its gate."
    ],
    "boundaries": [
      "No measured physical room or synchronized multi-antenna RF demonstrator is claimed; the current propagation substrate is controlled and FIR-like.",
      "Hardware coupling, receiver dynamic range, CFO, synchronization, ADC behavior, and long-term environmental drift remain open.",
      "The proposed next stage is a four-port synchronized RF demonstrator using measured antenna channels, realistic noise/clock effects, adaptive drift updates, and broader tasks."
    ],
    "category": "Computational Electromagnetics",
    "contributions": [
      "Connects delay spread and multiport observation diversity to reservoir-computing memory through an explicit convolutional model.",
      "Uses effective rank to distinguish true state diversity from a large but redundant channel count.",
      "Separates nonlinear receiver observables from intrinsically nonlinear propagation claims.",
      "Publishes acceptance-gate outcomes and a conditional verdict rather than hiding the unresolved severe-impairment boundary."
    ],
    "coreModel": "yₘ[n] = Σℓ hₘ[ℓ]u[n−ℓ] + vₘ[n];  ŷ[n] = Wout x[n]",
    "date": "August 2026",
    "domain": "computational",
    "evidence": [
      "Effective state rank reached 12.40 and linear memory capacity reached 18.03.",
      "Temporal parity accuracy reached 99.38%; NARMA10 NRMSE was 0.4313.",
      "Drift recalibration improved error from 3.2845 to 0.4455, and complex-operator reconstruction reached NRMSE 2.36×10⁻⁵.",
      "Twenty-run Monte Carlo repeatability was evaluated; the severe-impairment worst case remained just outside its defined gate."
    ],
    "evidenceType": "GNU Radio reproducible proof of concept",
    "id": "PUB-03",
    "keywords": [
      "GNU Radio",
      "Reservoir Computing",
      "Multipath",
      "Effective Rank",
      "Memory Capacity",
      "NARMA10",
      "Ridge Regression"
    ],
    "language": "English",
    "methods": [
      {
        "text": "Multiple FIR-like receive channels are excited with impulse, broadband random, bounded analog, binary, and complex-Gaussian inputs under repeatable GNU Radio conditions.",
        "title": "Controlled multipath substrate"
      },
      {
        "text": "Magnitude, square-law power, compressed magnitude, cubic terms, spatial channels, and temporal taps are compared rather than silently mixed.",
        "title": "State and observable design"
      },
      {
        "text": "Linear/ridge readouts use separated training, validation, and test intervals; regularization and scaling are selected without test leakage.",
        "title": "Readout and validation"
      },
      {
        "text": "Effective rank, memory capacity, NARMA10, parity, drift recovery, ablation, dimension scaling, impairments, Monte Carlo repeatability, and complex-operator reconstruction are evaluated.",
        "title": "Capacity and robustness campaign"
      }
    ],
    "modelExplanation": "Multipath convolution embeds delayed input history into simultaneous receive observations. A feature map forms the reservoir state x[n], and only the output matrix Wout is fitted, allowing computational value to be attributed to the medium and observable.",
    "objective": "Build a reproducible physical-reservoir framework, measure its independent state dimensions and temporal capacity, verify task performance, and identify the conditions that still require measured multiport hardware evidence.",
    "pages": null,
    "pdfPath": "/assets/research/AETHERCORE.pdf",
    "pdfReady": "auto",
    "projectTitle": "CEM — Computable Electromagnetic Medium",
    "projectUrl": "/projects/cem-computable-electromagnetic-medium/",
    "question": "Can a multipath electromagnetic medium deliver usable temporal memory and state diversity before conventional inference, and can that capacity be quantified without confusing receiver nonlinearities with nonlinear propagation?",
    "shortTitle": "AETHERCORE",
    "slug": "aethercore",
    "subtitle": "Multipath Electromagnetic Media as Physical Computational Substrates",
    "summary": "A reproducible study of whether controlled multipath propagation can provide useful memory, state expansion, and nonlinear task support before conventional digital inference.",
    "title": "AETHERCORE Independent Research Thesis",
    "typeKey": "thesis",
    "typeLabel": "Independent Research Thesis",
    "visual": "reservoir"
  },
  {
    "abstract": [
      "ENGRAM investigates whether an aperture can behave as an operational electromagnetic memory. A 5.8 GHz, 16 × 16 dual-polarized surface stores incident complex-channel information in quantized persistent phase states. Instead of relying exclusively on a conventional centralized beamforming chain, the architecture combines guided reference waves, spherical propagation, reciprocal point-scatterer multipath, dense coupling, phase-conjugate writing, coded multi-engram storage, associative recognition, and recursive rewriting.",
      "The work evaluates focusing, two-bit quantization, memory capacity, cross-talk, randomized tolerances, cell damage, withheld scenes, independent enrollment/query recognition, environmental rewriting, and off-grid localization. All ten predefined computational criteria are satisfied. The paper remains a modeled proof of concept and makes neither a hardware-validation claim nor a biological-equivalence claim."
    ],
    "boundaries": [
      "The study is not a complete three-dimensional full-wave Maxwell solution of a fabricated 256-cell surface.",
      "Mutual coupling is modeled, but measured bias networks, synchronization, calibration, thermal drift, component aging, and RF losses remain open.",
      "The results define a computational proof of concept and a hardware research program, not completed experimental validation."
    ],
    "category": "Electromagnetic Intelligence",
    "contributions": [
      "Defines a complete write–store–recall–recognize–rewrite cycle for a programmable electromagnetic aperture.",
      "Treats finite two-bit control, memory cross-talk, damage, and withheld scenes as primary evidence rather than secondary demonstrations.",
      "Separates spatial focusing, state recall, scene identification, rewrite recovery, and localization into independent criteria.",
      "Uses an operational memory analogy without claiming biological equivalence or neural capacity."
    ],
    "coreModel": "E(r) = Σₙ hₙ(r)aₙ,  aₙ ∈ {1, j, −1, −j}",
    "date": "July 2026",
    "domain": "electromagnetics",
    "evidence": [
      "Minimum focused-versus-random gain was 25.67 dB; the two-bit phase penalty was 0.886 dB.",
      "Four addressable engrams were demonstrated; the tolerance campaign achieved P05 power ratio 0.968 over 240 trials.",
      "Withheld-scene median focus gain was 18.96 dB across 72 trials; independent enrollment/query identification was 86.1% with Wilson 95% interval 76.3%–92.3%.",
      "Recursive rewrite P05 was 0.928; off-grid localization median and 95th-percentile errors were 2.38 mm and 5.11 mm. All ten predefined criteria passed."
    ],
    "evidenceType": "Computational proof of concept",
    "id": "PUB-04",
    "keywords": [
      "Electromagnetic Memory",
      "Programmable Aperture",
      "Phase Conjugation",
      "Associative Recall",
      "2-bit Phase",
      "Wavefront Control",
      "Reconfiguration"
    ],
    "language": "English",
    "methods": [
      {
        "text": "A 256-cell dual-polarized aperture with 0.45λ₀ spacing is evaluated using spherical propagation, reciprocal scatterers, guided reference waves, and dense coupling.",
        "title": "Coupled-aperture model"
      },
      {
        "text": "Phase-conjugate solutions are projected to a two-bit phase alphabet and stored locally as addressable electromagnetic engrams.",
        "title": "Persistent state writing"
      },
      {
        "text": "Noisy, partial, withheld, and independently enrolled/query scenes test whether the correct state is recognized and reconstructed rather than merely focused.",
        "title": "Associative recall"
      },
      {
        "text": "Randomized tolerance trials, cell failure, environmental drift, recursive multi-pilot updates, and off-grid target tests measure robustness and reconfiguration.",
        "title": "Damage and rewriting"
      }
    ],
    "modelExplanation": "The field is the coherent superposition of each cell's complex channel and quantized command. Phase-conjugate writing aligns contributions at the target, while stored discrete states provide a finite material-level memory representation.",
    "objective": "Define and falsify an electromagnetic associative-memory architecture through independent focusing, recall, identification, tolerance, rewriting, and localization criteria.",
    "pages": null,
    "pdfPath": "/assets/research/ENGRAM.pdf",
    "pdfReady": "auto",
    "projectTitle": "ENGRAM",
    "projectUrl": "/projects/engram/",
    "question": "Can a reconfigurable aperture write spatial complex channels into persistent local states, recall a desired field from partial or noisy observations, and reorganize after damage or environmental change?",
    "shortTitle": "ENGRAM",
    "slug": "engram",
    "subtitle": "A Self-Writing Electromagnetic Memory Aperture for Material-Level Channel Storage, Associative Wavefront Recall, and Neuroplastic Reconfiguration",
    "summary": "A computational research article proposing a programmable aperture that writes incident complex channels into persistent local phase states, recalls wavefronts associatively, and rewrites after damage or environmental drift.",
    "title": "ENGRAM",
    "typeKey": "article",
    "typeLabel": "Research Article",
    "visual": "aperture"
  },
  {
    "abstract": [
      "The Radiova ET-LPDA report develops a 20-element air-dielectric twin-boom log-periodic dipole array for directional operation across 2.4–5.8 GHz. The array is intended for the TX1 directional spot chain and is evaluated for low input reflection, controlled VSWR, high efficiency, useful end-fire gain, and field-integration feasibility.",
      "The three-dimensional CST model uses a 50 Ω discrete port, finite-conductivity aluminum/lossy-metal elements, coax/choke physical-shadow representation, HF frequency-domain solution, tetrahedral adaptive meshing, and a 2.0–6.5 GHz analysis interval. The report examines matching, efficiency, far-field behavior, realized gain, mechanical/electrical integration, and the hardware-verification steps still required."
    ],
    "boundaries": [
      "Manufacturing tolerances, element/boom alignment, connector transition, coax/choke behavior, mounting structure, and pan-tilt cable routing require hardware assessment.",
      "High-power operation requires reflected-power monitoring, VSWR shutdown, thermal inspection, connector ratings, and application-specific exposure/EMC controls.",
      "Final acceptance requires calibrated VNA S11/VSWR measurement and an anechoic or validated outdoor pattern/gain campaign."
    ],
    "category": "Wideband Antennas",
    "contributions": [
      "Provides a complete 20-element 2.4–5.8 GHz geometry and simulation baseline for the Radiova TX1 directional chain.",
      "Treats the air-dielectric twin boom as an RF feed and mechanical system rather than an isolated collection of dipoles.",
      "Reports realized gain and efficiency together with matching, avoiding directivity-only performance claims.",
      "Carries simulation results forward into explicit fabrication, protection, VNA, and field-integration requirements."
    ],
    "coreModel": "Lₙ₊₁ = τLₙ,  Rₙ₊₁ = τRₙ,  σ = sₙ/(2Lₙ)",
    "date": "2026",
    "domain": "antenna",
    "evidence": [
      "Simulated S11 was approximately −22 dB at 2.4 GHz and approximately −15.5 to −16 dB at 5.8 GHz, with deeper minima near 3.1 and 4.05 GHz.",
      "Simulated VSWR remained approximately 1.10–1.45 across the reported operating points.",
      "Realized gain reached 8.661 dBi at 2.4 GHz and 9.398 dBi at 5.8 GHz.",
      "Radiation efficiency was near 0 dB at sampled monitors. These values are simulation evidence; no completed hardware measurements are reported."
    ],
    "evidenceType": "CST full-wave simulation",
    "id": "PUB-05",
    "keywords": [
      "LPDA",
      "2.4–5.8 GHz",
      "Twin Boom",
      "CST Studio Suite",
      "Realized Gain",
      "Electronic Warfare",
      "Antenna Integration"
    ],
    "language": "Turkish",
    "methods": [
      {
        "text": "Twenty dipole elements are dimensioned and positioned through scale and spacing factors to create overlapping active regions across the target frequency ratio.",
        "title": "Log-periodic synthesis"
      },
      {
        "text": "Finite-conductivity metallic elements, air dielectric, twin booms, a 50 Ω port, coax/choke shadow, open space, and adaptive tetrahedral meshing are included.",
        "title": "Material-realistic CST model"
      },
      {
        "text": "S11, VSWR, surface currents, radiation efficiency, far fields, directivity, realized gain, and representative low/high-band monitors are inspected.",
        "title": "Full-band RF evaluation"
      },
      {
        "text": "Feed transition, connector/coax/choke, cabling loss, power handling, pan-tilt mechanics, reflected-power monitoring, and shutdown requirements are documented.",
        "title": "Integration review"
      }
    ],
    "modelExplanation": "Log-periodic scaling produces geometrically similar elements and spacings, allowing the active region to migrate along the boom as frequency changes. The twin boom serves simultaneously as a balanced feed structure and mechanical spine.",
    "objective": "Translate log-periodic scaling into a complete electromagnetic and integration baseline whose simulated RF performance can be challenged later with manufactured hardware and calibrated VNA/pattern measurements.",
    "pages": "12 pages",
    "pdfPath": "/assets/research/LPDA.pdf",
    "pdfReady": "auto",
    "projectTitle": "LPDA Antenna",
    "projectUrl": "/projects/lpda-antenna/",
    "question": "Can a compact air-dielectric twin-boom LPDA cover the 2.4–5.8 GHz mission band with acceptable matching, high simulated efficiency, directional gain, and an integration path suitable for a steerable electronic-warfare transmission chain?",
    "shortTitle": "Radiova ET-LPDA",
    "slug": "radiova-et-lpda",
    "subtitle": "2.4–5.8 GHz Air-Dielectric Twin-Boom Log-Periodic Dipole Array Antenna",
    "summary": "A technical design and simulation report for a compact, directional, high-power-capable 2.4–5.8 GHz LPDA intended for the Radiova electronic-warfare TX1 spot mission chain.",
    "title": "Radiova ET-LPDA",
    "typeKey": "report",
    "typeLabel": "Technical Design & Simulation Report",
    "visual": "lpda"
  },
  {
    "abstract": [
      "This report develops a balanced tapered-slot Vivaldi antenna and the wideband feed architecture required to connect it to a conventional 50 Ω single-ended RF chain. The radiator uses a 155 × 215 mm board, 122 mm aperture, 1.524 mm RO4350B-like laminate, 0.50 mm feed gap, and a nominal 100 Ω differential port. The transition is treated as part of the antenna because amplitude/phase imbalance and common-mode current directly affect matching, pattern symmetry, and interferometric phase.",
      "CST studies cover lossy copper/RF laminate, PEC comparison, boundary-distance sensitivity, dielectric tolerance, and a two-antenna/two-port arrangement. The reported S11 behavior remains below the −10 dB design criterion across 2–6 GHz for the evaluated numerical cases. The document is a simulation and fabrication-preparation record; it does not present measured antenna or balun validation."
    ],
    "boundaries": [
      "The wideband balun must be fabricated and characterized for insertion loss, return loss, differential balance, phase balance, and common-mode suppression.",
      "Antenna measurements require defined reference planes, cable/fixture de-embedding, gain/pattern validation, material tolerance, and mounting-structure assessment.",
      "Phase interferometry requires end-to-end calibration and ambiguity handling because spacing, wavelength, cables, baluns, receivers, and phase centers all contribute error."
    ],
    "category": "Wideband Antennas",
    "contributions": [
      "Co-designs the radiator and balanced transition instead of presenting the balun as an unrelated accessory.",
      "Includes conductive/dielectric loss, material tolerance, boundary sensitivity, and two-port coupling as part of the evidence chain.",
      "Connects antenna symmetry and common-mode control directly to phase-accurate two-channel operation.",
      "Produces a clear path from CST evidence to Gerber/fabrication, VNA, pattern, common-mode, and interferometric calibration."
    ],
    "coreModel": "y(x)=c₁e^(Rx)+c₂;  Δφ=(2πd/λ)sinθ+φcal",
    "date": "2026",
    "domain": "antenna",
    "evidence": [
      "The lossy model produced simulated S11 of approximately −11.4 to −16.6 dB across 2–6 GHz.",
      "The PEC comparison produced approximately −11.5 to −16.2 dB, while the εr−0.05 tolerance case produced approximately −11.7 to −18 dB.",
      "In the evaluated two-antenna case, Port-1 S11 remained approximately −11.3 to −16.3 dB.",
      "These are CST simulation results; no fabricated antenna, balun, VNA, gain, pattern, or calibrated two-channel measurement is claimed."
    ],
    "evidenceType": "CST full-wave and tolerance analysis",
    "id": "PUB-06",
    "keywords": [
      "Vivaldi Antenna",
      "Wideband Balun",
      "2–6 GHz",
      "Differential Feed",
      "CST Studio Suite",
      "Phase Interferometry",
      "S-Parameters"
    ],
    "language": null,
    "methods": [
      {
        "text": "A controlled exponential flare, elliptical cavity, 0.50 mm throat, 122 mm aperture, and material-realistic board define the wideband radiator.",
        "title": "Tapered-slot geometry"
      },
      {
        "text": "A nominal 100 Ω differential antenna input is paired with a required 50 Ω single-ended to differential balun, with amplitude/phase symmetry and common-mode behavior treated as RF metrics.",
        "title": "Balanced feed architecture"
      },
      {
        "text": "Lossy copper and laminate, PEC comparison, boundary-distance variation, εr tolerance, port definition, and mesh convergence challenge the nominal S11 response.",
        "title": "Robust EM analysis"
      },
      {
        "text": "Matching at both ports and mutual coupling are evaluated for the paired configuration that underpins later phase-interferometry measurements.",
        "title": "Two-antenna study"
      }
    ],
    "modelExplanation": "The exponential slot taper transforms a guided balanced mode into an end-fire wave over a broad band. In a two-antenna system, path difference becomes relative phase, but calibration offset and spatial aliasing must be handled explicitly.",
    "objective": "Establish the material, geometry, feed, tolerance, coupling, and calibration requirements of a broadband antenna–balun system before fabrication and two-channel measurement.",
    "pages": "16+ pages",
    "pdfPath": "/assets/research/Vivaldi.pdf",
    "pdfReady": "auto",
    "projectTitle": "Vivaldi Antenna–Balun",
    "projectUrl": "/projects/vivaldi-antenna-balun/",
    "question": "Can a balanced Vivaldi aperture and its single-ended-to-differential feed be co-designed to preserve 2–6 GHz matching and provide a credible two-channel front end for wideband sensing and phase interferometry?",
    "shortTitle": "Vivaldi Antenna & Balun",
    "slug": "vivaldi-antenna-balun",
    "subtitle": "Balanced Tapered-Slot Front End for Wideband RF and Phase-Interferometry Systems",
    "summary": "A 2–6 GHz balanced Vivaldi radiator, 50 Ω single-ended to 100 Ω differential transition, and two-antenna coupling study developed as one wideband RF front end.",
    "title": "2–6 GHz Differential Vivaldi Antenna and Wideband Balun",
    "typeKey": "report",
    "typeLabel": "Engineering Research Report",
    "visual": "vivaldi"
  }
];
