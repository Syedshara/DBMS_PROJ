import React, { useState } from 'react'
import edit from './image/edit.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const Edit = () => {
  const [oldPass,setOldPass] = useState('')
  const [newPass,setNewPass] = useState('')
  const pass = Cookies.get('pass')
  const user = Cookies.get('user')
  const Editform = async () => {
    try {
      // Check if the old password matches the current password
      if (oldPass !== pass) {
        notify('Wrong Password');
        return;
      }
      if(oldPass==newPass){
        notify('password cannot be equal')
        return
      }
      
      if (newPass !== '') {
        console.log(newPass)
        const response = await axios.put(`http://localhost:3001/api/login/${user}`, {
          newPass,
        });
  
        if (response.status === 200) {
          notify2('Edit Successfully');
          Cookies.remove('pass');
          Cookies.set('pass', newPass);
          setNewPass('')
          setOldPass('')
        } else {
          notify('Edit Failed. Please try again.');
        }
      } else {
        notify("New Password Field can't be Empty");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        notify('No Such User');
      } else {
        notify('Error during edit. Please try again.');
      }
      console.error('Error editing user data', error);
    }
  };
  
  const notify = (msg) => toast.warn(msg, {
    position: "top-center",
    autoClose: 1200,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
  
  const notify2 =(msg) =>toast.success(msg, {
    position: "top-right",
    autoClose: 1200,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
  return (
    <div className='Edit'>
      <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          /> 
      <div>
        <img src={edit} alt="?" />
      </div>
      <div>
      <div className="l">
        <input type="text" id="user" value={user} disabled
        
        />
      </div>
      <div className="l">
        <input type="password" id="password" placeholder='Enter The Old Password'
        value={oldPass}
        onChange={(e)=>setOldPass(e.target.value)}
      />
      </div>
      <div className="l">
        <input type="password" id="password" placeholder='Enter The New Password'
        value={newPass}
        onChange={(e)=>setNewPass(e.target.value)}
      />
      </div>
      <div className="f">
        <button onClick={Editform} >Edit</button>
      </div>
      </div>
    </div>
  )
}

export default Edit