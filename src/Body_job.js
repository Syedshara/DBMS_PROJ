import React from 'react'
import { FiSearch } from "react-icons/fi";
import { FaCheck} from "react-icons/fa";
import { useState,useEffect } from 'react';
import { MdAddToPhotos } from "react-icons/md";
import axios from 'axios';
import { MdModeEditOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { FaFilter } from "react-icons/fa6";
import Nav from './Nav';

const Body = () => {
  const [expandedCells, setExpandedCells] = useState([]);

  const handleCellClick = (jobCode) => {
    setExpandedCells((prevExpandedCells) => {
      if (prevExpandedCells.includes(jobCode)) {
        return prevExpandedCells.filter((code) => code !== jobCode);
      } else {
        return [...prevExpandedCells, jobCode];
      }
    });
  };

  const filterNames = ['job_code', 'client_id', 'vendor_id', 'posting_title', 'target_date','date_opened','annual_ctc', 'state', 'city', 'country'];

  const [jobs, setJobs] = useState([]);
  const [hold,setHold] = useState([]);
  const [isChecked,setIsChecked] =useState([false,false,false,false,false,false,false,false,false,false])
  console.log(!isChecked[0]);
  const [skip,setSkip]=useState(0);
  const [filter,setFilter] = useState([null,null,null,null,null,null,null,null,null,null]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/jobs');
        setJobs(response.data);
        setHold(response.data);

      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (index) => {
    
      const updatedChecked = isChecked.map((value, i) => (i === index ? !value : value));
      console.log('after'+updatedChecked[index]);
      setIsChecked(updatedChecked)
    
  };
  const handleFilter = (index, e) => {
    if (filter.every((value) => value === '' || value === null)) {
      setFilter([null, null, null, null, null, null, null, null, null, null]);
    }
  
    if (e.target.type === 'date') {
      const selectedDate = new Date(e.target.value);
      const month = selectedDate.getMonth() + 1;
      const year = selectedDate.getFullYear();
      const formattedDate = `${year}-${month.toString().padStart(2, '0')}`;
      filter[index] = formattedDate;
    } else {
      filter[index] = e.target.value;
    }
  
    setFilter(filter);
  };
  
  const filtering = ()=>{
    console.log(filter[5])
    
    if(filter.every((value)=> value==null||value=='')){
      console.log(hold);
        setJobs(hold);
    }
    else{
      const filteredJobs = jobs.filter((job) => {
        
        for (let i = 0; i < filter.length; i++) {
        
          if(i==6 && String(filter[6]) == parseInt(job['annual_ctc'],10)){
              continue;
            
          }
          else if (i!=6 && filter[i] !== null &&  String(job[filterNames[i]]).toLowerCase().includes(filter[i].toLowerCase())) {
            continue;
          } else if (filter[i] !== null) {
            return false;
          }
        }
        return true;
      });
      setJobs(filteredJobs)
    }
      
    setFilter(['', '', '', '', '', '', '', '', '', ''])
    
    setTimeout(() => setFilter([null,null,null,null,null,null,null,null,null,null]), 100);

    
  }
  const [filterfield,setFilterfilter] = useState('');
  const [fields,setFields] =useState({'Job Code':true,'Client Name':true,'Vendor Name':true,'Posting Title':true,'Target Date':true,'Date Opeed':true,'Annual CTC':true,'State':true,'City':true,'Country':true,})
  useEffect(()=>{
    if(filterfield==''){
        setFields({'Job Code':true,'Client Name':true,'Vendor Name':true,'Posting Title':true,'Target Date':true,'Date Opeed':true,'Annual CTC':true,'State':true,'City':true,'Country':true,})
      }
  },[filterfield])
  
  const matchvalue =(e)=>{
    setFilterfilter(e.target.value);
    for(var field in fields){
        if(field.toLowerCase().includes(filterfield.toLowerCase())){
                fields[field]=true
        }
        else{
            fields[field]=false

        }
    }
    setFields(fields)
    

  }
  return (
    <div className='Body'>
         
         <div className='Search'>
         <div>
            <div>
            <input type="text" className='sfield' placeholder="Filter..." value={filterfield}
            onChange={(e)=>matchvalue(e)} />
            <FiSearch className='sicon'  />
            </div>
            <div> <FaFilter className='ficon' onClick={filtering}/></div>
           
            </div>
           {fields['Job Code']&&  <div className='full'>
           <div className='filters'>
             <input
               type="checkbox"
               name="f1"
               id="f1"
               className="custom-checkbox"
               checked={isChecked[0]}
               onChange={() => handleCheckboxChange(0)}
             />
             {isChecked[0] && <FaCheck onClick={() => handleCheckboxChange(0)} className='check' />}
             <label htmlFor="f1">Job Code</label><br />
           </div>
           <input type="text" className={`drop ${isChecked[0] ? 'dropping' : ''}`
         }
         value={filter[0]}
         onChange={(e) => handleFilter(0, e)}
         autoFocus placeholder="Type Here" />
             </div>}
            
           {fields['Client Name']&& <div className='full'>
             <div className='filters'>
               <input
                 type="checkbox"
                 name="f2"
                 id="f2"
                 className="custom-checkbox"
                 checked={isChecked[1]}
                 onChange={() => handleCheckboxChange(1)}
               />
               {isChecked[1] && <FaCheck onClick={() => handleCheckboxChange(1)} className='check' />}
               <label htmlFor="f2">Client Name</label><br />
             </div>
             <input type="text" className={`drop ${isChecked[1] ? 'dropping' : ''}`} 
             value={filter[1]}
             onChange={(e) => handleFilter(1, e)}
             autoFocus placeholder="Type Here" />
             </div>}

          {fields['Vendor Name']&& <div className='full'>
               <div className='filters'>
                 <input
                   type="checkbox"
                   name="f3"
                   id="f3"
                   className="custom-checkbox"
                   checked={isChecked[2]}
                   onChange={() => handleCheckboxChange(2)}
                 />
                 {isChecked[2] && <FaCheck onClick={() => handleCheckboxChange(2)} className='check' />}
                 <label htmlFor="f3">Vendor Name</label><br />
               </div>
               <input type="text" className={`drop ${isChecked[2] ? 'dropping' : ''}`} 
               value={filter[2]}
               onChange={(e) => handleFilter(2, e)}
               autoFocus placeholder="Type Here" />
             </div>}

            
          {fields['Posting Title']&& <div className='full'>
               <div className='filters'>
                 <input
                   type="checkbox"
                   name="f4"
                   id="f4"
                   className="custom-checkbox"
                   checked={isChecked[3]}
                   onChange={() => handleCheckboxChange(3)}
                 />
                 {isChecked[3] && <FaCheck onClick={() => handleCheckboxChange(3)} className='check' />}
                 <label htmlFor="f4">Posting Title</label><br />
               </div>
               <input type="text" className={`drop ${isChecked[3] ? 'dropping' : ''}`} 
               value={filter[3]}
               onChange={(e) => handleFilter(3, e)}
               autoFocus placeholder="Type Here" />
             </div>}
 
          {fields['Target Date']&& <div className='full'>
               <div className='filters'>
                 <input
                   type="checkbox"
                   name="f5"
                   id="f5"
                   className="custom-checkbox"
                   checked={isChecked[4]}
                   onChange={() => handleCheckboxChange(4)}
                 />
                 {isChecked[4] && <FaCheck onClick={() => handleCheckboxChange(4)} className='check' />}
                 <label htmlFor="f5">Target Date</label><br />
               </div>
               <input type="date" className={`drop ${isChecked[4] ? 'dropping' : ''}`} 
               value={filter[4]}
               onChange={(e) => handleFilter(4, e)}
               autoFocus placeholder="Type Here" />
             </div>}
 
          {fields['Date Opeed']&&   <div className='full'>
               <div className='filters'>
                 <input
                   type="checkbox"
                   name="f6"
                   id="f6"
                   className="custom-checkbox"
                   checked={isChecked[5]}
                   onChange={() => handleCheckboxChange(5)}
                 />
                 {isChecked[5] && <FaCheck onClick={() => handleCheckboxChange(5)} className='check' />}
                 <label htmlFor="f6">Date Opened</label><br />
               </div>
               <input type="date" className={`drop ${isChecked[5] ? 'dropping' : ''}`} 
               value={filter[5]}
               onChange={(e) => handleFilter(5, e)}
               autoFocus placeholder="Type Here" />
             </div>}
 
          {fields['Annual CTC']&&  <div className='full'>
               <div className='filters'>
                 <input
                   type="checkbox"
                   name="f7"
                   id="f7"
                   className="custom-checkbox"
                   checked={isChecked[6]}
                   onChange={() => handleCheckboxChange(6)}
                 />
                 {isChecked[6] && <FaCheck onClick={() => handleCheckboxChange(6)} className='check' />}
                 <label htmlFor="f7">Annual CTC</label><br />
               </div>
               <input type="text" className={`drop ${isChecked[6] ? 'dropping' : ''}`} 
               value={filter[6]}
               onChange={(e) => handleFilter(6, e)}
               autoFocus placeholder="Type Here" />
             </div>}
 
          {fields['State']&&<div className='full'>
               <div className='filters'>
                 <input
                   type="checkbox"
                   name="f8"
                   id="f8"
                   className="custom-checkbox"
                   checked={isChecked[7]}
                   onChange={() => handleCheckboxChange(7)}
                 />
                 {isChecked[7] && <FaCheck onClick={() => handleCheckboxChange(7)} className='check' />}
                 <label htmlFor="f8">State</label><br />
               </div>
               <input type="text" className={`drop ${isChecked[7] ? 'dropping' : ''}`} 
               value={filter[7]}
               onChange={(e) => handleFilter(7, e)}
               autoFocus placeholder="Type Here" />
             </div>}
 
          {fields['City']&& <div className='full'>
               <div className='filters'>
                 <input
                   type="checkbox"
                   name="f9"
                   id="f9"
                   className="custom-checkbox"
                   checked={isChecked[8]}
                   onChange={() => handleCheckboxChange(8)}
                 />
                 {isChecked[8] && <FaCheck onClick={() => handleCheckboxChange(8)} className='check' />}
                 <label htmlFor="f9">City</label><br />
               </div>
               <input type="text" className={`drop ${isChecked[8] ? 'dropping' : ''}`}
               value={filter[8]}
               onChange={(e) => handleFilter(8, e)}
               autoFocus placeholder="Type Here" />
             </div>}
 
          {fields['Country']&& <div className='full'>
               <div className='filters'>
                 <input
                   type="checkbox"
                   name="f10"
                   id="f10"
                   className="custom-checkbox"
                   checked={isChecked[9]}
                   onChange={() => handleCheckboxChange(9)}
                 />
                 {isChecked[9] && <FaCheck onClick={() => handleCheckboxChange(9)} className='check' />}
                 <label htmlFor="f10">Country</label><br />
               </div>
               <input type="text" className={`drop ${isChecked[9] ? 'dropping' : ''}`} 
               value={filter[9]}
               onChange={(e) => handleFilter(9, e)}autoFocus placeholder="Type Here" />
             </div>}
           
         </div>
         <div className='List'>
           <div className='Import'><button> <Link className='link' to='job-form'>Add</Link></button></div>
           <div className='title'>

           <table>
         <thead>
           <tr>
             <th className='edit'>Edit</th>
             <th>Job Code</th>
             <th>Posting Title</th>
             <th>Client ID</th>
             <th>Vendor ID</th>
             <th>Assignment Manager</th>
             <th>Target Date</th>
             <th>Annual CTC[LPA]</th>
             <th>Date Opened</th>
             <th>Postal Code</th>
             <th>State</th>
             <th>City</th>
             <th>Country</th>
             <th>Job Description</th>
             <th>Requirements</th>
             <th>Benifits</th>
           </tr>
         </thead>
         <tbody>
      {jobs.slice(skip, skip + 8).map((job) => (
        <tr key={job.job_code}>
          <td>
            <Link to={`job-form/${job.job_code}`} style={{ color: 'black' }}>
              <MdModeEditOutline />
            </Link>
          </td>
          <td className={`truncate ${expandedCells.includes(job.job_code) ? 'expanded' : ''}`} onClick={() => handleCellClick(job.job_code)}>
            {job.job_code}
          </td>
          <td className={`truncate ${expandedCells.includes(job.job_code) ? 'expanded' : ''}`} onClick={() => handleCellClick(job.job_code)}>
            {job.posting_title}
          </td>
          <td className={`truncate ${expandedCells.includes(job.job_code) ? 'expanded' : ''}`} onClick={() => handleCellClick(job.job_code)}>
            {job.client_id}
          </td>
          <td className={`truncate ${expandedCells.includes(job.job_code) ? 'expanded' : ''}`} onClick={() => handleCellClick(job.job_code)}>
            {job.vendor_id}
          </td>
          <td className={`truncate ${expandedCells.includes(job.job_code) ? 'expanded' : ''}`} onClick={() => handleCellClick(job.job_code)}>
            {job.assigned_manager}
          </td>
          <td className={`truncate ${expandedCells.includes(job.job_code) ? 'expanded' : ''}`} onClick={() => handleCellClick(job.job_code)}>
            {new Date(job.target_date).toLocaleDateString()}
          </td>
          <td className={`truncate ${expandedCells.includes(job.job_code) ? 'expanded' : ''}`} onClick={() => handleCellClick(job.job_code)}>
            {job.annual_ctc}
          </td>
          <td className={`truncate ${expandedCells.includes(job.job_code) ? 'expanded' : ''}`} onClick={() => handleCellClick(job.job_code)}>
            {new Date(job.date_opened).toLocaleDateString()}
          </td>
          <td className={`truncate ${expandedCells.includes(job.job_code) ? 'expanded' : ''}`} onClick={() => handleCellClick(job.job_code)}>
            {job.postal_code}
          </td>
          <td className={`truncate ${expandedCells.includes(job.job_code) ? 'expanded' : ''}`} onClick={() => handleCellClick(job.job_code)}>
            {job.state}
          </td>
          <td className={`truncate ${expandedCells.includes(job.job_code) ? 'expanded' : ''}`} onClick={() => handleCellClick(job.job_code)}>
            {job.city}
          </td>
          <td className={`truncate ${expandedCells.includes(job.job_code) ? 'expanded' : ''}`} onClick={() => handleCellClick(job.job_code)}>
            {job.country}
          </td>
          <td className={`truncate ${expandedCells.includes(job.job_code) ? 'expanded' : ''}`} onClick={() => handleCellClick(job.job_code)}>
            {job.job_description}
          </td>
          <td className={`truncate ${expandedCells.includes(job.job_code) ? 'expanded' : ''}`} onClick={() => handleCellClick(job.job_code)}>
            {job.requirements}
          </td>
          <td className={`truncate ${expandedCells.includes(job.job_code) ? 'expanded' : ''}`} onClick={() => handleCellClick(job.job_code)}>
            {job.benefits}
          </td>
        </tr>
      ))}
    </tbody> 
 
       </table>
           </div>
           <div className='next'>
           
           <div onClick={()=> skip-8>=0?setSkip(skip-8):skip} ><button ><GrPrevious />
 </button>
          </div>
          <div onClick={()=> skip+8<jobs.length?setSkip(skip+8):skip} ><button ><GrNext /></button>
 
           </div>
          </div>    
         </div>
     </div>
  
  )
}

export default Body