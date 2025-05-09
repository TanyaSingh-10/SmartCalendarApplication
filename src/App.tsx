import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CalendarView from './pages/CalendarView';
import Dashboard from './pages/Dashboard';
import EventDetails from './pages/EventDetails';
import Settings from './pages/Settings';
import FocusTime from './pages/FocusTime';
import { CalendarProvider } from './context/CalendarContext';

function App() {
  return (
    <CalendarProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<CalendarView />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/focus" element={<FocusTime />} />
          </Routes>
        </Layout>
      </Router>
    </CalendarProvider>
  );
}

export default App;