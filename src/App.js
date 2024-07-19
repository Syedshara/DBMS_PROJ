
import './App.css';
import { Route, Routes,Navigate, useSearchParams, useNavigate} from 'react-router-dom';
import Home from './Home';
import React, { useEffect, useState } from 'react'
import Header from './Header.js'
import Candidate_form from './form/Candidate_form.js';
import Job_form from './form/Job_form.js';
import Vendor from './form/Vendor.js'
import Nav from './Nav';
import Body_job from './Body_job';
import Body_vendor from './Body_vendor';
import Body_candidate from './Body_candidate';
import Login from './Login';
import Edit from './Edit'; 
import Cookies from 'js-cookie';


function App() {

 
  const Navigate = useNavigate();
  if(Cookies.get('setLogin')==undefined){
    Cookies.set('setLogin','notlogin')
  }
  
  
  return (
    <div className="App">
       {Cookies.get('setLogin') === 'login' && <Nav />}
      <Routes>
        <Route path="login" element={<Login
         />} />

{Cookies.get('setLogin') === 'login' ? (
          <>

            <Route index element={<Home />} />
            <Route path="vendor" element={<Body_vendor />} />
            <Route path="candidate" element={<Body_candidate />} />
            <Route path="vendor/vendor-form" element={<Vendor />} />
            <Route path="vendor/vendor-form/:id" element={<Vendor />} />
            <Route path="job" element={<Body_job />} />
            <Route path="job/job-form" element={<Job_form />} />
            <Route path="job/job-form/:id" element={<Job_form />} />
            <Route path="candidate/candidate-form" element={<Candidate_form />} />
            <Route path="candidate/candidate-form/:id" element={<Candidate_form />} />
            <Route path="edit" element={<Edit/>}/>
          </>
        ) : (
          Navigate('/login')

        )}
      </Routes>
    </div>

  );
}

export default App;
