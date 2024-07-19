import React from 'react'
import { FiSearch } from "react-icons/fi";
import { FaCheck} from "react-icons/fa";
import { useState,useEffect } from 'react';
import { MdAddToPhotos } from "react-icons/md";
import axios from 'axios';
import { MdModeEditOutline } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { FaFilter } from "react-icons/fa6";
import Nav from './Nav';

const Body = () => {
  const [expandedCells, setExpandedCells] = useState([]);

  const handleCellClick = (resumeId) => {
    setExpandedCells((prevExpandedCells) => {
      if (prevExpandedCells.includes(resumeId)) {
        return prevExpandedCells.filter((id) => id !== resumeId);
      } else {
        return [...prevExpandedCells, resumeId];
      }
    });
  };
  const filterNames = ['resume_id','first_name', 'last_name', 'email', 'secondary_email','total_exp','current_job_title', 'current_employer', 'current_salary','expected_salary','additional_information','addahar_card_no','pan_card_no','source'];

  const [candidate, setCandidate] = useState([]);
  const [hold,setHold] = useState([]);
  const [isChecked,setIsChecked] =useState([false,false,false,false,false,false,false,false,false,false,false,false,false,false,false])
  console.log(!isChecked[0]);
  const [skip,setSkip]=useState(0);
  const [filter,setFilter] = useState([null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/candidate');
        setCandidate(response.data);
        setHold(response.data);

      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (index) => {
    
      const updatedChecked = isChecked.map((value, i) => (i === index ? !value : value));
      console.log('after'+updatedChecked[index]+index);
      setIsChecked(updatedChecked)
    
  };
  const handleFilter = (index, e) => {
    if (filter.every((value) => value === '' || value === null)) {
      setFilter([null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]);
    }
  
    filter[index] = e.target.value;
    setFilter(filter);
  };
  
  const filtering = ()=>{
    
    if(filter.every((value)=> value==null||value=='')){
      console.log(hold);
        setCandidate(hold);
    }
    else{
      const filteredJobs = candidate.filter((job) => {
        for (let i = 0; i < filter.length; i++) {
          if (filter[i] !== null &&  String(job[filterNames[i]]).toLowerCase().includes(filter[i].toLowerCase())) {
            continue;
          } else if (filter[i] !== null) {
            return false;
          }
        }
        return true;
      });
      setCandidate(filteredJobs)
    }
      
    setFilter(['', '', '', '', '', '', '', '', '','','','','',''])
    
    setTimeout(() => setFilter([null,null,null,null,null,null,null,null,null,null,null,null,null,null]), 100);

    
  }
  const [filterfield,setFilterfilter] = useState('');
  const [fields,setFields] =useState({'Resume ID':true,'First Name':true,'Last Name':true,'Email':true,'Secondary Email':true,'Total Experience':true,'Current Job Title':true,'Current Employer':true,'Current Salary':true,'Expected Salary':true,'Additional Information':true,'Aadhar Card Number':true,'Pan Card Number':true,'Source':true})
  useEffect(()=>{
    if(filterfield==''){
        setFields({'Resume ID':true,'First Name':true,'Last Name':true,'Email':true,'Secondary Email':true,'Total Experience':true,'Current Job Title':true,'Current Employer':true,'Current Salary':true,'Expected Salary':true,'Additional Information':true,'Aadhar Card Number':true,'Pan Card Number':true,'Source':true})
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
            
            {fields['Resume ID'] && <div className='full'>
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
            <label htmlFor="f1">Resume ID</label><br />
          </div>
          <input type="text" className={`drop ${isChecked[0] ? 'dropping' : ''}`
        }
        value={filter[0]}
        onChange={(e) => handleFilter(0, e)}
        autoFocus placeholder="Type Here" />
            </div>}

            {fields['First Name'] && <div className='full'>
          <div className='filters'>
            <input
              type="checkbox"
              name="f1"
              id="f1"
              className="custom-checkbox"
              checked={isChecked[1]}
              onChange={() => handleCheckboxChange(1)}
            />
            {isChecked[1] && <FaCheck onClick={() => handleCheckboxChange(1)} className='check' />}
            <label htmlFor="f1">First Name</label><br />
          </div>
          <input type="text" className={`drop ${isChecked[1] ? 'dropping' : ''}`
        }
        value={filter[1]}
        onChange={(e) => handleFilter(1, e)}
        autoFocus placeholder="Type Here" />
            </div>}


           {fields['Last Name'] && <div className='full'>
            <div className='filters'>
              <input
                type="checkbox"
                name="f2"
                id="f2"
                className="custom-checkbox"
                checked={isChecked[2]}
                onChange={() => handleCheckboxChange(2)}
              />
              {isChecked[2] && <FaCheck onClick={() => handleCheckboxChange(1)} className='check' />}
              <label htmlFor="f2">Last Name</label><br />
            </div>
            <input type="text" className={`drop ${isChecked[2] ? 'dropping' : ''}`} 
            value={filter[2]}
            onChange={(e) => handleFilter(2, e)}
            autoFocus placeholder="Type Here" />
            </div>

           }

          {fields['Email']&&  <div className='full'>
              <div className='filters'>
                <input
                  type="checkbox"
                  name="f3"
                  id="f3"
                  className="custom-checkbox"
                  checked={isChecked[3]}
                  onChange={() => handleCheckboxChange(3)}
                />
                {isChecked[3] && <FaCheck onClick={() => handleCheckboxChange(3)} className='check' />}
                <label htmlFor="f3">Email</label><br />
              </div>
              <input type="text" className={`drop ${isChecked[3] ? 'dropping' : ''}`} 
              value={filter[3]}
              onChange={(e) => handleFilter(3, e)}
              autoFocus placeholder="Type Here" />
            </div>}

          {fields['Secondary Email']&&<div className='full'>
              <div className='filters'>
                <input
                  type="checkbox"
                  name="f4"
                  id="f4"
                  className="custom-checkbox"
                  checked={isChecked[4]}
                  onChange={() => handleCheckboxChange(4)}
                />
                {isChecked[4] && <FaCheck onClick={() => handleCheckboxChange(4)} className='check' />}
                <label htmlFor="f4">Secondary Email</label><br />
              </div>
              <input type="text" className={`drop ${isChecked[4] ? 'dropping' : ''}`} 
              value={filter[4]}
              onChange={(e) => handleFilter(4, e)}
              autoFocus placeholder="Type Here" />
            </div>}

          {fields['Total Experience']&&  <div className='full'>
              <div className='filters'>
                <input
                  type="checkbox"
                  name="f5"
                  id="f5"
                  className="custom-checkbox"
                  checked={isChecked[5]}
                  onChange={() => handleCheckboxChange(5)}
                />
                {isChecked[5] && <FaCheck onClick={() => handleCheckboxChange(5)} className='check' />}
                <label htmlFor="f5">Total Experience</label><br />
              </div>
              <input type="text" className={`drop ${isChecked[5] ? 'dropping' : ''}`} 
              value={filter[5]}
              onChange={(e) => handleFilter(5, e)}
              autoFocus placeholder="Type Here" />
            </div>}

           {fields['Current Job Title']&& <div className='full'>
              <div className='filters'>
                <input
                  type="checkbox"
                  name="f6"
                  id="f6"
                  className="custom-checkbox"
                  checked={isChecked[6]}
                  onChange={() => handleCheckboxChange(6)}
                />
                {isChecked[6] && <FaCheck onClick={() => handleCheckboxChange(6)} className='check' />}
                <label htmlFor="f6">Current Job Title</label><br />
              </div>
              <input type="text" className={`drop ${isChecked[6] ? 'dropping' : ''}`} 
              value={filter[6]}
              onChange={(e) => handleFilter(6, e)}
              autoFocus placeholder="Type Here" />
            </div>}

            {fields['Current Employer'] && <div className='full'>
              <div className='filters'>
                <input
                  type="checkbox"
                  name="f7"
                  id="f7"
                  className="custom-checkbox"
                  checked={isChecked[7]}
                  onChange={() => handleCheckboxChange(7)}
                />
                {isChecked[7] && <FaCheck onClick={() => handleCheckboxChange(7)} className='check' />}
                <label htmlFor="f7">Current Employer</label><br />
              </div>
              <input type="text" className={`drop ${isChecked[7] ? 'dropping' : ''}`} 
              value={filter[7]}
              onChange={(e) => handleFilter(7, e)}
              autoFocus placeholder="Type Here" />
            </div>}


           {fields['Current Salary']&& <div className='full'>
              <div className='filters'>
                <input
                  type="checkbox"
                  name="f8"
                  id="f8"
                  className="custom-checkbox"
                  checked={isChecked[8]}
                  onChange={() => handleCheckboxChange(8)}
                />
                {isChecked[8] && <FaCheck onClick={() => handleCheckboxChange(8)} className='check' />}
                <label htmlFor="f8">Current Salary</label><br />
              </div>
              <input type="text" className={`drop ${isChecked[8] ? 'dropping' : ''}`} 
              value={filter[8]}
              onChange={(e) => handleFilter(8, e)}
              autoFocus placeholder="Type Here" />
            </div>}

            {fields['Expected Salary']&&<div className='full'>
              <div className='filters'>
                <input
                  type="checkbox"
                  name="f9"
                  id="f9"
                  className="custom-checkbox"
                  checked={isChecked[9]}
                  onChange={() => handleCheckboxChange(9)}
                />
                {isChecked[9] && <FaCheck onClick={() => handleCheckboxChange(9)} className='check' />}
                <label htmlFor="f9">Expected Salary</label><br />
              </div>
              <input type="text" className={`drop ${isChecked[9] ? 'dropping' : ''}`}
              value={filter[9]}
              onChange={(e) => handleFilter(9, e)}
              autoFocus placeholder="Type Here" />
            </div>}

            {fields['Additional Information']&&<div className='full'>
              <div className='filters'>
                <input
                  type="checkbox"
                  name="f9"
                  id="f10"
                  className="custom-checkbox"
                  checked={isChecked[10]}
                  onChange={() => handleCheckboxChange(10)}
                />
                {isChecked[10] && <FaCheck onClick={() => handleCheckboxChange(10)} className='check' />}
                <label htmlFor="f9">Additional Information</label><br />
              </div>
              <input type="text" className={`drop ${isChecked[10] ? 'dropping' : ''}`}
              value={filter[10]}
              onChange={(e) => handleFilter(10, e)}
              autoFocus placeholder="Type Here" />
            </div>}

            {fields['Aadhar Card Number']&&<div className='full'>
              <div className='filters'>
                <input
                  type="checkbox"
                  name="f9"
                  id="f11"
                  className="custom-checkbox"
                  checked={isChecked[11]}
                  onChange={() => handleCheckboxChange(11)}
                />
                {isChecked[11] && <FaCheck onClick={() => handleCheckboxChange(11)} className='check' />}
                <label htmlFor="f9">Aadhar Card Number</label><br />
              </div>
              <input type="text" className={`drop ${isChecked[11] ? 'dropping' : ''}`}
              value={filter[11]}
              onChange={(e) => handleFilter(11, e)}
              autoFocus placeholder="Type Here" />
            </div>}

            {fields['Pan Card Number']&&<div className='full'>
              <div className='filters'>
                <input
                  type="checkbox"
                  name="f9"
                  id="f12"
                  className="custom-checkbox"
                  checked={isChecked[12]}
                  onChange={() => handleCheckboxChange(12)}
                />
                {isChecked[12] && <FaCheck onClick={() => handleCheckboxChange(12)} className='check' />}
                <label htmlFor="f9">Pan Card Number</label><br />
              </div>
              <input type="text" className={`drop ${isChecked[12] ? 'dropping' : ''}`}
              value={filter[12]}
              onChange={(e) => handleFilter(12, e)}
              autoFocus placeholder="Type Here" />
            </div>}

            {fields['Source']&&<div className='full'>
              <div className='filters'>
                <input
                  type="checkbox"
                  name="f9"
                  id="f13"
                  className="custom-checkbox"
                  checked={isChecked[13]}
                  onChange={() => handleCheckboxChange(13)}
                />
                {isChecked[13] && <FaCheck onClick={() => handleCheckboxChange(13)} className='check' />}
                <label htmlFor="f9">Source</label><br />
              </div>
              <input type="text" className={`drop ${isChecked[13] ? 'dropping' : ''}`}
              value={filter[13]}
              onChange={(e) => handleFilter(13, e)}
              autoFocus placeholder="Type Here" />
            </div>}

          
        </div>
        <div className='List'>
      <div className='Import'>
        <button>
          <Link className='link' to='candidate-form'>Add</Link>
        </button>
      </div>
      <div className='title'>

        <table>
          <thead>
            <tr>
              <th>Edit</th>
              <th>Resume ID</th>
              <th>Prefix</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Total Experience</th>
              <th>Current Job Title</th>
              <th>Current Employer</th>
              <th>Current Salary</th>
              <th>Expected Salary</th>
              <th>Additional Information</th>
                <th>Aadhar Card No</th>
                <th>PAN Card No</th>
                <th>Source</th>
                <th>Handled By</th>
            </tr>
          </thead>
          <tbody>
      {candidate.slice(skip, skip + 8).map((candidate1) => (
        <tr key={candidate1.resume_id}>
          <td>
            <Link to={`candidate-form/${candidate1.resume_id}`} style={{ color: 'black' }}>
              <MdModeEditOutline />
            </Link>
          </td>
          <td className={`truncate ${expandedCells.includes(candidate1.resume_id) ? 'expanded' : ''}`} onClick={() => handleCellClick(candidate1.resume_id)}>
            {candidate1.resume_id}
          </td>
          <td className={`truncate ${expandedCells.includes(candidate1.resume_id) ? 'expanded' : ''}`} onClick={() => handleCellClick(candidate1.resume_id)}>
            {candidate1.prefix}
          </td>
          <td className={`truncate ${expandedCells.includes(candidate1.resume_id) ? 'expanded' : ''}`} onClick={() => handleCellClick(candidate1.resume_id)}>
            {candidate1.first_name}
          </td>
          <td className={`truncate ${expandedCells.includes(candidate1.resume_id) ? 'expanded' : ''}`} onClick={() => handleCellClick(candidate1.resume_id)}>
            {candidate1.last_name}
          </td>
          <td className={`truncate ${expandedCells.includes(candidate1.resume_id) ? 'expanded' : ''}`} onClick={() => handleCellClick(candidate1.resume_id)}>
            {candidate1.email}
          </td>
          <td className={`truncate ${expandedCells.includes(candidate1.resume_id) ? 'expanded' : ''}`} onClick={() => handleCellClick(candidate1.resume_id)}>
            {candidate1.total_exp}
          </td>
          <td className={`truncate ${expandedCells.includes(candidate1.resume_id) ? 'expanded' : ''}`} onClick={() => handleCellClick(candidate1.resume_id)}>
            {candidate1.current_job_title}
          </td>
          <td className={`truncate ${expandedCells.includes(candidate1.resume_id) ? 'expanded' : ''}`} onClick={() => handleCellClick(candidate1.resume_id)}>
            {candidate1.current_employer}
          </td>
          <td className={`truncate ${expandedCells.includes(candidate1.resume_id) ? 'expanded' : ''}`} onClick={() => handleCellClick(candidate1.resume_id)}>
            {candidate1.current_salary}
          </td>
          <td className={`truncate ${expandedCells.includes(candidate1.resume_id) ? 'expanded' : ''}`} onClick={() => handleCellClick(candidate1.resume_id)}>
            {candidate1.expected_salary}
          </td>
          <td className={`truncate ${expandedCells.includes(candidate1.resume_id) ? 'expanded' : ''}`} onClick={() => handleCellClick(candidate1.resume_id)}>
            {candidate1.additional_information}
          </td>
          <td className={`truncate ${expandedCells.includes(candidate1.resume_id) ? 'expanded' : ''}`} onClick={() => handleCellClick(candidate1.resume_id)}>
            {candidate1.addahar_card_no}
          </td>
          <td className={`truncate ${expandedCells.includes(candidate1.resume_id) ? 'expanded' : ''}`} onClick={() => handleCellClick(candidate1.resume_id)}>
            {candidate1.pan_card_no}
          </td>
          <td className={`truncate ${expandedCells.includes(candidate1.resume_id) ? 'expanded' : ''}`} onClick={() => handleCellClick(candidate1.resume_id)}>
            {candidate1.source}
          </td>
          <td className={`truncate ${expandedCells.includes(candidate1.resume_id) ? 'expanded' : ''}`} onClick={() => handleCellClick(candidate1.resume_id)}>
            {candidate1.handled_by}
          </td>
        </tr>
      ))}
    </tbody>
        </table>
      </div>
      <div className='next'>
        <div onClick={() => setSkip(skip - 8 >= 0 ? skip - 8 : skip)}>
          <button><GrPrevious /></button>
        </div>
        <div onClick={() => setSkip(skip + 8 < candidate.length ? skip + 8 : skip)}>
          <button><GrNext /></button>
        </div>
      </div>
    </div>
    </div>

  )
}

export default Body