import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarMonth from '../components/calendar/CalendarMonth';
import CalendarWeek from '../components/calendar/CalendarWeek';
import CalendarDay from '../components/calendar/CalendarDay';
import { useCalendar } from '../context/CalendarContext';

type CalendarViewType = 'month' | 'week' | 'day';

const CalendarView: React.FC = () => {
  const [viewType, setViewType] = useState<CalendarViewType>('month');
  const { currentDate, setCurrentDate, events } = useCalendar();
  
  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    if (viewType === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (viewType === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };
  
  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (viewType === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (viewType === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };
  
  const navigateToday = () => {
    setCurrentDate(new Date());
  };
  
  const formatHeaderDate = () => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    if (viewType === 'day') {
      options.day = 'numeric';
      options.weekday = 'long';
    }
    return currentDate.toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={navigateToday}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            Today
          </button>
          
          <div className="flex items-center">
            <button
              onClick={navigatePrevious}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={navigateNext}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-800">
            {formatHeaderDate()}
          </h2>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {(['month', 'week', 'day'] as CalendarViewType[]).map((type) => (
            <button
              key={type}
              onClick={() => setViewType(type)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                viewType === type
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
        {viewType === 'month' && <CalendarMonth currentDate={currentDate} events={events} />}
        {viewType === 'week' && <CalendarWeek currentDate={currentDate} events={events} />}
        {viewType === 'day' && <CalendarDay currentDate={currentDate} events={events} />}
      </div>
    </div>
  );
};

export default CalendarView;