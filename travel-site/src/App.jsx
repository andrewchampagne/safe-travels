import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

import TravelSafetyChecker from "./components/TravelSafetyChecker";
import WeatherApp from "./components/weatherapp";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/safety" element={<TravelSafetyChecker />} />
          <Route path="/weather" element={<WeatherApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
