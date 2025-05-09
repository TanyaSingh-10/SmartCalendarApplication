import React from 'react';
import { BarChart, PieChart, Calendar, Clock, BrainCircuit, CheckCircle } from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';

const Dashboard: React.FC = () => {
  const { events } = useCalendar();
  
  // Helper function to format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Get today's events
  const getTodayEvents = () => {
    const today = new Date();
    
    return events
      .filter(event => {
        const eventDate = new Date(event.startTime);
        return (
          eventDate.getFullYear() === today.getFullYear() &&
          eventDate.getMonth() === today.getMonth() &&
          eventDate.getDate() === today.getDate()
        );
      })
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  };
  
  // Get upcoming events (excluding today)
  const getUpcomingEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return events
      .filter(event => {
        const eventDate = new Date(event.startTime);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate.getTime() > today.getTime();
      })
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
      .slice(0, 5);
  };
  
  const formatTimeRange = (start: Date, end: Date) => {
    return `${start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - ${end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
  };
  
  const todayEvents = getTodayEvents();
  const upcomingEvents = getUpcomingEvents();
  
  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-2 mr-3">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Events</p>
              <p className="text-2xl font-semibold">{events.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full bg-purple-100 p-2 mr-3">
              <BrainCircuit className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">AI-Optimized</p>
              <p className="text-2xl font-semibold">{events.filter(e => e.isAiOptimized).length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full bg-red-100 p-2 mr-3">
              <Clock className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Hours in Meetings</p>
              <p className="text-2xl font-semibold">12.5</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-2 mr-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Focus Time</p>
              <p className="text-2xl font-semibold">8.5 hrs</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800 font-medium">Time Distribution</h3>
            <div className="text-sm text-gray-500">This Week</div>
          </div>
          <div className="flex items-center">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Meetings</span>
                <span className="text-sm font-medium">12.5h</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '42%' }}></div>
              </div>
              
              <div className="flex items-center justify-between mb-2 mt-4">
                <span className="text-sm text-gray-600">Focus Time</span>
                <span className="text-sm font-medium">8.5h</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '28%' }}></div>
              </div>
              
              <div className="flex items-center justify-between mb-2 mt-4">
                <span className="text-sm text-gray-600">Admin Tasks</span>
                <span className="text-sm font-medium">5h</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: '18%' }}></div>
              </div>
              
              <div className="flex items-center justify-between mb-2 mt-4">
                <span className="text-sm text-gray-600">Breaks</span>
                <span className="text-sm font-medium">3h</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
            <div className="ml-6 hidden md:block">
              <BarChart className="h-32 w-32 text-gray-300" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800 font-medium">Meeting Categories</h3>
            <div className="text-sm text-gray-500">This Month</div>
          </div>
          <div className="flex items-center">
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-100 p-3 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm text-gray-600">Team</span>
                  </div>
                  <p className="text-lg font-semibold mt-1">42%</p>
                </div>
                
                <div className="border border-gray-100 p-3 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-sm text-gray-600">1:1s</span>
                  </div>
                  <p className="text-lg font-semibold mt-1">28%</p>
                </div>
                
                <div className="border border-gray-100 p-3 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-gray-600">Client</span>
                  </div>
                  <p className="text-lg font-semibold mt-1">18%</p>
                </div>
                
                <div className="border border-gray-100 p-3 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-sm text-gray-600">Other</span>
                  </div>
                  <p className="text-lg font-semibold mt-1">12%</p>
                </div>
              </div>
            </div>
            <div className="ml-6 hidden md:block">
              <PieChart className="h-32 w-32 text-gray-300" />
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 rounded-lg border border-purple-100">
        <div className="flex">
          <div className="rounded-full bg-purple-100 p-2 mr-4 h-fit">
            <BrainCircuit className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-purple-800 font-medium mb-1">AI Insights & Recommendations</h3>
            <ul className="space-y-3 mt-3">
              <li className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-2"></div>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Schedule Optimization:</span> Your current meeting schedule has 3 potential conflicts. You could save 2.5 hours by rescheduling these meetings.
                </p>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-2"></div>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Focus Time:</span> You have 25% less focus time this week compared to your optimal patterns. Consider blocking more uninterrupted time.
                </p>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-2"></div>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Meeting Patterns:</span> Team meetings are most productive on Tuesday mornings based on your historical data.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Today's Schedule and Upcoming Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-800 font-medium mb-4">Today's Schedule</h3>
          
          {todayEvents.length > 0 ? (
            <div className="space-y-3">
              {todayEvents.map(event => (
                <div key={event.id} className="flex">
                  <div className="w-16 flex-shrink-0 text-gray-500 text-sm">
                    {new Date(event.startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  </div>
                  <div className={`flex-1 pl-3 border-l-2 ${
                    event.priority === 'high' ? 'border-red-500' : 
                    event.priority === 'medium' ? 'border-orange-500' : 
                    'border-blue-500'
                  }`}>
                    <p className="font-medium text-gray-800">{event.title}</p>
                    <p className="text-xs text-gray-500">
                      {formatTimeRange(new Date(event.startTime), new Date(event.endTime))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <Calendar className="h-10 w-10 mx-auto text-gray-300 mb-2" />
              <p>No events scheduled for today</p>
            </div>
          )}
        </div>
        
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-800 font-medium mb-4">Upcoming Events</h3>
          
          {upcomingEvents.length > 0 ? (
            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <div key={event.id} className="flex">
                  <div className="w-20 flex-shrink-0">
                    <p className="text-xs font-medium text-gray-500">
                      {formatDate(new Date(event.startTime))}
                    </p>
                  </div>
                  <div className={`flex-1 pl-3 border-l-2 ${
                    event.priority === 'high' ? 'border-red-500' : 
                    event.priority === 'medium' ? 'border-orange-500' : 
                    'border-blue-500'
                  }`}>
                    <p className="font-medium text-gray-800">{event.title}</p>
                    <p className="text-xs text-gray-500">
                      {formatTimeRange(new Date(event.startTime), new Date(event.endTime))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <Calendar className="h-10 w-10 mx-auto text-gray-300 mb-2" />
              <p>No upcoming events</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;