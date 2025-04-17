import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChecklistGenerator from "./components/ChecklistGenerator";
import './App.css';

function App() {
  return (
    <div>
      <ChecklistGenerator />
    </div>
  );
}

export default App;
