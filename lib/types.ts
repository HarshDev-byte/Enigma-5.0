export type SystemDomain = 'HEALTH' | 'FINANCE' | 'EARTH';

export interface ChallengeDomain {
  id: string;
  systemCode: string;
  domain: SystemDomain;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  quote: string;
  status: 'CRITICAL' | 'UNSTABLE' | 'COLLAPSING';
  accentColor: string;
  themeColor: 'cyan' | 'magenta' | 'emerald';
  metrics: {
    label: string;
    value: string;
    dangerLevel: number; // 0-100
  }[];
  tracks: {
    title: string;
    focus: string;
    technologies: string[];
    bounty: string;
  }[];
  keyQuestions: string[];
}

export interface TimelineMilestone {
  phase: string;
  timeCode: string;
  title: string;
  status: 'LOCKED' | 'ARMED' | 'STANDBY';
  description: string;
  protocolKey: string;
}

export interface RuleProtocol {
  id: string;
  code: string;
  title: string;
  description: string;
  clearanceLevel: string;
}
