window.PROJECTS = [
  {
    order: 1,
    id: "PRJ-01",
    slug: "engram",
    title: "ENGRAM",
    subtitle: "Electromagnetic Associative Memory",
    category: "Electromagnetic Intelligence",
    group: "rf",
    period: "April–July 2026",
    status: "Computational research",
    visual: "aperture",
    github: "https://github.com/csondurr/ENGRAM",
    summary: "A programmable dual-polarized aperture that senses an electromagnetic scene, stores the corresponding surface state, recalls it under disturbance, and readapts after the propagation environment changes.",
    metrics: [
      { value: "5.800 GHz", label: "Operating frequency" },
      { value: "16 × 16", label: "Dual-polarized aperture" },
      { value: "25.67 dB", label: "Minimum focus gain" },
      { value: "91.7%", label: "Identification accuracy" }
    ],
    mission: "ENGRAM investigates whether a reconfigurable electromagnetic surface can behave like an associative memory. Instead of treating the propagation channel as a passive obstacle, the project encodes scene-dependent channel information into a persistent 2-bit aperture state and evaluates whether that state can later reconstruct a desired field condition.",
    challenge: "The central engineering difficulty is that a useful memory state must remain recognizable when cells fail, phase commands are quantized, the observed scene is incomplete, or the environment changes. The project therefore separates raw focusing performance from recall, discrimination, fault tolerance, and readaptation.",
    formula: "E(r) = Σ hₙ(r) aₙ,     aₙ ∈ {1, j, −1, −j}",
    architecture: [
      { title: "Scene and channel model", text: "A multipath electromagnetic scene generates a complex response for every aperture cell, polarization channel, and observation point." },
      { title: "State encoding", text: "The continuous phase solution is mapped to four available phase states. The resulting 256-cell configuration becomes the stored electromagnetic engram." },
      { title: "Recall engine", text: "Stored states are reapplied under dropout, damage, quantization, and scene perturbations; field reconstruction and focus recovery are then measured." },
      { title: "Recognition layer", text: "Stored and previously unseen scenes are separated using field-response features, allowing the surface state to act as both memory and scene identifier." }
    ],
    methods: [
      { title: "Near-field synthesis", text: "Complex cell contributions are coherently combined at the selected observation region. The optimization objective balances focal power, sidelobe behavior, and robustness rather than maximizing a single point in isolation." },
      { title: "Discrete-state implementation", text: "Every cell is constrained to a 2-bit phase alphabet. Quantization loss is evaluated explicitly so the result remains connected to a realizable programmable surface rather than an ideal continuous-phase aperture." },
      { title: "Fault and tolerance campaign", text: "Cell dropout, random phase disturbance, component tolerance, off-grid target positions, and changing scenes are applied to test whether recall survives realistic model degradation." },
      { title: "Evidence mapping", text: "A structured validation sequence covers aperture geometry, channel magnitude, learning convergence, near/far-field response, capacity, crosstalk, damage response, Monte Carlo behavior, and localization statistics." }
    ],
    results: [
      "Four distinct electromagnetic memory states were stored and evaluated.",
      "Recall reached 100% at the defined 10 dB threshold with 20% cell dropout.",
      "The minimum reported focusing gain was 25.67 dB and the −3 dB focal area was 0.03369 m².",
      "The 2-bit phase constraint introduced a reported −0.89 dB quantization penalty.",
      "Previously unseen scenes produced a median gain of 18.06 dB; the archived identification accuracy is 91.7%."
    ],
    limitations: [
      "The current evidence is numerical and simulation-based; a fabricated aperture and calibrated RF measurements are still required.",
      "Reported recall and classification values apply to the archived scene distribution, fault model, and operating frequency.",
      "Mutual coupling, bias-network errors, synchronization, thermal drift, and full system calibration require hardware-level investigation."
    ],
    tools: ["MATLAB", "CST Studio Suite", "Computational Electromagnetics", "Array Processing", "Monte Carlo Analysis", "2-bit Phase Control"],
    related: ["morpheus", "cem-computable-electromagnetic-medium", "lpda-antenna"]
  },
  {
    order: 2,
    id: "PRJ-02",
    slug: "genesis-dsp",
    title: "GENESIS-DSP",
    subtitle: "Impairment-Aware DSP Research Platform",
    category: "Digital Signal Processing",
    group: "dsp",
    period: "May–July 2026",
    status: "Research prototype",
    visual: "dsp",
    github: "https://github.com/csondurr/GENESIS-DSP",
    summary: "An end-to-end platform for generating raw IQ data, injecting channel impairments, discovering and verifying receiver pipelines, converting them to fixed point, and executing them through a web/API interface.",
    metrics: [
      { value: "24", label: "Engineering stages" },
      { value: "15", label: "Topologies evaluated" },
      { value: "0.474 Hz", label: "CFO residual" },
      { value: "Q3.13", label: "Selected fixed point" }
    ],
    mission: "GENESIS-DSP covers the complete lifecycle of a communication-receiver algorithm: reproducible waveform generation, controlled impairment injection, block-level abstraction, graph construction, parameter and topology search, falsification, deployment checks, fixed-point conversion, code export, and browser-based execution.",
    challenge: "A pipeline that performs well on one nominal waveform may still be non-causal, numerically fragile, unstable, or unsuitable for embedded deployment. The project treats receiver quality and deployability as separate engineering requirements and verifies both.",
    formula: "r[n] = C{ μu[n] + νu*[n] + d } + w[n]",
    architecture: [
      { title: "Signal laboratory", text: "A unit-power QPSK source is pulse-shaped and passed through AWGN, CFO, phase offset, timing displacement, multipath, IQ imbalance, DC offset, and optional clipping." },
      { title: "DSP graph", text: "Typed blocks are assembled as a directed acyclic graph with parameter validation, cycle rejection, deterministic execution, serialization, and operation-cost accounting." },
      { title: "Discovery and falsification", text: "Continuous optimization, topology enumeration, evolutionary search, and Pareto selection produce candidates that are then stressed against counterexamples." },
      { title: "Deployment path", text: "The accepted graph is checked for prefix causality, BIBO behavior, determinism, and finite outputs before fixed-point conversion and Python/C++17 export." }
    ],
    methods: [
      { title: "Impairment-aware receiver modeling", text: "The complex-baseband model combines carrier offset, phase rotation, convolutional multipath, timing displacement, widely-linear IQ imbalance, DC offset, noise, and nonlinear clipping. BER, EVM, NMSE, and SNR-derived diagnostics are evaluated on separated data regions." },
      { title: "Pipeline search", text: "Candidate blocks are instantiated from a registry, connected into valid graphs, optimized, and scored jointly for signal error and implementation cost. The search is therefore sensitive to both accuracy and computational complexity." },
      { title: "Causality correction", text: "A full-frame mean-removal stage was identified as non-causal for streaming use and replaced by a first-order causal DC blocker with pole radius 0.995. The certified runtime chain is complex gain → causal DC blocker → frequency shift." },
      { title: "Fixed-point and interface layer", text: "Word-length search, saturation emulation, and NCO phase quantization lead to a signed 16-bit Q3.13 format. The resulting pipeline is exposed through FastAPI and a browser interface for CSV IQ processing and visual comparison." }
    ],
    results: [
      "The hidden correction chain was rediscovered from 15 evaluated topologies.",
      "For a true 18,750 Hz CFO, the discovered correction was −18,749.525760 Hz, leaving a +0.474240 Hz residual.",
      "The rediscovered pipeline achieved NMSE 1.5853×10⁻⁴ and EVM 1.2591% in the reference experiment.",
      "The combined receiver produced zero test bit errors in 4,568 evaluated bits under the nominal test condition.",
      "Twelve of twelve causality and stability checks passed, and deterministic replay error was zero.",
      "Stress testing deliberately exposed 42 acceptance failures in 43 severe scenarios, defining the present robustness boundary instead of hiding it."
    ],
    limitations: [
      "This is a research and prototyping framework, not a production modem.",
      "The lightweight browser runtime executes a certified front-end correction chain; it does not reproduce every stage of the full receiver experiment.",
      "Coefficients from the reference experiment are not automatically re-estimated for every arbitrary uploaded capture."
    ],
    tools: ["Python", "NumPy", "FastAPI", "C++17", "QPSK", "Fixed-Point DSP", "HTML/CSS/JavaScript", "OpenAPI"],
    related: ["cem-computable-electromagnetic-medium", "vanta", "gps-receiver-rtl-sdr"]
  },
  {
    order: 3,
    id: "PRJ-03",
    slug: "microwave-signal-loss-prediction",
    title: "Microwave Signal Loss Prediction",
    subtitle: "Atmospheric Link-Loss Forecasting",
    category: "RF Propagation & Data Analytics",
    group: "data",
    period: "May 2026",
    status: "Statistical modeling study",
    visual: "propagation",
    github: "https://github.com/csondurr/Microwave-Signal-Loss-Prediction",
    summary: "A one-step-ahead forecasting study that links microwave attenuation to rainfall, temperature, wind, and lagged channel behavior through multiple linear regression and residual diagnostics.",
    metrics: [
      { value: "8,758", label: "Usable hourly samples" },
      { value: "72.83%", label: "Test R²" },
      { value: "0.2947 dB", label: "MAE" },
      { value: "1.41%", label: "MAPE" }
    ],
    mission: "The project examines how atmospheric variables influence the short-term behavior of a microwave link and whether a transparent linear model can forecast the next hourly loss value while remaining easy to interpret from an RF-engineering perspective.",
    challenge: "Weather variables are correlated, time dependent, and not always linearly related to attenuation. A model can therefore predict well while producing coefficients that are physically counterintuitive. The study uses this tension to separate predictive performance from causal interpretation.",
    formula: "L̂[t+1] = β₀ + β₁R[t] + β₂T[t] + β₃W[t] + β₄L[t] + ε",
    architecture: [
      { title: "Synthetic environment", text: "A one-year hourly series represents rainfall intensity, temperature, wind speed, and microwave loss with physically motivated temporal behavior." },
      { title: "Feature engineering", text: "Current meteorological variables are combined with lagged loss and lagged-weather terms to construct a one-step-ahead supervised dataset." },
      { title: "Chronological regression", text: "The first approximately 80% of the timeline is used for training and the final 20% for testing, preserving time order and preventing future-to-past leakage." },
      { title: "Diagnostic layer", text: "Accuracy metrics are accompanied by residual distributions, Q–Q plots, time-ordered residuals, and coefficient inspection." }
    ],
    methods: [
      { title: "Atmospheric variables", text: "Rainfall is treated as the dominant attenuation driver, while temperature and wind represent slower environmental variation. Lagged predictors capture persistence that a purely instantaneous model would miss." },
      { title: "Multiple linear regression", text: "The fitted model retains direct coefficient interpretability. Each coefficient expresses the conditional change in predicted loss for a unit change in its predictor while the others are held fixed." },
      { title: "Time-aware validation", text: "A chronological split avoids randomly mixing adjacent hourly observations. MAE, RMSE, MAPE, and R² quantify complementary aspects of test behavior." },
      { title: "Engineering interpretation", text: "The counterintuitive sign of a lagged-rain coefficient is analyzed as a multicollinearity warning rather than accepted as a physical law. This demonstrates why regression coefficients require domain-level scrutiny." }
    ],
    results: [
      "The test set contained 1,752 observations following 7,006 chronological training observations.",
      "R² reached 72.83%, indicating that the linear feature set explained most, but not all, of the held-out variance.",
      "MAE was 0.2947 dB and RMSE was 0.3695 dB on the synthetic test interval.",
      "MAPE was 1.41% within the simulated operating range.",
      "Residual and coefficient analysis identified the interpretability limits imposed by correlated lagged weather variables."
    ],
    limitations: [
      "The dataset is synthetic and does not replace a measured microwave-link campaign.",
      "The linear model cannot represent all nonlinear rain-fade, wet-antenna, ducting, or site-specific propagation effects.",
      "Forecast performance must be revalidated before transfer to another frequency, path length, climate, or antenna system."
    ],
    tools: ["R", "Multiple Linear Regression", "Time-Series Features", "Residual Analysis", "RF Propagation", "Statistical Validation"],
    related: ["entropy-vna", "rf-filter-ai-synthesizer", "vanta"]
  },
  {
    order: 4,
    id: "PRJ-04",
    slug: "csrr-microwave-dielectric-sensor",
    title: "CSRR-Based Microwave Dielectric Sensor",
    subtitle: "Contactless Permittivity Estimation",
    category: "Microwave Sensors",
    group: "rf",
    period: "March–April 2026",
    status: "Simulation proof of concept",
    visual: "resonator",
    github: "https://github.com/csondurr/Dielectric-resonator-sensor-with-CSRR",
    summary: "A CST–MATLAB sensing workflow that maps dielectric loading at a complementary split-ring resonator to measurable changes in the S21 resonance and estimates effective relative permittivity from extracted curve features.",
    metrics: [
      { value: "1.0–10.0", label: "Simulated εr range" },
      { value: "0.1", label: "Permittivity step" },
      { value: "≈ −40 dB", label: "Observed notch depth" },
      { value: "11", label: "Curve features" }
    ],
    mission: "The sensor is intended to characterize dielectric loading without conventional chemical tests by observing how a material under test changes the resonant response of a CSRR coupled to a continuous microstrip line.",
    challenge: "High-permittivity three-dimensional liquid volumes shorten wavelength inside the material and force dense electromagnetic meshes. The project reduces that computational burden by first representing gap loading as an equivalent capacitance and then reconnecting the compact model to full-wave sweeps.",
    formula: "fᵣ ≈ 1 / (2π√(Lᵣ(Cᵣ + Csample)))",
    architecture: [
      { title: "CSRR sensing element", text: "A complementary split-ring resonator is electromagnetically coupled to a through microstrip line; its localized electric field makes the gap region sensitive to dielectric loading." },
      { title: "Parametric CST sweep", text: "The effective relative permittivity parameter is swept from 1.0 to 10.0 in 0.1 increments and every S21 trace is exported with a traceable filename." },
      { title: "Feature extraction", text: "Resonant frequency, frequency shift, notch depth, 3 dB bandwidth, loaded-Q estimate, curve area, distribution statistics, and local slopes form the regression feature vector." },
      { title: "Inference interface", text: "A bagged regression-tree ensemble estimates effective permittivity and a bilingual MATLAB interface presents the result." }
    ],
    methods: [
      { title: "Equivalent-circuit reduction", text: "Dielectric loading is mapped to an incremental gap capacitance. The compact LC interpretation explains why increasing permittivity lowers the resonant frequency and provides a fast sensitivity study before full-wave evaluation." },
      { title: "Band-stop interpretation", text: "At resonance, energy is concentrated around the CSRR, through transmission is minimized, and the untransmitted energy is reflected. The continuous feed therefore produces a pronounced S21 notch rather than a pass-band peak." },
      { title: "Data contract", text: "Every exported trace contains frequency plus S21 data and is normalized to GHz. Real/imaginary three-column exports are also accepted, keeping the MATLAB pipeline compatible with alternative CST export formats." },
      { title: "Cross-validation", text: "Leave-one-out validation is used for fewer than 30 usable traces; otherwise the workflow uses up to five folds. RMSE, MAE, R², and maximum absolute error characterize the simulated calibration set." }
    ],
    results: [
      "Parametric lumped-element studies confirmed a strong and monotonic resonance shift with capacitive loading.",
      "Full-wave S-parameters exhibited pronounced transmission notches around −40 dB in the evaluated configurations.",
      "The combined CST–MATLAB workflow supports trace generation, feature extraction, regression, validation, and interactive inference.",
      "The physical interpretation remains explicit: the learned model estimates effective permittivity from resonance behavior; it does not claim unique chemical identification."
    ],
    limitations: [
      "Validation is based on simulated calibration data; no VNA-calibrated fabricated-sensor dataset is included.",
      "Different materials can share similar effective permittivity and cannot be uniquely identified from this response alone.",
      "Connector, fixture, temperature, moisture, manufacturing tolerance, and sample-placement uncertainty remain to be measured."
    ],
    tools: ["CST Studio Suite", "MATLAB", "CSRR", "S-Parameters", "Bagged Regression Trees", "Equivalent Circuits", "Microwave Sensing"],
    related: ["rf-filter-ai-synthesizer", "rfshield-lpf", "microwave-signal-loss-prediction"]
  },
  {
    order: 5,
    id: "PRJ-05",
    slug: "gps-receiver-rtl-sdr",
    title: "GPS Receiver with RTL-SDR",
    subtitle: "Software-Defined GPS L1 C/A Processing",
    category: "SDR & Navigation",
    group: "dsp",
    period: "October 2025–January 2026",
    status: "Offline SDR validation",
    visual: "satellite",
    github: "https://github.com/csondurr/GPS-REPEARTER",
    summary: "An offline software-defined receiver chain for GPS L1 C/A signals, covering acquisition, carrier/code tracking, frame synchronization, ephemeris extraction, and iterative least-squares positioning.",
    metrics: [
      { value: "2.048 MSps", label: "Sample rate" },
      { value: "8-bit I/Q", label: "Sample format" },
      { value: "4.8 m", label: "Position error" },
      { value: "2.1", label: "PDOP" }
    ],
    mission: "The project demonstrates that a complete GPS L1 C/A receive chain can be studied independently of a dedicated navigation receiver by processing recorded or legally generated IQ data in software.",
    challenge: "Acquisition can indicate a visible satellite while navigation decoding still fails. The critical issue was temporal alignment: an incorrect sample-start offset displaced the navigation preamble and produced repeated Wrong Subframe ID errors despite otherwise plausible tracking behavior.",
    formula: "R(τ, fᴅ) = Σ r[n] c[n−τ] e^(−j2πfᴅn/Fs)",
    architecture: [
      { title: "IQ source", text: "GPS L1 C/A intermediate-frequency or complex samples are ingested at 2.048 MSps with an 8-bit sample representation." },
      { title: "Parallel acquisition", text: "FFT-based Parallel Code Phase Search tests PRN code phase and Doppler bins efficiently to identify candidate satellites." },
      { title: "Tracking loops", text: "A second-order Costas loop tracks carrier error while a first-order DLL with Early-Minus-Late discrimination aligns the spreading code." },
      { title: "Navigation solution", text: "After bit and frame synchronization, ephemerides and pseudoranges feed an iterative least-squares position estimator." }
    ],
    methods: [
      { title: "Acquisition", text: "The received spectrum is multiplied by the conjugated FFT of each local C/A code replica. An inverse FFT returns the code-phase correlation surface for each Doppler hypothesis." },
      { title: "Carrier and code tracking", text: "Prompt correlator outputs drive the Costas discriminator; early and late correlators drive code alignment. Loop order and bandwidth are chosen to balance noise rejection and dynamic response." },
      { title: "Frame-synchronization repair", text: "Sampling-start offsets were swept and the recovered bit stream was checked against GPS preamble and subframe structure. Correct temporal alignment restored valid navigation words." },
      { title: "Positioning", text: "Decoded ephemeris parameters determine satellite positions. Receiver clock bias and ECEF position are solved iteratively from pseudorange residuals, then converted to geographic coordinates." }
    ],
    results: [
      "The acquisition, tracking, BPSK demodulation, navigation-message, and positioning stages were exercised as one receiver chain.",
      "The root cause of the frame anomaly was isolated to sampling-start alignment rather than weak correlation alone.",
      "The final coordinate solution reached a reported 4.8 m error with PDOP 2.1 in the controlled validation case.",
      "The repository preserves an offline research workflow and third-party provenance for SoftGNSS-derived components."
    ],
    limitations: [
      "The public archive does not include a single standard capture with a certified reference output.",
      "Performance on one simulated or recorded dataset does not establish robustness against oscillator error, interference, dynamics, or multipath in other environments.",
      "The work is restricted to lawful offline, recorded, simulated, or shielded testing; it does not authorize GNSS rebroadcast or spoofing."
    ],
    tools: ["MATLAB", "RTL-SDR", "GPS L1 C/A", "FFT-PCPS", "Costas Loop", "Delay-Lock Loop", "Least-Squares Positioning"],
    related: ["genesis-dsp", "vanta", "spectra-stm32"]
  },
  {
    order: 6,
    id: "PRJ-06",
    slug: "luxmeter",
    title: "Luxmeter",
    subtitle: "Arduino Illuminance Measurement Instrument",
    category: "Embedded Measurement",
    group: "embedded",
    period: "December 2022–January 2023",
    status: "Built prototype",
    visual: "lux",
    github: null,
    summary: "A first-year embedded measurement project that converts the response of a light-sensitive element into a calibrated digital estimate of ambient illuminance.",
    metrics: [
      { value: "ADC", label: "Acquisition method" },
      { value: "Lux", label: "Output quantity" },
      { value: "Arduino", label: "Controller" },
      { value: "Prototype", label: "Project stage" }
    ],
    mission: "The goal was to turn a physical environmental variable into a repeatable engineering measurement. The project established the complete chain from sensor response and voltage scaling to ADC sampling, calibration, conversion, and user-readable output.",
    challenge: "A light sensor does not inherently output lux. Its electrical response depends on sensitivity, supply, divider or conditioning network, ADC reference, geometry, and calibration conditions. The design therefore required both circuit-level and numerical treatment.",
    formula: "E[lx] = K · g(ADCcount, Vref)",
    architecture: [
      { title: "Optical sensing", text: "Ambient illumination changes the electrical response of the light-sensitive element." },
      { title: "Signal conditioning", text: "The sensor response is converted into a voltage that remains inside the microcontroller ADC range." },
      { title: "Digital conversion", text: "Arduino firmware samples and filters the ADC code before applying the calibration relationship." },
      { title: "Measurement output", text: "The calculated illuminance value is presented as the instrument output and can be compared with known lighting conditions." }
    ],
    methods: [
      { title: "Input-range design", text: "The analog stage is dimensioned so low and high illumination remain distinguishable without forcing the ADC into saturation." },
      { title: "Sampling stability", text: "Multiple samples are combined to reduce single-conversion noise and visible flicker-related variation." },
      { title: "Calibration", text: "ADC response is mapped to lux using controlled reference points. Calibration is treated as part of the instrument, not an optional afterthought." },
      { title: "Error awareness", text: "Sensor nonlinearity, spectral sensitivity, angle of incidence, ADC reference tolerance, and enclosure shadowing are identified as dominant uncertainty sources." }
    ],
    results: [
      "A functional Arduino-based instrument was designed and built as a first-year final project.",
      "The prototype demonstrated the full sensor-to-digital measurement path for ambient light.",
      "The work established practical experience in analog interfacing, ADC use, calibration, and embedded readout."
    ],
    limitations: [
      "No laboratory-grade uncertainty budget or traceable photometric calibration is claimed.",
      "The response depends on the spectral content and angle of the light source.",
      "A production instrument would require temperature characterization, calibrated references, and enclosure-level optical control."
    ],
    tools: ["Arduino", "ADC", "Sensor Interfacing", "Calibration", "Embedded C/C++", "Measurement Systems"],
    related: ["spectra-stm32", "solar-power-generation", "rf-filter-ai-synthesizer"]
  },
  {
    order: 7,
    id: "PRJ-07",
    slug: "100wpa",
    title: "100WPA",
    subtitle: "0.1–10 GHz Modular 100 W-Class RF Platform",
    category: "RF Power Electronics",
    group: "rf",
    period: "2026",
    status: "Fabrication release",
    visual: "pa",
    github: "https://github.com/csondurr/100W-PA-SYSTEM",
    summary: "A band-segmented RF power-amplifier architecture that divides 0.1–10 GHz into five dedicated GaN PA modules plus a common bias, enable, monitoring, and protection board.",
    metrics: [
      { value: "0.1–10 GHz", label: "Total coverage" },
      { value: "100 W-class", label: "Selected-band target" },
      { value: "5 + 1", label: "RF modules + control" },
      { value: "0 / 0", label: "DRC errors / warnings" }
    ],
    mission: "The project avoids forcing a single transistor and matching network across a 100:1 frequency ratio. Each band receives a device family, matching strategy, combining topology, bias network, layout, and thermal solution appropriate to its RF and power density.",
    challenge: "Optimum load impedance, package parasitics, gain, stability, physical line length, coherent combining, and heat density change dramatically from 100 MHz to 10 GHz. The architecture must preserve a 50 Ω system interface while allowing every internal power stage to operate near its own large-signal optimum.",
    formula: "Pout,total ≈ ηcomb · N · Pout,branch",
    architecture: [
      { title: "B1–B3 low/mid bands", text: "0.1–3.0 GHz is divided into three boards based on T1G4020036-FL, moving from lumped/transformer-style matching toward increasingly distributed networks." },
      { title: "B4 upper-mid band", text: "The 3.0–6.0 GHz module uses eight QPD1035 devices with a coherent corporate split/combine tree." },
      { title: "B5 microwave band", text: "The 6.0–10.0 GHz module uses twelve TGF2979-SM devices and a hierarchical microwave combining structure where layout and package parasitics dominate." },
      { title: "CTRL subsystem", text: "A separate board manages enable logic, negative-gate/drain sequencing, monitoring, and protection interfaces for the selected PA module." }
    ],
    methods: [
      { title: "Band-segmented design", text: "B1 covers 0.1–0.5 GHz, B2 0.5–1.5 GHz, B3 1.5–3.0 GHz, B4 3.0–6.0 GHz, and B5 6.0–10.0 GHz. This reduces the bandwidth demanded from each matching and combining network." },
      { title: "Power combining", text: "Amplitude and phase imbalance are treated as first-order design variables. The B4/B5 trees were evaluated statistically for line-length, dielectric, device, and layout variation." },
      { title: "Bias and protection", text: "The hardware concept enforces GaN-safe sequencing, current monitoring, reflected-power awareness, thermal sensing, and controlled enable behavior." },
      { title: "Thermal and mechanical integration", text: "An aluminium baseplate, controlled thermal interface, forced airflow, temperature sensing, and optional cold-plate compatibility are included in the system concept, with special attention to the high-density B5 module." }
    ],
    results: [
      "All five RF boards and the control board have recorded KiCad DRC status of zero errors and zero warnings.",
      "The B4 power tree reached approximately 0.418 dB P95 amplitude imbalance, 4.234° P95 phase imbalance, and 0.510 dB P95 insertion loss in the analytical tolerance campaign.",
      "The B5 tree reached approximately 0.452 dB, 4.457°, and 0.500 dB for the same P95 measures.",
      "Separate Gerber, drill, placement, board-source, documentation, and SHA-256 manifest packages were prepared for independent fabrication review."
    ],
    limitations: [
      "The 100 W-class value is a system target until calibrated large-signal measurements demonstrate output power, gain, PAE, stability, and harmonic behavior across every band.",
      "DRC completion establishes geometric consistency, not RF qualification.",
      "High-power testing requires rated loads, attenuators, couplers, cooling, safe bias sequencing, and RF exposure controls."
    ],
    tools: ["KiCad", "ADS", "GaN RF", "Impedance Matching", "Power Combining", "Bias Networks", "Thermal Design", "Gerber/DRC"],
    related: ["rfshield-lpf", "lpda-antenna", "vivaldi-antenna-balun"]
  },
  {
    order: 8,
    id: "PRJ-08",
    slug: "cem-computable-electromagnetic-medium",
    title: "CEM",
    subtitle: "Computable Electromagnetic Medium",
    category: "Physical Computing & RF",
    group: "dsp",
    period: "2026",
    status: "GNU Radio research",
    visual: "reservoir",
    github: null,
    summary: "A physical reservoir-computing study that treats multipath propagation as a high-dimensional dynamical medium with memory rather than only as a channel impairment.",
    metrics: [
      { value: "18.03", label: "Linear memory capacity" },
      { value: "12.40", label: "Effective state rank" },
      { value: "99.38%", label: "Temporal parity accuracy" },
      { value: "0.4313", label: "NARMA10 NRMSE" }
    ],
    mission: "CEM asks whether delay, phase, amplitude, and multipath diversity can perform useful computation before a conventional digital processor sees the data. Multiple receiver observations form a state vector; a nonlinear observation stage expands that state; and a trained linear readout solves memory and nonlinear benchmark tasks.",
    challenge: "The medium must provide memory without becoming redundant. Too little multipath gives insufficient temporal richness, while highly correlated observations reduce effective dimensionality. The design therefore measures rank, repeatability, recall, drift, and task performance together.",
    formula: "x[n] = φ([y₁[n], …, yM[n]]),     ŷ[n] = Wout x[n]",
    architecture: [
      { title: "Electromagnetic state formation", text: "A common input reaches several observation channels through different delays, phases, and amplitudes, producing a distributed physical state." },
      { title: "Nonlinear observation", text: "Measured or simulated channel outputs pass through a controlled nonlinear mapping to expose interactions that a purely linear readout can exploit." },
      { title: "Linear readout", text: "Only the output weights are trained. The propagation medium and observation layer supply memory and feature expansion." },
      { title: "Recalibration", text: "When the environment changes, the medium is not rebuilt; new readout weights are learned from the altered state basis." }
    ],
    methods: [
      { title: "State quality", text: "Effective rank and correlation analysis quantify whether receiver channels contribute independent information rather than duplicated measurements." },
      { title: "Memory benchmark", text: "Delayed-input reconstruction measures how much of the recent input history remains linearly accessible in the electromagnetic state." },
      { title: "Nonlinear benchmark", text: "NARMA10 and temporal parity tasks test whether the state contains useful nonlinear combinations of previous inputs, not only delay memory." },
      { title: "Environmental drift", text: "Propagation changes are applied and performance is recovered through readout retraining, demonstrating the distinction between a changing physical substrate and a reusable learning procedure." }
    ],
    results: [
      "The measured linear memory capacity was 18.03 with an effective state rank of 12.40.",
      "Temporal parity accuracy reached 99.38% in the validated configuration.",
      "NARMA10 performance reached an NRMSE of 0.4313.",
      "Recalibration recovered useful performance after environmental change, supporting the concept of a re-trainable electromagnetic computing substrate."
    ],
    limitations: [
      "Benchmark performance depends on the selected channel geometry, observation nonlinearity, training sequence, and drift model.",
      "The study demonstrates computational behavior; it does not imply that every multipath environment is automatically a useful reservoir.",
      "A deployable version requires synchronized multi-channel hardware, calibration, latency analysis, and measured energy/throughput comparison with digital alternatives."
    ],
    tools: ["GNU Radio", "Python", "Reservoir Computing", "Multipath Channels", "Linear Readout", "NARMA10", "Temporal Memory"],
    related: ["engram", "genesis-dsp", "entropy-vna"]
  },
  {
    order: 9,
    id: "PRJ-09",
    slug: "entropy-vna",
    title: "ENTROPY-VNA",
    subtitle: "Covariance-Based RF System Identification",
    category: "RF Measurement Science",
    group: "rf",
    period: "2026",
    status: "Research thesis",
    visual: "vna",
    github: null,
    summary: "A measurement concept that reconstructs delay, complex transfer behavior, and a general two-port S-matrix from the covariance transformation of programmed stochastic excitation.",
    metrics: [
      { value: "2-port", label: "General S-matrix" },
      { value: "Complex", label: "Transfer recovery" },
      { value: "Joint", label: "CFO estimation" },
      { value: "Stress-tested", label: "Model boundary" }
    ],
    mission: "ENTROPY-VNA questions the assumption that an RF system must always be excited by a deterministic waveform with known instantaneous phase. It instead programs the second-order structure of a random excitation and infers the device from how that covariance geometry changes.",
    challenge: "Covariance discards individual waveform realization, so phase and delay information must be encoded indirectly through cross-channel structure, cyclic shifts, controlled statistics, and calibration. Identifiability—not only numerical fitting—is the core problem.",
    formula: "Ry = H Rx Hᴴ + Rn",
    architecture: [
      { title: "Programmed randomness", text: "The excitation is stochastic at the sample level but has a deliberately designed covariance and cross-covariance structure." },
      { title: "RF device under test", text: "The unknown network transforms the excitation through its complex transfer function or two-port scattering operator." },
      { title: "Covariance acquisition", text: "Repeated observations estimate output and cross-channel covariance matrices rather than relying on one deterministic trace." },
      { title: "Inverse estimator", text: "Delay, transfer response, calibration terms, CFO, and S-parameters are jointly recovered under physical constraints." }
    ],
    methods: [
      { title: "Delay and phase encoding", text: "Cyclic and cross-channel covariance patterns make time displacement and complex rotation observable in matrix structure." },
      { title: "Two-port reconstruction", text: "Multiple stochastic excitation states are applied so the four complex S-parameters are not collapsed into an underdetermined single-output problem." },
      { title: "CFO as a state variable", text: "Carrier-frequency offset first appears as covariance corruption. Once placed inside the observation model, its structured phase progression becomes a jointly estimable calibration variable." },
      { title: "Robustness campaign", text: "The estimator is challenged with additive noise, calibration error, drift, nonlinearity, and frequency offset to separate structural identifiability from ideal-case curve fitting." }
    ],
    results: [
      "The study recovered propagation delay and a complex transfer function from programmed stochastic covariance.",
      "The formulation was extended from a scalar channel to a general two-port S-matrix.",
      "CFO was transformed from an uncontrolled error into a self-calibrating variable through joint estimation.",
      "Noise, calibration mismatch, drift, and nonlinearity experiments defined where covariance-based identification remains reliable."
    ],
    limitations: [
      "Covariance estimates require a sufficient observation length; short records increase matrix uncertainty.",
      "The excitation set must satisfy rank and identifiability conditions for the selected network model.",
      "Traceability against a calibrated commercial VNA and physical standards remains an essential experimental milestone."
    ],
    tools: ["MATLAB", "RF System Identification", "Covariance Estimation", "S-Parameters", "Stochastic Processes", "Calibration", "Two-Port Networks"],
    related: ["microwave-signal-loss-prediction", "cem-computable-electromagnetic-medium", "vanta"]
  },
  {
    order: 10,
    id: "PRJ-10",
    slug: "lpda-antenna",
    title: "LPDA Antenna",
    subtitle: "2.4–5.8 GHz Directional Twin-Boom Array",
    category: "Antenna Engineering",
    group: "antenna",
    period: "2026",
    status: "CST-validated design",
    visual: "lpda",
    github: "https://github.com/csondurr/wideband-lpda-antenna",
    summary: "A 20-element, air-dielectric, twin-boom log-periodic dipole array developed for wideband directional RF operation and pan-tilt integration.",
    metrics: [
      { value: "20", label: "Dipole elements" },
      { value: "2.4–5.8 GHz", label: "Target band" },
      { value: "9.40 dBi", label: "Gain at 5.8 GHz" },
      { value: "≈1.35–1.40", label: "VSWR at 5.8 GHz" }
    ],
    mission: "The LPDA provides a mechanically robust directional antenna whose active region migrates along the boom with frequency, enabling broad coverage without a separate narrowband radiator for each channel.",
    challenge: "Scaling element lengths alone is insufficient. Element spacing, boom impedance, feed reversal, conductor loss, support geometry, and the active-region transition must remain consistent across more than an octave while preserving a stable end-fire pattern.",
    formula: "Lₙ₊₁ = τLₙ,     Rₙ₊₁ = τRₙ,     σ = sₙ / (2Lₙ)",
    architecture: [
      { title: "Log-periodic geometry", text: "Twenty dipoles follow a constant geometric scale factor so a similar electrical structure repeats as frequency changes." },
      { title: "Twin-boom feed", text: "The two conductive booms provide balanced excitation and alternate phase connection between adjacent elements." },
      { title: "Air dielectric", text: "The structure minimizes dielectric loss and improves power handling compared with a fully printed long-feed arrangement." },
      { title: "Directional platform", text: "Mechanical integration anticipates field mounting and pan-tilt steering for controlled directional transmission or reception." }
    ],
    methods: [
      { title: "Frequency-domain simulation", text: "A tetrahedral adaptive HF solver evaluates S11, VSWR, realized gain, directivity, efficiency, current distribution, and far-field behavior over 2.0–6.5 GHz." },
      { title: "Realistic conductors", text: "Finite-conductivity aluminium and a physical-shadow model for the 50 Ω feed are included so matching is not credited to an ideal PEC-only structure." },
      { title: "Active-region verification", text: "Surface-current distributions at multiple frequencies confirm that the radiating region shifts from longer to shorter elements as expected." },
      { title: "Field-use constraints", text: "Boom rigidity, feed choke behavior, mounting effects, connector transition, and high-power clearances are treated as part of the antenna system." }
    ],
    results: [
      "At 2.4 GHz the model produced approximately −22 dB S11, 1.16 VSWR, and 8.661 dBi realized gain.",
      "At 5.8 GHz the model produced approximately −15.5 to −16 dB S11, 1.35–1.40 VSWR, and 9.398 dBi realized gain.",
      "The directional radiation pattern remained stable across the target band.",
      "Far-field monitors were evaluated at 2.4, 2.45, 5.2, 5.8, and 6.0 GHz."
    ],
    limitations: [
      "The reported performance is simulation-based and requires VNA, gain, pattern, and front-to-back measurements on fabricated hardware.",
      "Cable routing, boom support, pan-tilt structure, nearby equipment, and feed-current suppression can alter the measured pattern.",
      "High-power qualification requires connector, corona, heating, and duty-cycle testing."
    ],
    tools: ["CST Studio Suite", "LPDA", "HF Frequency Domain", "Adaptive Meshing", "Far-Field Analysis", "Antenna Mechanics"],
    related: ["vivaldi-antenna-balun", "100wpa", "engram"]
  },
  {
    order: 11,
    id: "PRJ-11",
    slug: "morpheus",
    title: "MORPHEUS",
    subtitle: "Programmable Electromagnetic Identity Rewriting",
    category: "Radar & Computational Electromagnetics",
    group: "rf",
    period: "2026",
    status: "Computational research",
    visual: "shell",
    github: "https://github.com/csondurr/MORPHEUS",
    summary: "A 64-cell active Huygens-shell research platform that computes amplitude-and-phase commands intended to transform the complex radar scattering response of a physical object into that of a selected virtual target.",
    metrics: [
      { value: "64", label: "Active controls" },
      { value: "48", label: "Complex channels" },
      { value: "32 + OFF", label: "Cell states" },
      { value: "95.67%", label: "Monte Carlo pass rate" }
    ],
    mission: "MORPHEUS extends electromagnetic memory into operator synthesis. Rather than only reducing radar cross section, the shell is commanded to reproduce the complex scattering signature of a smaller enclosure, a dielectric body, a dual-scatterer target, or another defined virtual identity.",
    challenge: "The desired response must match amplitude and phase across frequency, incidence angle, observation angle, and polarization while commands remain quantized, power-limited, mutually coupled, fault-tolerant, and physically placed on a closed surface.",
    formula: "G u ≈ (Sv − Sp) a",
    architecture: [
      { title: "Physical and virtual operators", text: "Sp represents the scattering of the physical target; Sv represents the selected virtual identity over the same channel basis." },
      { title: "Active Huygens shell", text: "A closed ellipsoidal surface carries 64 active cells distributed by a Fibonacci layout and oriented in local tangential frames." },
      { title: "MORPHEUS Compiler", text: "A constrained inverse solver converts the required field difference into amplitude-and-phase commands for the available cell-state alphabet." },
      { title: "Adaptive recompilation", text: "Calibration error, cell failure, frequency shift, geometry tolerance, and environmental drift trigger a new command solution rather than a fixed lookup response." }
    ],
    methods: [
      { title: "Operator formulation", text: "The physical target, virtual target, and shell are all represented in a common complex observation basis spanning HH, HV, VH, and VV polarization channels." },
      { title: "Controllability analysis", text: "Rank, effective rank, singular values, condition number, and controllable-energy fraction determine whether the chosen shell basis can synthesize the required response before command optimization begins." },
      { title: "Quantized command synthesis", text: "Continuous least-squares commands are regularized, constrained, mapped to 32 active states plus OFF, and re-evaluated after quantization." },
      { title: "Independent validation", text: "Holdout incidence, observation, frequency, polarization, material tolerance, geometry tolerance, temperature drift, panel deformation, cell faults, and Monte Carlo cases are evaluated separately from the command-fitting set." }
    ],
    results: [
      "The 48 × 64 control operator reached row rank 48 and effective rank 40, above the required 36.",
      "Quantized residuals were 0.1161 for the smaller enclosure, 0.0892 for the dielectric body, and 0.1556 for the dual-scatterer identity.",
      "Unseen-incidence and unseen-observation residuals were 0.1051 and 0.1001 respectively.",
      "A 600-run robustness campaign produced a 95.67% pass rate, with an approximate Wilson 95% interval of 93.7–97.0%.",
      "The worst reported full-polarization holdout residual was 0.5193, identifying polarization generalization as a demanding boundary."
    ],
    limitations: [
      "The current results are computational and do not constitute fabricated active-shell or radar-range validation.",
      "Power amplifier linearity, inter-cell coupling, timing coherence, thermal stability, calibration drift, and closed-loop sensing must be demonstrated on hardware.",
      "The transformation is defined only over the evaluated frequency-angle-polarization basis; behavior outside that basis is not guaranteed."
    ],
    tools: ["MATLAB R2025b", "CST Studio Suite", "Huygens Surfaces", "Inverse Problems", "SVD", "Radar Scattering", "Monte Carlo Analysis"],
    related: ["engram", "entropy-vna", "lpda-antenna"]
  },
  {
    order: 12,
    id: "PRJ-12",
    slug: "rf-filter-ai-synthesizer",
    title: "RF Filter AI Synthesizer",
    subtitle: "Magnitude-and-Phase CNN Regression",
    category: "RF + Artificial Intelligence",
    group: "data",
    period: "2026",
    status: "Simulation ML prototype",
    visual: "ai-filter",
    github: "https://github.com/csondurr/RF-AI-SYNTHESIZER",
    summary: "A dual-channel one-dimensional CNN that estimates an RF filter's center-frequency and bandwidth parameter directly from noisy magnitude and unwrapped-phase responses.",
    metrics: [
      { value: "2,500", label: "Synthetic responses" },
      { value: "1,001", label: "Frequency points" },
      { value: "2–11 GHz", label: "Observation window" },
      { value: "2", label: "Regression outputs" }
    ],
    mission: "The project replaces manual curve inspection with a learned inverse map from complete magnitude/phase behavior to two continuous filter parameters. It also provides an English/Turkish desktop interface for controlled testing and visualization.",
    challenge: "A model can appear accurate by exploiting the location of a magnitude peak while ignoring phase or learning simulation-specific artifacts. The dataset, architecture, normalization, and limitations are therefore documented explicitly.",
    formula: "Ω = (f − fc)/BW,     H(f) = 1/(1 + jΩ)⁵",
    architecture: [
      { title: "Synthetic RF generator", text: "Random center frequency and bandwidth parameters generate a complex fifth-order response over 1,001 points from 2 to 11 GHz." },
      { title: "Dual-channel tensor", text: "Magnitude in dB and unwrapped phase in radians are stored as two channels with independently applied Gaussian noise." },
      { title: "1D convolutional regressor", text: "Three convolution blocks learn local and progressively wider spectral features before a fully connected two-output regression head." },
      { title: "Bilingual application", text: "The user defines a test response, adjusts noise, runs inference, and compares true/predicted parameters with magnitude and phase plots." }
    ],
    methods: [
      { title: "Dataset design", text: "The center-frequency range is 4.5–8.5 GHz and the bandwidth scale is 0.1–2.0 GHz. Two thousand samples are used approximately for training and five hundred for holdout evaluation." },
      { title: "Noise injection", text: "Magnitude receives up to 0.3 dB Gaussian noise and phase up to 0.02 rad. This forces the network to use distributed curve structure rather than exact noiseless points." },
      { title: "Network topology", text: "The model uses 32, 64, and 128 convolution filters with frequency-axis kernels of 21, 11, and 5 samples, plus batch normalization, leaky ReLU, and max pooling." },
      { title: "Target normalization", text: "Both physical outputs are mapped to [0,1] for training and returned to GHz after inference, keeping gradient scales comparable." }
    ],
    results: [
      "The platform demonstrates end-to-end generation, training, model persistence, interactive inference, and bilingual visualization.",
      "The accompanying study cites expected normalized RMSE around 0.01–0.02, corresponding approximately to 40–80 MHz center-frequency error and 19–38 MHz bandwidth-parameter error.",
      "Those figures are presented as expectations rather than fixed-seed repository benchmarks; the page avoids treating them as certified measured performance.",
      "Both magnitude and phase are retained as model inputs, allowing future transfer toward measured S-parameter datasets."
    ],
    limitations: [
      "The training data uses one synthetic repeated-pole model and does not span arbitrary measured filter families.",
      "The learned BW output is the model scale parameter, not automatically the conventional full 3 dB bandwidth.",
      "Measured VNA transfer requires calibration, domain adaptation, fixed-seed benchmarking, and uncertainty reporting."
    ],
    tools: ["MATLAB", "Deep Learning Toolbox", "1D CNN", "RF Filters", "Magnitude/Phase", "Synthetic Data", "Regression"],
    related: ["csrr-microwave-dielectric-sensor", "rfshield-lpf", "microwave-signal-loss-prediction"]
  },
  {
    order: 13,
    id: "PRJ-13",
    slug: "rfshield-lpf",
    title: "RFShield LPF",
    subtitle: "108–500 MHz Seventh-Order Low-Pass Filter",
    category: "RF PCB Design",
    group: "rf",
    period: "2026",
    status: "Engineering prototype",
    visual: "lpf",
    github: "https://github.com/csondurr/RFShield-LPF",
    summary: "A 50 Ω, seventh-order Chebyshev-style low-pass network developed through component optimization, PCB-aware parasitic modeling, Monte Carlo tolerance analysis, controlled-impedance layout, and manufacturing-output preparation.",
    metrics: [
      { value: "108–500 MHz", label: "Intended passband" },
      { value: "0.408 dB", label: "Predicted worst IL" },
      { value: "30.837 dB", label: "Attenuation at 1 GHz" },
      { value: "0 / 0", label: "REV_C DRC / unrouted" }
    ],
    mission: "RFShield LPF preserves wanted VHF/UHF signals while suppressing higher-frequency content and harmonics. The design connects ideal filter synthesis to the non-ideal behavior of real parts, microstrip sections, connector launches, via fences, and ground return paths.",
    challenge: "At the upper passband, the inductors, capacitors, pads, vias, transmission lines, and SMA transitions are no longer ideal lumped elements. Small parasitics can move the response or degrade return loss, so the PCB must be part of the electrical model.",
    formula: "Lk = gkZ₀/ωc,     Ck = gk/(Z₀ωc)",
    architecture: [
      { title: "Symmetric ladder", text: "The signal path uses four series inductors and three shunt capacitors in a seventh-order L–C ladder between 50 Ω SMA interfaces." },
      { title: "PCB-aware model", text: "Component ESR/ESL, finite Q, microstrip delay/loss, pads, and interconnect sections are cascaded through ABCD matrices." },
      { title: "Controlled-impedance PCB", text: "A two-layer FR-4 stack with 1.60 mm finished thickness, 35 µm copper, 50 Ω launches, short shunt returns, and a ground via fence forms the layout baseline." },
      { title: "Tolerance verification", text: "Component variation is sampled and the passband/stopband gates are checked statistically before fabrication output is accepted." }
    ],
    methods: [
      { title: "Component selection", text: "The final network uses 8.2 nH outer inductors, 15 nH inner inductors, and three 4.3 pF C0G/NP0 shunt capacitors selected for high-Q RF behavior." },
      { title: "Design gates", text: "Analytical acceptance requires no more than 1 dB passband loss, at least 12 dB passband return loss, at least 25 dB attenuation at 1 GHz, and a Monte Carlo pass rate of at least 95%." },
      { title: "Ground integrity", text: "Shunt-capacitor returns are minimized, SMA launches reference the same continuous plane, and top/bottom ground structures are joined by a corrected via-fence geometry." },
      { title: "Manufacturing review", text: "KiCad source, stack-up assumptions, placement, DRC, traceability reports, and Gerber outputs are documented so a board house and RF reviewer can challenge the design assumptions." }
    ],
    results: [
      "PCB-aware analysis predicted 0.408 dB worst-case insertion loss and 23.370 dB worst-case return loss across 108–500 MHz.",
      "Predicted attenuation at 1 GHz was 30.837 dB and passband ripple was 0.242 dB.",
      "The corrected REV_C geometry reached zero DRC violations and zero unconnected items.",
      "The published values are analytical/model results; no measured VNA claim is presented as completed hardware evidence."
    ],
    limitations: [
      "A fabricated board must be measured for S11, S21, group delay, temperature drift, and unit-to-unit variation.",
      "FR-4 dielectric variation and connector-launch geometry can materially alter response near 500 MHz and above.",
      "Power handling, harmonic compliance, and EMC behavior require application-specific validation."
    ],
    tools: ["KiCad 9", "Python", "ABCD Matrices", "Monte Carlo Analysis", "Chebyshev Filters", "Microstrip", "Gerber/DRC"],
    related: ["100wpa", "rf-filter-ai-synthesizer", "csrr-microwave-dielectric-sensor"]
  },
  {
    order: 14,
    id: "PRJ-14",
    slug: "spectra-stm32",
    title: "SPECTRA-STM32",
    subtitle: "Adaptive Electromagnetic Environment Monitor",
    category: "Embedded RF Intelligence",
    group: "embedded",
    period: "2026",
    status: "Software-build verified",
    visual: "embedded",
    github: "https://github.com/csondurr/Spectra-STM32",
    summary: "An STM32H743 embedded platform that learns normal multiband RF behavior, detects narrowband, broadband, and temporal anomalies, and reports confidence plus explainable reason codes.",
    metrics: [
      { value: "STM32H743", label: "Target MCU" },
      { value: "400 MHz", label: "Clock baseline" },
      { value: "10,904 B", label: "Flash image" },
      { value: "29,728 B", label: "RAM image" }
    ],
    mission: "SPECTRA-STM32 is designed as a passive, explainable RF-environment monitor. Rather than applying one fixed threshold everywhere, it builds per-band statistical memory and distinguishes abnormal power, occupancy, noise-floor, and temporal behavior from the learned baseline.",
    challenge: "An anomaly detector must separate a true RF change from sensor saturation, insufficient learning, invalid channels, storage faults, clock faults, and ordinary environmental drift. Confidence and health state therefore accompany every decision.",
    formula: "A = clip(Σ wi·ei, 0, 100),     Ti = μi + kσi + margin",
    architecture: [
      { title: "Four-band acquisition", text: "External filter/detector channels feed protected ADC inputs. Firmware filters and calibrates each band before feature extraction." },
      { title: "Environment memory", text: "Mean, variance, noise floor, occupancy, and temporal behavior are learned in explicit Learning, Ready, and Frozen states." },
      { title: "Explainable anomaly engine", text: "Power excess, temporal step, occupancy, noise-floor rise, narrowband dominance, and broadband rise contribute evidence and reason masks." },
      { title: "Mission services", text: "TFT pages, RTC timestamps, microSD records, UART telemetry, watchdog, reset-cause tracking, CRC checks, and fault management support field operation." }
    ],
    methods: [
      { title: "Adaptive thresholds", text: "Each band uses a baseline-relative threshold with a sigma multiplier and minimum dB margin. Default engineering values include k=4, 6 dB minimum margin, 8 dB temporal-step threshold, and 0.70 occupancy threshold." },
      { title: "Classification", text: "Evidence patterns are mapped to None, Narrowband, Broadband, Temporal, Mixed, or Invalid classes. Classification is kept separate from the raw anomaly score." },
      { title: "Confidence model", text: "Confidence increases with valid channels, baseline maturity, agreeing evidence, and healthy storage/timing; it decreases during learning, saturation, reset, missed deadlines, or subsystem faults." },
      { title: "Embedded verification", text: "The source tree, build references, MCU target, application integration, compiler outputs, file manifests, fault-oriented tests, and ARM ELF header were audited as one package." }
    ],
    results: [
      "The application builds for STM32H743ZIT6 and generates valid ELF, HEX, and BIN artifacts.",
      "The compiled baseline uses 10,904 bytes of Flash and 29,728 bytes of RAM before final hardware drivers and production assets.",
      "Source/binary consistency and the software build passed the repository audit.",
      "Performance targets are at least 100 Hz measurement processing, at least 10 Hz display refresh, and less than 500 ms sustained-anomaly reporting latency."
    ],
    limitations: [
      "Physical RF calibration, detector dynamic range, filter selectivity, hardware timing, TFT, microSD, RTC, UART/USB, watchdog, EMC, and thermal behavior have not yet been demonstrated on the complete prototype.",
      "The system is a passive monitor; it does not transmit, jam, decode message content, guarantee emitter identity, or claim precise geolocation.",
      "Final thresholds and confidence calibration require recorded field data and controlled RF injection tests."
    ],
    tools: ["STM32H743", "STM32CubeIDE", "C/C++", "CMSIS", "ADC", "FATFS", "TFT", "Embedded Anomaly Detection"],
    related: ["gps-receiver-rtl-sdr", "vanta", "luxmeter"]
  },
  {
    order: 15,
    id: "PRJ-15",
    slug: "solar-power-generation",
    title: "Solar Power Generation",
    subtitle: "Photovoltaic Energy Conversion Study",
    category: "Energy Systems",
    group: "energy",
    period: "University project",
    status: "Engineering study",
    visual: "solar",
    github: null,
    summary: "An electrical-engineering study of the path from photovoltaic generation to a usable DC electrical output, including source behavior, conversion, regulation, protection, and PCB-level power-flow considerations.",
    metrics: [
      { value: "PV", label: "Primary source" },
      { value: "DC", label: "Conversion domain" },
      { value: "MPPT", label: "Operating principle" },
      { value: "PCB", label: "Implementation focus" }
    ],
    mission: "The project frames a solar panel as a nonlinear electrical source rather than an ideal battery. The engineering objective is to extract useful power across changing irradiance and temperature while protecting the source, converter, storage path, and load.",
    challenge: "A photovoltaic module has one maximum-power point that moves continuously. A fixed electrical load rarely keeps the panel at that point, and poorly designed conversion can waste energy or destabilize the operating point.",
    formula: "Ppv = Vpv·Ipv,     η = Pout/Pin",
    architecture: [
      { title: "PV source", text: "The panel I–V curve changes with irradiance and cell temperature, defining the available voltage, current, and maximum-power point." },
      { title: "Sensing", text: "Voltage and current measurements provide the information needed to estimate instantaneous input power and enforce safe operating limits." },
      { title: "DC conversion", text: "A controlled converter changes the electrical load reflected to the panel while regulating the downstream DC bus." },
      { title: "Protection and output", text: "Reverse-current, overvoltage, overcurrent, temperature, connector, grounding, and energy-storage interfaces complete the power path." }
    ],
    methods: [
      { title: "Operating-point analysis", text: "The panel is evaluated over irradiance and temperature changes to show why open-circuit voltage and short-circuit current alone do not define usable energy." },
      { title: "Maximum-power tracking", text: "The controller perturbs duty cycle or uses an equivalent search rule to move the operating point toward the peak of the P–V curve without destabilizing the converter." },
      { title: "Power-stage design", text: "Switch, diode or synchronous device, inductor, capacitor, current path, copper width, switching frequency, ripple, and thermal loss are treated as one converter problem." },
      { title: "PCB integrity", text: "High-current loops are kept short, sensing returns are separated from switching currents, and protection devices are placed at the interfaces they protect." }
    ],
    results: [
      "The study established the complete functional chain from photovoltaic source behavior to regulated electrical output.",
      "The design work emphasized power balance, conversion efficiency, measurement, and protection instead of treating the panel as a fixed-voltage source.",
      "PCB layout considerations were incorporated into the electrical architecture."
    ],
    limitations: [
      "No public repository or certified outdoor energy-yield dataset is attached to this project.",
      "Final efficiency, thermal rise, MPPT accuracy, and lifetime require a defined panel, converter, storage element, load profile, and measured environmental campaign.",
      "Grid-connected operation would require isolation, protection, anti-islanding, and regulatory compliance beyond this project scope."
    ],
    tools: ["Photovoltaics", "DC–DC Conversion", "MPPT", "PCB Design", "Power Measurement", "Protection", "Energy Systems"],
    related: ["luxmeter", "spectra-stm32", "100wpa"]
  },
  {
    order: 16,
    id: "PRJ-16",
    slug: "vanta",
    title: "VANTA",
    subtitle: "Virtual Aperture from Nonlinear Transfer Artifacts",
    category: "Experimental RF & SDR",
    group: "dsp",
    period: "2026",
    status: "Hardware-measured research",
    visual: "nonlinear",
    github: null,
    summary: "An RTL-SDR Blog V4 measurement study that treats receiver compression, intermodulation, and gain-dependent spectral redistribution as structured observations capable of carrying additional information.",
    metrics: [
      { value: "RTL-SDR V4", label: "Measured hardware" },
      { value: "2.048 MSps", label: "FM capture rate" },
      { value: "65,536", label: "Two-tone FFT record" },
      { value: "0–49.6 dB", label: "Gain-state sweep" }
    ],
    mission: "VANTA reverses the usual receiver-design question. Instead of asking only how to remove nonlinear artifacts, it asks whether those artifacts form repeatable transfer signatures that reveal input level, receiver state, or spectral context.",
    challenge: "Nonlinearity is useful only if it is repeatable and separable from drift, quantization, AGC behavior, DC offset, local-oscillator error, and ordinary noise. The project therefore begins with controlled hardware characterization before proposing an information model.",
    formula: "y = a₁x + a₃|x|²x + a₅|x|⁴x + …",
    architecture: [
      { title: "Controlled RF input", text: "Two-tone and broadcast-FM scenarios provide narrowband and wideband excitation with known acquisition settings." },
      { title: "Receiver state sweep", text: "Tuner gain, center frequency, and input condition are varied while sample rate, record length, and analysis windows remain controlled." },
      { title: "Artifact extraction", text: "Fundamentals, harmonics, IM products, compression behavior, noise floor, and redistributed spectral energy form the nonlinear feature vector." },
      { title: "Virtual-aperture interpretation", text: "Different gain/nonlinear states are treated as additional observation channels generated by one physical receiver front end." }
    ],
    methods: [
      { title: "Two-tone characterization", text: "At 1.024 MSps with 65,536 samples, tones at 125 kHz and 200 kHz relative offset expose third-order intermodulation products and compression onset." },
      { title: "Gain-dependent capture", text: "FM-band captures at 2.048 MSps and 32,768-sample frames are repeated across tuner-gain states from 0 to 49.6 dB to test repeatability." },
      { title: "LO-shift control", text: "Center frequencies around 100 MHz are shifted to separate true RF structure from receiver DC/zero-IF artifacts." },
      { title: "Feature consistency", text: "Amplitude error, spectral ratios, artifact location, and repeated-capture agreement determine whether a nonlinear signature is usable as an observation rather than random distortion." }
    ],
    results: [
      "Real RTL-SDR Blog V4 measurements exposed receiver compression and third-order intermodulation behavior.",
      "The controlled two-tone layer achieved approximately 8×10⁻⁵% relative amplitude error in the reference numerical check.",
      "Gain-dependent FM captures documented systematic changes in spectral structure across the available tuner states.",
      "The study established an experimental path for using receiver imperfections as additional measurement dimensions while retaining conventional linear data as the reference channel."
    ],
    limitations: [
      "Results currently apply to the tested RTL-SDR Blog V4 unit, gain table, sample rates, and input scenarios.",
      "Useful nonlinear information must not be confused with calibrated absolute power or frequency response.",
      "Future work requires multi-device repeatability, temperature drift, input-level calibration, anti-alias control, and independent blind-scene tests."
    ],
    tools: ["RTL-SDR Blog V4", "MATLAB", "Nonlinear RF", "Intermodulation", "Spectrum Analysis", "IQ Capture", "Experimental Measurement"],
    related: ["genesis-dsp", "entropy-vna", "gps-receiver-rtl-sdr"]
  },
  {
    order: 17,
    id: "PRJ-17",
    slug: "vivaldi-antenna-balun",
    title: "Vivaldi Antenna–Balun",
    subtitle: "2–6 GHz Balanced Tapered-Slot Front End",
    category: "Antenna Engineering",
    group: "antenna",
    period: "2026",
    status: "CST + fabrication data",
    visual: "vivaldi",
    github: "https://github.com/csondurr/wideband-vivaldi-antenna-balun",
    summary: "A balanced 2–6 GHz tapered-slot Vivaldi antenna, dedicated 50 Ω single-ended to 100 Ω differential balun, and two-antenna phase-interferometry configuration developed as one broadband RF front end.",
    metrics: [
      { value: "2–6 GHz", label: "Design band" },
      { value: "155 × 215 mm", label: "Antenna size" },
      { value: "8.79 dBi", label: "Directivity at 4 GHz" },
      { value: "220 mm", label: "Interferometer spacing" }
    ],
    mission: "The project couples the antenna and feed transition as one system. The antenna requires a balanced differential drive, so the balun is not treated as an accessory; it is part of the RF architecture that determines matching, common-mode behavior, and phase accuracy.",
    challenge: "Broadband end-fire radiation must be preserved while transforming a conventional 50 Ω single-ended chain into a nominal 100 Ω differential feed. For direction finding, the two complete channels must also maintain calibrated amplitude and phase symmetry.",
    formula: "Δφ = (2πd/λ) sinθ",
    architecture: [
      { title: "Tapered-slot radiator", text: "A balanced Vivaldi aperture expands from the feed region to a 122 mm opening on a 155 × 215 mm RO4350B-like substrate." },
      { title: "Wideband balun", text: "The transition accepts a 50 Ω single-ended input and produces a balanced pair for the antenna's nominal 100 Ω differential feed." },
      { title: "Material-realistic model", text: "Finite-conductivity copper, dielectric loss, open boundaries, feed-gap tolerance, and permittivity tolerance are included." },
      { title: "Interferometer pair", text: "Two identical antennas are separated by 220 mm and evaluated for matching and coupling before phase-based angle estimation." }
    ],
    methods: [
      { title: "Antenna optimization", text: "Taper profile, cavity radii, feed position, 0.50 mm gap, aperture width, and board size are tuned to keep S11 below −10 dB across 2–6 GHz." },
      { title: "Boundary and impedance studies", text: "Open-boundary distances of 0.35, 0.50, and 0.80 wavelength and port references of 50, 75, and 100 Ω test model sensitivity." },
      { title: "Tolerance campaign", text: "Feed-gap variation of ±0.10 mm and substrate-permittivity variation of ±0.05 are evaluated with lossy and PEC comparisons." },
      { title: "Phase-interferometry path", text: "Low mutual coupling, equal electrical paths, balun symmetry, and cable/receiver calibration form the prerequisite chain for angle-of-arrival estimation." }
    ],
    results: [
      "The lossy antenna model remained below the −10 dB S11 criterion across the complete 2–6 GHz band, with approximately −11.4 to −16.6 dB values.",
      "Simulated directivity was 7.167 dBi at 2 GHz, 8.790 dBi at 4 GHz, and 8.142 dBi at 6 GHz.",
      "Total efficiency was approximately −0.488 dB, −0.433 dB, and −0.471 dB at 2, 4, and 6 GHz respectively.",
      "The two-antenna model produced approximately −58 to −80 dB S21 coupling while both ports retained the target matching criterion.",
      "CST models and Gerber packages are available for both the antenna and the balun."
    ],
    limitations: [
      "The numerical model requires fabricated antenna/balun VNA measurement, gain/pattern testing, and common-mode characterization.",
      "Phase-based direction finding requires calibration of cables, baluns, connectors, receiver channels, and mounting structure as one end-to-end system.",
      "The very low simulated coupling must be confirmed in the actual mechanical environment."
    ],
    tools: ["CST Studio Suite", "Vivaldi Antenna", "Wideband Balun", "RO4350B", "S-Parameters", "Phase Interferometry", "Gerber"],
    related: ["lpda-antenna", "100wpa", "gps-receiver-rtl-sdr"]
  }
];
