import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faCog, faSearch } from '@fortawesome/pro-duotone-svg-icons';
import { faCog, faSearch } from '@fortawesome/free-solid-svg-icons';


function Header() {
  return (
    <header className="header">
      <h1 className="logo-area"><a href="/">Bookshelf</a></h1>
      <nav className="nav-primary" aria-label="Main" id="bookshelf-nav-primary" className="main-menu">
           <ul id="menu-main-menu" className="menu-main-menu">
                <li id="menu-item-search" className="menu-item search"><a href="/search"><FontAwesomeIcon icon={faSearch} /></a></li>
                <li id="menu-item-saved" className="menu-item saved"><a href="/saved">To Read</a></li>
                <li id="menu-item-read" className="menu-item read"><a href="/read">Already Read</a></li>
                <li id="menu-item-settings" className="menu-item settings"><a href="/settings"><FontAwesomeIcon icon={faCog} /></a></li>
           </ul>
      </nav>
    </header>
  );
}

export default Header;
