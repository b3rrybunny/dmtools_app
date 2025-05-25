import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Header/Homepage */}
        <Link className="navbar-brand" to="/">My App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Rest of links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* CombatManager */}
            <li className="nav-item">
              <Link className="nav-link" to="/CombatManager">CombatManager</Link>
            </li>
            {/* Character Data */}
            <li className="nav-item">
              <Link className="nav-link" to="/CharacterData">Character Data</Link>
            </li>
            {/* Home */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {/* About */}
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            {/* Contact */}
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;