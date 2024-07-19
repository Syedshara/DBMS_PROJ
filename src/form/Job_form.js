import React from 'react'
import { Route, useParams } from 'react-router-dom';
import Section from './Section.js'
import { useState,useEffect } from 'react';

import axios from 'axios';
import Header from '../Header.js';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const Job_form = () => {
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
    position: "top-center",
    autoClose: 1200,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOption1, setSelectedOption1] = useState('');
    const [optionData,setOptionData] = useState([])
    const [optionData1,setOptionData1] = useState([])
   useEffect(()=>{


    const fetch = async()=>{
      try {
        const response = await axios.get('http://localhost:3001/api/job_cv');
        setOptionData(response.data.client);
        setOptionData1(response.data.vendor);
        console.log(optionData)
  
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
    fetch()
    
   },[])




  const {id}= useParams();
  const [jobOpening, setJobOpening] = useState([]);
  const Navigate = useNavigate();
  const [check,setCheck]=useState(false)
  useEffect(() => {
    const fetchJobOpening = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/job_opening/${id}`);
        setJobOpening(response.data);
        console.log(response.data)
        if(response.data.vendor_id){
            setCheck(true)
            setSelectedOption1(response.data.vendor_id)
            console.log(check)
            
        }
        else{
          setCheck(false)
          setSelectedOption(response.data.client_id)
          console.log(check)
        }
       
  
      } catch (error) {
        console.error('Error fetching job opening', error);
      }
    };

    fetchJobOpening();
  }, []);
  console.log(jobOpening)
  function isInteger(value) {
    return Number.isInteger(value);
  }

  const [v1,setV1] = useState('');
  const [v2,setV2] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate1, setSelectedDate1] = useState(new Date());
  const [v3,setV3] = useState('');
  const [v4,setV4] = useState('');
  const [v5,setV5] = useState('');
  const [v6,setV6] = useState('');
  const [v7,setV7] = useState('');
  const [v8,setV8] = useState('');
  const [v9,setV9] = useState('');
  const [v10,setV10] = useState('');
  const [v11,setV11] = useState('');
 
  useEffect(() => {
    if (jobOpening && jobOpening.target_date) {
      setSelectedDate(new Date(jobOpening.target_date));
    } else {
      setSelectedDate(new Date());
    }
    if (jobOpening && jobOpening.date_opened) {
      setSelectedDate1(new Date(jobOpening.date_opened));
    } else {
      setSelectedDate1(new Date());
    }
    setV1(jobOpening.job_code || '');
    setV2(jobOpening.posting_title|| '');
    setV3(jobOpening.annual_ctc|| '');
    setV4(jobOpening.postal_code || '');
    setV5(jobOpening.city|| '');
    setV6(jobOpening.state || '');
    setV7(jobOpening.country|| '');
    setV8(jobOpening.job_description || '');
    setV9(jobOpening.requirements|| '');
    setV10(jobOpening.benefits || '');
    setV11(jobOpening.assigned_manager || '');
  
  
  }, [jobOpening]);

  const editform = async (e) => {
    e.preventDefault();
  
    let editedOption =  selectedOption!=null?selectedOption.split('-')[0]:'';
    let editedOption1 = selectedOption1!=null?selectedOption1.split('-')[0]:'';
  
    console.log(editedOption + editedOption1);
  
    try {
      await axios.put(`http://localhost:3001/api/job_opening/update/${id}`, {
        v2,
        selectedDate,
        v3,
        selectedDate1,
        v3,
        v4,
        v5,
        v6,
        v7,
        v8,
        v9,
        v10,
        v11,
        editedOption,
        editedOption1
      });
  
      console.log('Job opening updated successfully');
      Navigate('/job');
    } catch (error) {
      console.error('Error updating job opening', error);
    }
  };
  

  
  
  const addJobPosting = async (e) => {
    e.preventDefault(); 
    if (v1 === '' || v2 === '' || (selectedOption === '' && selectedOption1 === '' )|| selectedDate === '' || selectedDate1 === '') {
      notify("Fill the required field");
    }
    else if(selectedDate.getTime() === selectedDate1.getTime()){
         notify("Date can't be same");
    }
    else if(isInteger(v3)){
      notify("Salary should not contain decimal values")
    }
    else if(isInteger(v4)){
      notify("Salary should not contain decimal values")
    }
    else {
      try {
        
       
        const response = await axios.post('http://localhost:3001/api/insertData', {
          v1, v2, selectedOption,selectedOption1, v11, selectedDate, v3, selectedDate1, v4, v5, v6, v7, v8, v9, v10
        });
        console.log('Inserted data:', response.data);
        notify2('Form Submitted')
        resetForm('running');
        setTimeout(() => {
          Navigate('/job');
        }, 900);

      } catch (error) {
        notify("Somwthing Went Wrong");
        console.error('Error inserting data', error);
      }
    }
  };
  
  function resetForm(run){
    setV1('');
    setV2('');
    setV3('');
    setV4('');
    setV5('');
    setV6('');
    setV7('');
    setV8('');
    setV9('');
    setV10('');
    setV11('');
    setSelectedDate(new Date());
    setSelectedDate1(new Date());
    setSelectedOption('');
    setSelectedOption1('');
    if(run=='not'){
      notify2('All Data Has Been Cleared')
    }

  
}
  return (
    <div>
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

   <h2 className='main_title'> {!id&&<center>Add Job Posting</center>} {id&&<center>Edit Job Posting</center>} </h2>
    <div className='main'>
      <Section resetForm={resetForm} addJobPosting={addJobPosting}
      v1={v1} v2={v2} setV1={setV1} setV2={setV2} selectedDate={selectedDate} setSelectedDate={setSelectedDate} 
      selectedDate1={selectedDate1} setSelectedDate1={setSelectedDate1} 
      v4={v4} v5={v5} 
      v6={v6} v7={v7} 
      v8={v8} v10={v10} v11={v11}
      v9={v9} v3={v3} 
      setV3={setV3} setV4={setV4}
      setV5={setV5} setV6={setV6}
      setV7={setV7} setV8={setV8}
      setV9={setV9} setV10={setV10} setV11={setV11}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      selectedOption1={selectedOption1}
      setSelectedOption1={setSelectedOption1}
      jobOpening={jobOpening} setJobOpening={setJobOpening}
      id={id}
      editform={editform}
      check={check}
      setCheck={setCheck}
      optionData={optionData}
      optionData1={optionData1}
      />
      </div>
      </div>
  )
}

export default Job_form