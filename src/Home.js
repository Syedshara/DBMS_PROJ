import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import Body_job from './Body_job'
import { Route, Routes } from 'react-router'
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { FaFilter } from "react-icons/fa6";
import Body_vendor from './Body_vendor'
import { FiSearch } from "react-icons/fi";
import { FaCheck} from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios
 from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
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
    
  const filterNames=['job_code','job_title','candidate_name','status_candidate','job_code','posting_title','vendor_id','vendor_name','job_code','job_title','client_id','client_name','mobile','email']
  const [hold,setHold] = useState([])
  const [jobData,setJobData] = useState([]);
  const [toggle,setToggle] = useState(false)
  const [toggle2,setToggle2] = useState(false)
  const [toggle3,setToggle3] = useState(false)
  const [candiateData,setCandidateData] = useState([]);
  const [vendorData,setVendorData] = useState([]);
  const [skip,setSkip]=useState(0);
  const [skip2,setSkip2]=useState(0);
  const [skip3,setSkip3]=useState(0);
  const [candiateResume,setCandidateResume] = useState('')
  const [candiateJob,setCandidateJob] = useState('');
  const [vendorJob,setVendorJob] = useState('')
  const [vendorVid,setVendorVid] = useState();
  const [status,setStatus] = useState('')
  const [data1,setData1] = useState([])
  const [data2,setData2] = useState([])
  const [data3,setData3] = useState([])
  const [clientName,setClientName] = useState('')
  const [clientStatus,setClientStatus] = useState('')
  const [mobile,setMobile] =useState('')
  const[email,setEmail] = useState('')
  const[editToggle,setEditToggle] = useState(false)
  const [idy,setId]=useState('')
  const edit = (id) => {
    if (toggle3 === true && editToggle==false) {
      setToggle3(true);
    } else {
      setToggle3(!toggle3);
    }
  
    setEditToggle(true);
  
    const field = data3.filter((data) => data.off_id === id)[0]; // Use [0] to get the first element of the filtered array
    setId(id)
    setClientName(field.client_id || '');
    setClientStatus(field.client_name || '');
    setMobile(field.mobile || '');
    setEmail(field.email || '');
  };
  
  const editform =async()=>{
    try {
      if(clientName!='' && clientStatus!='' && mobile!='' && email!='' ){
      await axios.put(`http://localhost:3001/api/client/${idy}`, {
       clientName,clientStatus,mobile,email
      });
      console.log('updated successfully');
      notify2('Updated Successfully')
      setToggle3(!toggle3)
      setEditToggle(false)
      setClientName('')
      setClientStatus('')
      setMobile('')
      setEmail('')
      setId('')
      fetch1()

    }
    } catch (error) {
      console.error('Error updating job opening', error);
      notify("Something went wrong")
    }
   
   

    
  }

  useEffect(()=>{
    fetch1()
  },[])
  const fetch1 =async()=>{
    try {
      const response = await axios.get('http://localhost:3001/api/home/candidate_status');

      setData1(response.data.data1)
      setData2(response.data.data2)
      setData3(response.data.data3)
      setHold(response.data)
      console.log(response.data)
      

    } catch (error) {
      console.error('Error fetching data', error);
    
  };
  
  }
   
  const clientSubmit =async()=>{
    if(clientName!='' && clientStatus!='' && mobile!='' && email!='' ){
     
        
      try {
        
        
        const response = await axios.put('http://localhost:3001/api/home/client',{
          clientName,clientStatus,mobile,email
        });
       setClientName('')
       setClientStatus('')
      setEmail('')
      setMobile('')
        notify2('Data Inserted')
        fetch1();
        
    

      } catch (error) {
        console.error('Error fetching data', error);
        notify("Something Went Wrong")
      }
 
    }
    else{
      notify('Field Is Empty')
    }

    }

  const vendorSubmit=async()=>{
    if(vendorJob!='' && vendorVid!=''){
      const job = vendorJob.split('-')[0]
        const title = vendorJob.split('-')[1]
        const name=vendorVid.split('-')[1]
        const id=vendorVid.split('-')[0]
        console.log(job+title+name+status)
      try {
        
        
        const response = await axios.put('http://localhost:3001/api/home/vendor_job',{
          job,id,name,title
        });
        setVendorJob('')
        setVendorVid('')
        fetch1();
        notify2('Data Inserted')
    

      } catch (error) {
        console.error('Error fetching data', error);
        notify("Something Went Wrong")
      }
 
    }
    else{
      notify('Field Is Empty')
    }

    }


  const candidateSubmit=async()=>{
    if(candiateJob!='' && candiateResume!=''){
      const job = candiateJob.split('-')[0]
        const title = candiateJob.split('-')[1]
        const name=candiateResume.split('-')[1]
        const id=candiateResume.split('-')[0]
        console.log(job+title+name+status)
      try {
        
        
        const response = await axios.put('http://localhost:3001/api/home/candidate_status',{
          job,id,name,status,title
        });
        setCandidateJob('')
        setCandidateResume('')
        setStatus('')
        fetch1();
        notify2('Data Inserted')
    

      } catch (error) {
        console.error('Error fetching data', error);
        notify("Something Went Wrong")
      }
 
    }
    else{
      notify('Field Is Empty')
    }

    }
    
  
  const [isChecked,setIsChecked] =useState([false,false,false,false,false,false,false,false,false,false,false,false,false,false])
  const [filter,setFilter] = useState([null,null,null,null,null,null,null,null,null,null,null,null,null,null]);
  const handleCheckboxChange = (index) => {
    
    const updatedChecked = isChecked.map((value, i) => (i === index ? !value : value));
    console.log('after'+updatedChecked[index]);
    setIsChecked(updatedChecked)
  
};


  useEffect( ()=>{
    const fetchData = async()=>{
      try {
        const response = await axios.get('http://localhost:3001/api/home');

        setJobData(response.data.jobOpening)
        setCandidateData(response.data.candidates)
        setVendorData(response.data.vendor)
      
        console.log(response.data)
        
  
      } catch (error) {
        console.error('Error fetching data', error);
      
    };
    }

  fetchData();
  },[])

  const handleFilter = (index, e) => {
    if (filter.every((value) => value === '' || value === null)) {
      setFilter([null, null, null, null, null, null, null, null, null,null,null,null,null,null]);
    }
  
    filter[index] = e.target.value;
    setFilter(filter); 
  };

  const filtering = ()=>{
    console.log(filter)
    if(filter.every((value)=> value==null||value=='')){
      console.log(hold);
        setData1(hold.data1);
    }
    else{
      const filteredJobs = data1.filter((job) => {
        for (let i = 0; i < 4; i++) {

          if (filter[i] !== null &&  String(job[filterNames[i]]).toLowerCase().includes(filter[i].toLowerCase())) {
            continue;
          } else if (filter[i] !== null) {
            return false;
          }
        }
        return true;
      });
      console.log(filteredJobs)

      setData1(filteredJobs)
    }
      
    setFilter(['', '', '', '','','','','','','','','','',''])
    setTimeout(() => setFilter([null,null,null,null,null,null,null,null,null,null,null,null,null,null]), 100);

    
  }

  const filtering2 = ()=>{
    console.log(filter)
    if(filter.every((value)=> value==null||value=='')){
      console.log(hold);
        setData2(hold.data2);
    }
    else{
      const filteredJobs = data2.filter((job) => {
        for (let i = 4; i < 8; i++) {

          if (filter[i] !== null &&  String(job[filterNames[i]]).toLowerCase().includes(filter[i].toLowerCase())) {
            continue;
          } else if (filter[i] !== null) {
            return false;
          }
        }
        return true;
      });
      console.log(filteredJobs)

      setData2(filteredJobs)
    }
      
    setFilter(['', '', '', '','','','','','','','','','',''])
    setTimeout(() => setFilter([null,null,null,null,null,null,null,null,null,null,null,null,null,null]), 100);

    
  }

  const filtering3 = ()=>{
    console.log(filter)
    if(filter.every((value)=> value==null||value=='')){
      console.log(hold);
        setData3(hold.data3);
    }
    else{
      const filteredJobs = data3.filter((job) => {
        for (let i = 10; i <14 ; i++) {


          if (filter[i] !== null &&  String(job[filterNames[i]]).toLowerCase().includes(String(filter[i]).toLowerCase())) {
            continue;
          } else if (filter[i] !== null) {
            return false;
          }
        }
        return true;
      });
      console.log(filteredJobs)

      setData3(filteredJobs)
    }
      
    setFilter(['', '', '', '','','','','','','','','','',''])
    setTimeout(() => setFilter([null,null,null,null,null,null,null,null,null,null,null,null,null,null]), 100);

    
  }

  return (
    <div className='Home'>
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
      <h2> <u>Hi There</u>, {Cookies.get('user')}</h2>
      <div className='Heading'>
          <h2>Candidates Status</h2>
        </div>
       <div className='candidate-status'>
        
       <div className='Search'>
            <div>
              <div className='box'> 

            <div className='ficon' onClick={filtering}> Filter <FaFilter/></div>
              <div className='full'>
          <div className='filters f2'>
            <input
              type="checkbox"
              name="f1"
              id="f0"
              className="custom-checkbox"
              checked={isChecked[0]}
              onChange={() => handleCheckboxChange(0)}
            />
            {isChecked[0] && <FaCheck onClick={() => handleCheckboxChange(0)} className='check' />}
            <label htmlFor="f0">Job Code</label><br />
          </div>
          <input type="text" className={`drop ${isChecked[0] ? 'dropping' : ''}`
        }
        value={filter[0]}
        onChange={(e) => handleFilter(0, e)}
        autoFocus placeholder="Type Here" />
            </div>

            <div className='full'>
          <div className='filters f2'>
            <input
              type="checkbox"
              name="f1"
              id="f1"
              className="custom-checkbox"
              checked={isChecked[1]}
              onChange={() => handleCheckboxChange(1)}
            />
            {isChecked[1] && <FaCheck onClick={() => handleCheckboxChange(1)} className='check' />}
            <label htmlFor="f1">Job Posting</label><br />
          </div>
          <input type="text" className={`drop ${isChecked[1] ? 'dropping' : ''}`
        }
        value={filter[1]}
        onChange={(e) => handleFilter(1, e)}
        autoFocus placeholder="Type Here" />
            </div>

            <div className='full'>
          <div className='filters f2'>
            <input
              type="checkbox"
              name="f1"
              id="f2"
              className="custom-checkbox"
              checked={isChecked[2]}
              onChange={() => handleCheckboxChange(2)}
            />
            {isChecked[2] && <FaCheck onClick={() => handleCheckboxChange(2)} className='check' />}
            <label htmlFor="f2">Candidate Name</label><br />
          </div>
          <input type="text" className={`drop ${isChecked[2] ? 'dropping' : ''}`
        }
        value={filter[2]}
        onChange={(e) => handleFilter(2, e)}
        autoFocus placeholder="Type Here" />
            </div>

            <div className='full'>
          <div className='filters f2'>
            <input
              type="checkbox"
              name="f1"
              id="f3"
              className="custom-checkbox"
              checked={isChecked[3]}
              onChange={() => handleCheckboxChange(3)}
            />
            {isChecked[3] && <FaCheck onClick={() => handleCheckboxChange(3)} className='check' />}
            <label htmlFor="f3">Candidate Status</label><br />
          </div>
          <input type="text" className={`drop ${isChecked[3] ? 'dropping' : ''}`
        }
        value={filter[3]}
        onChange={(e) => handleFilter(3, e)}
        autoFocus placeholder="Type Here" />
            </div>

          
              </div>
            

           
            </div>
          
            
            
        </div>
        <div className='List'>
                   <table>
                    <thead>
                      <th>Job Code</th>
                      <th>Job Posting</th>
                      <th>Candidate Name</th>
                      <th>Candidate Status</th>
                    </thead>
                    <tbody>
  {
  
    data1.slice(skip, skip+5).map((vendor) => (
    <tr key={vendor.status_id}>

      <td >{vendor.job_code}</td>
      <td>{vendor.job_title}</td>
      <td>{vendor.candidate_name}</td>
      <td>{vendor.status_candidate}</td>
     
    </tr>
  ))}
</tbody>
                   </table>
    <div className='arrange'>
    <div className='Import' onClick={()=>setToggle(!toggle)}><button>Add</button></div>
          <div className='next'>
              <div onClick={()=> skip-5>=0?setSkip(skip-5):skip} >
                <button ><GrPrevious /></button>
            </div>
            <div onClick={()=> skip+5<data1.length?setSkip(skip+5):skip} ><button ><GrNext /></button>
            </div>
         </div>  
    </div>
          

                   {toggle && (
            <div className="listing">
              <div>
                <select name="candiate" value={candiateJob} onChange={(e)=>setCandidateJob(e.target.value)} >
                  <option value="">job Code - Posting Title</option>
                  {jobData.map((job) => (
                    <option key={job.job_code} value= {`${job.job_code}-${job.posting_title}`}>
                        {`${job.job_code}-${job.posting_title}`}
                      </option>
                  ))}
                </select>
              </div>
              <div>
                <select value={candiateResume} onChange={(e)=>setCandidateResume(e.target.value)}>
                <option value="">Resume Id - Candidate Name</option>
                  {candiateData.map((candidate) => (
                    <option key={candidate.resume_id} value={`${candidate.resume_id}-${candidate.first_name}`}>
                      {`${candidate.resume_id}-${candidate.first_name}`}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <input type="text" name="" id=""  placeholder='Enter Status'
                value={status}
                onChange={(e)=>setStatus(e.target.value)}/>
              </div>
              <div>
               <button onClick={candidateSubmit}>
                    Submit
                    </button>
               </div>
            </div>
          )}
            </div>
       </div>



       <div className='Heading'>
          <h2> Jobs Offered by Vendors</h2>
        </div>
       <div className='candidate-status'>
        
        <div className='Search'>
             <div>
             <div className='box'> 

            <div className='ficon' onClick={filtering2}> Filter <FaFilter/></div>
              <div className='full'>
          <div className='filters f2'>
            <input
              type="checkbox"
              name="f4"
              id="f4"
              className="custom-checkbox"
              checked={isChecked[4]}
              onChange={() => handleCheckboxChange(4)}
            />
            {isChecked[4] && <FaCheck onClick={() => handleCheckboxChange(4)} className='check' />}
            <label htmlFor="f4">Job Code</label><br />
          </div>
          <input type="text" className={`drop ${isChecked[4] ? 'dropping' : ''}`
        }
        value={filter[4]}
        onChange={(e) => handleFilter(4, e)}
        autoFocus placeholder="Type Here" />
            </div>

            <div className='full'>
          <div className='filters f2'>
            <input
              type="checkbox"
              name="f5"
              id="f5"
              className="custom-checkbox"
              checked={isChecked[5]}
              onChange={() => handleCheckboxChange(5)}
            />
            {isChecked[5] && <FaCheck onClick={() => handleCheckboxChange(5)} className='check' />}
            <label htmlFor="f5">Job Posting</label><br />
          </div>
          <input type="text" className={`drop ${isChecked[5] ? 'dropping' : ''}`
        }
        value={filter[5]}
        onChange={(e) => handleFilter(5, e)}
        autoFocus placeholder="Type Here" />
            </div>

            <div className='full'>
          <div className='filters f2'>
            <input
              type="checkbox"
              name="f6"
              id="f6"
              className="custom-checkbox"
              checked={isChecked[6]}
              onChange={() => handleCheckboxChange(6)}
            />
            {isChecked[6] && <FaCheck onClick={() => handleCheckboxChange(6)} className='check' />}
            <label htmlFor="f6">Vendor Id</label><br />
          </div>
          <input type="text" className={`drop ${isChecked[6] ? 'dropping' : ''}`
        }
        value={filter[6]}
        onChange={(e) => handleFilter(6, e)}
        autoFocus placeholder="Type Here" />
            </div>

            <div className='full'>
          <div className='filters f2'>
            <input
              type="checkbox"
              name="f7"
              id="f7"
              className="custom-checkbox"
              checked={isChecked[7]}
              onChange={() => handleCheckboxChange(7)}
            />
            {isChecked[7] && <FaCheck onClick={() => handleCheckboxChange(7)} className='check' />}
            <label htmlFor="f7">Vendor Name</label><br />
          </div>
          <input type="text" className={`drop ${isChecked[7] ? 'dropping' : ''}`
        }
        value={filter[7]}
        onChange={(e) => handleFilter(7, e)}
        autoFocus placeholder="Type Here" />
            </div>
           
              </div>
            
             </div>
           
             
             
         </div>
         <div className='List'>
                    <table>
                     <thead>
                       <th>Job Code</th>
                       <th>Job Posting</th>
                       <th>Vendor id</th>
                       <th>Vendor Name</th>
                     </thead>
                     <tbody>
  {
  
    data2.slice(skip2, skip2+7).map((vendor) => (
    <tr key={vendor.off_id}>

      <td >{vendor.job_code}</td>
      <td>{vendor.posting_title}</td>
      <td>{vendor.vendor_id}</td>
      <td>{vendor.vendor_name}</td>
     
    </tr>
  ))}
</tbody>
                    </table>
 
                    <div className='arrange'>

          <div className='next'>
              <div onClick={()=> skip2-7>=0?setSkip2(skip2-7):skip2} >
                <button ><GrPrevious /></button>
            </div>
            <div onClick={()=> skip2+7<data1.length?setSkip2(skip2+7):skip2} ><button ><GrNext /></button>
            </div>
         </div>  
    </div>
 
                   
             </div>
        </div>







        <div className='Heading'>
          <h2>Clients</h2>
        </div>
       <div className='candidate-status'>
        
        <div className='Search'>
             <div>
             <div className='box'> 

                <div className='ficon'  onClick={filtering3}> Filter <FaFilter/></div>
                

            <div className='full'>
          <div className='filters f2'>
            <input
              type="checkbox"
              name="f10"
              id="f10"
              className="custom-checkbox"
              checked={isChecked[10]}
              onChange={() => handleCheckboxChange(10)}
            />
            {isChecked[10] && <FaCheck onClick={() => handleCheckboxChange(10)} className='check' />}
            <label htmlFor="f10">Client Id</label><br />
          </div>
          <input type="text" className={`drop ${isChecked[10] ? 'dropping' : ''}`
        }
        value={filter[10]}
        onChange={(e) => handleFilter(10, e)}
        autoFocus placeholder="Type Here" />
            </div>

            <div className='full'>
          <div className='filters f2'>
            <input
              type="checkbox"
              name="f11"
              id="f11"
              className="custom-checkbox"
              checked={isChecked[11]}
              onChange={() => handleCheckboxChange(11)}
            />
            {isChecked[11] && <FaCheck onClick={() => handleCheckboxChange(11)} className='check' />}
            <label htmlFor="f11">Client Name</label><br />
          </div>
          <input type="text" className={`drop ${isChecked[11] ? 'dropping' : ''}`
        }
        value={filter[11]}
        onChange={(e) => handleFilter(11, e)}
        autoFocus placeholder="Type Here" />
            </div>

            <div className='full'>
          <div className='filters f2'>
            <input
              type="checkbox"
              name="f12"
              id="f12"
              className="custom-checkbox"
              checked={isChecked[12]}
              onChange={() => handleCheckboxChange(12)}
            />
            {isChecked[12] && <FaCheck onClick={() => handleCheckboxChange(12)} className='check' />}
            <label htmlFor="f12">Mobile</label><br />
          </div>
          <input type="text" className={`drop ${isChecked[12] ? 'dropping' : ''}`
        }
        value={filter[12]}
        onChange={(e) => handleFilter(12, e)}
        autoFocus placeholder="Type Here" />
            </div>
            
            <div className='full'>
          <div className='filters f2'>
            <input
              type="checkbox"
              name="f13"
              id="f13"
              className="custom-checkbox"
              checked={isChecked[13]}
              onChange={() => handleCheckboxChange(13)}
            />
            {isChecked[13] && <FaCheck onClick={() => handleCheckboxChange(13)} className='check' />}
            <label htmlFor="f13">Email</label><br />
          </div>
          <input type="text" className={`drop ${isChecked[13] ? 'dropping' : ''}`
        }
        value={filter[13]}
        onChange={(e) => handleFilter(13, e)}
        autoFocus placeholder="Type Here" />
            </div>
  </div>
             
            
             </div>
           
             
             
         </div>
         <div className='List'>
                    <table>
                     <thead>
                       <th>Edit</th>
                       <th>Client Id</th>
                       <th>Client Name</th>
                       <th>Mobile</th>
                       <th>Email</th>
                     </thead>
                     <tbody>
  {
  
    data3.slice(skip3, skip3+5).map((vendor) => (
    <tr key={vendor.off_id}>
       <td>
                  <div onClick={()=>edit(vendor.off_id)}>
                    <MdModeEditOutline />
                  </div>
                </td>
      <td >{vendor.client_id}</td>
      <td>{vendor.client_name}</td>
      <td>{vendor.mobile}</td>
      <td>{vendor.email}</td>
     
    </tr>
  ))}
</tbody>
                    </table>
 
                    <div className='arrange'>
    <div className='Import' onClick={()=>{
      if(editToggle==false){
        setToggle3(!toggle3);}
      else{
        setToggle3(true)
        setEditToggle(false)}
      setClientName('')
      setClientStatus('')
      setMobile('')
      setEmail('')}
      }><button>Add</button></div>
          <div className='next'>
              <div onClick={()=> skip3-5>=0?setSkip3(skip3-5):skip3} >
                <button ><GrPrevious /></button>
            </div>
            <div onClick={()=> skip3+5<data3.length?setSkip3(skip3+5):skip3} ><button ><GrNext /></button>
            </div>
         </div>  
    </div>
                    {toggle3 && (
                <div className="listing listing2">
                
                <div>
                <input type="text" name="" id=""  placeholder='Enter Client Id'
                value={clientName}
                onChange={(e)=>setClientName(e.target.value)}/>
              </div>
              <div>
                <input type="text" name="" id=""  placeholder='Enter Client Name'
                value={clientStatus}
                onChange={(e)=>setClientStatus(e.target.value)}/>
              </div>
              <div>
                <input type="text" name="" id=""  placeholder='Enter Mobile'
                value={mobile}
                onChange={(e)=>setMobile(e.target.value)}/>
              </div>
              <div>
                <input type="text" name="" id=""  placeholder='Enter Email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
              </div>
                
                <div>

               {editToggle? <button onClick={editform}
               style={{width:'60px'}}>Edit</button>: <button onClick={clientSubmit}>
                     Submit
                     </button>}
               
                </div>
              </div>
           )}
             </div>
        </div>
    </div>
  )
}

export default Home