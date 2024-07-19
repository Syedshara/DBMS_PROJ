import React from 'react'

const S4  = ({resetForm,addJobPosting,v8,v9,v10,setV8,setV9,setV10,id,editform}) => {
  return (
    <div className='S4'>

      <div className="group-header">Job Description</div>
      <div className="light-box">
        <label htmlFor="jobDescription" className="required">
          Job Description:
        </label>
        <textarea id="jobDescription" rows="4" 
        value = {v8} 
        onChange={(e)=>setV8(e.target.value)}required></textarea>
        <label htmlFor="requirements" className="required">
          Requirements:
        </label>
        <textarea id="requirements" rows="4"
        value = {v9} 
        onChange={(e)=>setV9(e.target.value)} required></textarea>
        <label htmlFor="benefits" className="required">
          Benefits:
        </label>
        <textarea id="benefits" rows="4" 
        value = {v10} 
        onChange={(e)=>setV10(e.target.value)}required></textarea>
      </div>

    <div className='Footer'>
    <button className="reset-button" onClick={()=>resetForm('not')}>
        Reset
      </button>
      {id&&<button className="submit-button" onClick={(e)=>editform(e)}>
          Edit Form
      </button>}
      {!id&&
      <button className="submit-button" onClick={(e)=>addJobPosting(e)}>
        Add Job Posting
      </button>}
    </div>


    </div>
  )
}

export default S4 ;