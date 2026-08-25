window.PROJECT_TECHNICAL = {
  "csrr-microwave-dielectric-sensor": {
    "decisions": [
      {
        "decision": "Start with equivalent capacitance",
        "rationale": "A three-dimensional liquid volume can force dense meshes; the compact study establishes sensitivity at very low computational cost.",
        "tradeoff": "The equivalent capacitor cannot capture fringing, loss tangent, volume distribution, or fixture details, so it is not the final evidence."
      },
      {
        "decision": "Use multiple curve features",
        "rationale": "Permittivity and loss can alter frequency, depth, width, and slope together.",
        "tradeoff": "A richer vector improves model capacity but increases the need for careful scaling, feature stability, and leakage-free validation."
      },
      {
        "decision": "Report effective permittivity, not chemical identity",
        "rationale": "Different substances may generate similar dielectric responses at one band and temperature.",
        "tradeoff": "The claim is narrower but scientifically correct and directly tied to the calibrated observable."
      }
    ],
    "theory": [
      {
        "equation": "fr ≈ 1 / (2π√(Lr(Cr + Csample)))",
        "explanation": "Additional dielectric loading stores more electric energy and raises effective capacitance. With inductance approximately fixed over a small perturbation, increasing capacitance lowers the resonant frequency monotonically.",
        "title": "Loaded resonator frequency",
        "variables": "Lr and Cr describe the unloaded resonator; Csample is the incremental electric-field loading caused by the sample.",
        "why": "The LC model gives a physically interpretable sensitivity direction and permits fast parameter screening before expensive three-dimensional meshing."
      },
      {
        "equation": "Δf/f₀ ≈ −(1/2) · [∫Δε|E|² dV / ∫(ε|E|² + μ|H|²) dV]",
        "explanation": "Frequency shift is governed by overlap between the material and stored electric energy, not only bulk permittivity. Placement, volume, and field confinement therefore affect sensitivity.",
        "title": "Cavity-perturbation interpretation",
        "variables": "Δε is the permittivity change in the sample volume; E and H are unperturbed fields; f₀ is the reference resonance.",
        "why": "This relationship explains why the sample must be positioned consistently in the high-electric-field region and why calibration cannot be transferred blindly to another fixture."
      },
      {
        "equation": "QL = fr / BW₋₃dB",
        "explanation": "Quality factor summarizes energy storage relative to total loss. Dielectric loss, conductor loss, radiation, and external coupling all affect the measured loaded value.",
        "title": "Loaded quality factor",
        "variables": "fr is the identified resonance and BW₋₃dB is the bandwidth between the half-power points around the notch.",
        "why": "Frequency shift alone may not capture lossy materials. Q and notch-depth features add information about damping and coupling behavior."
      },
      {
        "equation": "S21(f) = b₂/a₁ | a₂=0,   notch depth = 20log₁₀|S21(fr)|",
        "explanation": "At resonance, energy couples strongly into the CSRR and through transmission falls, producing a band-stop notch. Frequency, depth, and shape jointly reflect loading.",
        "title": "Two-port transmission evidence",
        "variables": "a₁ is the incident wave at port 1 and b₂ is the transmitted wave at port 2 with port 2 matched.",
        "why": "S21 is directly measurable with a calibrated VNA and maintains continuity between numerical calibration and a future fabricated sensor."
      },
      {
        "equation": "ε̂r(x) = (1/B) Σᵦ Tᵦ(x)",
        "explanation": "Each tree partitions the feature space with nonlinear thresholds. Averaging reduces variance and can model interactions between resonance position, bandwidth, depth, and slopes without assuming a global polynomial.",
        "title": "Bagged regression trees",
        "variables": "x is the extracted feature vector; Tᵦ is a regression tree fitted to a bootstrap sample; B is the number of trees.",
        "why": "The calibration relationship can be nonlinear and feature interactions are expected. Bagging offers flexible regression while remaining practical for the available simulated dataset."
      }
    ],
    "workDone": [
      "The sensing structure was formulated as a continuous microstrip transmission line coupled to a complementary split-ring resonator. The electric field concentrated around the CSRR gap makes the resonance sensitive to the capacitance introduced by a material under test. A compact lumped-element study was used first to establish sensitivity and direction of shift, after which the geometry was evaluated through full-wave S-parameter sweeps.",
      "Effective relative permittivity was swept from 1.0 to 10.0 in 0.1 increments under controlled geometry. Each S21 trace was exported with traceable parameters and normalized units. The processing stage identified the resonance and extracted eleven descriptors, including resonant frequency, shift from reference, notch depth, −3 dB bandwidth, loaded-Q estimate, integrated curve measures, local slopes, and distribution statistics.",
      "The extracted feature matrix was mapped to effective permittivity with a bagged regression-tree ensemble. Cross-validation changed with dataset size: leave-one-out was used for small trace sets and bounded k-fold validation for larger sets. The result is a complete CST-to-MATLAB calibration path that retains the equivalent-circuit interpretation while allowing a nonlinear estimator to absorb interactions between resonance features."
    ],
    "workflow": [
      {
        "text": "Sweep equivalent gap capacitance and confirm the expected resonance movement before committing to full-wave simulations.",
        "title": "Establish the compact model"
      },
      {
        "text": "Define substrate, metallization, ports, sample volume, mesh controls, frequency range, and open-boundary assumptions.",
        "title": "Lock geometry and boundaries"
      },
      {
        "text": "Change only the intended loading parameter, export every response, and encode the ground-truth value in metadata.",
        "title": "Run a traceable permittivity sweep"
      },
      {
        "text": "Accept supported export formats, convert frequency units, sort samples, remove invalid rows, and verify coverage of the resonance.",
        "title": "Normalize S-parameter data"
      },
      {
        "text": "Calculate resonance, shift, notch, bandwidth, Q, area, slopes, and curve statistics with defined edge-case handling.",
        "title": "Extract physically motivated features"
      },
      {
        "text": "Fit the bagged ensemble inside each fold and report RMSE, MAE, R², maximum error, and predicted-versus-true plots.",
        "title": "Train and cross-validate"
      },
      {
        "text": "Define fixture calibration, sample placement, temperature control, repeatability, and material-reference requirements for hardware validation.",
        "title": "Prepare the measurement gate"
      }
    ]
  },
  "engram": {
    "decisions": [
      {
        "decision": "Use a dual-polarized 16 × 16 aperture",
        "rationale": "The dimensionality is large enough to create spatial diversity and multiple stored states while remaining computationally inspectable at cell level.",
        "tradeoff": "More controllable cells increase field-shaping freedom but also increase channel acquisition, calibration, coupling analysis, command routing, and hardware complexity."
      },
      {
        "decision": "Constrain every cell to 2-bit phase control",
        "rationale": "Four phase states form a credible programmable-surface control model and make each stored engram finite and directly encodable.",
        "tradeoff": "The state is robust and compact, but quantization reduces the optimum coherent sum and can enlarge the focal region or sidelobes."
      },
      {
        "decision": "Separate recall, focusing, and recognition metrics",
        "rationale": "The three claims answer different questions and should not borrow evidence from one another.",
        "tradeoff": "The validation campaign becomes longer, but the resulting evidence is substantially more defensible."
      },
      {
        "decision": "Treat hardware effects as explicit future gates",
        "rationale": "Mutual coupling, bias networks, synchronization, thermal drift, and calibration cannot be inferred from an ideal numerical aperture.",
        "tradeoff": "The current conclusions remain intentionally bounded to the verified computational model."
      }
    ],
    "theory": [
      {
        "equation": "E(rₘ) = Σₙ hₘₙ aₙ  ⇔  e = H a",
        "explanation": "Maxwell's equations are linear for the modeled passive propagation region, so the total phasor field is the coherent sum of all cell contributions. Both magnitude and phase matter: contributions that arrive in phase increase focal power, while phase error redirects energy or raises sidelobes.",
        "title": "Complex field superposition",
        "variables": "hₘₙ is the complex channel from controllable cell n to observation sample m; aₙ is the commanded complex cell state; e is the synthesized field vector.",
        "why": "The matrix form isolates the environment from the control state. It enables repeatable optimization, fault injection, rank analysis, and scene-to-scene comparison without hiding the electromagnetic mechanism inside a black-box score."
      },
      {
        "equation": "a* = arg minₐ ‖W(Ha − d)‖₂² + λ‖S Ha‖₂²,  aₙ ∈ {1, j, −1, −j}",
        "explanation": "The first term drives the synthesized field toward the target distribution and the second penalizes energy outside it. The four allowed complex values represent 0°, 90°, 180°, and 270° phase commands. The problem is therefore a finite-alphabet inverse design rather than unconstrained least squares.",
        "title": "Discrete phase-constrained synthesis",
        "variables": "d is the desired focal-field template; W weights the focal region; S selects or weights sidelobe samples; λ controls the focus–sidelobe tradeoff.",
        "why": "A continuous solution provides an upper reference but cannot be implemented by a 2-bit surface. Enforcing the alphabet during the design exposes the real quantization penalty and produces a state that can be stored directly as two bits per cell."
      },
      {
        "equation": "ρ(a,b) = |aᴴb| / (‖a‖₂‖b‖₂),   margin = ρstored − max(ρunseen)",
        "explanation": "Normalized correlation measures structural agreement independently of overall amplitude. It is evaluated together with field reconstruction because two states may be similar yet focus differently, or focus similarly while representing different scenes.",
        "title": "Associative recall and discrimination",
        "variables": "a and b are complex state or response vectors; ρ is normalized complex correlation; margin measures separation from the closest nonmatching scene.",
        "why": "Absolute gain alone cannot establish memory. Correlation and classification margin quantify whether the correct archived state is selectively recalled rather than merely producing a high-energy response."
      },
      {
        "equation": "Gf = 10 log₁₀(Pfocus / Preference),   A₋₃dB = ∫Ω 𝟙{P(r) ≥ Pmax/2} dA",
        "explanation": "Peak gain captures coherent concentration, whereas the −3 dB area captures localization. Reporting both prevents a broad high-energy region or an isolated numerical spike from being interpreted as a useful focus.",
        "title": "Focal gain and occupied area",
        "variables": "Pfocus is focal-region power, Preference is the chosen baseline, and A₋₃dB is the physical area within three decibels of the peak.",
        "why": "Memory recovery must preserve the spatial function of the field, not only a scalar maximum. These paired measures directly test that functional requirement."
      }
    ],
    "workDone": [
      "The work began by defining a 5.8 GHz electromagnetic scene in which every addressable aperture cell contributes a complex field to a prescribed observation region. A 16 × 16 dual-polarized surface was represented as a channel matrix whose columns encode the amplitude and phase transferred from each controllable degree of freedom to the field samples. This converts the physical focusing problem into a traceable linear forward model: the environment supplies the channel, the surface supplies a discrete complex command vector, and their product predicts the reconstructed field.",
      "For each scene, a continuous phase solution was first used as a performance reference and then projected onto a realizable four-state phase alphabet. The resulting 2-bit command pattern was stored as the electromagnetic memory state. Recall was evaluated by reapplying that state after cell dropout, random phase perturbation, component tolerance, incomplete observations, target displacement, and changes in the multipath environment. Field gain, focal-area preservation, state similarity, crosstalk, and scene-identification margin were kept as separate outputs so that a visually strong focus could not be mistaken for reliable memory behavior.",
      "The investigation also included controlled readaptation. When the propagation matrix changed, the previous state was treated as an initial condition rather than an unquestioned solution; a new discrete state was calculated and compared with the archived state. This establishes a complete sense–encode–store–recall–verify–readapt cycle and makes the project an electromagnetic memory study rather than a single beam-focusing demonstration."
    ],
    "workflow": [
      {
        "text": "Specify frequency, aperture geometry, polarization channels, observation grid, target region, boundaries, and material assumptions before generating any response.",
        "title": "Define the scene"
      },
      {
        "text": "Record the complex response of each cell at every observation sample and arrange the responses as the channel matrix H.",
        "title": "Assemble the forward operator"
      },
      {
        "text": "Solve the weighted complex-field objective without phase quantization to identify the best achievable response under the chosen model.",
        "title": "Establish a continuous reference"
      },
      {
        "text": "Map the reference phases to the four-state alphabet, evaluate the loss, and refine discrete commands against focus and sidelobe objectives.",
        "title": "Quantize and refine"
      },
      {
        "text": "Store command vectors with scene labels, field responses, operating assumptions, and validation metadata so recall remains traceable.",
        "title": "Archive scene states"
      },
      {
        "text": "Apply dropout, phase noise, tolerance, off-grid displacement, and altered multipath over repeated trials; retain distributions, not only best cases.",
        "title": "Execute robustness trials"
      },
      {
        "text": "Compare recovered gain, area, correlation, and identification margin, then recompute the state when the channel has materially changed.",
        "title": "Verify recall and readaptation"
      }
    ]
  },
  "genesis-dsp": {
    "decisions": [
      {
        "decision": "Represent the receiver as a directed acyclic graph",
        "rationale": "A graph exposes order, connectivity, parameters, and implementation cost, allowing alternative pipelines to be compared under the same contract.",
        "tradeoff": "Feedback synchronization loops require dedicated stateful blocks rather than arbitrary graph cycles."
      },
      {
        "decision": "Replace full-frame mean removal with a causal IIR blocker",
        "rationale": "Streaming certification requires that an output prefix depend only on the corresponding input prefix.",
        "tradeoff": "The blocker has a transient and slightly modifies very-low-frequency content, so pole radius and warm-up must be documented."
      },
      {
        "decision": "Optimize accuracy and deployability separately",
        "rationale": "The most accurate offline candidate may be unstable, non-causal, or too costly for a target processor.",
        "tradeoff": "Multi-objective evaluation may select a marginally less accurate chain with much stronger implementation evidence."
      },
      {
        "decision": "Retain failed stress cases",
        "rationale": "Acceptance failures define the model's operating envelope and guide the next estimator or topology revision.",
        "tradeoff": "The portfolio reports a narrower but more credible capability boundary."
      }
    ],
    "theory": [
      {
        "equation": "r[n] = C{e^(j(2πΔf n/Fs + φ₀)) · (h*s)[n−τ] + d} + w[n]",
        "explanation": "The model composes the principal linear, widely linear, and nonlinear mechanisms seen by a practical complex receiver. Their order matters because clipping after IQ imbalance is not equivalent to clipping before it, and synchronization loops react differently to each combination.",
        "title": "Complex-baseband impairment model",
        "variables": "s[n] is the transmitted waveform; h is the multipath channel; Δf and φ₀ are carrier offset and phase; τ is timing displacement; d is DC; C{·} represents IQ imbalance or clipping; w[n] is noise.",
        "why": "A correction chain can only be meaningfully verified against a stated signal model. Explicit composition makes parameter recovery, stress limits, and failure attribution reproducible."
      },
      {
        "equation": "y[n] = r[n] e^(−j2π f̂Δ n/Fs),   εf = Δf − f̂Δ",
        "explanation": "Multiplication by a complex exponential rotates each sample in the opposite direction of the carrier error. A remaining frequency error appears as a linear phase ramp and degrades coherent averaging, matched filtering, and symbol decisions.",
        "title": "Carrier-frequency correction",
        "variables": "f̂Δ is the estimated correction frequency, Fs is sample rate, and εf is residual CFO.",
        "why": "This operation is causal, numerically simple, and maps directly to a numerically controlled oscillator in embedded hardware."
      },
      {
        "equation": "H(z) = (1 − z⁻¹)/(1 − r z⁻¹),   y[n] = x[n] − x[n−1] + r y[n−1]",
        "explanation": "The zero at z=1 rejects DC while the nearby pole limits attenuation of desired low-frequency content. With r=0.995, the filter uses only current and past samples, so prefix outputs do not change when later samples arrive.",
        "title": "Causal DC blocking",
        "variables": "r is a pole radius close to one; x[n] and y[n] are input and output samples.",
        "why": "Subtracting the mean of a complete capture is effective but non-causal. The IIR blocker preserves streaming deployability and provides an explicit stability condition |r| < 1."
      },
      {
        "equation": "NMSE = Σ|y−s|²/Σ|s|²,   EVMrms = √(Σ|y−s|²/Σ|s|²) × 100%",
        "explanation": "NMSE expresses normalized reconstruction energy; RMS EVM expresses the same residual in an RF-communications convention. BER then tests the downstream discrete decisions rather than waveform proximity alone.",
        "title": "Signal-quality objectives",
        "variables": "s is the aligned reference-symbol vector and y is the corrected estimate.",
        "why": "Using waveform and decision metrics together prevents a low analog error from masking rare bit failures and prevents a zero-BER short run from implying a precisely corrected waveform."
      },
      {
        "equation": "q(x) = sat(round(x·2^F))·2^(−F),   SQNR ≈ 6.02B + 1.76 dB",
        "explanation": "Q3.13 allocates sign/integer headroom and thirteen fractional bits. Every arithmetic stage must be checked for coefficient error, state growth, rounding noise, and saturation rather than quantizing only the final samples.",
        "title": "Fixed-point quantization",
        "variables": "F is fractional-bit count, B is effective word length, and sat(·) enforces the representable signed range.",
        "why": "The selected format balances numerical fidelity with a 16-bit implementation footprint and turns floating-point feasibility into a hardware-relevant result."
      }
    ],
    "workDone": [
      "GENESIS-DSP was developed as a complete receiver-engineering environment rather than a single correction algorithm. A reproducible unit-power QPSK source was pulse-shaped and exposed to controlled carrier-frequency offset, phase rotation, timing displacement, multipath, IQ imbalance, DC offset, additive noise, and optional clipping. Each impairment was parameterized independently, which made it possible to construct known counterexamples and to judge whether a recovered chain corrected the intended mechanism instead of exploiting one nominal waveform.",
      "Signal-processing blocks were expressed as typed graph elements with validated parameters, deterministic serialization, cycle rejection, explicit input/output contracts, and an operation-cost estimate. Valid graphs were evaluated on separated data intervals with NMSE, EVM, BER, residual CFO, stability, causality, and computational burden. Candidate topologies were searched and then deliberately falsified under stronger conditions. A frame-mean DC remover that looked effective offline was rejected for streaming because future samples affected earlier outputs; it was replaced by a causal first-order DC blocker.",
      "After the floating-point chain was accepted, coefficient ranges and internal states were profiled, fixed-point formats were evaluated with saturation behavior, and Q3.13 was selected for the reference chain. The implementation path includes deterministic Python execution, C++17 export, API validation, and a browser-facing IQ interface. This keeps algorithm discovery, numerical verification, and deployable execution under one documented contract."
    ],
    "workflow": [
      {
        "text": "Create deterministic symbols, pulse shaping, seeds, sample rate, and reference labels so every experiment can be replayed.",
        "title": "Generate a controlled waveform"
      },
      {
        "text": "Sweep carrier, timing, channel, IQ, DC, noise, and clipping parameters while keeping ground truth available.",
        "title": "Inject isolated and combined impairments"
      },
      {
        "text": "Instantiate registered blocks, validate ports and parameters, reject cycles, and serialize each topology before execution.",
        "title": "Build valid processing graphs"
      },
      {
        "text": "Estimate parameters on designated regions and retain independent intervals for scoring, falsification, and bit decisions.",
        "title": "Fit without test leakage"
      },
      {
        "text": "Measure NMSE, EVM, BER, residual offsets, arithmetic count, memory, latency, and graph complexity as separate objectives.",
        "title": "Score accuracy and cost"
      },
      {
        "text": "Test prefix causality, bounded input/bounded output behavior, finite outputs, deterministic replay, and severe impairment corners.",
        "title": "Falsify the candidate"
      },
      {
        "text": "Profile ranges, select fixed-point formats, emulate saturation, export code, and compare outputs across runtime implementations.",
        "title": "Convert and cross-check"
      }
    ]
  },
  "gps-receiver-rtl-sdr": {
    "decisions": [
      {
        "decision": "Use FFT-based PCPS for acquisition",
        "rationale": "The search spans many code phases for every Doppler bin, making frequency-domain correlation substantially more efficient.",
        "tradeoff": "FFT block construction and circular-correlation indexing must be handled carefully to avoid code-phase bias."
      },
      {
        "decision": "Keep the absolute sample origin in the state",
        "rationale": "Navigation bit and subframe timing ultimately depend on the same capture index used at acquisition.",
        "tradeoff": "The bookkeeping is stricter, but it prevents plausible tracking outputs from being decoded at the wrong temporal boundary."
      },
      {
        "decision": "Use offline captures for verification",
        "rationale": "Recorded IQ enables deterministic replay, loop inspection, and comparison after algorithm changes.",
        "tradeoff": "It does not demonstrate continuous real-time operation or long-term oscillator behavior."
      }
    ],
    "theory": [
      {
        "equation": "R(τ,fD) = Σₙ r[n] c*[n−τ] e^(−j2πfD n/Fs)",
        "explanation": "For each Doppler hypothesis, carrier wipeoff is followed by circular correlation with the satellite's 1023-chip C/A code. FFT multiplication computes all code phases together, producing a two-dimensional search surface.",
        "title": "Parallel code-phase acquisition",
        "variables": "r[n] is the received IQ sequence; c[n] is a PRN replica; τ is code delay; fD is Doppler; Fs is sample rate.",
        "why": "A serial delay search is expensive at 2.048 MSps. PCPS reduces acquisition cost and provides a clear detection map over physically meaningful delay and frequency bins."
      },
      {
        "equation": "ePLL = atan2(QP,IP),   eDLL = (|E|−|L|)/(|E|+|L|)",
        "explanation": "The Costas discriminator drives residual carrier phase toward zero without depending on navigation-bit sign. The normalized early-minus-late error moves the local code until the prompt arm lies at the correlation peak.",
        "title": "Carrier and code discriminators",
        "variables": "IP and QP are prompt in-phase and quadrature accumulations; E and L are early and late correlator magnitudes.",
        "why": "The paired loops separate carrier dynamics from spreading-code timing and allow coherent integration needed for navigation-bit recovery."
      },
      {
        "equation": "ρi = ‖r − si‖₂ + cδtr − cδti + Ii + Ti + εi",
        "explanation": "The measured code transit time is converted to distance but contains clock and propagation terms. At least four independent satellites are needed to solve three spatial coordinates and receiver clock bias.",
        "title": "Pseudorange observation",
        "variables": "r is receiver position; si is satellite position; δtr and δti are receiver and satellite clock biases; I and T are ionospheric and tropospheric delays.",
        "why": "This equation connects sample/code timing to navigation geometry and makes correction terms and unavoidable error sources explicit."
      },
      {
        "equation": "Δx = (GᵀWG)⁻¹GᵀW(ρ − ρ̂),   xk+1 = xk + Δx",
        "explanation": "The nonlinear range equations are linearized around a current ECEF estimate. Repeated updates converge to receiver position and clock bias when geometry and initialization are adequate.",
        "title": "Iterative least-squares position",
        "variables": "G is the line-of-sight geometry matrix; W is an optional measurement-weight matrix; ρ−ρ̂ is the pseudorange residual.",
        "why": "Gauss–Newton least squares is transparent, standard for code-based positioning, and exposes residuals that can identify a bad satellite observation."
      },
      {
        "equation": "Q = (GᵀG)⁻¹,   PDOP = √(Qxx + Qyy + Qzz)",
        "explanation": "PDOP measures how satellite geometry amplifies pseudorange uncertainty into three-dimensional position uncertainty. It does not measure receiver noise itself.",
        "title": "Dilution of precision",
        "variables": "Q is the geometry covariance factor derived from line-of-sight directions.",
        "why": "Reporting position error without geometry can be misleading. PDOP provides the necessary context for interpreting the solution."
      }
    ],
    "workDone": [
      "The receiver chain accepts recorded or legally generated GPS L1 C/A complex samples at 2.048 MSps and preserves sample-index traceability from file ingestion to navigation decoding. Coarse acquisition searches each satellite PRN over code delay and Doppler using FFT-based parallel code-phase correlation. Candidates are accepted only after peak, secondary-peak, and noise-floor checks so a single large bin does not automatically become a tracked satellite.",
      "Acquired channels are passed to carrier and code tracking. A Costas loop removes residual carrier phase and frequency while an early–prompt–late delay-lock loop keeps the locally generated C/A code aligned with the received spreading sequence. Prompt correlations feed bit synchronization, preamble search, parity checks, subframe identification, and ephemeris extraction. The sample-start index remains part of the timing state because a wrong origin can preserve acquisition yet displace 20 ms navigation bits and six-second subframes.",
      "Transmit time and satellite position are reconstructed from decoded navigation data; pseudoranges are corrected for receiver clock bias and solved iteratively for Earth-centered Earth-fixed position. The archived result reports a 4.8 m position error and PDOP 2.1 under the evaluated capture. The page separates these measured processing results from the restrictions of RTL-SDR clock stability, offline data, and a limited capture environment."
    ],
    "workflow": [
      {
        "text": "Decode the 8-bit sample format, remove file-format ambiguity, preserve absolute sample indices, and verify sample rate and center frequency.",
        "title": "Ingest and normalize IQ"
      },
      {
        "text": "Generate C/A replicas, execute PCPS across frequency bins, and retain detection ratios and acquisition surfaces.",
        "title": "Search PRN and Doppler"
      },
      {
        "text": "Seed carrier NCO, code NCO, and code phase from acquisition; record loop bandwidths and integration time.",
        "title": "Initialize tracking loops"
      },
      {
        "text": "Form prompt bits, locate 20 ms boundaries and preambles, check polarity and parity, and maintain sample-to-GPS-time correspondence.",
        "title": "Recover navigation timing"
      },
      {
        "text": "Parse subframes, validate identifiers and issue-of-data fields, and calculate satellite clock and ECEF position at transmit time.",
        "title": "Decode orbit and clock data"
      },
      {
        "text": "Combine receive time, transmit time, satellite clock, Earth rotation, and available atmospheric corrections.",
        "title": "Form corrected pseudoranges"
      },
      {
        "text": "Iterate weighted least squares, calculate residuals and DOP, reject inconsistent channels cautiously, and compare with reference coordinates.",
        "title": "Solve and inspect position"
      }
    ]
  },
  "luxmeter": {
    "decisions": [
      {
        "decision": "Separate ADC conversion from lux calibration",
        "rationale": "Reference-voltage changes and sensor recalibration affect different layers of the measurement chain.",
        "tradeoff": "The firmware contains more explicit stages, but each source of error is easier to diagnose."
      },
      {
        "decision": "Use empirical calibration",
        "rationale": "Low-cost light-sensitive devices rarely reproduce the photopic response or a perfectly linear transfer function.",
        "tradeoff": "Accuracy is tied to the calibration source, geometry, and covered range."
      },
      {
        "decision": "Apply a short causal average",
        "rationale": "Display noise should be reduced without using future samples or a heavy filter.",
        "tradeoff": "Increasing the window improves stability but slows response to real lighting changes."
      }
    ],
    "theory": [
      {
        "equation": "VADC = NADC · Vref / (2^B − 1)",
        "explanation": "The ADC quantizes an analog voltage into finite codes. One least-significant bit corresponds approximately to Vref/(2^B−1), while reference error directly scales every reconstructed voltage.",
        "title": "ADC conversion",
        "variables": "NADC is the integer converter code; B is ADC resolution; Vref is the converter reference voltage.",
        "why": "Converting through voltage rather than mapping counts directly to lux separates the microcontroller configuration from the sensor calibration."
      },
      {
        "equation": "Vout = Vcc · Rfixed/(Rfixed + Rsensor)  or  Iphoto = Sλ·Ee",
        "explanation": "A light sensor may change resistance or generate current. The analog network converts that response to a measurable voltage, but the polarity and nonlinearity depend on topology.",
        "title": "Sensor-interface relation",
        "variables": "The first form represents a resistive divider; the second represents a photo-current sensor with responsivity Sλ under irradiance Ee.",
        "why": "Keeping both general forms avoids assuming a device type and makes the calibration equation traceable to the actual interface."
      },
      {
        "equation": "Ê = g(VADC; θ),   θ* = arg minθ Σi wi[Ei,ref − g(Vi;θ)]²",
        "explanation": "Calibration minimizes disagreement with known reference points. Log-domain fitting may be useful over wide dynamic range, while lookup interpolation can preserve a measured nonlinearity without imposing a global formula.",
        "title": "Empirical illuminance calibration",
        "variables": "g is the selected calibration curve; θ contains its parameters; Ei,ref are reference lux values; wi are confidence weights.",
        "why": "Lux is a photometric quantity weighted by human visual response; it cannot be inferred accurately from an arbitrary light sensor without empirical calibration."
      },
      {
        "equation": "ȳ[n] = (1/M) Σk=0…M−1 y[n−k]",
        "explanation": "For uncorrelated sample noise, averaging reduces standard deviation approximately by √M. It also adds latency and can blur rapid illumination changes.",
        "title": "Noise reduction",
        "variables": "M is the moving-average length and y[n] is the instantaneous calibrated sample.",
        "why": "A short causal window improves display stability with minimal code and memory while leaving the raw acquisition available for diagnostics."
      },
      {
        "equation": "uE² ≈ (∂g/∂V)²uV² + Σj(∂g/∂θj)²uθj²",
        "explanation": "Sensitivity derivatives show how ADC/reference noise and calibration uncertainty affect the final lux estimate. Near a steep nonlinear region, a small voltage error may become a large illuminance error.",
        "title": "Uncertainty propagation",
        "variables": "uV represents voltage uncertainty and uθj represents uncertainty in calibration parameters.",
        "why": "An engineering instrument requires a bounded estimate, not only a displayed number. The relation identifies the dominant improvement target."
      }
    ],
    "workDone": [
      "The luxmeter was structured as a complete measurement chain: a light-sensitive element produces an electrical response, an analog interface maps that response into the microcontroller's ADC range, firmware converts counts to voltage, and a calibration model maps the electrical observable to illuminance. This order keeps raw acquisition, electrical conversion, and physical-unit calibration distinct, which is essential when the sensor law or reference voltage changes.",
      "The prototype firmware samples repeatedly, rejects impossible values, applies short-window smoothing, and presents both the lux estimate and a stable operating state. Calibration points are associated with reference illuminance rather than assuming ADC counts are already linear in lux. Depending on the sensor response, the fitted relation can be piecewise, polynomial, log-domain, or a lookup table with interpolation; the implementation contract avoids claiming a specific transfer law without calibration evidence.",
      "The engineering record also accounts for resolution, saturation, dark offset, supply/reference variation, resistor tolerance, sensor tolerance, geometry, and temperature. These effects define where a low-cost prototype is useful and where a traceable photometric instrument would require a characterized spectral response, cosine correction, calibrated reference source, and uncertainty budget."
    ],
    "workflow": [
      {
        "text": "Choose expected indoor/outdoor illumination, update rate, acceptable saturation, and display resolution before selecting the interface.",
        "title": "Define the measurement range"
      },
      {
        "text": "Record supply, reference, divider or transimpedance relation, ADC range, dark offset, and clipping behavior.",
        "title": "Characterize the analog path"
      },
      {
        "text": "Collect repeated ADC/voltage readings at distributed reference-lux levels with controlled geometry and warm-up.",
        "title": "Acquire reference pairs"
      },
      {
        "text": "Evaluate residuals for linear, log/power, polynomial, piecewise, or lookup models and prefer the simplest adequate relation.",
        "title": "Fit and compare calibration laws"
      },
      {
        "text": "Apply range checks, calibration, causal smoothing, units, and saturation/fault indicators in firmware.",
        "title": "Implement bounded conversion"
      },
      {
        "text": "Repeat points during increasing and decreasing illumination and quantify noise, hysteresis, drift, and reference dependence.",
        "title": "Validate repeatability"
      }
    ]
  },
  "microwave-signal-loss-prediction": {
    "decisions": [
      {
        "decision": "Use regression as the primary baseline",
        "rationale": "The objective includes physical interpretability and diagnostic value, not only minimizing forecast error.",
        "tradeoff": "A linear response cannot capture every rain-fade threshold, interaction, or site-specific nonlinear effect."
      },
      {
        "decision": "Preserve chronological order",
        "rationale": "Random splitting would place adjacent, highly correlated hours on both sides of the boundary and overstate generalization.",
        "tradeoff": "A time split can be harder because the test period may contain a different weather regime, but that difficulty is operationally meaningful."
      },
      {
        "decision": "Retain correlated-feature warnings",
        "rationale": "A useful prediction does not make every fitted coefficient physically causal.",
        "tradeoff": "The interpretation is more cautious, but it avoids advertising a misleading propagation relationship."
      }
    ],
    "theory": [
      {
        "equation": "Pr[dBm] = Pt + Gt + Gr − Lfs − Latm − Lmisc",
        "explanation": "Logarithmic units convert multiplicative power ratios into additive terms. Weather-dependent attenuation enters the budget as an additional loss and can be studied after deterministic geometry and equipment terms are controlled.",
        "title": "Link loss as an additive budget",
        "variables": "Pt and Pr are transmit and receive powers; Gt and Gr are antenna gains; Lfs, Latm, and Lmisc are free-space, atmospheric, and miscellaneous losses in decibels.",
        "why": "The link-budget view preserves RF meaning around the statistical model and clarifies that the forecast target is attenuation, not an arbitrary numerical response."
      },
      {
        "equation": "L̂t+1 = β₀ + xₜᵀβ,   β̂ = (XᵀX)⁻¹Xᵀy",
        "explanation": "Ordinary least squares minimizes the sum of squared residuals. A coefficient estimates the change in predicted loss for one unit of its predictor while all other columns are held constant.",
        "title": "Multiple linear regression",
        "variables": "xₜ contains present and lagged predictors; β contains conditional coefficients; y contains next-hour losses.",
        "why": "The closed-form, inspectable baseline is appropriate before higher-capacity models because it exposes leakage, scaling, collinearity, and the amount of temporal persistence already present."
      },
      {
        "equation": "xₜ = [Rₜ, Tₜ, Wₜ, Lₜ, Rₜ₋₁, Lₜ₋₁, …],   target = Lₜ₊₁",
        "explanation": "Lag features represent persistence and delayed atmospheric effects. Chronological alignment is essential: a negative shift in the wrong direction would leak the future target into the input.",
        "title": "Lagged forecasting structure",
        "variables": "R, T, W, and L denote rain, temperature, wind, and loss; every feature timestamp is no later than t.",
        "why": "Microwave loss is temporally correlated. Lags provide a transparent memory mechanism without abandoning the interpretability of regression."
      },
      {
        "equation": "MAE = mean|e|,   RMSE = √mean(e²),   R² = 1 − Σe²/Σ(y−ȳ)²",
        "explanation": "MAE describes a typical absolute dB error, RMSE penalizes larger misses more strongly, and R² compares residual energy with a mean-only reference. MAPE adds a relative view when target values remain safely away from zero.",
        "title": "Held-out accuracy measures",
        "variables": "e = y − L̂ is the prediction residual; ȳ is the test-target mean.",
        "why": "No single score characterizes operational behavior. Reporting complementary metrics makes large fade misses, average error, and explained variance visible."
      },
      {
        "equation": "VIFⱼ = 1/(1 − Rⱼ²)",
        "explanation": "A large variance-inflation factor indicates that a predictor is largely reconstructible from the remaining columns. Predictions can stay stable while individual coefficients become sensitive or change sign.",
        "title": "Collinearity diagnostic",
        "variables": "Rⱼ² is obtained by regressing predictor j on all other predictors.",
        "why": "Weather and lag variables are naturally correlated. VIF and coefficient stability prevent a statistically fitted sign from being reported as a physical causal conclusion."
      }
    ],
    "workDone": [
      "A one-year hourly propagation dataset was organized around rainfall intensity, temperature, wind speed, and microwave loss. After alignment and lag construction, 8,758 usable rows remained. The prediction target was defined explicitly as the next-hour attenuation, which separates forecasting from merely explaining the current sample. Every lag was generated from past information only, and the final approximately 20% of the timeline was reserved as an unseen chronological test interval.",
      "A multiple linear regression baseline was fitted because coefficient visibility is valuable in link engineering: the contribution of rainfall, current loss, and lagged environmental variables can be inspected directly. Model quality was evaluated with R², MAE, RMSE, and MAPE, while residual histograms, Q–Q behavior, residual-versus-fit structure, and time-ordered residuals were used to test whether the headline score concealed bias, changing variance, or temporal structure.",
      "The analysis distinguished forecast usefulness from causal interpretation. Correlated present and lagged weather variables can redistribute coefficient signs even when the joint prediction is accurate. The lagged-rain coefficient was therefore treated as a multicollinearity diagnostic, not a new propagation law. This gives the study a rigorous baseline that can later be compared with nonlinear rain-attenuation models and measured-link data."
    ],
    "workflow": [
      {
        "text": "Fix next-hour loss as the target and state which observations are actually available at prediction time.",
        "title": "Define the forecast horizon"
      },
      {
        "text": "Check hourly spacing, missing values, units, ranges, and timestamp order before constructing any lag.",
        "title": "Validate and align the timeline"
      },
      {
        "text": "Create current and lagged weather/loss terms, discard rows made incomplete by shifting, and record the feature contract.",
        "title": "Engineer past-only features"
      },
      {
        "text": "Use the earlier interval for estimation and the later interval for final evaluation; do not shuffle neighboring observations.",
        "title": "Split chronologically"
      },
      {
        "text": "Estimate the regression, standard errors, confidence intervals, correlation matrix, and variance-inflation factors.",
        "title": "Fit and inspect coefficients"
      },
      {
        "text": "Report MAE, RMSE, MAPE, R², distributional diagnostics, time plots, and performance under high-rain subsets.",
        "title": "Evaluate residuals"
      },
      {
        "text": "Separate conclusions supported by the synthetic series from claims that require a measured link at a specified frequency and path.",
        "title": "Define transfer limits"
      }
    ]
  },
  "100wpa": {
    "decisions": [
      {
        "decision": "Use five band-specific RF modules",
        "rationale": "Device gain, optimum impedance, distributed effects, and matching feasibility change substantially from 100 MHz to 10 GHz.",
        "tradeoff": "Modularity improves realizability and serviceability but adds switching, connectors, control logic, inventory, and calibration."
      },
      {
        "decision": "Keep control and protection on a common board",
        "rationale": "Sequencing, fault policy, sensing, and interface behavior should remain consistent across RF bands.",
        "tradeoff": "The shared board becomes safety-critical and must avoid coupling digital/control noise into sensitive bias and detector paths."
      },
      {
        "decision": "Treat 100 W as a verified-test gate, not a schematic property",
        "rationale": "Delivered RF power depends on device variation, match, combination, cooling, supply droop, and the calibrated load.",
        "tradeoff": "The current claim is deliberately conservative until hardware evidence closes the loop."
      }
    ],
    "theory": [
      {
        "equation": "Gp = Pout/Pin,   PAE = (Pout − Pin)/PDC × 100%",
        "explanation": "Power-added efficiency distinguishes useful RF power created by the amplifier from input drive that merely passes through. Under compression, gain, output power, drain efficiency, and PAE must be considered together.",
        "title": "Power gain and efficiency",
        "variables": "Pin and Pout are RF input and output powers; PDC is total DC power delivered to the active devices.",
        "why": "A high output-power claim without DC consumption and compression context is incomplete. PAE directly connects RF performance to supply and thermal design."
      },
      {
        "equation": "ZL,opt(P,f) = arg maxZ {Pout(Z) | PAE, gain, V/I limits acceptable}",
        "explanation": "A transistor's optimum large-signal load is generally not 50 Ω and changes over frequency and drive. Load-pull contours show the impedance region that trades output power against efficiency while respecting voltage and current limits.",
        "title": "Nonlinear optimum load",
        "variables": "ZL,opt is the device-plane load impedance selected at power P and frequency f.",
        "why": "Small-signal conjugate matching alone does not guarantee saturated-power performance. Load-pull establishes the nonlinear target the output network must transform to 50 Ω."
      },
      {
        "equation": "PΣ = |Σk √Pk e^(jφk)|²,   ηcomb = Pout,total / Σk Pout,k",
        "explanation": "Equal coherent branches add voltage in phase and deliver the intended combined power. Amplitude or phase imbalance diverts energy toward isolation elements or reflected ports and can overstress one branch.",
        "title": "Power combination sensitivity",
        "variables": "Pk and φk are branch powers and phases at the combiner reference plane; ηcomb includes dissipative and mismatch losses.",
        "why": "A 100 W-class module assembled from parallel stages is only as strong as its amplitude/phase balance, isolation, and thermal symmetry."
      },
      {
        "equation": "Γ = (Z − Z0)/(Z + Z0),   VSWR = (1+|Γ|)/(1−|Γ|),   K > 1 and |Δ| < 1",
        "explanation": "Matching controls delivered power, while stability criteria test whether a linearized two-port is unconditionally stable for passive source and load impedances. Large-signal and out-of-band checks are still required.",
        "title": "Matching and stability",
        "variables": "Z0 is the reference impedance; Γ is reflection coefficient; K and Δ are two-port stability factors.",
        "why": "Wideband active hardware may oscillate outside the desired band even when in-band gain looks correct. Stability must precede power testing."
      },
      {
        "equation": "Tj = Ta + Pdiss(θJC + θCS + θSA)",
        "explanation": "RF power not delivered to the load becomes heat. Thermal interfaces add in series, and branch imbalance can create local junction temperatures well above a board-average measurement.",
        "title": "Thermal operating limit",
        "variables": "Tj and Ta are junction and ambient temperatures; Pdiss is dissipated power; θ terms represent junction-to-case, interface, and sink-to-ambient thermal resistance.",
        "why": "A design that meets RF targets for seconds but exceeds junction temperature is not a usable amplifier. Thermal resistance sets continuous-wave duty and cooling requirements."
      }
    ],
    "workDone": [
      "The 0.1–10 GHz requirement was partitioned into five dedicated GaN power-amplifier modules and one common control/protection board. This avoids asking one matching network, transistor package, bias structure, and PCB stack-up to behave uniformly across two decades of frequency. Each RF module was treated as a 50 Ω subsystem with its own device operating point, stability checks, input/output matching, combining strategy, directional sampling, thermal path, and mechanically defined interfaces.",
      "For each band, the design flow moves from device data and nonlinear models to source/load impedance exploration, harmonic-balance verification, matching-network realization, and PCB-aware layout. Parallel branches are phase- and amplitude-matched before combination; connector launches, bias tees, decoupling, RF chokes, via fences, grounding, and heat spreading are included in the RF current path rather than added after schematic completion. The control board distributes bias and enable states, monitors current and temperature, and provides interlocks that prevent RF drive under unsafe conditions.",
      "The package was reviewed as a modular engineering baseline: band selection, power sequencing, monitoring, RF isolation, manufacturability, and DRC are documented separately from final RF performance. The stated 100 W-class objective therefore remains a selected-band system target; final saturated output, gain, efficiency, harmonics, ruggedness, and thermal rise require the specified devices, fabricated boards, calibrated fixtures, loads, and cooling assembly."
    ],
    "workflow": [
      {
        "text": "Assign bands according to device capability, realizable match bandwidth, PCB loss, connector behavior, and available nonlinear models.",
        "title": "Partition the frequency range"
      },
      {
        "text": "Define drain voltage, quiescent current, class of operation, safe operating area, sequencing, and bias tolerances.",
        "title": "Set device operating points"
      },
      {
        "text": "Review source/load-pull contours, compression, harmonics, and stability over frequency, power, temperature, and mismatch.",
        "title": "Establish nonlinear targets"
      },
      {
        "text": "Transform device-plane impedances, realize bias tees and decoupling, then include lines, pads, packages, vias, and launches.",
        "title": "Synthesize each RF path"
      },
      {
        "text": "Control electrical length and branch loss, verify isolation and reflected-power paths, and allocate combining loss in the power budget.",
        "title": "Design the combiner"
      },
      {
        "text": "Implement current, voltage, temperature, enable, sequencing, and fault-latch behavior with safe default states.",
        "title": "Integrate protection"
      },
      {
        "text": "Complete schematic/layout review and DRC, then define staged low-power S-parameter, bias, thermal, power, harmonic, and mismatch tests.",
        "title": "Release with test gates"
      }
    ]
  },
  "cem-computable-electromagnetic-medium": {
    "decisions": [
      {
        "decision": "Train only a linear readout",
        "rationale": "The goal is to test whether the electromagnetic medium supplies useful state expansion and memory.",
        "tradeoff": "Performance may be below a fully trained recurrent network, but attribution to the physical reservoir is much clearer."
      },
      {
        "decision": "Use effective rank in addition to channel count",
        "rationale": "Correlated receive channels can be numerous yet computationally redundant.",
        "tradeoff": "Rank depends on normalization, sample length, noise, and the chosen observable, so those details must accompany the value."
      },
      {
        "decision": "Evaluate both linear and nonlinear temporal tasks",
        "rationale": "Delay reconstruction measures fading memory, while parity and NARMA10 probe nonlinear computation across time.",
        "tradeoff": "No single task score defines universal computational capability; results remain task- and configuration-specific."
      }
    ],
    "theory": [
      {
        "equation": "ym[n] = Σℓ hm[ℓ] u[n−ℓ] + vm[n]",
        "explanation": "Each receive channel contains differently delayed copies of past inputs. The vector of simultaneous observations therefore encodes a finite history even though no explicit digital delay line was constructed.",
        "title": "Multipath as temporal convolution",
        "variables": "u[n] is the injected sequence; hm[ℓ] is the impulse response to observation m; vm[n] is measurement noise.",
        "why": "This equation identifies the physical origin of reservoir memory and connects delay spread directly to the recoverable task horizon."
      },
      {
        "equation": "x[n] = φ([y1[n],…,yM[n], y1[n−1],…]ᵀ)",
        "explanation": "State construction exposes spatial, temporal, and possibly nonlinear diversity to the readout. Purely linear channel states can reconstruct linear memory; nonlinear observables are needed for nonlinear temporal tasks.",
        "title": "Reservoir-state construction",
        "variables": "M is the number of observation channels; φ may include normalization, nonlinear detection, quadrature features, or bias terms.",
        "why": "Separating the physical medium from feature construction makes it clear which computational capacity comes from propagation and which comes from the receiver observable."
      },
      {
        "equation": "Wout = YXᵀ(XXᵀ + λI)⁻¹",
        "explanation": "The readout minimizes squared prediction error plus λ times coefficient energy. Regularization stabilizes the inverse when channel states are correlated or when the number of features is large relative to training samples.",
        "title": "Regularized linear readout",
        "variables": "X contains reservoir states; Y contains target outputs; λ is ridge regularization.",
        "why": "Training only the readout preserves the reservoir-computing principle and provides a closed-form, reproducible estimator with controllable overfitting."
      },
      {
        "equation": "MC = Σk MCk,   MCk = cov²(u[n−k],ûk[n])/(var(u)var(ûk))",
        "explanation": "Each MCk is a squared correlation between a past input and its reconstruction. Summation across delays measures how much independent input history the state exposes to a linear observer.",
        "title": "Linear memory capacity",
        "variables": "ûk[n] is the readout reconstruction of the input delayed by k samples.",
        "why": "A single best delay would hide the distribution of memory. Capacity shows both usable horizon and aggregate recall."
      },
      {
        "equation": "reff = exp(−Σi pi ln pi),   pi = σi/Σjσj",
        "explanation": "Effective rank is high when energy is distributed across multiple independent state directions and low when observations are redundant. It is continuous and more informative than a hard numerical-rank threshold.",
        "title": "Effective state rank",
        "variables": "σi are singular values of the centered state matrix and pi is their normalized spectrum.",
        "why": "Many antenna or delay channels do not automatically provide many computational dimensions. SVD reveals whether added observations contribute independent information."
      }
    ],
    "workDone": [
      "CEM reframes a multipath environment as a physical computational substrate. A transmitted temporal sequence excites many delayed and weighted propagation paths; multiple receive observations sample different mixtures of that history. Those measurements are transformed into a reservoir-state vector whose internal dynamics are supplied by the channel itself, leaving only a linear readout to be fitted for the desired task.",
      "The study measured temporal memory with delayed-input reconstruction, tested nonlinear processing with temporal parity, and evaluated a standard NARMA10 sequence task. State matrices were centered and inspected through singular values, effective rank, correlation, and conditioning before regression. Training and evaluation segments were separated so the readout could not be judged on the same states used to estimate its coefficients.",
      "The archived results—linear memory capacity 18.03, effective state rank 12.40, temporal-parity accuracy 99.38%, and NARMA10 NRMSE 0.4313—are presented as properties of the defined numerical/experimental channel configuration. The interpretation is not that every multipath channel computes well; useful computation requires fading diversity, fading memory, adequate state rank, stable sampling, and a task whose time scale matches the medium."
    ],
    "workflow": [
      {
        "text": "Define bandwidth, delay spread, observation points, noise, sampling, and whether the medium is static or time varying.",
        "title": "Specify the physical channel"
      },
      {
        "text": "Use reproducible excitation with washout, training, validation, and test intervals sized for the channel memory.",
        "title": "Inject a known sequence"
      },
      {
        "text": "Align all receive channels, remove invalid samples, and retain raw amplitude/phase or detector outputs with calibration metadata.",
        "title": "Acquire synchronized observations"
      },
      {
        "text": "Combine spatial and temporal observations, apply the selected observable φ, center using training statistics, and avoid future leakage.",
        "title": "Construct and normalize states"
      },
      {
        "text": "Calculate singular values, effective rank, pairwise correlation, conditioning, and sensitivity to channel removal or noise.",
        "title": "Inspect state geometry"
      },
      {
        "text": "Select λ on validation data and fit task-specific linear outputs for delay recall, parity, and NARMA10.",
        "title": "Fit regularized readouts"
      },
      {
        "text": "Report delay-resolved capacity, classification accuracy, NRMSE, confidence intervals, and degradation under changed propagation.",
        "title": "Test generalization"
      }
    ]
  },
  "entropy-vna": {
    "decisions": [
      {
        "decision": "Program multiple covariance states",
        "rationale": "One covariance matrix may be invariant under several transfer operators and cannot identify a general two-port.",
        "tradeoff": "Additional probes increase acquisition time and demand tighter cross-record synchronization."
      },
      {
        "decision": "Use complex cross-covariance information",
        "rationale": "Power-only diagonal terms discard relative phase needed for vector network characterization.",
        "tradeoff": "Channel phase coherence, reference-plane calibration, and oscillator stability become essential."
      },
      {
        "decision": "Treat conditioning as a design variable",
        "rationale": "Even a formally identifiable lifted system can amplify finite-sample and receiver noise if its singular values are poorly distributed.",
        "tradeoff": "Probe design may sacrifice simple excitation patterns in exchange for a more stable inverse."
      }
    ],
    "theory": [
      {
        "equation": "Ry = H Rx Hᴴ + Rn",
        "explanation": "For a linear system y = Hx+n with signal and noise uncorrelated, second-order statistics propagate bilinearly through H. Magnitude and relative phase information are encoded in the off-diagonal covariance terms.",
        "title": "Covariance transformation",
        "variables": "Rx and Ry are input and output covariance matrices; H is the complex transfer operator; Rn is additive-noise covariance.",
        "why": "This is the central bridge between controlled stochastic excitation and deterministic RF-system parameters."
      },
      {
        "equation": "vec(Ry−Rn) = (H* ⊗ H) vec(Rx)",
        "explanation": "Vectorization converts each matrix congruence into a linear relation in covariance space once the lifted operator H*⊗H is considered. Multiple probes provide additional equations and improve observability.",
        "title": "Vectorized inverse model",
        "variables": "vec stacks matrix columns; ⊗ is the Kronecker product; H* is elementwise complex conjugate.",
        "why": "The lifted representation exposes rank deficiency, conditioning, and which programmed covariance states add independent information."
      },
      {
        "equation": "H(f) = A(f)e^(−j2πfτ),   τ̂ = −(1/2π) d∠H/df",
        "explanation": "A time delay creates a linear phase slope with frequency. Phase must be unwrapped and calibration response removed before fitting the slope.",
        "title": "Delay in complex transfer",
        "variables": "A(f) contains amplitude and residual device response; τ is propagation delay.",
        "why": "Delay is a physically interpretable first validation target and tests whether the method recovers coherent phase, not only power."
      },
      {
        "equation": "[b1 b2]ᵀ = S [a1 a2]ᵀ,   S = [[S11,S12],[S21,S22]]",
        "explanation": "Recovering all four entries requires independent excitations that span both ports and calibrated observation of both outgoing waves. Reciprocity or symmetry may be tested but should not be assumed unless the device justifies it.",
        "title": "General two-port network",
        "variables": "a1,a2 are incident power waves; b1,b2 are reflected or transmitted waves; Sij are complex scattering parameters.",
        "why": "The S-matrix is the standard RF description and makes the reconstructed operator comparable with a conventional VNA."
      },
      {
        "equation": "yq[n] = ej(2πΔf tq,n + φq) H xq[n] + vq[n]",
        "explanation": "Oscillator mismatch produces a coherent rotation that changes sample covariance and cross-record phase. Estimating one shared offset with per-record phase terms uses all probes consistently.",
        "title": "Joint carrier-offset model",
        "variables": "Δf is common CFO, tq,n is sample time, φq is record phase, and q indexes covariance probes.",
        "why": "Independent phase corrections could absorb actual DUT phase and destroy identifiability. A joint model separates clock error from transfer behavior."
      }
    ],
    "workDone": [
      "ENTROPY-VNA was formulated around programmed stochastic excitation rather than one deterministic swept tone at a time. Known input covariance states illuminate the unknown RF network, synchronized complex outputs are collected, and sample covariance matrices are estimated after mean removal. The forward model predicts how an unknown complex transfer operator transforms each programmed second-order statistic.",
      "The reconstruction begins with delay and complex transfer estimation in a controlled single-path case and then extends to a general two-port network. Multiple linearly independent covariance probes are stacked so the unknown operator cannot hide behind one ambiguous excitation. Calibration states remove systematic source/receiver response, while a joint carrier-frequency-offset term is fitted across records instead of allowing phase drift to be misinterpreted as device phase.",
      "Model boundaries were stressed with finite records, receiver noise, covariance conditioning, synchronization errors, and departures from the assumed stationary linear time-invariant system. The project therefore demonstrates an identification concept and its observability conditions; it does not claim that covariance alone replaces calibrated vector measurements under every network, noise, or clock configuration."
    ],
    "workflow": [
      {
        "text": "Specify port impedance, incident/outgoing wave normalization, bandwidth, synchronization, and calibration planes.",
        "title": "Define the wave reference planes"
      },
      {
        "text": "Choose positive-semidefinite, well-conditioned input covariance matrices that span the required two-port excitation space.",
        "title": "Design covariance probes"
      },
      {
        "text": "Generate stochastic sequences, capture complex port waves, remove means, segment stationarity intervals, and retain timestamps.",
        "title": "Acquire synchronized records"
      },
      {
        "text": "Calculate sample covariance, subtract calibrated noise where justified, enforce Hermitian structure, and inspect eigenvalues.",
        "title": "Estimate and regularize covariance"
      },
      {
        "text": "Stack probes, examine rank/condition number, fit H under consistent phase conventions, and resolve unavoidable ambiguities with calibration references.",
        "title": "Solve the lifted inverse problem"
      },
      {
        "text": "Fit CFO and delay jointly across records rather than correcting each trace independently.",
        "title": "Estimate shared timing errors"
      },
      {
        "text": "Compare complex S-parameters, delay, residual covariance, passivity/reciprocity expectations, and sensitivity to record length and SNR.",
        "title": "Validate against known networks"
      }
    ]
  },
  "lpda-antenna": {
    "decisions": [
      {
        "decision": "Use an air-dielectric twin-boom architecture",
        "rationale": "It reduces substrate loss and lets the booms serve as both balanced feed conductors and the structural backbone.",
        "tradeoff": "Mechanical symmetry, boom spacing, supports, and feed transition become critical to repeatability."
      },
      {
        "decision": "Use 20 scaled elements",
        "rationale": "The count supports an overlapping active region across the target ratio while retaining directional gain.",
        "tradeoff": "Additional elements increase boom length, mass, fabrication tolerance stack-up, and simulation mesh size."
      },
      {
        "decision": "Evaluate realized gain, not gain in isolation",
        "rationale": "The application receives power only after mismatch and radiation losses.",
        "tradeoff": "The reported number is lower than directivity but much closer to system performance."
      }
    ],
    "theory": [
      {
        "equation": "Ln+1 = τLn,   Rn+1 = τRn,   0 < τ < 1",
        "explanation": "Scaling all important dimensions by τ produces similar electrical geometry at frequencies scaled approximately by 1/τ. This repeated structure creates wideband behavior without requiring every element to resonate simultaneously.",
        "title": "Log-periodic geometric scaling",
        "variables": "Ln is element half-length; Rn is its distance from the virtual apex; τ is the scale factor.",
        "why": "The relation converts a broad frequency requirement into a systematic geometry rather than an unconstrained element-by-element optimization."
      },
      {
        "equation": "σ = sn/(2Ln),   α = arctan[(1−τ)/(4σ)]",
        "explanation": "τ and σ jointly control active-region size, boom length, coupling, gain, and input impedance. Tighter scaling increases the number of simultaneously active elements but lengthens the structure for a fixed band.",
        "title": "Relative spacing",
        "variables": "sn is spacing between adjacent elements; σ is spacing factor; α is the array half-apex angle.",
        "why": "Using dimensionless design parameters makes trade studies portable across frequency and establishes the boom geometry consistently."
      },
      {
        "equation": "2Ln ≈ λ/2  for elements near resonance",
        "explanation": "Elements much longer than resonance behave reflectively; much shorter elements are primarily capacitive/directive. Radiation is dominated by a cluster whose sizes are near resonance, and that cluster moves toward shorter elements as frequency increases.",
        "title": "Active-region principle",
        "variables": "2Ln is full dipole length and λ is wavelength in the local electromagnetic environment.",
        "why": "The active-region view explains current distributions and why feed direction and element ordering produce end-fire radiation."
      },
      {
        "equation": "Γ = (Zin−Z0)/(Zin+Z0),   VSWR = (1+|Γ|)/(1−|Γ|)",
        "explanation": "Reflection coefficient is the complex voltage-wave ratio at the feed. VSWR expresses only its magnitude, so phase and impedance plots are still useful for diagnosing the source of mismatch.",
        "title": "Input match",
        "variables": "Zin is antenna input impedance and Z0 is the feed reference impedance.",
        "why": "Wideband gain is not useful if power cannot enter the balanced boom. Matching must be tracked across the full band and with the intended feed transition."
      },
      {
        "equation": "Grealized = D · ηrad · (1−|Γ|²)",
        "explanation": "Directivity describes angular concentration, radiation efficiency captures conductive/dielectric loss, and mismatch efficiency captures rejected input power.",
        "title": "Realized gain",
        "variables": "D is directivity; ηrad is radiation efficiency; the final factor is mismatch efficiency.",
        "why": "Separating these terms prevents directivity from being advertised as delivered system gain and identifies whether improvement should target pattern, material loss, or feed match."
      }
    ],
    "workDone": [
      "The LPDA was synthesized as a 20-element air-dielectric twin-boom array for 2.4–5.8 GHz operation. Element half-lengths and axial positions follow log-periodic scaling, so a geometrically similar active region moves along the boom as frequency changes. Initial scale factor, spacing factor, apex geometry, boom separation, and feed arrangement were translated into a complete three-dimensional CST model rather than evaluating isolated dipoles.",
      "Frequency-domain simulations used adaptive meshing, open boundaries, discrete-port excitation, and far-field monitors. Matching, VSWR, surface current, realized gain, directivity, beamwidth, front-to-back behavior, and radiation efficiency were inspected across the band. The 5.8 GHz result—9.40 dBi gain and approximately 1.35–1.40 VSWR—was retained with its frequency context instead of being presented as a band-wide constant.",
      "Mechanical integration was considered alongside RF behavior. The twin boom acts as a balanced transmission line and structural spine; element alignment, conductor diameter, feed transition, fasteners, support dielectric, pan-tilt loading, and cable routing can change the modeled impedance and pattern. These items define the measurement plan for a fabricated array."
    ],
    "workflow": [
      {
        "text": "Define frequency coverage, polarization, target gain, impedance, mechanical envelope, mount, cable, and environmental constraints.",
        "title": "Set the band and system interface"
      },
      {
        "text": "Choose scale and spacing factors, calculate element sequence and boom positions, and verify the resulting apex angle and total length.",
        "title": "Synthesize τ and σ"
      },
      {
        "text": "Model alternating element connection, boom cross-section/separation, feed gap, conductor diameter, and structural materials.",
        "title": "Build the balanced structure"
      },
      {
        "text": "Use open-space clearance, adaptive mesh refinement around feeds and small elements, and convergence criteria for S-parameters and fields.",
        "title": "Control numerical boundaries"
      },
      {
        "text": "Inspect current distributions at representative low, mid, and high frequencies and confirm expected migration along the boom.",
        "title": "Evaluate the active region"
      },
      {
        "text": "Report S11/VSWR, directivity, realized gain, efficiencies, beamwidth, front-to-back ratio, and cross-polarization where available.",
        "title": "Extract complete antenna metrics"
      },
      {
        "text": "Define fixture, balun/feed, cable routing, VNA calibration, pattern range, pan-tilt loading, and dimensional tolerances.",
        "title": "Prepare mechanical verification"
      }
    ]
  },
  "morpheus": {
    "decisions": [
      {
        "decision": "Solve for the differential scattering response",
        "rationale": "The physical object already contributes a field, so the shell should synthesize only the coherent correction required to reach the virtual target.",
        "tradeoff": "The solution depends on accurate phase-calibrated knowledge of the physical object and incident state."
      },
      {
        "decision": "Regularize before command quantization",
        "rationale": "A lower-energy continuous solution is less sensitive to finite states and component errors.",
        "tradeoff": "Regularization accepts some modeling residual to gain implementability and robustness."
      },
      {
        "decision": "Use finite amplitude/phase states plus OFF",
        "rationale": "A discrete alphabet corresponds to controllable cell electronics and permits failure/isolation states.",
        "tradeoff": "Quantization reduces transformation fidelity and makes state-codebook design part of the RF problem."
      }
    ],
    "theory": [
      {
        "equation": "d = (Sv − Sp)a",
        "explanation": "The active shell does not need to generate the entire virtual response. It must generate the complex difference between the desired virtual scattering and the response already produced by the enclosed object.",
        "title": "Required compensating field",
        "variables": "Sp and Sv are physical- and virtual-target scattering operators; a describes incident-field channel coefficients; d is the shell response required at the observation channels.",
        "why": "Difference-field formulation gives a precise, measurable objective and retains phase information required for coherent radar scattering."
      },
      {
        "equation": "y = G u + Sp a,   target: G u ≈ d",
        "explanation": "Each calibrated column of G is the channel response caused by one unit cell under the defined reference condition. Superposition predicts the combined controlled field.",
        "title": "Linear influence model",
        "variables": "G maps 64 cell commands u to the 48 complex channels; y is total observed scattering.",
        "why": "The matrix model exposes controllability, calibration requirements, and which target components lie outside the shell's achievable subspace."
      },
      {
        "equation": "uλ = (GᴴWG + λR)⁻¹GᴴW d",
        "explanation": "Regularization suppresses large commands in directions where G has weak singular values. Weighted fitting can prioritize angles, polarizations, or frequencies relevant to the mission.",
        "title": "Tikhonov-regularized inverse",
        "variables": "W weights observation channels; R penalizes command energy or undesirable cell patterns; λ sets regularization strength.",
        "why": "An unregularized pseudoinverse may amplify calibration noise and exceed hardware limits. Tikhonov provides a controlled residual–effort tradeoff."
      },
      {
        "equation": "G = UΣVᴴ,   κ = σmax/σmin",
        "explanation": "Large singular values correspond to shell command combinations that strongly affect observations; small values correspond to poorly controllable or nearly redundant directions.",
        "title": "SVD and controllability",
        "variables": "σi are singular values; κ is condition number over the retained subspace.",
        "why": "SVD determines attainable target structure, guides λ selection, and explains why some virtual responses are robust while others demand excessive command precision."
      },
      {
        "equation": "q(ui) = arg minc∈C |ui−c|²,   C = {OFF} ∪ {Ak e^(jφm)}",
        "explanation": "Continuous commands are mapped to finite hardware states. The field is recomputed after projection because independent nearest-state choices can interact coherently at the observations.",
        "title": "Discrete command projection",
        "variables": "C is the 32-state-plus-OFF cell alphabet; Ak and φm are realizable amplitude and phase levels.",
        "why": "Quantized evaluation closes the gap between inverse mathematics and a command word that actual RF cells can accept."
      }
    ],
    "workDone": [
      "MORPHEUS models a physical object surrounded by a 64-cell active Huygens shell. The bare object's complex radar response is sampled over the defined incident and observation channels, and a target response is specified for a chosen virtual object. The required shell contribution is their difference. A calibrated influence matrix maps each cell's complex command to those observation channels, turning scattering transformation into a constrained inverse problem.",
      "The command vector was solved with singular-value analysis and Tikhonov regularization, then projected onto the realizable cell alphabet of 32 amplitude/phase states plus OFF. Residual error, command power, sensitivity to weak singular directions, and per-cell saturation were evaluated together. This is important because a numerically tiny residual obtained with enormous or unstable commands would not be a credible active surface solution.",
      "The 64-control, 48-complex-channel configuration was exercised under command quantization, cell failure, gain/phase error, calibration perturbation, incident variation, and Monte Carlo tolerances. The archived 95.67% pass rate belongs to the defined numerical gate and distribution. The remaining work—fabricated cells, mutual coupling, latency, synchronization, power delivery, thermal behavior, and calibrated chamber scattering—remains explicitly separated from the computational evidence."
    ],
    "workflow": [
      {
        "text": "Fix frequency, polarization, incident states, observation angles/channels, reference planes, physical object, and virtual target.",
        "title": "Define the scattering contract"
      },
      {
        "text": "Obtain Sp a across every required channel with consistent phase and amplitude calibration.",
        "title": "Characterize the bare object"
      },
      {
        "text": "Activate cells under controlled commands and assemble G while recording coupling, noise, drift, and repeatability.",
        "title": "Calibrate shell influence"
      },
      {
        "text": "Inspect singular values, rank, condition number, target projection error, and channel weighting before solving commands.",
        "title": "Analyze controllability"
      },
      {
        "text": "Sweep λ, command penalties, and observation weights; select an operating point from residual-versus-effort curves.",
        "title": "Solve and regularize"
      },
      {
        "text": "Project commands to finite states, apply OFF/saturation and power limits, and recompute the complete complex scattering response.",
        "title": "Quantize and enforce limits"
      },
      {
        "text": "Evaluate failures, gain/phase tolerances, calibration error, changed incidence, Monte Carlo distributions, and pass-gate sensitivity.",
        "title": "Stress the transformation"
      }
    ]
  },
  "rf-filter-ai-synthesizer": {
    "decisions": [
      {
        "decision": "Use magnitude and phase as parallel channels",
        "rationale": "The complex response contains dispersive information that magnitude alone discards.",
        "tradeoff": "Phase requires reliable unwrapping, reference-plane consistency, and greater sensitivity to measurement delay."
      },
      {
        "decision": "Use a 1D CNN rather than image conversion",
        "rationale": "The samples form an ordered frequency sequence and local response features can be learned directly.",
        "tradeoff": "Inputs must share a defined grid or undergo controlled resampling."
      },
      {
        "decision": "Bound claims to the synthetic response family",
        "rationale": "A model trained on one analytic generator has not seen fixture parasitics, alternate topologies, calibration error, or full-wave discontinuities.",
        "tradeoff": "The present capability is narrower, but the next evidence required for transfer is explicit."
      }
    ],
    "theory": [
      {
        "equation": "Ω = (f−fc)/BW,   H(f) = [1 + jΩ]⁻⁵",
        "explanation": "Normalizing frequency around fc produces a family of similar complex responses whose horizontal position and width are controlled directly by the regression targets. Magnitude and phase remain coupled through the same complex H.",
        "title": "Parametric response generation",
        "variables": "f is observation frequency; fc is center frequency; BW controls normalized frequency spread; five is the modeled filter order.",
        "why": "A parametric generator supplies exact labels and controlled coverage for proving the inverse-learning workflow before measured datasets are available."
      },
      {
        "equation": "x = [20log₁₀|H(f)|, unwrap(arg H(f))]ᵀ",
        "explanation": "Magnitude encodes pass/stop behavior and bandwidth; phase adds dispersive structure and can disambiguate responses with similar magnitudes. Unwrapping removes artificial ±π discontinuities before learning.",
        "title": "Feature representation",
        "variables": "The two rows are magnitude in decibels and continuous phase across the common frequency grid.",
        "why": "Using both channels preserves more of the complex network response than a magnitude-only image while retaining a simple one-dimensional geometry."
      },
      {
        "equation": "zq[k] = σ(bq + Σc Σm wq,c[m] xc[k−m])",
        "explanation": "Shared kernels scan local slopes, corners, peaks, and phase transitions regardless of their exact grid index. Deeper layers combine local evidence into band-scale descriptors.",
        "title": "One-dimensional convolution",
        "variables": "wq,c is a learned kernel from input channel c to feature q; k indexes frequency; σ is the activation.",
        "why": "Convolution uses the ordered frequency structure, needs fewer parameters than a fully connected layer over all 2,002 inputs, and naturally supports paired magnitude/phase channels."
      },
      {
        "equation": "J = (1/N)Σi ‖ŷi−yi‖₂²,   y = [(fc−μf)/sf, (BW−μB)/sB]",
        "explanation": "Target scaling prevents the numerically larger engineering quantity from dominating squared loss. Inverse scaling converts errors back to GHz or MHz for interpretation.",
        "title": "Normalized multi-output regression",
        "variables": "μ and s are training-set centering/scaling constants; the two outputs are normalized center frequency and bandwidth.",
        "why": "Balanced optimization in normalized space and reporting in physical units provide both stable training and meaningful engineering evidence."
      },
      {
        "equation": "MAEfc[MHz] = 1000·sf·mean|êfc,norm|",
        "explanation": "A dimensionless network loss can appear small while corresponding to a significant frequency error. The inverse transform makes acceptance thresholds directly comparable with filter bandwidth and measurement resolution.",
        "title": "Error in engineering units",
        "variables": "sf is the GHz scale used for center-frequency normalization and ê is normalized residual.",
        "why": "Model quality must be judged by RF tolerances, not only machine-learning loss curves."
      }
    ],
    "workDone": [
      "A synthetic dataset of 2,500 fifth-order filter responses was generated over a 2–11 GHz observation grid containing 1,001 frequency samples. Center frequency and bandwidth were varied within the defined design space; complex transfer functions were converted to magnitude and unwrapped phase, then perturbed with controlled measurement-like noise and response variation. Parameters, seeds, splits, and normalization values were retained to make every training example reproducible.",
      "Magnitude and phase were treated as two synchronized one-dimensional channels. A compact 1D convolutional network learned local spectral shapes, combined them into higher-level features, and regressed normalized center-frequency and bandwidth targets. Training, validation, and test partitions were separated before normalization statistics and model selection, preventing test information from influencing the fitted representation.",
      "Predictions were transformed back to engineering units and reviewed with residual plots, scatter plots, per-parameter MAE/RMSE, worst cases, and out-of-range warnings. The model is positioned as a rapid inverse estimator for responses similar to the synthetic generator—not as a substitute for network synthesis, EM modeling, or VNA validation of arbitrary filters."
    ],
    "workflow": [
      {
        "text": "State filter family, order, center/bandwidth ranges, frequency grid, noise model, and supported output parameters.",
        "title": "Define the inverse-design domain"
      },
      {
        "text": "Sample parameters with traceable seeds, compute H(f), and reject invalid or duplicate edge cases.",
        "title": "Generate labeled complex responses"
      },
      {
        "text": "Convert to dB magnitude and unwrapped phase, add controlled noise/variation, and retain clean references for diagnostics.",
        "title": "Create realistic channels"
      },
      {
        "text": "Split train, validation, and test records; derive all normalization constants from training data only.",
        "title": "Partition before preprocessing"
      },
      {
        "text": "Monitor both parameter losses, validation convergence, overfitting, and sensitivity to architecture or random initialization.",
        "title": "Train the 1D CNN"
      },
      {
        "text": "Invert target scaling and calculate per-output MAE, RMSE, bias, percentile errors, and worst-case examples.",
        "title": "Restore physical units"
      },
      {
        "text": "Test noise, frequency-grid shifts, responses outside training ranges, and topologies not produced by the generator.",
        "title": "Challenge domain boundaries"
      }
    ]
  },
  "rfshield-lpf": {
    "decisions": [
      {
        "decision": "Use a seventh-order ladder",
        "rationale": "The order provides the transition selectivity needed between a 500 MHz passband edge and the 1 GHz rejection point.",
        "tradeoff": "Higher order increases insertion loss, component sensitivity, layout interaction, and tuning burden."
      },
      {
        "decision": "Model every interconnect as part of the filter",
        "rationale": "Pads, vias, lines, and SMA transitions contribute reactance and delay near the top of the operating range.",
        "tradeoff": "The model requires accurate stack-up and vendor component data, but nominal predictions become more credible."
      },
      {
        "decision": "Keep analytical and measured claims separate",
        "rationale": "Zero DRC and a strong simulation response do not constitute VNA evidence.",
        "tradeoff": "The current record is conservative and leaves final performance gates open for fabricated hardware."
      }
    ],
    "theory": [
      {
        "equation": "|H(jΩ)|² = 1 / [1 + ε² Tn²(Ω)]",
        "explanation": "Chebyshev polynomials distribute equal ripple through the passband to achieve a steeper transition than a same-order maximally flat response. Increasing order or ripple sharpens the transition but increases sensitivity and reactive complexity.",
        "title": "Chebyshev equal-ripple prototype",
        "variables": "ε sets passband ripple; Tn is the nth-order Chebyshev polynomial; Ω is normalized frequency.",
        "why": "The 108–500 MHz passband and rejection demand benefit from a controlled-ripple response rather than spending order on extreme passband flatness."
      },
      {
        "equation": "Lk = gk Z0/ωc,   Ck = gk/(Z0ωc)",
        "explanation": "The prototype is dimensionless. Scaling converts each ladder coefficient into a physical series inductance or shunt capacitance at the required impedance and cutoff.",
        "title": "Impedance and frequency scaling",
        "variables": "gk are normalized prototype values; Z0 is 50 Ω; ωc is angular cutoff frequency.",
        "why": "This provides a mathematically traceable starting point before standard-value optimization and parasitic correction."
      },
      {
        "equation": "Ttotal = Πk Tk = [[A,B],[C,D]],   S21 = 2/(A+B/Z0+CZ0+D)",
        "explanation": "Transmission matrices multiply directly for cascaded two-ports. The complete matrix is converted to S-parameters to predict delivered and reflected waves at 50 Ω ports.",
        "title": "ABCD cascade and S-parameters",
        "variables": "Tk represents a component, line, pad, or transition in physical order; Z0 is the port reference impedance.",
        "why": "This method integrates lumped parts with distributed PCB segments without reducing the layout to an ideal schematic."
      },
      {
        "equation": "Z0 ≈ [60/√εeff] ln(8h/w + w/(4h))  for w/h ≤ 1",
        "explanation": "Launch and interconnect impedance depend on geometry and dielectric properties. FR-4 thickness and permittivity tolerance can therefore change mismatch and electrical length near the upper band.",
        "title": "Microstrip impedance sensitivity",
        "variables": "w is trace width; h is substrate height; εeff is effective relative permittivity.",
        "why": "At hundreds of megahertz to 1 GHz, the PCB is an RF component. Controlled geometry is needed for the circuit model and manufactured board to agree."
      },
      {
        "equation": "Ppass ≈ (1/N) Σi 𝟙{ILi, RLi, Ai meet all gates}",
        "explanation": "A trial passes only if every specified frequency gate is satisfied. The joint pass rate is more meaningful than separate component tolerance ranges because resonance shifts interact.",
        "title": "Tolerance yield",
        "variables": "Each i is one randomly sampled component set; IL, RL, and A are insertion-loss, return-loss, and attenuation checks.",
        "why": "Nominal performance does not establish manufacturability. Yield analysis estimates how often real component variation still meets the complete requirement."
      }
    ],
    "workDone": [
      "RFShield LPF was developed from a normalized seventh-order Chebyshev-style ladder and then moved through impedance/frequency scaling, practical component selection, lossy network analysis, PCB realization, and manufacturing review. The final 50 Ω topology uses four series inductors and three shunt C0G/NP0 capacitors, preserving the expected alternating low-pass structure while using values that can be sourced and modeled at RF.",
      "The electrical model does not stop at ideal L and C symbols. Inductor ESR, finite Q, self-resonance tendency, capacitor ESR/ESL, package pads, via inductance, 50 Ω microstrip sections, SMA launches, and interconnect delay are represented as cascaded two-port networks. ABCD matrices are combined in physical order and converted to S-parameters, which allows insertion loss, return loss, passband ripple, and 1 GHz rejection to be evaluated from the complete path.",
      "Component tolerances are sampled in Monte Carlo trials and checked against explicit passband/stopband gates. The chosen two-layer 1.60 mm FR-4 layout emphasizes a continuous reference plane, short shunt returns, controlled launches, and a corrected ground-via fence. REV_C reached zero DRC violations and zero unconnected items; the published RF values remain model predictions until a fabricated board is measured with calibrated de-embedding."
    ],
    "workflow": [
      {
        "text": "Define passband, allowable insertion loss/ripple, minimum return loss, stop frequencies, attenuation, impedance, and power.",
        "title": "Translate requirements into gates"
      },
      {
        "text": "Choose order and ripple, calculate g-values, scale to 50 Ω and cutoff, and inspect ideal sensitivity.",
        "title": "Synthesize the normalized ladder"
      },
      {
        "text": "Map to available high-Q inductors and C0G/NP0 capacitors with package, Q, SRF, ESR/ESL, and tolerance data.",
        "title": "Select RF components"
      },
      {
        "text": "Insert models for parts, pads, microstrip, vias, launches, and finite-Q loss in their physical order.",
        "title": "Build the PCB-aware cascade"
      },
      {
        "text": "Adjust standard values and geometry while retaining topology, then inspect S11, S21, ripple, and group delay.",
        "title": "Optimize against all gates"
      },
      {
        "text": "Run Monte Carlo samples, record failure frequencies and margins, and revise values whose sensitivity dominates.",
        "title": "Estimate manufacturing yield"
      },
      {
        "text": "Complete DRC/Gerbers, fabricate, perform SOLT or TRL calibration, de-embed fixtures where appropriate, and compare measured/model residuals.",
        "title": "Release and measure"
      }
    ]
  },
  "solar-power-generation": {
    "decisions": [
      {
        "decision": "Model the panel as a nonlinear source",
        "rationale": "Available voltage, current, and maximum power vary with environment and operating point.",
        "tradeoff": "Control and validation become more complex than fixed-voltage regulation but match actual PV behavior."
      },
      {
        "decision": "Make protection dominant over MPPT",
        "rationale": "Maximum energy extraction must never override component, storage, or load safety limits.",
        "tradeoff": "Energy is intentionally curtailed during boundary conditions."
      },
      {
        "decision": "Withhold numerical performance claims until hardware is fixed",
        "rationale": "Efficiency and yield depend on the selected panel, power stage, layout, thermal assembly, storage, and profile.",
        "tradeoff": "The record emphasizes defensible design methodology over an unsupported headline number."
      }
    ],
    "theory": [
      {
        "equation": "I = Iph − I0{exp[(V+IRs)/(nVT)]−1} − (V+IRs)/Rsh",
        "explanation": "The model produces the characteristic nonlinear I–V curve. Irradiance primarily changes available current, while temperature alters voltage and diode behavior; resistive terms shape the knee and losses.",
        "title": "Single-diode photovoltaic model",
        "variables": "Iph depends mainly on irradiance; I0 is diode saturation current; Rs and Rsh are series/shunt resistances; nVT describes junction behavior.",
        "why": "Treating a panel as a fixed-voltage battery would hide the moving maximum-power point and lead to incorrect converter and protection choices."
      },
      {
        "equation": "P = VI,   dP/dV = I + V(dI/dV) = 0 at MPP",
        "explanation": "To the left and right of the maximum, the sign of dP/dV indicates which direction should move the operating voltage. Practical trackers estimate this derivative or compare successive power samples.",
        "title": "Maximum-power condition",
        "variables": "V and I are panel operating voltage/current; MPP is the peak of the P–V curve.",
        "why": "The condition supplies a physical objective for MPPT rather than using a fixed voltage that is only optimal under one environment."
      },
      {
        "equation": "Buck: Vout = D Vin;   Boost: Vout = Vin/(1−D)",
        "explanation": "Topology selection depends on whether the required output is always below, always above, or crosses the panel voltage. Real duty range must include losses, startup, minimum on/off time, and control margin.",
        "title": "Ideal converter duty relations",
        "variables": "D is switching duty ratio under continuous-conduction ideal assumptions.",
        "why": "Duty relationships connect MPPT commands to the load reflected into the panel and prevent selecting a topology that cannot cover environmental extremes."
      },
      {
        "equation": "ΔIL ≈ VL·D/(Lfs),   ΔVout ≈ ΔIL/(8Cfs)",
        "explanation": "Inductor ripple affects peak current, conduction mode, copper/core loss, and source-current ripple. Capacitor ripple affects bus stability and stress. Exact forms depend on topology and ESR.",
        "title": "Ripple and stored energy",
        "variables": "L and C are energy-storage components; fs is switching frequency; VL is inductor voltage during the selected interval.",
        "why": "Sizing only from average power can overcurrent semiconductors and destabilize sensing or MPPT."
      },
      {
        "equation": "η = Pout/Pin,   Tj = Ta + PlossθJA,   E = ∫ Pout(t)dt",
        "explanation": "Instantaneous peak efficiency does not determine daily energy. Loss and thermal rise vary with operating point, and control overhead or startup behavior can matter at low irradiance.",
        "title": "Efficiency, heat, and energy yield",
        "variables": "η is conversion efficiency; Ploss becomes heat; θJA is thermal resistance; E is delivered energy over time.",
        "why": "The final engineering objective is safe delivered energy across a profile, not one nominal voltage or laboratory efficiency point."
      }
    ],
    "workDone": [
      "The solar-power study was organized from the photovoltaic source outward. The panel was modeled as a nonlinear current source whose I–V and P–V curves move with irradiance and cell temperature. Voltage and current sensing were placed at the source interface so input power and safe limits can be observed directly rather than inferred from the downstream load.",
      "A controlled DC–DC stage changes the effective load presented to the panel while regulating a usable DC bus. The design process covers topology choice from input/output voltage ranges, switching frequency, duty-cycle limits, inductor ripple, capacitor ripple, semiconductor conduction/switching loss, reverse-current behavior, and thermal paths. Maximum-power-point tracking adjusts the command from measured voltage and current while preserving current, voltage, and temperature protections.",
      "PCB current loops, switching nodes, gate drive, analog sensing returns, grounding, connectors, fusing, and energy-storage interfaces were treated as part of the converter. The project establishes the engineering architecture and governing calculations; it intentionally avoids publishing final efficiency, yield, or lifetime numbers without a fixed panel, converter build, storage element, load profile, and measured outdoor campaign."
    ],
    "workflow": [
      {
        "text": "Collect panel Voc, Isc, Vmpp, Impp versus temperature/irradiance and define bus, battery, or load voltage/current limits.",
        "title": "Define source and load envelopes"
      },
      {
        "text": "Compare buck, boost, or buck–boost coverage, efficiency, isolation need, reverse-current path, control range, and component stress.",
        "title": "Select converter topology"
      },
      {
        "text": "Calculate duty range, ripple, peak/RMS currents, voltage margin, inductor saturation, capacitor ripple rating, and semiconductor losses.",
        "title": "Size switching components"
      },
      {
        "text": "Set voltage/current/temperature scaling, ADC filtering, overvoltage, overcurrent, reverse polarity/current, fuse, and safe shutdown behavior.",
        "title": "Design measurement and protection"
      },
      {
        "text": "Estimate power from synchronized samples, update duty slowly enough for settling, and prioritize protection over tracking.",
        "title": "Implement MPPT with limits"
      },
      {
        "text": "Minimize high-di/dt loops, isolate switching nodes from sensing, manage ground returns, size copper, and provide thermal spreading.",
        "title": "Lay out the power path"
      },
      {
        "text": "Sweep source/load, irradiance proxies, startup, shading, temperature, faults, efficiency, tracking error, ripple, and accumulated energy.",
        "title": "Validate across profiles"
      }
    ]
  },
  "spectra-stm32": {
    "decisions": [
      {
        "decision": "Use separate Learning, Ready, and Frozen states",
        "rationale": "Baseline adaptation must be intentional and observable; otherwise a persistent emitter could gradually become normal.",
        "tradeoff": "State management adds operator and firmware complexity but protects the statistical reference."
      },
      {
        "decision": "Report score, class, reason, confidence, and health",
        "rationale": "These fields answer severity, pattern, cause, certainty, and system integrity separately.",
        "tradeoff": "The interface is richer than one alarm bit, but diagnosis and validation become far more precise."
      },
      {
        "decision": "Keep the monitor passive and non-identifying",
        "rationale": "Band-power evidence supports environment-change detection, not guaranteed emitter identity, content decoding, jamming, or geolocation.",
        "tradeoff": "The scope is narrower but matches what the sensors and algorithms can defensibly establish."
      }
    ],
    "theory": [
      {
        "equation": "μn = μn−1 + (x−μn−1)/n,   M2,n = M2,n−1 + (x−μn−1)(x−μn)",
        "explanation": "Welford's update calculates mean and variance without storing the full history and avoids subtracting two large nearly equal sums. A bounded or exponentially weighted variant can track slow environmental drift.",
        "title": "Online baseline statistics",
        "variables": "μn is running mean; M2 accumulates squared deviations; variance is M2/(n−1).",
        "why": "An embedded monitor needs numerically stable, constant-memory statistics at continuous sample rates."
      },
      {
        "equation": "Ti = μi + max(kσi, mmin)",
        "explanation": "The statistical term adapts to each band's variability while the fixed margin prevents an unrealistically tight threshold when the estimated variance is small.",
        "title": "Adaptive threshold",
        "variables": "μi and σi are learned baseline statistics for band i; k is a sigma multiplier; mmin is a minimum engineering margin.",
        "why": "One absolute threshold cannot handle different detector offsets, ambient levels, and noise across frequency bands."
      },
      {
        "equation": "Oi[n] = (1−α)Oi[n−1] + α·𝟙{xi[n] > Ti,occ}",
        "explanation": "Occupancy captures persistence rather than instantaneous height. A modest but sustained rise can therefore be distinguished from a single spike.",
        "title": "Occupancy estimate",
        "variables": "Oi is smoothed fraction of occupied samples; α sets memory; Ti,occ is the band occupancy threshold.",
        "why": "RF changes can appear as duty-cycle changes even when peak power is not extreme."
      },
      {
        "equation": "A = clip(Σj wj ej, 0, 100)",
        "explanation": "Each evidence term is independently bounded and linked to a reason code. The score summarizes severity, while the evidence vector retains the explanation.",
        "title": "Explainable anomaly score",
        "variables": "ej are normalized evidence terms such as power, step, occupancy, and broadband agreement; wj are documented weights.",
        "why": "A single opaque threshold is difficult to debug in the field. Explicit contributions support tuning, audit, and operator trust."
      },
      {
        "equation": "C = Cbase · qmaturity · qvalid · qhealth · qagreement",
        "explanation": "Confidence is reduced by missing or saturated channels, recent reset, immature learning, timing overrun, or storage/clock faults. Detection and confidence are therefore distinct outputs.",
        "title": "Confidence and state gating",
        "variables": "Each q is a [0,1] factor for baseline maturity, valid channels, subsystem health, and agreeing evidence.",
        "why": "The system must be allowed to say that an observation is uncertain or invalid rather than converting missing evidence into false assurance."
      }
    ],
    "workDone": [
      "SPECTRA-STM32 was designed as a passive four-band RF-environment monitor around the STM32H743. External detector/filter channels feed protected ADC inputs; firmware converts them into calibrated band-power observations, filters transient noise, and maintains a statistical baseline per channel. Learning, Ready, and Frozen states make it explicit when adaptation is allowed and prevent an anomaly from being immediately absorbed into the definition of normal.",
      "The detection layer separates evidence from classification. Baseline-relative power excess, rapid temporal change, occupancy change, noise-floor rise, narrowband dominance, and broadband agreement contribute individually traceable terms. A bounded composite score is accompanied by a class—None, Narrowband, Broadband, Temporal, Mixed, or Invalid—a reason bit mask, confidence, and health state. Invalid ADCs, saturation, immature baselines, storage faults, clock problems, resets, and missed deadlines reduce confidence rather than silently producing a normal result.",
      "Mission services include TFT status pages, RTC timestamps, microSD event records, UART telemetry, watchdog handling, reset-cause capture, CRC-protected configuration, and fault management. The source tree was built for STM32H743ZIT6 and produced valid ELF/HEX/BIN outputs with the archived footprint. Physical RF calibration, complete peripheral hardware, latency, EMC, and thermal validation remain hardware gates."
    ],
    "workflow": [
      {
        "text": "Map ADC counts to detector units, characterize offset/noise/saturation, and store calibration with CRC and version metadata.",
        "title": "Calibrate acquisition channels"
      },
      {
        "text": "Reject impossible readings, apply causal smoothing, track stale channels, and timestamp each processing cycle.",
        "title": "Filter and validate samples"
      },
      {
        "text": "Update mean, variance, noise floor, occupancy, and temporal descriptors only in authorized baseline states.",
        "title": "Learn the environment"
      },
      {
        "text": "Calculate normalized power excess, step, occupancy change, noise-floor rise, and cross-band pattern evidence.",
        "title": "Generate evidence terms"
      },
      {
        "text": "Map the evidence vector to anomaly class, score, reason mask, and confidence without discarding raw band measurements.",
        "title": "Classify with reasons"
      },
      {
        "text": "Update TFT, timestamp events, write structured microSD records, and transmit bounded UART telemetry.",
        "title": "Record and report"
      },
      {
        "text": "Inject saturation, channel loss, corrupt configuration, storage failure, clock/reset events, and deadline misses; verify safe states and watchdog recovery.",
        "title": "Exercise fault behavior"
      }
    ]
  },
  "vanta": {
    "decisions": [
      {
        "decision": "Preserve the linear capture as a reference",
        "rationale": "Nonlinear states should add observations, not erase the best conventional measurement.",
        "tradeoff": "The virtual aperture needs multiple captures or state transitions and therefore adds time and calibration burden."
      },
      {
        "decision": "Use center-frequency shifts as a control experiment",
        "rationale": "True RF features move predictably in baseband while DC/zero-IF artifacts remain tied to the receiver origin.",
        "tradeoff": "The scene must remain stable across captures for the comparison to be valid."
      },
      {
        "decision": "Require repeated-state statistics",
        "rationale": "A device imperfection is informative only when its signature is repeatable relative to drift and noise.",
        "tradeoff": "This narrows usable states but prevents random artifacts from being marketed as sensing dimensions."
      }
    ],
    "theory": [
      {
        "equation": "y = a1x + a3|x|²x + a5|x|⁴x + …",
        "explanation": "Odd-order complex-envelope terms place distortion near the desired band. Their coefficients change with RF/IF gain, device bias, and operating level, producing structured but non-ideal transfer behavior.",
        "title": "Complex memoryless nonlinearity",
        "variables": "x and y are complex baseband input/output; a1 is linear gain; higher odd-order terms create compression and intermodulation.",
        "why": "The polynomial is a compact first model for determining whether observed artifacts scale consistently enough to become features."
      },
      {
        "equation": "fIM3,L = 2f1−f2,   fIM3,U = 2f2−f1",
        "explanation": "Cubic terms mix the tones and create products close to the fundamentals, where ordinary filtering cannot remove them. Their amplitude rises approximately three decibels per one-decibel input increase in the weakly nonlinear region.",
        "title": "Third-order intermodulation",
        "variables": "f1 and f2 are the two input tones.",
        "why": "Known IM3 locations separate nonlinear artifacts from unrelated spectral peaks and provide a repeatable receiver-state indicator."
      },
      {
        "equation": "OIP3 ≈ Pout,tone + Δ/2,   IIP3 = OIP3 − G",
        "explanation": "Intercept points extrapolate linear fundamental and cubic-distortion slopes; they are figures of merit, not actual safe operating powers. Compression is measured directly when gain falls from its small-signal trend.",
        "title": "Compression and intercept interpretation",
        "variables": "Δ is the dB separation between a fundamental and its IM3 product; G is small-signal gain.",
        "why": "These metrics provide a common RF language for comparing gain states while avoiding the mistake of treating stronger distortion as extra calibrated signal power."
      },
      {
        "equation": "zk = [Pk(B1),…,Pk(Bq), IM3/fund, NF, Δf, DC, …]ᵀ",
        "explanation": "Absolute amplitudes can drift, so ratios and reference-normalized band energies are included alongside raw values. Features must be extracted with identical windows, FFT scaling, and capture duration.",
        "title": "State-feature vector",
        "variables": "zk describes receiver state k; band powers, spectral ratios, noise floor, frequency error, and DC features are calculated under common normalization.",
        "why": "A defined vector turns visual spectral changes into measurable, comparable observations suitable for clustering or estimation."
      },
      {
        "equation": "J = tr(Sbetween)/tr(Swithin),   Swithin = Σk Σi(zk,i−μk)(zk,i−μk)ᵀ",
        "explanation": "A useful virtual channel requires differences between gain/nonlinear states to exceed noise and drift within one state. A high ratio indicates separable, repeatable signatures.",
        "title": "Repeatability and separability",
        "variables": "Sbetween measures separation among state means; Swithin measures repeated-capture variation within each state.",
        "why": "One attractive spectrum is insufficient evidence. Repeatability statistics determine whether nonlinear artifacts can carry stable information."
      }
    ],
    "workDone": [
      "VANTA characterizes an RTL-SDR Blog V4 across controlled nonlinear operating states instead of treating every imperfection as unstructured error. In a two-tone campaign, known relative-frequency tones were captured with fixed sample rate and a 65,536-sample FFT record while input and tuner conditions were varied. Fundamental levels, third-order intermodulation products, compression behavior, harmonics, DC structure, and noise floor were extracted from consistently windowed spectra.",
      "A second campaign used broadcast-FM captures at 2.048 MSps across tuner gain states from 0 to 49.6 dB. Center-frequency shifts around the scene separated fixed RF content from zero-IF/DC artifacts. Spectral ratios, band energies, gain-dependent redistribution, frequency-error indicators, and repeated-capture statistics were assembled into a state signature while the least-distorted capture remained the reference observation.",
      "The virtual-aperture interpretation treats each repeatable receiver state as an additional measurement channel produced by the same physical front end. This interpretation is accepted only where repeated captures separate state-dependent structure from drift, quantization, AGC effects, temperature, and random noise. The results remain device- and configuration-specific until multi-unit calibration and blind-scene validation are completed."
    ],
    "workflow": [
      {
        "text": "Define two-tone spacing/power or broadcast scene, attenuation, center frequency, sample rate, bandwidth, and device serial/configuration.",
        "title": "Control the RF stimulus"
      },
      {
        "text": "Change one documented gain or tuning condition at a time and retain repeated captures after settling.",
        "title": "Sweep receiver states"
      },
      {
        "text": "Remove or report DC handling, apply a named window, correct coherent gain, scale FFT power, and preserve bin resolution.",
        "title": "Use consistent spectral estimation"
      },
      {
        "text": "Track fundamentals, IM2/IM3/harmonics, compression, image responses, spurs, and noise floor relative to expected frequency formulas.",
        "title": "Locate nonlinear products"
      },
      {
        "text": "Repeat with shifted center frequency; classify features that stay at RF versus those that remain at baseband zero or fixed digital bins.",
        "title": "Separate LO/DC artifacts"
      },
      {
        "text": "Calculate normalized feature vectors and within-state covariance across repeats, time, and temperature where available.",
        "title": "Build state signatures"
      },
      {
        "text": "Estimate state or input condition on held-out captures and compare with the conventional least-distorted observation channel.",
        "title": "Test blind separability"
      }
    ]
  },
  "vivaldi-antenna-balun": {
    "decisions": [
      {
        "decision": "Co-design the Vivaldi and balun",
        "rationale": "The radiator requires balanced excitation, and transition imbalance directly changes match, phase center, and pattern.",
        "tradeoff": "Optimization and measurement are more involved than treating the antenna as an isolated 100 Ω port."
      },
      {
        "decision": "Use 220 mm interferometer spacing",
        "rationale": "The separation increases phase sensitivity at the lower band and suits the physical apertures.",
        "tradeoff": "It exceeds λ/2 over much of 2–6 GHz, creating wrapped-angle ambiguities that require calibration and resolution logic."
      },
      {
        "decision": "Include tolerance and boundary studies",
        "rationale": "Feed gap, permittivity, loss, and open-space clearance can materially change a wideband result.",
        "tradeoff": "Simulation cost rises, but reported bandwidth is less dependent on one ideal mesh or material value."
      }
    ],
    "theory": [
      {
        "equation": "y(x) = c1 e^(Rx) + c2",
        "explanation": "The gradual taper transforms a confined slotline mode into a free-space end-fire wave over a broad band. Abrupt curvature creates reflection; an excessively long taper increases size and loss.",
        "title": "Exponential tapered slot",
        "variables": "R controls flare rate; constants c1 and c2 enforce the selected throat and aperture boundary points.",
        "why": "An analytic taper gives continuous geometry with a small set of interpretable optimization parameters."
      },
      {
        "equation": "S11 = b1/a1 |a2=0,   VSWR = (1+|S11|)/(1−|S11|)",
        "explanation": "The match includes the balun, throat, slot taper, substrate, and radiation transition. Port impedance or reference-plane changes can alter the displayed S11 without changing the physical antenna.",
        "title": "Broadband input match",
        "variables": "S11 is the complex reflected-wave ratio at the defined port reference plane.",
        "why": "A full-band criterion at the actual feed plane is necessary before gain or direction-finding results can be interpreted."
      },
      {
        "equation": "Vdiff = V+ − V−,   Vcm = (V+ + V−)/2,   CMRR = 20log10|Vdiff/Vcm|",
        "explanation": "Ideal balanced excitation has equal amplitudes and 180° phase difference, maximizing differential drive and minimizing common-mode current. Imbalance allows feedline and structure currents to radiate.",
        "title": "Differential and common mode",
        "variables": "V+ and V− are the two balanced-arm voltages.",
        "why": "The balun is part of the antenna. Quantifying common mode protects pattern symmetry and channel-to-channel phase calibration."
      },
      {
        "equation": "Δφ = (2πd/λ) sinθ + φcal  (mod 2π)",
        "explanation": "Path-length difference appears as inter-channel phase. When spacing exceeds λ/2, multiple angles can produce the same wrapped phase, requiring prior sector knowledge, multiple frequencies, or ambiguity resolution.",
        "title": "Phase interferometry",
        "variables": "d is antenna spacing; θ is arrival angle relative to broadside convention; φcal is residual channel phase offset.",
        "why": "The relation turns the two-antenna RF front end into an angle observable while explicitly revealing calibration and ambiguity limits."
      },
      {
        "equation": "Grealized = (4πAe/λ²)(1−|Γ|²),   Ae = ηap Aphys",
        "explanation": "Physical aperture, illumination, taper loss, conductor/dielectric loss, and mismatch jointly determine delivered gain. Increasing aperture can improve low-frequency directivity but enlarges the structure.",
        "title": "Aperture and realized gain",
        "variables": "Ae is effective aperture; ηap is aperture efficiency; Aphys is physical aperture area; Γ is input reflection coefficient.",
        "why": "This connects the large tapered opening to gain and explains why matching alone is not sufficient antenna evidence."
      }
    ],
    "workDone": [
      "The 2–6 GHz Vivaldi radiator and its feed transition were developed as one balanced RF front end. The tapered slot expands from a 0.50 mm feed region to a 122 mm aperture on a 155 × 215 mm RO4350B-like board. Taper rate, cavity geometry, feed position, aperture, board outline, conductor loss, dielectric loss, and open boundaries were included in the CST model.",
      "A dedicated balun transforms a conventional 50 Ω single-ended interface to the antenna's nominal 100 Ω differential feed. Differential amplitude/phase balance and common-mode suppression are treated as antenna-performance variables because feed current on the outside of a cable or an imbalanced arm can distort matching and radiation. Models and fabrication outputs were prepared for both the radiator and transition.",
      "Two complete antennas were then placed 220 mm apart for phase-interferometry analysis. Matching and mutual coupling were evaluated before applying the phase-to-angle relation. Reported simulation values include below −10 dB S11 over 2–6 GHz, representative directivity and efficiency, and very low modeled coupling; calibrated VNA, balun, cable, pattern, and two-channel receiver measurements remain the required hardware confirmation."
    ],
    "workflow": [
      {
        "text": "Set band, polarization, 50 Ω connector, 100 Ω differential target, board materials, antenna envelope, pair spacing, and angle sector.",
        "title": "Define the end-to-end interface"
      },
      {
        "text": "Choose throat, aperture, length, exponential rate, cavity, and feed position from wavelength and manufacturability constraints.",
        "title": "Synthesize the taper"
      },
      {
        "text": "Optimize impedance transformation, differential phase/amplitude balance, common-mode suppression, and transition loss across 2–6 GHz.",
        "title": "Design the balun concurrently"
      },
      {
        "text": "Include finite copper, dielectric loss, open-boundary sweeps, port-definition studies, adaptive mesh, and feed-gap/permittivity tolerances.",
        "title": "Run material-realistic EM analysis"
      },
      {
        "text": "Extract S11, surface currents, directivity, realized gain, efficiencies, patterns, beamwidth, and cross-polar behavior at representative frequencies.",
        "title": "Evaluate antenna evidence"
      },
      {
        "text": "Simulate both antennas with 220 mm spacing, inspect S11/S22/S21, phase-center behavior, and structural/cable coupling.",
        "title": "Evaluate the two-channel system"
      },
      {
        "text": "Measure antenna and balun S-parameters, common mode, gain/pattern, cable/receiver phase, coupling, and angle error over frequency.",
        "title": "Calibrate and verify hardware"
      }
    ]
  }
};
