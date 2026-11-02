export type Language = 'en' | 'hi';

export type ActiveTab = 'chat' | 'letter-generator' | 'resources';

export interface SourceRef {
  title: string;
  url: string;
  organization: string;
  sectionRef?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  topicId?: string;
  sources?: SourceRef[];
  nextSteps?: string[];
  feedback?: 'helpful' | 'unhelpful' | null;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
  topicId?: string;
}

export interface Topic {
  id: string;
  title: string;
  titleHi: string;
  iconName: string;
  description: string;
  descriptionHi: string;
  statutoryRef: string;
  sampleQuestion: string;
  sampleQuestionHi: string;
}

export interface ComplaintFormData {
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  senderEmail: string;
  companyName: string;
  companyAddress: string;
  productName: string;
  orderId: string;
  purchaseDate: string;
  pricePaid: string;
  problemCategory: string;
  problemDescription: string;
  previousAttempts: string;
  desiredResolution: string;
  resolutionDeadlineDays: number;
  language: Language;
}

export interface OfficialResource {
  id: string;
  title: string;
  organization: string;
  description: string;
  descriptionHi: string;
  url: string;
  iconName: string;
  badgeText: string;
  keyServices: string[];
}
