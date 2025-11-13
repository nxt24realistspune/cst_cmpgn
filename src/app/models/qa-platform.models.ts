export interface QaSummary {
  critical: number;
  high: number;
  medium: number;
  low: number;
  autoFixable: number;
  manualReview: number;
}

export interface Issue {
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: string;
  issue: string;
  location: string;
  recommendation: string;
  autoFixable: boolean;
  codeSnippet?: string;
  suggestedFix?: string;
  reasoning?: string;
  imageAnalysis?: {
    currentRes: string;
    requiredRes: string;
    aspectRatio: string;
    fileSize: string;
  };
  colorDelta?: string;
  affectedClients?: string[];
}

export interface QaCategory {
  name: string;
  score: number;
  agent: string;
  iteration: number;
  issues: Issue[];
}

export interface ObservabilityRow {
  agent: string;
  issues: number;
  critical: number;
  autoFix: number;
  avgTime: string;
  status: string;
}

export interface QaResults {
  overallScore: number;
  summary: QaSummary;
  observabilityMatrix: ObservabilityRow[];
  categories: QaCategory[];
}

export interface ReasoningLog {
  timestamp: string;
  agent: string;
  type: 'info' | 'start' | 'reasoning' | 'decision' | 'error' | 'complete' | 'success';
  message: string;
  iteration: number;
}

export interface SelectedIssue extends Issue {
  category: string;
  agent: string;
}

export type TabType = 'upload' | 'reasoning' | 'results' | 'matrix';
