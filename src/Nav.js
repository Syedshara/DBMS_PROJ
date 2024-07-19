import React from 'react'
import logo from './image/logo.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import Cookies from 'js-cookie';

const Nav = () => {
  const [activePage, setActivePage] = useState('/');
  const handlePageClick = (page) => {
    setActivePage(page);
  };

  const logout = () => {
    notify('Log Out');
  
      Cookies.remove('setLogin');
      Cookies.remove('user')
      Cookies.remove('pass')
    
  };
  
  const notify = (msg) => toast.warn(msg ,{
    position: "top-right",
    autoClose: 1300,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
  return (
    <div className='Header head'>
        <img src={logo} alt='?' className='logo' width={250} />
        <div className='Link'>
          <nav>
            <Link className={`Nav ${activePage === '/' ? 'active' : ''}`} to='/' onClick={() => handlePageClick('/')}>
            HOME
            </Link>

            <Link className={`Nav ${activePage === 'job' ? 'active' : ''}`} to='job' onClick={() => handlePageClick('job')}>
            JOB OPENING
            </Link>

            <Link className={`Nav ${activePage === 'vendor' ? 'active' : ''}`} to='vendor' onClick={() => handlePageClick('vendor')}>
            VENDOR
            </Link>
            <Link className={`Nav ${activePage === 'candidate' ? 'active' : ''}`} to='candidate' onClick={() => handlePageClick('candidate')}>
            CANDIDATES
            </Link>
            


            <Link className={`Nav ${activePage === 'edit' ? 'active' : ''}`} to='edit' onClick={() => handlePageClick('edit')}>
            EDIT PROFILE
            </Link>
            <Link className='Nav' onClick={logout}>
            LOG OUT
            </Link>
            </nav>
        </div>
    </div>
  )
}

export default Nav