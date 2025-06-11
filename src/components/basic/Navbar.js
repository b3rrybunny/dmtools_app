import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/dmtools_logo_white.png';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Header/Homepage */}
        <a className="navbar-brand" href="/">
          <img src={logo} height="26" style={{marginLeft: '5px'}}/>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Rest of links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* Combat Manager */}
            <li className="nav-item">
              <Link className="nav-link" to="/CombatManager">Combat Manager</Link>
            </li>
            {/* Travel Manager */}
            <li className="nav-item">
              <Link className="nav-link" to="/TravelManager">Travel Manager</Link>
            </li>
            {/* Character Data */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Characters
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to='/AddCharacter'>Add Character</Link></li>
                <li><Link className="dropdown-item" to='/AddMonster'>Add Monster</Link></li>
                <li><Link className="dropdown-item" to='/ViewCharacters'>View Characters</Link></li>
              </ul>
            </li>
            {/* Data Management */}
            <li className="nav-item">
              <Link className="nav-link" to="/DataManagement">Data Management</Link>
            </li>
            {/* About */}
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            {/* Testing */}
            <li className="nav-item">
              <Link className="nav-link" to="/Testing">Testing</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;