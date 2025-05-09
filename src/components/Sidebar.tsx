import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, BarChart2, Clock, Settings, Users, LayoutDashboard } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Calendar, label: 'Calendar' },
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/focus', icon: Clock, label: 'Focus Time' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];
  
  return (
    <aside className="w-16 md:w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 flex items-center justify-center md:justify-start">
        <Clock className="h-6 w-6 text-blue-600 mr-0 md:mr-2" />
        <h1 className="text-xl font-bold text-gray-800 hidden md:block">Smart Calendar</h1>
      </div>
      
      <nav className="mt-8 flex-1">
        <ul>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path} className="mb-2 px-3">
                <Link
                  to={item.path}
                  className={`flex items-center py-3 px-2 md:px-4 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-0 md:mr-3" />
                  <span className="hidden md:block">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 mt-auto border-t border-gray-200">
        <div className="hidden md:block">
          <h3 className="text-xs uppercase text-gray-500 font-medium">AI Assistant</h3>
          <div className="mt-2 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">Your meeting with the design team could be optimized for a better time slot.</p>
            <button className="mt-2 text-xs text-blue-600 font-medium">Optimize Schedule</button>
          </div>
        </div>
        <div className="flex justify-center md:hidden">
          <button className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
            <Users className="h-5 w-5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;