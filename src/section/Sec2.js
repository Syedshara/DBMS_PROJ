import React from 'react'
import { useEffect } from 'react';

const S2  = ({selectedDate,setSelectedDate,selectedDate1,setSelectedDate1,v3,setV3,jobOpening,setJobOpening}) => {


  console.log(jobOpening)
  return (
    <div className='S2'>
        <div className="group-header">Dates and Salary</div>
        <div className="flex-container">
          <div className="light-box">
            <label htmlFor="targetDate" className="required">Target Date:    <span class="mandatory-star">*</span></label>
            <input type="date" id="targetDate" 
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(event)=>{const newDate = new Date(event.target.value);
              setSelectedDate(newDate);}}
    
            required />
            <label htmlFor="annual ctc" className="required">Annual CTC:</label>
            <input type="text" id="salary"
            pattern="[0-9]+"  
             value = {v3} 
             onChange={(e)=>setV3(e.target.value)}required />
          </div>

          <div className="light-box">
            <label htmlFor="dateOpened" className="required">Date Opened:      <span class="mandatory-star">*</span></label>
            <input type="date" id="dateOpened" 
            value={selectedDate1.toISOString().split('T')[0]}
            onChange={(event)=>{const newDate = new Date(event.target.value);
              setSelectedDate1(newDate);}}
              required />
          </div>
        </div>
    </div>
  )
}

export default S2 ;