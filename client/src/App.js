import React from 'react';
import './App.css';
import Home from './components/pages/HomePage/Home';
import Camera from './components/pages/Camera/Camera';
import Map from './components/pages/Map/Map';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/camera' element={<Camera/>} />
        <Route path='/map' element={<Map/>} />
      </Routes>
    </Router>
  );
}

export default App;
