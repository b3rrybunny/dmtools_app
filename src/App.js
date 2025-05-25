import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/basic/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import CombatManager from './components/pages/CombatManager';
import CharacterDataPage from './components/pages/CharacterDataPage';

function App() {
  return (
    <div className="App" style={{height: '100%', width: '100%'}}>
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/CombatManager' element={<CombatManager />} />
          <Route path='/CharacterData' element={<CharacterDataPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
