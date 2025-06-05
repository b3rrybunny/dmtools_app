import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/basic/Navbar';
import './App.css';
import * as bootstrap from 'bootstrap';

// Lazy load all page components
const Home = lazy(() => import('./components/pages/Home'));
const About = lazy(() => import('./components/pages/About'));
const Contact = lazy(() => import('./components/pages/Contact'));
const CombatManager = lazy(() => import('./components/pages/CombatManager'));
const AddCharacter = lazy(() => import('./components/pages/AddCharacter'));
const ViewCharacters = lazy(() => import('./components/pages/ViewCharacters'));
const TravelManager = lazy(() => import('./components/pages/TravelManager'));
const DataManagement = lazy(() => import('./components/pages/DataManagement'));

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="page-container">
        {/* Wrap Routes in Suspense with a fallback */}
        <Suspense fallback={<div style={{color: 'white'}}>Loading page...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path='/CombatManager' element={<CombatManager />} />
            <Route path='/AddCharacter' element={<AddCharacter />} />
            <Route path='/ViewCharacters' element={<ViewCharacters />} />
            <Route path='/TravelManager' element={<TravelManager />} />
            <Route path='/DataManagement' element={<DataManagement />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
