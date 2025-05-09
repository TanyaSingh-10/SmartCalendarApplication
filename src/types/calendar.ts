export interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  priority: 'low' | 'medium' | 'high';
  isAiOptimized?: boolean;
  isFocusTime?: boolean;
  location?: string;
  participants?: string[];
  category?: string;
}