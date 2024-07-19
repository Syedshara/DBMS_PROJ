import React from 'react'

const S3  = ({v4,v5,v6,v7,setV4,setV5,setV6,setV7}) => {
  return (
    <div className='S3'>
        <div className="group-header">Location Details</div>
    <div className="flex-container">
      <div className="light-box">
        <label htmlFor="postalCode" className="required">
          Postal Code:
        </label>
        <input type="tel" id="postalCode" 
        value = {v4} 
        onChange={(e)=>setV4(e.target.value)}
        required />
        <label htmlFor="city" className="required">
          City:
        </label>
        <input type="text" id="city" 
        value = {v5} 
        onChange={(e)=>setV5(e.target.value)}required />
      </div>

      <div className="light-box">
        <label htmlFor="state" className="required">
          State:
        </label>
        <input type="text" id="state"
        value = {v6} 
        onChange={(e)=>setV6(e.target.value)} required />
        <label htmlFor="country" className="required">
          Country:
        </label>
        <input type="text" id="country" 
        value = {v7} 
        onChange={(e)=>setV7(e.target.value)}required />
      </div>
    </div>
    </div>
  )
}

export default S3 ;