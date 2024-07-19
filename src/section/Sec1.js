import React from 'react'
import { useState } from 'react';

const S1  = ({v1,v2,setV1,setV2,v11,setV11,selectedOption,setSelectedOption,selectedOption1,setSelectedOption1,jobOpening,setJobOpening,check,setCheck,optionData,
  optionData1}) => {
  console.log(optionData1)

  return (
    <div className='S1'>
        <div className="group-header">Job Details</div>
        <div className="flex-container">
          <div className="light-box">
            <label htmlFor="jobCode">Job Code:  <span className="mandatory-star">*</span></label>
            <input type="text" id="jobCode"  value = {v1} 
            onChange={(e)=>setV1(e.target.value)}
            required />
            <label htmlFor="postingTitle">Posting Title:   <span className="mandatory-star">*</span></label>
            <input type="text" id="postingTitle" value = {v2} 
            onChange={(e)=>setV2(e.target.value)}
            required />
          </div>

          <div className="light-box">
            <label className="required">Client or Vendor:    <span className="mandatory-star">*</span></label>
            <div className="radio-group">
             <div> <label
                >
                Client</label
              >
              <input
                  type="radio"
                  name="clientOrVendor"
                  value="client"
                  checked={!check}
                  onChange={()=> setCheck(false)}
                /></div>
             <div> <label
                >
                Vendor</label
              >
              <input type="radio" name="clientOrVendor" value="vendor" checked={check}  onChange={()=> setCheck(true)}/></div>
            </div>
            <div>
  {
    !check ? (
      <div className="dropdown-box" id="clientDropdown">
        <label htmlFor="clientName">Client Name:</label>
        <select id="clientName"
        disabled={selectedOption1}
        value={selectedOption}
        onChange={(event) => {
          setSelectedOption(event.target.value);
        }
        
      }
       required>
        <option value="" >select..</option>
        {
  optionData.map(data => (
    <option key={data.client_id} value={`${data.client_id}`}>
      {`${data.client_id}-${data.client_name}`}
    </option>
  ))
}
        </select>
      </div>
    ) : (
      <div className="dropdown-box" id="vendorDropdown">
        <label htmlFor="vendorType">Vendor Type:</label>
        <select id="vendorType"
         disabled={selectedOption}
        value={selectedOption1}
        onChange={(event) => {
          setSelectedOption1(event.target.value);
        }
      }
       required>
        <option value="">select..</option>
        {
  optionData1.map(data => (
    <option key={data.vendor_id} value={`${data.vendor_id}`}>
      {`${data.vendor_id}-${data.vendor_name}`}
    </option>
  ))
}

          
        </select>
      </div>
    )
  }
</div>

            
            <label htmlFor="assignedManager" className="required"
              >Assigned Manager:</label
            >
            <input type="text" id="assignedManager" 
              value = {v11} 
              onChange={(e)=>setV11(e.target.value)}
               required />
          </div>
        </div>
    </div>
  )
}

export default S1 ;