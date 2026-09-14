export type PresentationMode = 'presentation' | 'presenter' | 'grid' | 'defense_qa' | 'dossier';

export interface SlideData {
  id: number;
  category: string;
  title: string;
  subtitle?: string;
  badge: string;
  phase: string;
  speakerNotes: string[];
  takeaways?: string[];
}

export interface BugRecord {
  id: number;
  title: string;
  severity: 'Critical' | 'High' | 'Medium';
  category: 'Odoo 18 ORM' | 'UI / QWeb' | 'Security / Record Rules' | 'BYO-LLM' | 'Testing / E2E';
  symptom: string;
  rootCause: string;
  engineeredFix: string;
  verifiedBy: string;
}

export interface DefenseQuestion {
  id: number;
  category: 'Architecture' | 'Odoo 18 Migration' | 'AI & LLM Integration' | 'Security & RBAC' | 'Testing & QA';
  question: string;
  briefAnswer: string;
  detailedPoints: string[];
  codeOrArchitectureReference: string;
}

export interface LayerInfo {
  id: number;
  name: string;
  tech: string;
  badge: string;
  color: string;
  components: string[];
  desc: string;
  deliverables: string[];
}

export interface WorkflowPhase {
  id: string;
  title: string;
  role: string;
  badge: string;
  color: string;
  details: string;
  outputs: string[];
  modelsTouched: string[];
}

export interface ModelEntity {
  name: string;
  loc: number;
  category: 'Master Data' | 'Operations' | 'Stock Integration' | 'Analytics' | 'AI Service';
  description: string;
  keyFields: string[];
  computedLogic: string;
}
