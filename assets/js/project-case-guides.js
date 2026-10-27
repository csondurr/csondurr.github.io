/* Project-specific reading guides. These explain existing verified records;
   they do not add unmeasured experimental results. */
window.PROJECT_CASE_GUIDES = Object.freeze({
  "engram": {
    question:"Can a programmable surface remember a radio scene and reconstruct the corresponding field later?",
    plain:"The aperture is a controllable array of phase states. A modeled radio scene produces a channel response; optimization stores a discrete configuration associated with that response. Recall means that the configuration still produces a useful field under defined disturbances, not that the surface has biological memory.",
    steps:["Model the complex field from each cell and polarization","Solve the desired response and quantize each control state","Store and recall configurations under cell/scene perturbations","Score focusing, recognition and robustness against reference cases"],
    math:"Each element contributes a complex phasor to the total field. The optimization acts on the combined field, so phase quantization and element failures must be re-evaluated together rather than independently.",
    evidence:"Numerical simulation and controlled recognition/fault-injection tests",
    caution:"The reported gain, recall and classification apply to the studied scene and fault models; an RF-controlled fabricated surface has not been demonstrated."
  },
  "genesis-dsp": {
    question:"How can a DSP receiver be selected, tested, and moved toward real-time implementation?",
    plain:"Artificial or recorded IQ signals are passed through known impairments. Candidate correction blocks are evaluated by signal quality, causality and numerical stability. A chosen chain is then checked in fixed-point form and through a lightweight browser/API interface.",
    steps:["Define clean IQ references and inject controlled impairments","Search causal correction-chain topologies and parameters","Compare EVM, NMSE, CFO and fixed-point error on held-out cases","Export a bounded, deployable correction chain"],
    math:"The received signal model combines frequency offset, IQ imbalance, channel response, delay, clipping and noise. Each compensator targets a specific distortion; low EVM alone does not prove stability or embedded deployability.",
    evidence:"Reproducible software reference experiments and fixed-point checks",
    caution:"The web runtime demonstrates the certified lightweight chain, not every block in the full research framework."
  },
  "microwave-signal-loss-prediction": {
    question:"Can weather and recent link behavior help predict the next hour's microwave attenuation?",
    plain:"A linear regression takes rainfall, temperature, wind and lagged loss as predictors of the following hour's attenuation. A chronological data split tests whether learned relationships carry forward in time rather than merely fitting the same period.",
    steps:["Define RF link-budget quantities and synthetic hourly samples","Construct weather and historical-loss predictor vectors","Fit and test the regression without future-information leakage","Inspect MAE, RMSE, R² and coefficient sensitivity"],
    math:"Free-space loss is a deterministic geometric baseline. The statistical model predicts additional time-varying attenuation; the coefficients need not represent physical causation when predictors are correlated.",
    evidence:"Held-out evaluation on a synthetic hourly dataset",
    caution:"Reported forecasting accuracy is not field-measured microwave-link performance."
  },
  "csrr-microwave-dielectric-sensor": {
    question:"How can a resonator infer how strongly a sample stores electromagnetic energy?",
    plain:"A sample near the CSRR changes the local electric-field loading. This shifts and reshapes a transmission resonance measured as S21. A calibrated feature model estimates effective permittivity from the resulting response.",
    steps:["Model unloaded CSRR geometry and sample-induced capacitance","Sweep dielectric loading in compact and full-wave models","Extract resonant frequency, depth, width and slope from S21","Calibrate the inverse estimate and evaluate held-out cases"],
    math:"The LC approximation predicts that added capacitance lowers resonant frequency. Full-wave perturbation shows that the actual sensitivity depends on electric-field overlap, loss and sample placement.",
    evidence:"Equivalent-circuit and CST/MATLAB simulation; no calibrated fabricated-sensor dataset",
    caution:"Effective permittivity is not a unique chemical fingerprint."
  },
  "gps-receiver-rtl-sdr": {
    question:"How can raw GPS L1 IQ samples become a satellite-based position estimate?",
    plain:"The receiver searches for satellite PRN codes and Doppler shifts, maintains code/carrier tracking, decodes navigation data, then estimates pseudoranges and receiver position. Sample timing and clock bias are essential throughout.",
    steps:["Acquire satellite codes and Doppler from recorded IQ","Track code delay and carrier with DLL/PLL discriminators","Decode navigation messages and reconstruct satellite states","Solve pseudoranges for receiver position and clock bias"],
    math:"Correlation identifies code phase and Doppler; pseudoranges combine geometric distance, receiver/satellite clock offsets and propagation terms. Position requires an overdetermined, geometry-aware fit.",
    evidence:"Controlled offline receiver-chain validation",
    caution:"The reported position error belongs to the controlled validation case, not a certified general-purpose field receiver."
  },
  "luxmeter": {
    question:"How does a light-sensitive electronic signal become an estimate in lux?",
    plain:"A light detector changes electrical current or resistance with illumination. An interface circuit and ADC sample that signal. Calibration against a photometric reference maps digital readings to illuminance rather than treating raw ADC counts as lux.",
    steps:["Condition the light sensor and define the ADC reference","Convert ADC counts to an electrical measurement","Fit or apply the calibrated sensor-to-lux relationship","Filter samples and evaluate repeatability and uncertainty"],
    math:"ADC conversion is a voltage measurement, while lux is spectrally weighted photometry. Sensor wavelength sensitivity, geometry and calibration are required to connect these quantities.",
    evidence:"Built introductory microcontroller prototype",
    caution:"No traceable photometric accuracy or laboratory uncertainty budget is claimed."
  },
  "100wpa": {
    question:"How can a 100 W-class RF platform cover 0.1–10 GHz without forcing one PA across the entire band?",
    plain:"The design separates the wide operating range into dedicated GaN amplifier modules. Each band receives its own devices, matching, combining, bias and thermal choices; a shared controller manages enables and protection.",
    steps:["Partition the RF band and select amplifier device families","Model load-pull, gain, stability, matching and output combining","Develop RF boards plus common bias/monitoring control","Check PCB rules and analytical tolerance before RF bench validation"],
    math:"Power-added efficiency ties RF output to DC power. Coherent combining depends on branch amplitude, phase and combiner loss. Thermal and stability conditions are constraints, not optional post-processing.",
    evidence:"PCB fabrication-release/DRC and analytical tolerance evaluation",
    caution:"100 W is a design target; a calibrated wideband high-power measurement has not established it."
  },
  "cem-computable-electromagnetic-medium": {
    question:"Can multipath propagation supply memory and computation before conventional digital processing?",
    plain:"Delayed replicas of a signal create a temporally structured electromagnetic state. Multiple observations and a nonlinear feature map form a reservoir; a trained linear readout recovers past inputs or solves nonlinear benchmarks.",
    steps:["Define propagation paths and receiver observation channels","Construct nonlinear, time-lagged reservoir-state vectors","Train a regularized readout on designated sequences","Measure memory capacity, effective rank and task error"],
    math:"Multipath convolution creates memory. Singular-value structure measures whether observations bring independent dimensions, while readout regularization controls the inverse problem.",
    evidence:"GNU Radio and numerical reservoir-computing benchmarks",
    caution:"Benchmark success does not imply that arbitrary radio channels implement useful computation; hardware, calibration and energy gains remain unproven."
  },
  "entropy-vna": {
    question:"Can programmed random signals reveal an RF network's complex behavior through covariance?",
    plain:"The excitation statistics are deliberately changed and the output covariance is observed. A lifted inverse model links these measurements to a complex transfer operator; the key limitation is whether phase and delay are identifiable from the selected observations.",
    steps:["Program structured stochastic excitations and reference states","Measure input/output covariance and estimate noise contribution","Solve an identifiability-aware inverse model for the network","Compare recovered delay/S-parameters with coherent calibration"],
    math:"Ry = H Rx Hᴴ + Rn loses certain phase information without additional structure. Cross-covariance, programmed excitation diversity and references are needed to distinguish otherwise equivalent operators.",
    evidence:"Mathematical and computational system-identification research",
    caution:"Comparison against calibrated VNA standards and physical two-port measurements is still required."
  },
  "lpda-antenna": {
    question:"How can a single directional antenna cover 2.4–5.8 GHz?",
    plain:"A log-periodic array scales successive dipole lengths and spacings. Different parts of the array become active at different frequencies while the boom/feed geometry controls impedance and end-fire radiation.",
    steps:["Choose log-periodic scaling and spacing factors","Build the balanced twin-boom and feed model","Simulate current distribution, S11, VSWR and gain across the band","Assess mounting, cables and fabricated VNA/pattern validation"],
    math:"The scale factor τ sets neighboring-element size ratios; the spacing factor σ controls element separation. Active-region migration is what makes wideband behavior physically possible.",
    evidence:"CST full-wave simulated antenna performance",
    caution:"Reported matching and gain require confirmation on the manufactured antenna and mechanical installation."
  },
  "morpheus": {
    question:"Can an active surface make an object's radar-scattering response resemble a chosen virtual target?",
    plain:"A modeled active shell adds a controllable field to the real object's scattered field. An inverse solver computes cell commands that approximate a chosen complex target response over specified angles, frequencies and polarizations.",
    steps:["Define physical-object and virtual-target scattering operators","Calibrate the influence of each active shell cell","Solve regularized field-compensation commands","Project onto finite control states and test residuals and failures"],
    math:"The required correction is a difference between complex scattering fields. Singular values reveal which targets are controllable; regularization reduces noise amplification and unrealistic command energy.",
    evidence:"Computational forward/inverse and Monte Carlo studies",
    caution:"No fabricated active shell or radar-range demonstration is claimed; results are limited to the modeled observation basis."
  },
  "rf-filter-ai-synthesizer": {
    question:"Can a neural network recover filter settings from a complex frequency response?",
    plain:"A generated filter response supplies magnitude and unwrapped phase at ordered frequency points. A one-dimensional CNN learns an inverse map to center-frequency and bandwidth parameters, which are then converted back to engineering units.",
    steps:["Generate labeled synthetic response curves over the parameter domain","Normalize magnitude/phase channels and regression targets","Train and evaluate a one-dimensional CNN on held-out responses","Report parameter errors in MHz and test measured-domain transfer"],
    math:"Convolution exploits local structure along frequency. The learned bandwidth parameter is defined by the synthetic transfer function and must not be confused automatically with its conventional 3 dB bandwidth.",
    evidence:"Synthetic-model training and application demonstration",
    caution:"Quoted RMSE ranges are expected values, not certified fixed-seed benchmark results."
  },
  "rfshield-lpf": {
    question:"How can a PCB low-pass filter pass 108–500 MHz while rejecting higher-frequency energy?",
    plain:"A seventh-order lumped filter is synthesized and then rebuilt with real component and PCB parasitics. Transmission-line sections, launches and manufacturing tolerances are included before releasing board files.",
    steps:["Synthesize a Chebyshev prototype and scale its L/C values","Cascade lumped and distributed elements using network matrices","Optimize the PCB-aware response and run tolerance sweeps","Check fabrication files and plan S-parameter bench tests"],
    math:"Prototype coefficients map to actual inductors and capacitors through impedance and frequency scaling. ABCD matrices are converted into S-parameters to quantify passband insertion and return loss.",
    evidence:"Circuit/PCB-aware analysis, tolerance study and completed DRC",
    caution:"Predicted insertion loss and harmonic rejection remain to be measured on a fabricated board."
  },
  "spectra-stm32": {
    question:"How can an embedded RF monitor detect meaningful changes without mistaking sensor faults for signals?",
    plain:"Detector channels feed an STM32 baseline model. Per-band means, variances and occupancy estimates adapt to normal conditions; the system produces an anomaly score, interpretable reasons and confidence conditioned on system health.",
    steps:["Calibrate RF detector channels and acquire valid samples","Maintain statistics and freeze/guard learning when appropriate","Build explainable anomaly evidence and confidence terms","Log events and test detection with controlled RF injections"],
    math:"Online mean/variance updates avoid retaining full raw histories. Adaptive thresholds depend on baseline dispersion; confidence must decrease when learning maturity or hardware validity is insufficient.",
    evidence:"Embedded software build and memory-footprint verification",
    caution:"Build success is not RF detection accuracy, field reliability or a completed hardware validation."
  },
  "solar-power-generation": {
    question:"How can a photovoltaic source deliver useful regulated energy as sunlight and temperature change?",
    plain:"A panel has a nonlinear current-voltage characteristic and a moving maximum-power point. A DC converter and MPPT controller should adjust operation while respecting current, thermal, protection and load requirements.",
    steps:["Select a specific panel and measure or model its I–V/P–V curves","Choose a DC converter topology and switching components","Implement MPPT, energy-storage and protection behavior","Measure efficiency, ripple, tracking dynamics and temperature"],
    math:"The one-diode model predicts the panel response; dP/dV = 0 identifies the ideal maximum-power point. Converter duty-cycle equations connect the controller to the electrical operating point.",
    evidence:"Engineering study and PCB/power-flow architecture work",
    caution:"A defined converter build, verified efficiency curve and outdoor energy-yield measurements are not yet documented."
  },
  "vanta": {
    question:"Can the nonlinear artifacts of an SDR receiver be treated as repeatable information?",
    plain:"An RTL-SDR is deliberately observed over controlled gain and input conditions. Compression, intermodulation and spectral redistribution form a state-dependent signature that may support inference if it is repeatable and robust to drift.",
    steps:["Record hardware captures over calibrated gain/input conditions","Identify fundamentals, IM3 products and compression regions","Build artifact features and characterize state separability","Test repeatability, drift and holdout-scene generalization"],
    math:"A complex nonlinear polynomial predicts intermodulation terms. IM3 intercept concepts describe weak nonlinearity but break down in compression; repeatability matters more than an isolated striking spectrum.",
    evidence:"Real RTL-SDR V4 captures plus separate numerical consistency checks",
    caution:"Measurements are device- and setup-specific; numerical agreement is not a substitute for calibrated absolute RF accuracy."
  },
  "vivaldi-antenna-balun": {
    question:"How do a wideband Vivaldi antenna and its balun form a coherent two-channel RF front end?",
    plain:"A tapered-slot antenna requires a balanced feed; the balun converts a 50 Ω single-ended path to differential excitation. A pair of such antennas can estimate arrival direction from calibrated inter-channel phase.",
    steps:["Synthesize the exponential tapered-slot antenna geometry","Design the 50 Ω-to-100 Ω balanced transition and PCB feed","Simulate S11, current, patterns, efficiency and coupling","Calibrate paired channels and quantify phase/angle ambiguity"],
    math:"Taper geometry controls broadband slot radiation. Phase interferometry relates arrival angle to wavelength and antenna spacing, but phase wrapping makes unambiguous direction inference frequency- and spacing-dependent.",
    evidence:"CST lossy-model results and fabrication design outputs",
    caution:"Physical balun common-mode behavior, pair calibration and angle accuracy are not yet independently measured."
  },
  "passbridge": {
  "question": "Can a passive, wind-deformed metal aperture redirect a 5.5 GHz radio link around an assumed line-of-sight obstacle?",
  "plain": "A transmitter points toward a metallic panel and a second receiver collects energy reflected toward it. No amplifier or power supply is located in the panel. The engineering record connects structural displacement, polarization-resolved scattering, a bistatic power budget and a simplified OFDM test.",
  "steps": [
    "Specify the blocked direct path and two 500 m clear reflector legs",
    "Simulate wind-loaded metal sheets in COMSOL and reconstruct the deformed coated geometry",
    "Sweep 75 wind/pointing configurations with CST SBR, preserving 150 TE/TM fields",
    "Calculate receiver-angle bistatic RCS and two-segment power and SNR",
    "Use numerical SNR in 20 MHz QPSK-OFDM packet trials and document limitations"
  ],
  "math": "A large finite-conductivity sheet redistributes incident energy by coherent surface scattering. The phase response varies with panel tilt and deformation. The received power scales with bistatic RCS and both path distances, not with any active reflector gain.",
  "evidence": "COMSOL structural simulation, 75 CST SBR models/150 TE/TM complex exports, Python link calculations and MATLAB OFDM AWGN simulation",
  "caution": "The −75.9011 dBm and 26 Mbit/s figures describe conditional numerical predictions. Mesh convergence, calibrated RCS comparison, material characterization and outdoor testing are outstanding."
}
});
