import React, { useState } from 'react';
import { X, BrainCircuit } from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';
import { generateId } from '../utils/idGenerator';

interface CreateEventModalProps {
  onClose: () => void;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({ onClose }) => {
  const { addEvent, currentDate, showNotification } = useCalendar();
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiSuggesting, setAiSuggesting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: currentDate.toISOString().split('T')[0],
    startTime: '09:00',
    endDate: currentDate.toISOString().split('T')[0],
    endTime: '10:00',
    priority: 'normal',
    isAiOptimized: false
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleNaturalLanguageInput = (input: string) => {
    // Simulate AI processing natural language input
    setAiSuggesting(true);
    
    setTimeout(() => {
      // Parse example: "Meeting with design team tomorrow at 2pm for 1 hour"
      const mockParsedData = {
        title: 'Meeting with design team',
        description: 'Discuss project updates and next steps',
        startDate: new Date(currentDate.getTime() + 86400000).toISOString().split('T')[0], // tomorrow
        startTime: '14:00',
        endDate: new Date(currentDate.getTime() + 86400000).toISOString().split('T')[0],
        endTime: '15:00',
        priority: 'medium',
      };
      
      setFormData(prev => ({
        ...prev,
        ...mockParsedData
      }));
      
      setAiSuggesting(false);
    }, 1500);
  };
  
  const optimizeSchedule = () => {
    setIsProcessing(true);
    
    // Simulate AI processing and suggesting optimized time
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        startTime: '10:30',
        endTime: '11:30',
        isAiOptimized: true
      }));
      
      showNotification('Schedule optimized! This time slot has fewer conflicts with your focus time and other meetings.');
      setIsProcessing(false);
    }, 1500);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
    
    const newEvent = {
      id: generateId(),
      title: formData.title,
      description: formData.description,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      priority: formData.priority as 'low' | 'medium' | 'high',
      isAiOptimized: formData.isAiOptimized
    };
    
    addEvent(newEvent);
    showNotification(`Event "${formData.title}" created successfully`);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Create New Event</h2>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <label className="block mb-2 text-sm">
              <span className="font-medium text-gray-700">Quick Create with AI</span>
              <div className="mt-1 flex">
                <input
                  type="text"
                  placeholder="E.g., 'Meeting with team tomorrow at 2pm'"
                  className="flex-1 rounded-l-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyDown={(e) => e.key === 'Enter' && handleNaturalLanguageInput(e.currentTarget.value)}
                />
                <button
                  type="button"
                  className="bg-purple-600 text-white rounded-r-lg px-3 py-2 text-sm font-medium flex items-center"
                  onClick={() => handleNaturalLanguageInput("Meeting with team tomorrow at 2pm")}
                >
                  <BrainCircuit className="h-4 w-4 mr-1" />
                  {aiSuggesting ? 'Processing...' : 'Parse'}
                </button>
              </div>
            </label>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    End Time
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isAiOptimized"
                  name="isAiOptimized"
                  checked={formData.isAiOptimized}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="isAiOptimized" className="ml-2 text-sm text-gray-700">
                  This time slot is AI-optimized
                </label>
              </div>
              
              <button
                type="button"
                className="w-full bg-purple-50 text-purple-700 border border-purple-200 py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center hover:bg-purple-100 transition-colors"
                onClick={optimizeSchedule}
                disabled={isProcessing}
              >
                <BrainCircuit className="h-4 w-4 mr-2" />
                {isProcessing ? 'Finding optimal time...' : 'Optimize schedule with AI'}
              </button>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  Create Event
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;