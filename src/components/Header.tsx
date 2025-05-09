import React, { useState } from 'react';
import { Search, Bell, Plus, User } from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';
import CreateEventModal from './CreateEventModal';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const { showNotification } = useCalendar();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      </div>
      
      <div className="flex items-center">
        <div className="relative mr-4 hidden md:block">
          <input
            type="text"
            placeholder="Search events..."
            className="pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64 text-sm"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        
        <button 
          className="mr-4 relative text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={() => showNotification("You have 3 upcoming events today")}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </button>
        
        <button 
          onClick={() => setIsEventModalOpen(true)}
          className="mr-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors"
        >
          <Plus className="h-4 w-4 mr-1" />
          <span className="hidden md:inline">Create Event</span>
          <span className="md:hidden">Event</span>
        </button>
        
        <button className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none">
          <User className="h-5 w-5" />
        </button>
      </div>

      {isEventModalOpen && <CreateEventModal onClose={() => setIsEventModalOpen(false)} />}
    </header>
  );
};

export default Header;