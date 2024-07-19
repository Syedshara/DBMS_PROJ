import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from './image/logo.png'

const Header = () => {
  const [activePage, setActivePage] = useState('job-form`');

  const handlePageClick = (page) => {
    setActivePage(page);
  };
  return (
        <div className='Header'>
                
                <img src={logo} alt='?' className='logo' width={200} />

        <div className='Link'>
        <nav>

        <Link className={`Nav ${activePage === 'job-form' ? 'active' : ''}`} to='job-form' onClick={() => handlePageClick('job-form')}>
          HOME
        </Link>
        <Link className={`Nav ${activePage === 'candidate-form' ? 'active' : ''}`} to='candidate-form' onClick={() => handlePageClick('candidate-form')}>
          HOME
        </Link>
        <Link className={`Nav ${activePage === 'vendor' ? 'active' : ''}`} to='vendor' onClick={() => handlePageClick('vendor')}>
          HOME
        </Link>
              </nav>

            </div>
            </div>
  )
}
export default Header;

