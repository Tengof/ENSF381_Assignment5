import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './homepage';
import CoursesPage from './CoursesPage';
import LoginPage from './LoginForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/CoursesPage" element={<CoursesPage />} />
        <Route path="/LoginForm" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
