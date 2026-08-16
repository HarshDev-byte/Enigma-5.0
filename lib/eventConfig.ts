// =========================================================================
// ENIGMA 5.0 — GENESIS // CENTRAL EVENT CONFIGURATION
// All URLs, dates, prizes, tracks, timeline, FAQs, POCs, and past editions are centralized here.
// =========================================================================

export const EVENT_CONFIG = {
  eventName: 'ENIGMA 5.0',
  subTitle: 'GENESIS',
  tagline: 'BEYOND THE FUTURE',
  year: '2097',
  nodeCode: 'NODE 07 // ARCHITECT RECOVERY MATRIX',
  dates: 'OCTOBER 24 – 26, 2026',
  duration: '36 HOURS SYNCHRONOUS',
  mode: 'OFFLINE / HYBRID (IN-PERSON CITADEL & VIRTUAL LINK)',
  location: 'CAMPUS AUDITORIUM & INNOVATION COMPLEX',
  locationUrl: 'https://share.google/e21gyLJXh5CVt8KTN',
  
  // LIVE REGISTRATION DEADLINE (ISO format for dynamic countdown)
  registrationDeadline: '2026-10-24T23:59:59',

  // PERSONS OF CONTACT (POCs)
  contacts: [
    {
      role: 'LEAD ORGANIZER',
      name: 'ORGANIZING COUNCIL LEAD',
      email: 'lead@enigmahack.org',
      phone: '+91 98201 02097',
      node: 'COMMAND NODE 01',
    },
    {
      role: 'TECHNICAL & TRACK COORDINATOR',
      name: 'SYSTEM ARCHITECTURE LEAD',
      email: 'tech@enigmahack.org',
      phone: '+91 98202 02097',
      node: 'ENGINEERING NODE 02',
    },
    {
      role: 'REGISTRATION & SQUAD SUPPORT',
      name: 'ARCHITECT RELATIONS DESK',
      email: 'support@enigmahack.org',
      phone: '+91 98203 02097',
      node: 'OPERATIONS NODE 03',
    },
  ],

  // EXTERNAL REGISTRATION & PORTAL URLS
  urls: {
    primaryRegistration: 'https://unstop.com',
    unstop: 'https://unstop.com',
  },

  // SOCIAL MEDIA & COMMUNITY ENDPOINTS (ONLY UNSTOP, INSTAGRAM & LINKEDIN)
  socials: {
    unstop: 'https://unstop.com',
    instagram: 'https://www.instagram.com/csisiesgst/',
    linkedin: 'https://linkedin.com/company/enigma-hackathon',
  },

  // 03 OFFICIAL TRACKS (HEALTHCARE, FINTECH, SUSTAINABILITY)
  tracks: [
    {
      id: 'healthcare',
      number: '01',
      title: 'HEALTHCARE',
      subtitle: 'REIMAGINE HEALTHCARE THROUGH TECHNOLOGY',
      themeColor: '#ec4899', // Pink / Magenta
      accentGlow: 'rgba(236, 72, 153, 0.3)',
      tagline: 'Engineer resilient, human-centered medical intelligence and diagnostics.',
      description:
        'Create autonomous systems that bridge clinical intelligence and human care. Build software and hardware solutions that prevent systemic failure, protect patient autonomy, and democratize access to diagnostics.',
      potentialThemes: [
        'AI-Powered Healthcare',
        'Accessible & Remote Care',
        'Preventive Healthcare & Telemetry',
        'Medical Intelligence & Forensics',
        'Patient-Centric Systems',
        'Healthcare Automation & Robotics',
        'Rapid Point-of-Care Diagnostics',
        'Decentralized Digital Health Records',
      ],
    },
    {
      id: 'fintech',
      number: '02',
      title: 'FINTECH',
      subtitle: 'ECONOMIC INTELLIGENCE & TRUSTED SYSTEMS',
      themeColor: '#8b5cf6', // Violet / Blue
      accentGlow: 'rgba(139, 92, 246, 0.3)',
      tagline: 'Tame runaway complexity with anti-fragile financial architecture.',
      description:
        'Re-evaluate financial networks from first principles. Design algorithmic circuit breakers, transparent liquidity tools, fraud prevention engines, and inclusive financial instruments that empower individuals.',
      potentialThemes: [
        'Financial Intelligence & Analytics',
        'Accessibility & Inclusive Finance',
        'Decentralized Trust & Verification',
        'Next-Gen Digital Finance & Payments',
        'Autonomous Fraud Prevention',
        'Economic Resilience & Circuit Breakers',
        'Transparent Algorithmic Ledgers',
        'Anti-Fragile Liquidity Matrices',
      ],
    },
    {
      id: 'sustainability',
      number: '03',
      title: 'SUSTAINABILITY',
      subtitle: 'PLANETARY RESILIENCE & CLIMATE TECH',
      themeColor: '#10ff88', // Emerald / Green
      accentGlow: 'rgba(16, 255, 136, 0.3)',
      tagline: 'Balance infinite compute with finite planetary physics.',
      description:
        'Harness technology to protect and restore ecological balance. Construct carbon-aware compute frameworks, circular economy protocols, clean energy routing, and planetary sensor arrays.',
      potentialThemes: [
        'Climate Technology & Carbon Tracking',
        'Renewable Energy Grid Orchestration',
        'Resource Optimization & Conservation',
        'Circular Economy & Waste Reduction',
        'Environmental Intelligence & Sensor Mesh',
        'Sustainable Urban Infrastructure',
        'Decentralized Ecological Governance',
        'Planetary Resilience Architectures',
      ],
    },
  ],

  // EVENT TIMELINE (ROUND 01, ROUND 02, EVALUATION, FINALE)
  timeline: [
    {
      step: '01',
      stage: 'ROUND 01',
      title: 'INITIALIZATION & SQUAD IDEATION',
      date: 'OCT 01 – OCT 20, 2026',
      time: 'ONLINE ACCESS',
      deliverable: 'Abstract & Architecture Blueprint',
      description: 'Squad registration, track selection, problem statement dissection, and preliminary architecture submission via the portal.',
      status: 'ACTIVE',
      color: '#00f0ff',
      tag: 'PHASE 01: GENESIS',
    },
    {
      step: '02',
      stage: 'ROUND 02',
      title: '36-HOUR CONTINUOUS BUILD SPRINT',
      date: 'OCT 24 – 25, 2026',
      time: '36 HOURS CONTINUOUS',
      deliverable: 'Live Functional Prototype & Codebase',
      description: 'The core hackathon sprint. 36 hours of nonstop engineering, mentor checkpoints, hardware labs, and prototype execution.',
      status: 'UPCOMING',
      color: '#ec4899',
      tag: 'PHASE 02: RECONSTRUCTION',
    },
    {
      step: '03',
      stage: 'ROUND 03',
      title: 'SYSTEM AUDIT & JURY EVALUATION',
      date: 'OCT 26, 2026',
      time: '10:00 – 15:00 IST',
      deliverable: 'Live Demo & Technical Defense',
      description: 'Live interactive demonstrations before senior industry architects, code security audits, stress testing, and jury defense.',
      status: 'UPCOMING',
      color: '#8b5cf6',
      tag: 'PHASE 03: VERIFICATION',
    },
    {
      step: '04',
      stage: 'FINALE',
      title: 'AWARDS DISBURSEMENT & CEREMONY',
      date: 'OCT 26, 2026',
      time: '17:00 IST',
      deliverable: 'Prize Vault Distribution & Fellowships',
      description: 'Grand closing ceremony, distribution of the ₹1,50,000+ reward pool, accelerator fast-track inductions, and trophies.',
      status: 'UPCOMING',
      color: '#10ff88',
      tag: 'PHASE 04: ASCENSION',
    },
  ],

  // ENIGMA ARCHIVE // PAST SUCCESSFUL HACKATHONS
  pastEditions: [
    {
      edition: 'ENIGMA 4.0',
      year: '2025',
      theme: 'NEURAL HORIZONS',
      participants: '1,200+ Architects',
      projects: '280+ Prototypes Deployed',
      prizeVault: '₹1,25,000',
      description: 'Pioneered decentralized neural compute and autonomous edge intelligence across 48 national hubs.',
      image: '/images/archive-4.jpg',
      accent: '#00f0ff',
    },
    {
      edition: 'ENIGMA 3.0',
      year: '2024',
      theme: 'CYBERNETIC MATRIX',
      participants: '950+ Builders',
      projects: '190+ Systems Engineered',
      prizeVault: '₹1,00,000',
      description: 'Explored zero-knowledge cryptographic safeguards and cross-chain financial resilience.',
      image: '/images/archive-3.jpg',
      accent: '#ec4899',
    },
    {
      edition: 'ENIGMA 2.0',
      year: '2023',
      theme: 'QUANTUM SYNERGY',
      participants: '700+ Hackers',
      projects: '140+ Deployed Solutions',
      prizeVault: '₹75,000',
      description: 'Focused on early generative AI integrations and planetary climate data routing.',
      image: '/images/archive-2.jpg',
      accent: '#8b5cf6',
    },
    {
      edition: 'ENIGMA 1.0',
      year: '2022',
      theme: 'GENESIS ZERO',
      participants: '500+ Innovators',
      projects: '95+ Working Codebases',
      prizeVault: '₹50,000',
      description: 'The foundational sprint that established ENIGMA as a flagship architectural proving ground.',
      image: '/images/archive-1.jpg',
      accent: '#10ff88',
    },
  ],

  // CHALLENGE EXECUTION STEPS
  challengeSteps: [
    {
      step: '01',
      code: 'PHASE // PROBLEM',
      title: 'DISSECT SYSTEMIC FRAGILITY',
      desc: 'Identify root failure points in Healthcare, Fintech, or Sustainability. Isolate real-world bottlenecks.',
    },
    {
      step: '02',
      code: 'PHASE // IDEA',
      title: 'FIRST-PRINCIPLES HYPOTHESIS',
      desc: 'Question the legacy architecture. Re-evaluate how the system should have been designed from the ground up.',
    },
    {
      step: '03',
      code: 'PHASE // BUILD',
      title: 'ENGINEER LIVE PROTOTYPE',
      desc: 'Deploy functional code in 36 hours. Utilize modern frameworks, AI primitives, and responsive interfaces.',
    },
    {
      step: '04',
      code: 'PHASE // IMPACT',
      title: 'DEFEND BEFORE THE COUNCIL',
      desc: 'Demonstrate scalability, resilience, and real-world execution before senior architects and sponsors.',
    },
  ],

  // PRIZE POOL MATRIX
  prizes: {
    totalPool: '₹1,50,000+',
    currencySymbol: '₹',
    mainPrizes: [
      {
        place: '1ST PLACE',
        rank: '01',
        title: 'GRAND GENESIS CHAMPION',
        amount: '₹60,000',
        perks: ['Direct Accelerator Fast-Track', 'Cloud Compute Credits ($5,000)', 'Lifetime Architect Fellowship', 'Winner Trophy & Hardware Kit'],
        accent: 'cyan',
      },
      {
        place: '2ND PLACE',
        rank: '02',
        title: 'RECONSTRUCTION RUNNER-UP',
        amount: '₹35,000',
        perks: ['Incubator Pitch Day Seat', 'Compute Credits ($2,000)', 'Hardware Sponsor Kits', 'Certificate of Cybernetic Excellence'],
        accent: 'magenta',
      },
      {
        place: '3RD PLACE',
        rank: '03',
        title: 'SYSTEMS INNOVATOR',
        amount: '₹20,000',
        perks: ['Mentorship Fast-Pass', 'Dev Tools Subscriptions', 'Hardware Merch Package', 'Architect Credentials'],
        accent: 'emerald',
      },
    ],
    specialPrizes: [],
  },

  // FREQUENTLY ASKED QUESTIONS
  faqs: [
    {
      category: 'ELIGIBILITY & SQUADS',
      q: 'WHO CAN PARTICIPATE IN ENIGMA 5.0?',
      a: 'Any passionate undergraduate student, postgraduate student, researcher, self-taught developer, or designer across any institution or background is welcome to participate.',
    },
    {
      category: 'ELIGIBILITY & SQUADS',
      q: 'IS THE HACKATHON TEAM-BASED, AND HOW MANY MEMBERS CAN BE IN A SQUAD?',
      a: 'Yes, ENIGMA 5.0 is team-based. Teams must consist of 2 to 4 registered members. Cross-functional squads combining engineering, design, and domain insight perform best.',
    },
    {
      category: 'ELIGIBILITY & SQUADS',
      q: 'IS THERE A REGISTRATION FEE?',
      a: 'No. Registration and participation in ENIGMA 5.0 are 100% FREE for all selected participants.',
    },
    {
      category: 'TRACKS & TECH',
      q: 'WHAT TECHNOLOGIES AND FRAMEWORKS CAN WE USE?',
      a: 'You are free to use any programming language, framework, cloud architecture, foundation AI model, WebAssembly runtime, or open-source tool. All prototype code must be written during the 36-hour sprint.',
    },
    {
      category: 'TRACKS & TECH',
      q: 'WHAT ARE THE 03 OFFICIAL TRACKS?',
      a: 'The three official tracks are: (01) HEALTHCARE, (02) FINTECH, and (03) SUSTAINABILITY. You will select your primary track during registration or project submission.',
    },
    {
      category: 'FORMAT & LOGISTICS',
      q: 'WHAT IS THE HACKATHON FORMAT & WHERE WILL IT TAKE PLACE?',
      a: 'ENIGMA 5.0 is a 36-hour synchronous hybrid hackathon. Physical attendance takes place at the Campus Auditorium & Innovation Complex. Remote participants connect synchronously through our online platform.',
    },
    {
      category: 'SUBMISSION & JUDGING',
      q: 'WHAT DO WE NEED TO SUBMIT AT THE END OF 36 HOURS?',
      a: 'Submissions require a working prototype repository (hosted on GitHub/GitLab), a public deployment URL or live demo, a brief video walkthrough (under 3 minutes), and a README explaining your architecture.',
    },
    {
      category: 'SUBMISSION & JUDGING',
      q: 'HOW WILL PROJECTS BE EVALUATED BY THE JURY?',
      a: 'Evaluations are based on four weighted criteria: Technical Depth & Execution (30%), Innovation & First-Principles Thinking (30%), Track Relevance & Real-World Impact (25%), and Demonstration / Polish (15%).',
    },
    {
      category: 'FORMAT & LOGISTICS',
      q: 'WHO OWNS THE INTELLECTUAL PROPERTY (IP) OF THE PROJECTS?',
      a: 'You do. 100% of all Intellectual Property created during ENIGMA 5.0 belongs solely to the participating squad members.',
    },
    {
      category: 'FORMAT & LOGISTICS',
      q: 'HOW DOES THE EXTERNAL REGISTRATION PROCESS WORK?',
      a: 'Clicking REGISTER NOW directs you to our official portal (Devfolio / Unstop / Google Forms) to submit your team credentials and portfolio for review.',
    },
  ],

  // SPONSORS & ALLIANCE PATRONS
  sponsors: {
    title: [
      { name: 'SYNTH-AI QUANTUM', tier: 'TITLE PATRON', logoText: 'SYNTH//AI', desc: 'Next-Generation Cognitive Model Compute' },
    ],
    gold: [
      { name: 'NEURAL DYNAMICS', tier: 'GOLD PATRON', logoText: 'NEURAL//D', desc: 'Hardware-Accelerated Neural Microkernels' },
      { name: 'GAIA TERRAFORMICS', tier: 'GOLD PATRON', logoText: 'GAIA//TERRA', desc: 'Planetary Climate Sensor Infrastructure' },
    ],
    silver: [
      { name: 'CYBER-LOCK ZK', tier: 'SILVER NODE', logoText: 'CYBER//LOCK', desc: 'Zero-Knowledge Security Protocols' },
      { name: 'VECTOR AEROSPACE', tier: 'SILVER NODE', logoText: 'VECTOR//AERO', desc: 'Autonomous Edge Telemetry Networks' },
    ],
    community: [
      { name: 'CHRONOS FOUNDATION', tier: 'COMMUNITY', logoText: 'CHRONOS' },
      { name: 'OPEN SYSTEM ALLIANCE', tier: 'COMMUNITY', logoText: 'OSA 2097' },
      { name: 'FUTURE ARCHITECTS LAB', tier: 'COMMUNITY', logoText: 'ARC//LAB' },
    ],
  },

  // FOOTER INFORMATION
  footer: {
    copyright: '© 2026 ENIGMA ARCHITECTURAL COUNCIL. ALL RIGHTS RESERVED.',
    collegeInfo: 'CAMPUS AUDITORIUM & INNOVATION COMPLEX',
    manifesto: 'THE FUTURE ISN\'T WAITING FOR US. IT\'S WAITING TO BE FIXED.',
  },
};
