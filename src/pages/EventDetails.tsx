import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Calendar, Users, AlertCircle, Map, ChevronLeft, Edit, Trash, BrainCircuit } from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';
import { formatDate, formatTime } from '../utils/dateUtils';

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { events, removeEvent, showNotification } = useCalendar();
  const [optimizing, setOptimizing] = useState(false);
  
  // Find the event by ID
  const event = events.find(e => e.id === id);
  
  if (!event) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Event Not Found</h2>
          <p className="text-gray-500 mb-4">The event you're looking for doesn't exist or has been deleted.</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
          >
            Back to Calendar
          </button>
        </div>
      </div>
    );
  }
  
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this event?')) {
      removeEvent(event.id);
      showNotification(`Event "${event.title}" deleted successfully`);
      navigate('/');
    }
  };
  
  const handleOptimize = () => {
    setOptimizing(true);
    // Simulate AI optimization process
    setTimeout(() => {
      showNotification('AI suggests moving this meeting to Wednesday at 10:30 AM for better attendance');
      setOptimizing(false);
    }, 1500);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Back
      </button>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Event header */}
        <div className={`p-6 ${
          event.priority === 'high' ? 'bg-red-50' : 
          event.priority === 'medium' ? 'bg-orange-50' : 
          'bg-blue-50'
        }`}>
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">{event.title}</h1>
            <div className="flex space-x-2">
              <button
                className="p-2 rounded-full hover:bg-white/50 text-gray-600"
                title="Edit Event"
              >
                <Edit className="h-5 w-5" />
              </button>
              <button
                className="p-2 rounded-full hover:bg-white/50 text-gray-600"
                title="Delete Event"
                onClick={handleDelete}
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${
            event.priority === 'high' ? 'bg-red-100 text-red-800' : 
            event.priority === 'medium' ? 'bg-orange-100 text-orange-800' : 
            'bg-blue-100 text-blue-800'
          }`}>
            {event.priority.charAt(0).toUpperCase() + event.priority.slice(1)} Priority
          </div>
          
          {event.isAiOptimized && (
            <div className="inline-block ml-2 px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
              AI Optimized
            </div>
          )}
        </div>
        
        {/* Event details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm text-gray-500 uppercase mb-3">Time & Location</h3>
              
              <div className="space-y-4">
                <div className="flex">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-gray-800">{formatDate(new Date(event.startTime))}</p>
                  </div>
                </div>
                
                <div className="flex">
                  <Clock className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-gray-800">
                      {formatTime(new Date(event.startTime))} - {formatTime(new Date(event.endTime))}
                    </p>
                    <p className="text-sm text-gray-500">
                      {Math.round((new Date(event.endTime).getTime() - new Date(event.startTime).getTime()) / (1000 * 60))} minutes
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <Map className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-gray-800">Conference Room A</p>
                    <p className="text-sm text-gray-500">Main Office, Floor 3</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={handleOptimize}
                  disabled={optimizing}
                  className="flex items-center px-4 py-2 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors"
                >
                  <BrainCircuit className="h-4 w-4 mr-2" />
                  {optimizing ? 'Finding optimal time...' : 'Suggest better time'}
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm text-gray-500 uppercase mb-3">Details</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-gray-800">
                  {event.description || 'No description provided.'}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex">
                  <Users className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-gray-800 font-medium">Participants (5)</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                        You (Organizer)
                      </span>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                        Sarah Johnson
                      </span>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                        Michael Chen
                      </span>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                        Priya Patel
                      </span>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                        Alex Rodriguez
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* AI Insights */}
          <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
            <div className="flex">
              <div className="rounded-full bg-purple-100 p-2 mr-4 h-fit">
                <BrainCircuit className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h4 className="text-purple-800 font-medium">AI Meeting Insights</h4>
                <ul className="space-y-2 mt-3">
                  <li className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-2"></div>
                    <p className="text-sm text-gray-700">
                      This meeting overlaps with your typical focus time. Consider rescheduling to preserve your productivity.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-2"></div>
                    <p className="text-sm text-gray-700">
                      Two participants have similar meetings scheduled on the same day, which may cause context-switching challenges.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-2"></div>
                    <p className="text-sm text-gray-700">
                      Based on historical patterns, this type of meeting is most productive when scheduled in the morning.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;