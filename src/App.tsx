import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import CalendarView from './pages/CalendarView';
import Dashboard from './pages/Dashboard';
import EventDetails from './pages/EventDetails';
import Settings from './pages/Settings';
import FocusTime from './pages/FocusTime';
import { CalendarProvider } from './context/CalendarContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <CalendarProvider>
        <Router>
          <Layout>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<CalendarView />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/event/:id" element={<EventDetails />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/focus" element={<FocusTime />} />
              </Routes>
            </AnimatePresence>
          </Layout>
        </Router>
      </CalendarProvider>
    </ThemeProvider>
  );
}

export default App;