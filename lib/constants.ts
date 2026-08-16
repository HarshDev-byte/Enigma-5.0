import { ChallengeDomain, TimelineMilestone, RuleProtocol } from './types';

export const PROTOCOL_METADATA = {
  codename: 'GENESIS // PROTOCOL 2097',
  year: '2097',
  node: 'NODE 07',
  securityLevel: 'CLASSIFIED // ARCHITECT CLEARANCE',
  coordinates: '37.7749° N, 122.4194° W',
  duration: '36 HOURS',
  mode: 'HYBRID SYNCHRONOUS',
  totalBounty: '$50,000 ARCHITECT PRIZE POOL',
};

export const CHALLENGE_DOMAINS: ChallengeDomain[] = [
  {
    id: 'health',
    systemCode: 'SYSTEM 01',
    domain: 'HEALTH',
    title: 'HUMAN SYSTEM RECONSTRUCTION',
    subtitle: 'Autonomous Bio-Cybernetics & Neural Resilience',
    tagline: 'Repair what technology has made fragile.',
    quote: 'Healthcare automation reached 98.7%, yet single-point algorithmic dependencies left biological humanity vulnerable to total systemic shock.',
    description: 'In 2097, hospitals operate with zero human intervention, guided by interconnected AI diagnostic swarms. When anomalies cascade across neural synthetic implants and bio-telemetry pipelines, human resilience fails. Architect solutions must decentralize medical intelligence, ensure fail-safe offline bio-diagnostics, and restore human agency.',
    status: 'CRITICAL',
    accentColor: '#00f0ff',
    themeColor: 'cyan',
    metrics: [
      { label: 'AUTOMATION OVER-DEPENDENCY', value: '87.4%', dangerLevel: 87 },
      { label: 'OFFLINE RESILIENCE', value: '12.6%', dangerLevel: 92 },
      { label: 'NEURAL DRIFT TOLERANCE', value: '4.2%', dangerLevel: 96 },
      { label: 'RECOVERY PROBABILITY', value: '38.0%', dangerLevel: 62 },
    ],
    tracks: [
      {
        title: 'Autonomous Triage & Offline Bio-Inference',
        focus: 'Zero-connectivity edge AI models capable of local neural synthesis and field emergency treatment.',
        technologies: ['Edge AI', 'Bio-Telemetry', 'Wasm Neural Runtime', 'Local-First Architecture'],
        bounty: '$15,000 USD',
      },
      {
        title: 'Cyber-Neural Implant Guardian Protocols',
        focus: 'Cryptographic zero-trust verification systems shielding neural prosthetics and organ telemetry from synthetic overrides.',
        technologies: ['ZK-Rollups', 'Secure Enclaves', 'Real-Time Telemetry', 'Fault-Tolerant Microkernels'],
        bounty: '$10,000 USD',
      },
    ],
    keyQuestions: [
      'How do we ensure life-support systems function when centralized cognitive networks collapse?',
      'Can biological decision-making override synthetic diagnosis without latency penalties?',
      'What decentralized architecture prevents single-provider bio-monopolies?',
    ],
  },
  {
    id: 'finance',
    systemCode: 'SYSTEM 02',
    domain: 'FINANCE',
    title: 'ECONOMIC ENGINE STABILIZATION',
    subtitle: 'Autonomous Liquidity & Systemic Circuit Breakers',
    tagline: 'Tame the algorithmic runaway economy.',
    quote: 'High-frequency autonomous agents executed 99.1% of global resource transactions within picoseconds, blinding human oversight to systemic fragility.',
    description: 'Global resource distribution, energy tokens, and quantum capital flows are managed by hyper-recursive autonomous liquidity swarms. The interconnectivity is so labyrinthine that localized liquidity spirals instantly propagate worldwide. Architects must forge self-healing liquidity protocols, transparent algorithmic governance, and anti-fragile financial mechanisms.',
    status: 'UNSTABLE',
    accentColor: '#d946ef',
    themeColor: 'magenta',
    metrics: [
      { label: 'MARKET STABILITY INDEX', value: '41.2%', dangerLevel: 75 },
      { label: 'ALGORITHMIC NETWORK COMPLEXITY', value: '94.8%', dangerLevel: 94 },
      { label: 'CONTAGION RISK LEVEL', value: 'HIGH', dangerLevel: 88 },
      { label: 'TRANSACTION AUDITABILITY', value: '23.1%', dangerLevel: 81 },
    ],
    tracks: [
      {
        title: 'Quantum Circuit Breakers & Contagion Dampeners',
        focus: 'Autonomous decentralized protocols that detect systemic contagion within liquidity graphs and trigger automated isolation buffers.',
        technologies: ['Graph Neural Networks', 'Algorithmic Liquidity', 'Deterministic Smart Contracts', 'Sub-Millisecond Settlement'],
        bounty: '$15,000 USD',
      },
      {
        title: 'Human-Verifiable AI Economic Forensics',
        focus: 'Interactive interpretability engines translating complex multi-agent high-frequency transaction lattices into actionable human insights.',
        technologies: ['Explainable AI', 'Decentralized Ledgers', 'WebGPU Visualizers', 'Formal Verification'],
        bounty: '$10,000 USD',
      },
    ],
    keyQuestions: [
      'How can automated markets pause cascade liquidations without creating cartel centralization?',
      'Can mathematical guarantees replace trust in multi-agent trading environments?',
      'What economic primitives prioritize resource sustainability over predatory yield?',
    ],
  },
  {
    id: 'earth',
    systemCode: 'SYSTEM 03',
    domain: 'EARTH',
    title: 'PLANETARY RESILIENCE SYSTEM',
    subtitle: 'Autonomous Gaia Grid & Atmospheric Regeneration',
    tagline: 'Balance infinite compute with finite planetary physics.',
    quote: 'Global megacity expansion optimized human transit and micro-climates at the cost of depleting raw planetary biospheres to critical thresholds.',
    description: 'Megacity megastructures consumed terra-scale energy and minerals. Atmospheric scrubbing and carbon cycle loops operate on razor-thin efficiency margins. A single anomaly in renewable distribution drops entire continental energy grids. Architects will build decentralized climate sensor webs, carbon-neutral compute allocators, and regenerative resource routing networks.',
    status: 'COLLAPSING',
    accentColor: '#10ff88',
    themeColor: 'emerald',
    metrics: [
      { label: 'ECOLOGICAL STABILITY', value: '19.4%', dangerLevel: 94 },
      { label: 'RESOURCE EXTRACTION PRESSURE', value: '91.2%', dangerLevel: 91 },
      { label: 'ATMOSPHERIC SCRUBBING EFFICIENCY', value: '54.7%', dangerLevel: 68 },
      { label: 'GRID RECOVERY WINDOW', value: '38h 12m', dangerLevel: 85 },
    ],
    tracks: [
      {
        title: 'Decentralized Gaia Sensor Mesh & Carbon Oracle',
        focus: 'Zero-power mesh-networked environmental sensor nodes providing cryptographically verifiable ecological ground truth.',
        technologies: ['LoRaWAN / Mesh Protocol', 'Zero-Knowledge Proofs', 'Carbon Accounting', 'Geo-Spatial Analysis'],
        bounty: '$15,000 USD',
      },
      {
        title: 'Dynamic Clean-Compute Load Orchestration',
        focus: 'Global scheduler routing heavy AI training workloads to regions with instantaneous excess geothermal, fusion, and solar availability.',
        technologies: ['Distributed Systems', 'Real-Time Energy Grids', 'Kubernetes Orchestration', 'Carbon-Aware Scheduling'],
        bounty: '$10,000 USD',
      },
    ],
    keyQuestions: [
      'Can computation automatically migrate to chase renewable energy peaks with zero latency spikes?',
      'How do we prevent falsified ecological reporting in decentralized carbon credit architectures?',
      'What regenerative hardware paradigms survive long-term supply chain collapse?',
    ],
  },
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    phase: 'PHASE 01',
    timeCode: 'T-MINUS 14 DAYS',
    title: 'ARCHITECT INFILTRATION & CLEARANCE',
    status: 'ARMED',
    description: 'Protocol open for elite engineering squads. Verification of cryptographic credentials and domain allocation.',
    protocolKey: 'SEC_AUTH // 0192',
  },
  {
    phase: 'PHASE 02',
    timeCode: 'HOUR 00:00 // OCT 24',
    title: 'THE PROTOCOL BREACH: GENESIS UNSEALING',
    status: 'STANDBY',
    description: 'Classified problem statement release. Direct access to 2097 synthetic dataset vaults and API gateways.',
    protocolKey: 'BREACH_EXEC // 0000',
  },
  {
    phase: 'PHASE 03',
    timeCode: 'HOUR 12:00 // OCT 24',
    title: 'MIDPOINT ANOMALY CHECKPOINT',
    status: 'LOCKED',
    description: 'Neural mentors & technical directors inject live simulation stress-tests into competing architecture pipelines.',
    protocolKey: 'STRESS_TEST // 1200',
  },
  {
    phase: 'PHASE 04',
    timeCode: 'HOUR 32:00 // OCT 25',
    title: 'CODE FREEZE & SYSTEM DEFENSE DEMOS',
    status: 'LOCKED',
    description: 'Architects deploy working models to live testnet sandbox. Real-time stress evaluation before the Genesis Council.',
    protocolKey: 'DEFENSE_LOCKED // 3200',
  },
  {
    phase: 'PHASE 05',
    timeCode: 'HOUR 36:00 // OCT 25',
    title: 'GENESIS CONVERGENCE & WINNER BROADCAST',
    status: 'LOCKED',
    description: 'Top architectural teams awarded $50,000 bounty pool, incubator induction, and system deployment grants.',
    protocolKey: 'GENESIS_COMPLETE // 3600',
  },
];

export const RULE_PROTOCOLS: RuleProtocol[] = [
  {
    id: 'team-size',
    code: 'RULE // 01',
    title: 'ARCHITECT SQUAD RESTRICTIONS',
    description: 'Teams must comprise 2 to 4 registered architects. Multi-disciplinary squads combining engineering, systems design, and domain expertise are heavily favored.',
    clearanceLevel: 'LEVEL 1',
  },
  {
    id: 'originality',
    code: 'RULE // 02',
    title: 'AUTHENTIC CODE GENESIS',
    description: 'All prototype solutions must be authored during the 36-hour protocol window. Open-source libraries and public foundation models are permitted with full disclosure.',
    clearanceLevel: 'LEVEL 2',
  },
  {
    id: 'ip-ownership',
    code: 'RULE // 03',
    title: 'TOTAL ARCHITECT SOVEREIGNTY',
    description: '100% Intellectual Property remains with the building architects. Neither ENIGMA nor alliance sponsors claim ownership of your innovations.',
    clearanceLevel: 'SOVEREIGN',
  },
  {
    id: 'evaluation',
    code: 'RULE // 04',
    title: 'EVALUATION VECTORS (25% EACH)',
    description: 'Graded across 4 vectors: 1) Systemic Impact & Depth, 2) Technical Craft & Performance, 3) Autonomous Reliability / Anti-Fragility, 4) UI/UX Presentation & Polish.',
    clearanceLevel: 'COUNCIL',
  },
];

export const ALLIANCE_PARTNERS = [
  { name: 'SYNTH-AI LABS', tier: 'QUANTUM PATRON', desc: 'Next-gen cognitive model infrastructure', code: 'NODE-Q1' },
  { name: 'NEURAL DYNAMICS', tier: 'QUANTUM PATRON', desc: 'Hardware-accelerated neural accelerators', code: 'NODE-Q2' },
  { name: 'GAIA TERRAFORMICS', tier: 'NEURAL PARTNER', desc: 'Planetary climate computing cluster', code: 'NODE-N1' },
  { name: 'CYBER-LOCK PROTOCOL', tier: 'NEURAL PARTNER', desc: 'Zero-knowledge cryptographic security', code: 'NODE-N2' },
  { name: 'VECTOR AEROSPACE', tier: 'ECOSYSTEM NODE', desc: 'Autonomous edge telemetry gateways', code: 'NODE-E1' },
  { name: 'CHRONOS FOUNDATION', tier: 'ECOSYSTEM NODE', desc: 'Deep-tech incubator & grant accelerator', code: 'NODE-E2' },
];
