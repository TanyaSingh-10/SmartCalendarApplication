import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Event } from '../../types/calendar';

interface CalendarMonthProps {
  currentDate: Date;
  events: Event[];
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({ currentDate, events }) => {
  const navigate = useNavigate();
  
  // Helper functions for date calculations
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const getDaysArray = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    // Get days from previous month to fill the first week
    const prevMonthDays = [];
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);
    
    for (let i = firstDay - 1; i >= 0; i--) {
      prevMonthDays.push({
        date: new Date(prevMonthYear, prevMonth, daysInPrevMonth - i),
        isCurrentMonth: false
      });
    }
    
    // Current month days
    const currentMonthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    // Get days from next month to fill the last week
    const nextMonthDays = [];
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;
    
    const totalDaysToShow = 42; // 6 rows of 7 days
    const daysToAdd = totalDaysToShow - (prevMonthDays.length + currentMonthDays.length);
    
    for (let i = 1; i <= daysToAdd; i++) {
      nextMonthDays.push({
        date: new Date(nextMonthYear, nextMonth, i),
        isCurrentMonth: false
      });
    }
    
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
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
    });
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

  const days = getDaysArray();
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekdays.map(day => (
          <div key={day} className="py-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="flex-1 grid grid-cols-7 grid-rows-6 h-full">
        {days.map((day, index) => {
          const dayEvents = getEventsForDay(day.date);
          
          return (
            <div 
              key={index}
              className={`border-b border-r border-gray-200 min-h-[100px] p-1 ${
                !day.isCurrentMonth ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex items-center justify-between p-1">
                <span className={`text-sm font-medium ${
                  !day.isCurrentMonth ? 'text-gray-400' : 
                  isToday(day.date) ? 'bg-blue-600 text-white h-6 w-6 rounded-full flex items-center justify-center' : 
                  'text-gray-700'
                }`}>
                  {day.date.getDate()}
                </span>
                {day.isCurrentMonth && (
                  <span className="text-xs text-gray-500">
                    {dayEvents.length > 0 ? `${dayEvents.length} event${dayEvents.length > 1 ? 's' : ''}` : ''}
                  </span>
                )}
              </div>
              
              <div className="mt-1 space-y-1 max-h-[80px] overflow-hidden">
                {dayEvents.slice(0, 3).map(event => (
                  <div 
                    key={event.id}
                    onClick={() => handleEventClick(event.id)}
                    className={`text-xs truncate rounded px-2 py-1 cursor-pointer ${
                      event.priority === 'high' ? 'bg-red-100 text-red-800' :
                      event.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500 pl-2">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarMonth;