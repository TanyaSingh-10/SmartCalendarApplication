import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Event } from '../../types/calendar';
import { formatTime } from '../../utils/dateUtils';

interface CalendarWeekProps {
  currentDate: Date;
  events: Event[];
}

const CalendarWeek: React.FC<CalendarWeekProps> = ({ currentDate, events }) => {
  const navigate = useNavigate();
  
  // Get the start of the week (Sunday)
  const getStartOfWeek = (date: Date) => {
    const start = new Date(date);
    const day = date.getDay();
    start.setDate(date.getDate() - day);
    return start;
  };
  
  // Get array of 7 days for the week
  const getWeekDays = () => {
    const startOfWeek = getStartOfWeek(currentDate);
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    
    return days;
  };
  
  // Get events for a specific day
  const getEventsForDay = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
    }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  };
  
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };
  
  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };
  
  const weekDays = getWeekDays();
  
  return (
    <div className="h-full grid grid-cols-7 divide-x divide-gray-200">
      {weekDays.map((day, index) => {
        const dayEvents = getEventsForDay(day);
        const dateNum = day.getDate();
        const weekdayName = day.toLocaleDateString('en-US', { weekday: 'short' });
        
        return (
          <div key={index} className="flex flex-col h-full overflow-hidden">
            <div className={`text-center py-2 border-b border-gray-200 ${
              isToday(day) ? 'bg-blue-50' : ''
            }`}>
              <p className="text-sm font-medium text-gray-500">{weekdayName}</p>
              <p className={`text-base font-semibold ${
                isToday(day) ? 'text-blue-600' : 'text-gray-800'
              }`}>
                {dateNum}
              </p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-1 space-y-1">
              {dayEvents.map(event => (
                <div 
                  key={event.id}
                  onClick={() => handleEventClick(event.id)}
                  className={`p-2 rounded text-sm cursor-pointer transition-transform hover:scale-[1.02] ${
                    event.priority === 'high' 
                      ? 'bg-red-50 border-l-4 border-red-500' 
                      : event.priority === 'medium'
                      ? 'bg-orange-50 border-l-4 border-orange-500'
                      : 'bg-blue-50 border-l-4 border-blue-500'
                  }`}
                >
                  <div className="font-medium">{event.title}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatTime(new Date(event.startTime))} - {formatTime(new Date(event.endTime))}
                  </div>
                </div>
              ))}
              
              {dayEvents.length === 0 && (
                <div className="h-full flex items-center justify-center text-sm text-gray-400">
                  No events
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarWeek;