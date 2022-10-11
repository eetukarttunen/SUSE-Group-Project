import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navigation() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <div>
        <nav className={click ? 'navbar' : 'navbar-open'}>
          
            <Link to='/' className={click ? 'site-name' : 'site-name-open'} onClick={closeMobileMenu}>
              Ahti AI
            </Link>
            <div className='menu-icon' onClick={handleClick}>
             
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                  HOME
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/camera' className='nav-links' onClick={closeMobileMenu}>
                    CAMERA
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/map' className='nav-links' onClick={closeMobileMenu}>
                    MAP
                </Link>
              </li>
            </ul>
         
        </nav>
      </div>
    </>
  );
}

export default Navigation;
