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
  const handleCellClick = (vendorId) => {
    setExpandedCells((prevExpandedCells) => {
      if (prevExpandedCells.includes(vendorId)) {
        return prevExpandedCells.filter((id) => id !== vendorId);
      } else {
        return [...prevExpandedCells, vendorId];
      }
    });
  };
  
  const filterNames = ['vendor_id', 'vendor_name', 'email', 'phone', 'vendor_owner','terms_of_service','postal_code', 'website', 'main_address'];

  const [vendors, setVendors] = useState([]);
  const [hold,setHold] = useState([]);
  const [isChecked,setIsChecked] =useState([false,false,false,false,false,false,false,false,false])
  console.log(!isChecked[0]);
  const [skip,setSkip]=useState(0);
  const [filter,setFilter] = useState([null,null,null,null,null,null,null,null,null]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/vendor');
        setVendors(response.data);
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
      setFilter([null, null, null, null, null, null, null, null, null]);
    }
  
    filter[index] = e.target.value;
    setFilter(filter);
  };
  
  const filtering = ()=>{
    
    if(filter.every((value)=> value==null||value=='')){
      console.log(hold);
        setVendors(hold);
    }
    else{
      const filteredJobs = vendors.filter((job) => {
        for (let i = 0; i < filter.length; i++) {
          if (filter[i] !== null &&  (String(job[filterNames[i]])).toLowerCase().includes(filter[i].toLowerCase())) {
            continue;
          } else if (filter[i] !== null) {
            return false;
          }
        }
        return true;
      });
      setVendors(filteredJobs)
    }
      
    setFilter(['', '', '', '', '', '', '', '', ''])
    
    setTimeout(() => setFilter([null,null,null,null,null,null,null,null,null]), 100);

    
  }
  const [filterfield,setFilterfilter] = useState('');
  const [fields,setFields] =useState({'Vendor ID':true,'Vendor Name':true,'Email':true,'Phone':true,'Vendor Owner':true,'Terms Of Service':true,'Postal Code':true,'Website':true,'Main Address':true})
  useEffect(()=>{
    if(filterfield==''){
        setFields({'Vendor ID':true,'Vendor Name':true,'Email':true,'Phone':true,'Vendor Owner':true,'Terms Of Service':true,'Postal Code':true,'Website':true,'Main Address':true})
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
            
            {fields['Vendor ID'] && <div className='full'>
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
            <label htmlFor="f1">Vendor ID</label><br />
          </div>
          <input type="text" className={`drop ${isChecked[0] ? 'dropping' : ''}`
        }
        value={filter[0]}
        onChange={(e) => handleFilter(0, e)}
        autoFocus placeholder="Type Here" />
            </div>}


           {fields['Vendor Name'] && <div className='full'>
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
              <label htmlFor="f2">Vendor Name</label><br />
            </div>
            <input type="text" className={`drop ${isChecked[1] ? 'dropping' : ''}`} 
            value={filter[1]}
            onChange={(e) => handleFilter(1, e)}
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
                  checked={isChecked[2]}
                  onChange={() => handleCheckboxChange(2)}
                />
                {isChecked[2] && <FaCheck onClick={() => handleCheckboxChange(2)} className='check' />}
                <label htmlFor="f3">Email</label><br />
              </div>
              <input type="text" className={`drop ${isChecked[2] ? 'dropping' : ''}`} 
              value={filter[2]}
              onChange={(e) => handleFilter(2, e)}
              autoFocus placeholder="Type Here" />
            </div>}

          {fields['Phone']&&<div className='full'>
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
                <label htmlFor="f4">Phone</label><br />
              </div>
              <input type="text" className={`drop ${isChecked[3] ? 'dropping' : ''}`} 
              value={filter[3]}
              onChange={(e) => handleFilter(3, e)}
              autoFocus placeholder="Type Here" />
            </div>}

          {fields['Vendor Owner']&&  <div className='full'>
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
                <label htmlFor="f5">Vendor Owner</label><br />
              </div>
              <input type="text" className={`drop ${isChecked[4] ? 'dropping' : ''}`} 
              value={filter[4]}
              onChange={(e) => handleFilter(4, e)}
              autoFocus placeholder="Type Here" />
            </div>}

           {fields['Terms Of Service']&& <div className='full'>
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
                <label htmlFor="f6">Terms of Service</label><br />
              </div>
              <input type="text" className={`drop ${isChecked[5] ? 'dropping' : ''}`} 
              value={filter[5]}
              onChange={(e) => handleFilter(5, e)}
              autoFocus placeholder="Type Here" />
            </div>}

            {fields['Postal Code'] && <div className='full'>
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
                <label htmlFor="f7">Postal Code</label><br />
              </div>
              <input type="text" className={`drop ${isChecked[6] ? 'dropping' : ''}`} 
              value={filter[6]}
              onChange={(e) => handleFilter(6, e)}
              autoFocus placeholder="Type Here" />
            </div>}


           {fields['Website']&& <div className='full'>
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
                <label htmlFor="f8">Website</label><br />
              </div>
              <input type="text" className={`drop ${isChecked[7] ? 'dropping' : ''}`} 
              value={filter[7]}
              onChange={(e) => handleFilter(7, e)}
              autoFocus placeholder="Type Here" />
            </div>}

            {fields['Main Address']&&<div className='full'>
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
                <label htmlFor="f9">Main Address</label><br />
              </div>
              <input type="text" className={`drop ${isChecked[8] ? 'dropping' : ''}`}
              value={filter[8]}
              onChange={(e) => handleFilter(8, e)}
              autoFocus placeholder="Type Here" />
            </div>}

          
        </div>
        <div className='List'>
          <div className='Import'><button> <Link className='link' to='vendor-form'>Add</Link></button></div>
          <div className='title'>

          <table>
        <thead>
          <tr>
            <th>Edit</th>
            <th>Vendor ID</th>
            <th>Vendor Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Vendor Owner</th>
            <th>Terms Of Service</th>
            <th>Postal Code</th>
            <th>Website</th>
            <th>Main Address</th>
            
          </tr>
        </thead>


<tbody>
  {vendors.slice(skip, skip + 8).map((vendor) => (
    <tr key={vendor.vendor_id}>
      <td>
        <Link to={`vendor-form/${vendor.vendor_id}`} style={{ color: 'black' }}>
          <MdModeEditOutline />
        </Link>
      </td>
      <td className={`truncate ${expandedCells.includes(vendor.vendor_id) ? 'expanded' : ''}`} onClick={() => handleCellClick(vendor.vendor_id)}>
        {vendor.vendor_id}
      </td>
      <td className={`truncate ${expandedCells.includes(vendor.vendor_id) ? 'expanded' : ''}`} onClick={() => handleCellClick(vendor.vendor_id)}>
        {vendor.vendor_name}
      </td>
      <td className={`truncate ${expandedCells.includes(vendor.vendor_id) ? 'expanded' : ''}`} onClick={() => handleCellClick(vendor.vendor_id)}>
        {vendor.email}
      </td>
      <td className={`truncate ${expandedCells.includes(vendor.vendor_id) ? 'expanded' : ''}`} onClick={() => handleCellClick(vendor.vendor_id)}>
        {vendor.phone}
      </td>
      <td className={`truncate ${expandedCells.includes(vendor.vendor_id) ? 'expanded' : ''}`} onClick={() => handleCellClick(vendor.vendor_id)}>
        {vendor.vendor_owner}
      </td>
      <td className={`truncate ${expandedCells.includes(vendor.vendor_id) ? 'expanded' : ''}`} onClick={() => handleCellClick(vendor.vendor_id)}>
        {vendor.terms_of_service}
      </td>
      <td className={`truncate ${expandedCells.includes(vendor.vendor_id) ? 'expanded' : ''}`} onClick={() => handleCellClick(vendor.vendor_id)}>
        {vendor.postal_code}
      </td>
      <td className={`truncate ${expandedCells.includes(vendor.vendor_id) ? 'expanded' : ''}`} onClick={() => handleCellClick(vendor.vendor_id)}>
        {vendor.website}
      </td>
      <td className={`truncate ${expandedCells.includes(vendor.vendor_id) ? 'expanded' : ''}`} onClick={() => handleCellClick(vendor.vendor_id)}>
        {vendor.main_address}
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
         <div onClick={()=> skip+8<vendors.length?setSkip(skip+8):skip} ><button ><GrNext /></button>

          </div>
         </div>    
        </div>
    </div>

  )
}

export default Body