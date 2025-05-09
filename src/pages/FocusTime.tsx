import React, { useState } from 'react';
import { Clock, Plus, BrainCircuit, Calendar, X } from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';
import { generateId } from '../utils/idGenerator';

const FocusTime: React.FC = () => {
  const { events, addEvent, showNotification } = useCalendar();
  const [showAddFocus, setShowAddFocus] = useState(false);
  const [focusFormData, setFocusFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00',
  });
  
  // Focus time blocks (demonstrative data)
  const focusBlocks = [
    {
      id: 'focus-1',
      title: 'Deep Work Session',
      startTime: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
      endTime: new Date(new Date().setHours(11, 0, 0, 0)).toISOString(),
      repeatPattern: 'daily',
    },
    {
      id: 'focus-2',
      title: 'Project Planning',
      startTime: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
      endTime: new Date(new Date().setHours(15, 30, 0, 0)).toISOString(),
      repeatPattern: 'weekly',
    },
    {
      id: 'focus-3',
      title: 'Research & Learning',
      startTime: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
      endTime: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
      repeatPattern: 'none',
    },
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFocusFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddFocus = () => {
    const startDateTime = new Date(`${focusFormData.date}T${focusFormData.startTime}`);
    const endDateTime = new Date(`${focusFormData.date}T${focusFormData.endTime}`);
    
    const newFocusEvent = {
      id: generateId(),
      title: `Focus: ${focusFormData.title}`,
      description: 'Focus time block for deep work',
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      priority: 'high' as const,
      isAiOptimized: false,
      isFocusTime: true
    };
    
    addEvent(newFocusEvent);
    showNotification(`Focus time "${focusFormData.title}" added to your calendar`);
    setShowAddFocus(false);
    setFocusFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '10:00',
    });
  };
  
  const analyzeSchedule = () => {
    showNotification('AI Schedule Analysis: You have 3 hours of uninterrupted focus time today');
  };
  
  const formatTimeRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return `${startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - ${endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
  };
  
  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Focus Time Management</h2>
            <p className="text-gray-500 mt-1">Schedule uninterrupted time for deep work</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={analyzeSchedule}
              className="flex items-center px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors"
            >
              <BrainCircuit className="h-4 w-4 mr-2" />
              Analyze Schedule
            </button>
            <button 
              onClick={() => setShowAddFocus(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Focus Time
            </button>
          </div>
        </div>
        
        {/* Focus Time Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-2 mr-3">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-blue-700 text-sm font-medium">Daily Average</p>
                <p className="text-2xl font-semibold text-blue-900">3.5 hours</p>
              </div>
            </div>
          </div>
          
          <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
            <div className="flex items-center">
              <div className="rounded-full bg-teal-100 p-2 mr-3">
                <Clock className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <p className="text-teal-700 text-sm font-medium">Weekly Total</p>
                <p className="text-2xl font-semibold text-teal-900">17.5 hours</p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center">
              <div className="rounded-full bg-purple-100 p-2 mr-3">
                <BrainCircuit className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-purple-700 text-sm font-medium">AI Recommendation</p>
                <p className="text-2xl font-semibold text-purple-900">+2 hours/day</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Add Focus Time Form */}
        {showAddFocus && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-800">Add Focus Time Block</h3>
              <button 
                onClick={() => setShowAddFocus(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={focusFormData.title}
                  onChange={handleInputChange}
                  placeholder="Deep Work Session"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={focusFormData.date}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={focusFormData.startTime}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={focusFormData.endTime}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAddFocus}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Add to Calendar
              </button>
            </div>
          </div>
        )}
        
        {/* Scheduled Focus Time Blocks */}
        <h3 className="font-medium text-gray-800 mb-3">Scheduled Focus Time</h3>
        <div className="space-y-3">
          {focusBlocks.map(block => (
            <div key={block.id} className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="rounded-full bg-blue-100 p-2 mr-3">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{block.title}</p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{getFormattedDate(block.startTime)}, {formatTimeRange(block.startTime, block.endTime)}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {block.repeatPattern !== 'none' && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                    Repeats {block.repeatPattern}
                  </span>
                )}
                <button className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Focus Time Tips */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
        <h3 className="font-medium text-gray-800 mb-4">AI Productivity Insights</h3>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
          <div className="flex">
            <div className="rounded-full bg-purple-100 p-2 mr-4 h-fit">
              <BrainCircuit className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h4 className="text-purple-800 font-medium">Focus Time Optimization</h4>
              <ul className="space-y-2 mt-3">
                <li className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-2"></div>
                  <p className="text-sm text-gray-700">
                    Based on your productivity patterns, your optimal focus times are between 9-11 AM and 2-4 PM.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-2"></div>
                  <p className="text-sm text-gray-700">
                    You complete tasks 30% faster during uninterrupted focus blocks of at least 90 minutes.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-2"></div>
                  <p className="text-sm text-gray-700">
                    Consider scheduling your complex creative tasks during morning focus blocks when your cognitive performance is highest.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusTime;