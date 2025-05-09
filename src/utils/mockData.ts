import { Event } from '../types/calendar';
import { generateId } from './idGenerator';

export const generateMockEvents = (): Event[] => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);
  
  return [
    {
      id: generateId(),
      title: 'Team Weekly Sync',
      description: 'Weekly team meeting to discuss progress and roadblocks',
      startTime: new Date(today.setHours(10, 0, 0, 0)).toISOString(),
      endTime: new Date(today.setHours(11, 0, 0, 0)).toISOString(),
      priority: 'medium',
      isAiOptimized: true,
      category: 'Meeting'
    },
    {
      id: generateId(),
      title: 'Product Demo',
      description: 'Present the new features to the stakeholders',
      startTime: new Date(today.setHours(14, 0, 0, 0)).toISOString(),
      endTime: new Date(today.setHours(15, 0, 0, 0)).toISOString(),
      priority: 'high',
      category: 'Presentation'
    },
    {
      id: generateId(),
      title: 'Design Review',
      description: 'Review the latest UI designs with the design team',
      startTime: new Date(tomorrow.setHours(11, 0, 0, 0)).toISOString(),
      endTime: new Date(tomorrow.setHours(12, 0, 0, 0)).toISOString(),
      priority: 'medium',
      category: 'Meeting'
    },
    {
      id: generateId(),
      title: 'Focus: Project Planning',
      description: 'Dedicated time for project planning and roadmap',
      startTime: new Date(tomorrow.setHours(14, 0, 0, 0)).toISOString(),
      endTime: new Date(tomorrow.setHours(16, 0, 0, 0)).toISOString(),
      priority: 'high',
      isFocusTime: true,
      category: 'Focus'
    },
    {
      id: generateId(),
      title: 'Client Meeting',
      description: 'Quarterly review with the client',
      startTime: new Date(dayAfterTomorrow.setHours(10, 0, 0, 0)).toISOString(),
      endTime: new Date(dayAfterTomorrow.setHours(11, 30, 0, 0)).toISOString(),
      priority: 'high',
      category: 'Meeting'
    },
    {
      id: generateId(),
      title: '1:1 with Manager',
      description: 'Weekly one-on-one meeting with manager',
      startTime: new Date(dayAfterTomorrow.setHours(13, 0, 0, 0)).toISOString(),
      endTime: new Date(dayAfterTomorrow.setHours(13, 30, 0, 0)).toISOString(),
      priority: 'medium',
      isAiOptimized: true,
      category: '1:1'
    }
  ];
};