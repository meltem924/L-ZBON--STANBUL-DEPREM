export type ActiveTab = 'map' | 'visual' | 'matrix';

export interface Hotspot {
  id: string;
  title: string;
  city: 'lisbon' | 'istanbul' | 'both';
  x: number; // percentage on map
  y: number; // percentage on map
  category: 'destruction' | 'philosophy' | 'architecture' | 'administration' | 'economy';
  shortDesc: string;
  fullDesc: string;
  primaryQuote?: {
    author: string;
    text: string;
    source: string;
  };
  impactTags: string[];
}

export interface ComparisonCard {
  id: string;
  text: string;
  correctZone: 'lisbon' | 'both' | 'istanbul';
  category: 'Aydınlanma / Felsefe' | 'Kriz Yönetimi' | 'Mimari / İmar' | 'Doğal Afet Tipi' | 'Toplumsal / Ekonomik';
  explanation: string;
  hint: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface ArchitecturalFeature {
  id: string;
  title: string;
  system: 'gaiola' | 'osmanli';
  description: string;
  advantage: string;
}

export interface StepInstruction {
  stepId: ActiveTab;
  title: string;
  curriculumGoal: string; // e.g. "a) Etkileri Belirleme"
  instructionText: string;
  actionPrompt: string;
}

declare global {
  interface Window {
    SCORM?: {
      initialize: () => boolean;
      terminate: () => boolean;
      sendScore: (rawScore: number, examMaxScore: number, passed?: boolean) => boolean;
    };
  }
}

