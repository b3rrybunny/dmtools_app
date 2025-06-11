import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/basic/Navbar';
import './App.css';
import * as bootstrap from 'bootstrap';
import { CircleLoader } from 'react-spinners';

// Lazy load all page components
const Home = lazy(() => import('./components/pages/Home'));
const About = lazy(() => import('./components/pages/About'));
const Testing = lazy(() => import('./components/pages/Testing'));
const CombatManager = lazy(() => import('./components/pages/CombatManager'));
const AddCharacter = lazy(() => import('./components/pages/AddCharacter'));
const AddMonster = lazy(() => import('./components/pages/AddMonster'));
const ViewCharacters = lazy(() => import('./components/pages/ViewCharacters'));
const TravelManager = lazy(() => import('./components/pages/TravelManager'));
const DataManagement = lazy(() => import('./components/pages/DataManagement'));

function App() {
  const location = useLocation();

  useEffect(() => {
    console.clear(); // Clear console on route change
    console.log('%c📍 Navigated to:' + location.pathname, 'color: lightpink'); // Optional: Log new route
  }, [location]); // Triggers on location change

  return (
    <div className="App">
      <Navbar />
      <div className="page-container">
        {/* Wrap Routes in Suspense with a fallback */}
        <Suspense fallback={<CircleLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/Testing" element={<Testing />} />
            <Route path='/CombatManager' element={<CombatManager />} />
            <Route path='/AddCharacter' element={<AddCharacter />} />
            <Route path='/AddMonster' element={<AddMonster />} />
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
