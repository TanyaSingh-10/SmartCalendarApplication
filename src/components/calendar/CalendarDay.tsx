import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Event } from '../../types/calendar';
import { formatTime } from '../../utils/dateUtils';

interface CalendarDayProps {
  currentDate: Date;
  events: Event[];
}

const CalendarDay: React.FC<CalendarDayProps> = ({ currentDate, events }) => {
  const navigate = useNavigate();
  
  // Filter events for the current day
  const getDayEvents = () => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return (
        eventDate.getFullYear() === currentDate.getFullYear() &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getDate() === currentDate.getDate()
      );
    }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  };
  
  // Generate hours for the day view
  const getHoursOfDay = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(i);
    }
    return hours;
  };
  
  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };
  
  const dayEvents = getDayEvents();
  const hours = getHoursOfDay();
  
  // Get current time for the "now" indicator
  const now = new Date();
  const isToday = 
    now.getFullYear() === currentDate.getFullYear() &&
    now.getMonth() === currentDate.getMonth() &&
    now.getDate() === currentDate.getDate();
  
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimePercent = (currentHour + currentMinute / 60) / 24 * 100;
  
  // Position events within the timeline
  const positionEvent = (event: Event) => {
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);
    
    const startHour = start.getHours();
    const startMinute = start.getMinutes();
    const startPercent = (startHour + startMinute / 60) / 24 * 100;
    
    const endHour = end.getHours();
    const endMinute = end.getMinutes();
    const endPercent = (endHour + endMinute / 60) / 24 * 100;
    
    const durationPercent = endPercent - startPercent;
    
    return {
      top: `${startPercent}%`,
      height: `${durationPercent}%`
    };
  };
  
  return (
    <div className="h-full flex">
      {/* Hours timeline */}
      <div className="w-16 flex-shrink-0 border-r border-gray-200">
        {hours.map(hour => (
          <div key={hour} className="h-20 flex items-start justify-end pr-2 text-xs text-gray-500">
            {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
          </div>
        ))}
      </div>
      
      {/* Events area */}
      <div className="flex-1 relative">
        {/* Hour grid lines */}
        {hours.map(hour => (
          <div key={hour} className="h-20 border-b border-gray-100" />
        ))}
        
        {/* Current time indicator */}
        {isToday && (
          <div 
            className="absolute left-0 right-0 z-10 flex items-center"
            style={{ top: `${currentTimePercent}%` }}
          >
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="h-px flex-1 bg-red-500"></div>
          </div>
        )}
        
        {/* Events */}
        {dayEvents.map(event => {
          const position = positionEvent(event);
          
          return (
            <div
              key={event.id}
              onClick={() => handleEventClick(event.id)}
              className={`absolute left-2 right-2 rounded p-2 cursor-pointer text-white ${
                event.priority === 'high' ? 'bg-red-500' :
                event.priority === 'medium' ? 'bg-orange-500' :
                'bg-blue-500'
              }`}
              style={{ top: position.top, height: position.height }}
            >
              <div className="font-medium truncate">{event.title}</div>
              <div className="text-xs opacity-90">
                {formatTime(new Date(event.startTime))} - {formatTime(new Date(event.endTime))}
              </div>
              {position.height.replace('%', '') > 5 && (
                <div className="text-xs mt-1 line-clamp-2">{event.description}</div>
              )}
            </div>
          );
        })}
        
        {dayEvents.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            No events scheduled for today
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarDay;