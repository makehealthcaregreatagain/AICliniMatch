export type ReferralStatus = 'sent' | 'accepted' | 'awaiting_visit' | 'completed' | 'declined';

export type UrgencyLevel = 'routine' | 'urgent' | 'stat';

export interface SpecialistMatch {
  id: string;
  name: string;
  specialty: string;
  subspecialty?: string;
  location: string;
  distance: number;
  institution: string;
  insuranceAccepted: string[];
  matchScore: number;
  matchReasons: string[];
  waitTime: string;
  acceptanceRate: number;
  image: string;
  telehealth: boolean;
}

export interface Referral {
  id: string;
  patientName: string;
  patientCondition: string;
  specialist: string;
  specialty: string;
  urgency: UrgencyLevel;
  status: ReferralStatus;
  createdAt: Date;
  lastUpdated: Date;
  insurance?: string;
  notes?: string;
}

export interface ConversationMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface ExtractedReferralData {
  condition?: string;
  urgency?: UrgencyLevel;
  insurance?: string;
  location?: string;
  preferredDistance?: number;
  telehealth?: boolean;
  notes?: string;
}

