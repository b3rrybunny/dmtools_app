import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/basic/Navbar';
import './App.css';

// Lazy load all page components
const Home = lazy(() => import('./components/pages/Home'));
const About = lazy(() => import('./components/pages/About'));
const Contact = lazy(() => import('./components/pages/Contact'));
const CombatManager = lazy(() => import('./components/pages/CombatManager'));
const CharacterDataPage = lazy(() => import('./components/pages/CharacterDataPage'));
const TravelManager = lazy(() => import('./components/pages/TravelManager'));

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="page-container">
        {/* Wrap Routes in Suspense with a fallback */}
        <Suspense fallback={<div>Loading page...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path='/CombatManager' element={<CombatManager />} />
            <Route path='/CharacterData' element={<CharacterDataPage />} />
            <Route path='/TravelManager' element={<TravelManager />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
