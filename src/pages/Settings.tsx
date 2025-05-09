import React, { useState } from 'react';
import { Save, Bell, Calendar, Clock, BrainCircuit, Shield } from 'lucide-react';
import { useCalendar } from '../context/CalendarContext';

const Settings: React.FC = () => {
  const { showNotification } = useCalendar();
  const [saving, setSaving] = useState(false);
  
  const [settings, setSettings] = useState({
    // Calendar Settings
    defaultView: 'month',
    weekStartsOn: 'sunday',
    timeFormat: '12hour',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    reminderTiming: '15min',
    
    // AI Settings
    aiScheduleOptimization: true,
    aiScheduleSuggestions: true,
    aiMeetingInsights: true,
    aiDataCollection: true,
    
    // Calendar Integrations
    googleCalendar: false,
    outlookCalendar: false,
    appleCalendar: false,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      setSettings({ ...settings, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setSettings({ ...settings, [name]: value });
    }
  };
  
  const handleSaveSettings = () => {
    setSaving(true);
    
    // Simulate saving process
    setTimeout(() => {
      showNotification('Settings saved successfully');
      setSaving(false);
    }, 1000);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
          <p className="text-gray-500 text-sm">Manage your preferences and application settings</p>
        </div>
        
        <div className="p-6">
          {/* Calendar Settings */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Calendar className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-800">Calendar Settings</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Default View
                </label>
                <select
                  name="defaultView"
                  value={settings.defaultView}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="month">Month</option>
                  <option value="week">Week</option>
                  <option value="day">Day</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Week Starts On
                </label>
                <select
                  name="weekStartsOn"
                  value={settings.weekStartsOn}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="sunday">Sunday</option>
                  <option value="monday">Monday</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Time Format
                </label>
                <select
                  name="timeFormat"
                  value={settings.timeFormat}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="12hour">12-hour (1:30 PM)</option>
                  <option value="24hour">24-hour (13:30)</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Notification Settings */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Bell className="h-5 w-5 text-orange-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-800">Notification Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="emailNotifications" className="ml-2 text-sm text-gray-700">
                  Email Notifications
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pushNotifications"
                  name="pushNotifications"
                  checked={settings.pushNotifications}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="pushNotifications" className="ml-2 text-sm text-gray-700">
                  Push Notifications
                </label>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Default Reminder Time
                </label>
                <select
                  name="reminderTiming"
                  value={settings.reminderTiming}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="5min">5 minutes before</option>
                  <option value="10min">10 minutes before</option>
                  <option value="15min">15 minutes before</option>
                  <option value="30min">30 minutes before</option>
                  <option value="1hour">1 hour before</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* AI Settings */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <BrainCircuit className="h-5 w-5 text-purple-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-800">AI Features</h3>
            </div>
            
            <div className="space-y-4 bg-purple-50 p-4 rounded-lg border border-purple-100">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="aiScheduleOptimization"
                  name="aiScheduleOptimization"
                  checked={settings.aiScheduleOptimization}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                />
                <label htmlFor="aiScheduleOptimization" className="ml-2 text-sm text-gray-700">
                  AI Schedule Optimization
                  <span className="block text-xs text-gray-500">Automatically suggest optimal meeting times</span>
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="aiScheduleSuggestions"
                  name="aiScheduleSuggestions"
                  checked={settings.aiScheduleSuggestions}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                />
                <label htmlFor="aiScheduleSuggestions" className="ml-2 text-sm text-gray-700">
                  AI Schedule Suggestions
                  <span className="block text-xs text-gray-500">Receive AI-powered suggestions for your calendar</span>
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="aiMeetingInsights"
                  name="aiMeetingInsights"
                  checked={settings.aiMeetingInsights}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                />
                <label htmlFor="aiMeetingInsights" className="ml-2 text-sm text-gray-700">
                  AI Meeting Insights
                  <span className="block text-xs text-gray-500">Get insights about meetings and their impact on your schedule</span>
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="aiDataCollection"
                  name="aiDataCollection"
                  checked={settings.aiDataCollection}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                />
                <label htmlFor="aiDataCollection" className="ml-2 text-sm text-gray-700">
                  AI Data Collection
                  <span className="block text-xs text-gray-500">Allow the app to collect calendar data to improve AI features</span>
                </label>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="h-4 w-4 mr-1" />
                Your data is encrypted and used only to improve your experience
              </div>
            </div>
          </div>
          
          {/* Calendar Integrations */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Clock className="h-5 w-5 text-teal-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-800">Calendar Integrations</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <div className="rounded-full bg-blue-100 p-2 mr-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Google Calendar</p>
                    <p className="text-xs text-gray-500">Sync events with your Google Calendar</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="googleCalendar"
                      name="googleCalendar"
                      checked={settings.googleCalendar}
                      onChange={handleInputChange}
                      className="checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label
                      htmlFor="googleCalendar"
                      className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    ></label>
                  </div>
                  {settings.googleCalendar ? (
                    <span className="text-xs text-green-600 font-medium">Connected</span>
                  ) : (
                    <button className="text-xs text-blue-600 font-medium">Connect</button>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <div className="rounded-full bg-blue-100 p-2 mr-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Microsoft Outlook</p>
                    <p className="text-xs text-gray-500">Sync events with your Outlook Calendar</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="outlookCalendar"
                      name="outlookCalendar"
                      checked={settings.outlookCalendar}
                      onChange={handleInputChange}
                      className="checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label
                      htmlFor="outlookCalendar"
                      className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    ></label>
                  </div>
                  {settings.outlookCalendar ? (
                    <span className="text-xs text-green-600 font-medium">Connected</span>
                  ) : (
                    <button className="text-xs text-blue-600 font-medium">Connect</button>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <div className="rounded-full bg-blue-100 p-2 mr-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Apple Calendar</p>
                    <p className="text-xs text-gray-500">Sync events with your Apple Calendar</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="appleCalendar"
                      name="appleCalendar"
                      checked={settings.appleCalendar}
                      onChange={handleInputChange}
                      className="checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label
                      htmlFor="appleCalendar"
                      className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    ></label>
                  </div>
                  {settings.appleCalendar ? (
                    <span className="text-xs text-green-600 font-medium">Connected</span>
                  ) : (
                    <button className="text-xs text-blue-600 font-medium">Connect</button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleSaveSettings}
              disabled={saving}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;