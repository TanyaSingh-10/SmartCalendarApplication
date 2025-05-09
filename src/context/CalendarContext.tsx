import React, { createContext, useContext, useState, useEffect } from 'react';
import { Event } from '../types/calendar';
import { generateMockEvents } from '../utils/mockData';

interface NotificationData {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  createdAt: Date;
}

interface CalendarContextType {
  events: Event[];
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  addEvent: (event: Event) => void;
  removeEvent: (id: string) => void;
  updateEvent: (id: string, event: Event) => void;
  showNotification: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  notifications: NotificationData[];
  dismissNotification: (id: string) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  
  useEffect(() => {
    // Generate initial mock events
    const mockEvents = generateMockEvents();
    setEvents(mockEvents);
  }, []);
  
  const addEvent = (event: Event) => {
    setEvents(prev => [...prev, event]);
  };
  
  const removeEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };
  
  const updateEvent = (id: string, updatedEvent: Event) => {
    setEvents(prev => prev.map(event => event.id === id ? updatedEvent : event));
  };
  
  const showNotification = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    const notification = {
      id,
      message,
      type,
      createdAt: new Date()
    };
    
    setNotifications(prev => [notification, ...prev]);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      dismissNotification(id);
    }, 5000);
  };
  
  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  return (
    <CalendarContext.Provider value={{
      events,
      currentDate,
      setCurrentDate,
      addEvent,
      removeEvent,
      updateEvent,
      showNotification,
      notifications,
      dismissNotification
    }}>
      {children}
      
      {/* Notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2 w-80">
        {notifications.map(notification => (
          <div 
            key={notification.id}
            className={`p-3 rounded-lg shadow-lg flex items-start ${
              notification.type === 'success' ? 'bg-green-100 border-l-4 border-green-500' :
              notification.type === 'warning' ? 'bg-yellow-100 border-l-4 border-yellow-500' :
              notification.type === 'error' ? 'bg-red-100 border-l-4 border-red-500' :
              'bg-blue-100 border-l-4 border-blue-500'
            }`}
          >
            <div className="flex-1">
              <p className={`text-sm ${
                notification.type === 'success' ? 'text-green-800' :
                notification.type === 'warning' ? 'text-yellow-800' :
                notification.type === 'error' ? 'text-red-800' :
                'text-blue-800'
              }`}>
                {notification.message}
              </p>
            </div>
            <button 
              onClick={() => dismissNotification(notification.id)}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};