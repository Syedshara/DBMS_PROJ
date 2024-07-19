import React, { useState } from 'react';
import logo from './image/sunsea.png';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
  const Navigate = useNavigate();
   const [user,setUser] = useState()
   const [pass,setPass] = useState()

  const notify = (msg) => toast.warn(msg, {
    position: "top-center",
    autoClose: 1200,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  
  const notify2 =(msg) =>toast.success(msg, {
    position: "top-right",
    autoClose: 1300,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });


    const move = async () => {
        try {
          if (user !== '' && pass !== '') {
            const response = await axios.get(`http://localhost:3001/api/login/${user}`);
            console.log(user);
            if(response.data.length==0){
                notify('No Such User')
            }
            else if (response.data.length > 0 && response.data[0].password === pass) {
              notify2("Login Success");

              Cookies.set('user', user, { expires: 7 }); // Set expiration to 7 days
              Cookies.set('pass', pass, { expires: 7 });
              if(Cookies.get('setLogin')!= undefined){
                  Cookies.remove('setLogin')
              }
              Cookies.set('setLogin', 'login', { expires: 7 });
              setTimeout(() => {
                Navigate('/');
                
              }, 1000);
        
            } else {
              notify('Wrong Password');
              Cookies.set('setLogin', 'notlogin');
            }
          } else {
            notify('Field is Empty');
          }
        } catch (error) {
          notify('No Such User');
          console.error('Error fetching user data', error);
        }
      };
      

  return (
    <div className="Login">
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
        <img src={logo} alt="?" className="logo" width={250} />
      </div>
      <div>
        <h2>Login In</h2>
      </div>
      <div className="l">
        <input type="text" id="user" placeholder="Enter User" 
        value={user}
        onChange={(e)=>setUser(e.target.value)}
        />
      </div>
      <div className="l">
        <input type="password" id="password" placeholder="Enter Password"
        value={pass}
        onChange={(e)=>setPass(e.target.value)} />
      </div>
      <div className="f">
        <button onClick={move}>Login</button>
      </div>
    </div>
  );
};

export default Login;

        