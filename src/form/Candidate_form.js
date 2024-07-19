import React, { useEffect } from 'react'
import { useState } from 'react';
import Header from '../Header';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Candidate_form = () => {


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
    
  const [user,setUser] = useState([])
  useEffect(()=>{
    const fetch = async()=>{
      try {
        const response = await axios.get('http://localhost:3001/api/candidate_cv');
      
        setUser(response.data)
        console.log(response.data)
  
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
    fetch()
  },[])

  const {id}=useParams();
  const [candidateData, setCandidateData] = useState('');
  const [mobileData, setMobileData] = useState('');
  const [addressData, setAddressData] = useState('');
  const [educationalDetailsData, setEducationalDetailsData] = useState('');
  const [experienceDetailsData, setExperienceDetailsData] = useState('');
  const [socialMediaData, setSocialMediaData] = useState('');

  const Navigate = useNavigate();

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:3001/api/candidate_form/${id}`);
          
          const { candidate, mobile, address, educational_details, experience_details, social_media } = response.data;
          
          setCandidateData(candidate);
          setMobileData(mobile);
          setAddressData(address);
          setEducationalDetailsData(educational_details);
          setExperienceDetailsData(experience_details);
          setSocialMediaData(social_media);
          console.log(socialMediaData)
          
          console.log(response.data);
          
        }
      } catch (error) {
        console.error('Error fetching candidate data', error);
        // Handle the case where the candidate data is not found or an error occurs
      }
    };
  
    fetchCandidate();
  
  }, [id]);
  
  

  const generateRandomIdentity = () => {
    return uuidv4().slice(0, 5).toUpperCase();
  };
  
  const submit = async()=>{
    const isValidMobileNumber = (number) => /^\d{10}$/.test(number);

   if(firstName=='' || lastName ==''|| emails =='' || totalExperience==""){
    notify("Required fields can't be empty")
   }
  
    else if(otherMediaName=='' && socialMediaId!='' ){
      notify('Enter Media Name');
    }
    else if(otherMediaName!='' && socialMediaId=='' ){
      notify('Enter Media Id');
    }
    else{
      console.log(mobileFields)
      try {
        const randomIdentity = generateRandomIdentity();
        await axios.put(`http://localhost:3001/api/candidate_form`, {
          randomIdentity,
          pre,firstName,lastName,emails,secondary_email,totalExperience,currentJobTitle,currentEmployer,currentSalary,expectedSalary,additionalInfo,aadharCardNumber,panCardNumber,source,handledBy,mobileFields,twitter,facebook,linkedin,instagram,otherMediaName,socialMediaId,addresses,isTemporary,educationalDetails,experienceDetails
        });
        console.log('successfully');
        notify2('Form Received')
        resetForm('running')
        setTimeout(() => {
          Navigate('/candidate');
        }, 900);
      } catch (error) {
        console.error('Error updating job opening', error);
        notify('Something Went Wrong')
      }
    }

    
    
  }
  const [mobileFields, setMobileFields] = useState([{ id: 1, label: 'Mobile No:', value: '' }]);

  useEffect(() => {

    if(mobileData!=''){
      const newMobileFields = mobileData.map((mobile, index) => ({
        id: index + 1,
        label: 'Mobile No:',
        value: mobile.mobile, 
      }));
  
      setMobileFields(newMobileFields);
    }
  }, [mobileData]);

  const handleAddMobileField = () => {
    const newMobileField = { id: mobileFields.length + 1, label: 'Mobile No:', value: '' };
    setMobileFields([...mobileFields, newMobileField]);
  };

  const handleRemoveMobileField = (id) => {
    const updatedMobileFields = mobileFields.filter((field) => field.id !== id);
    setMobileFields(updatedMobileFields);
  };

  const handleMobileChange = (id, value) => {
    const updatedMobileFields = mobileFields.map((field) =>
      field.id === id ? { ...field, value } : field
    );
    setMobileFields(updatedMobileFields);
  };


 
  const [pre,setPre] = useState('Mr.');
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [emails,setEmails] = useState('');
  const [secondary_email,setSecondary_email] = useState('');
  const [isTemporary,setIsTemporary] = useState(false);
  const [totalExperience,setTotalExperience] = useState('');
  const [currentJobTitle,setCurrentJobTitle] = useState('');
  const [currentEmployer,setCurrentEmployer] = useState('');
  const [currentSalary,setCurrentSalary] = useState('');
  const [expectedSalary,setExpectedSalary] = useState('');
  const [additionalInfo,setAdditionalInfo] = useState('');
  const [twitter,setTwitter] = useState('');
  const [facebook,setFacebook] = useState('');
  const [instagram,setInstagram] = useState('');
  const [linkedin,setLinkedin] = useState('');
  const [otherMediaName,setOtherMediaName] = useState('');
  const [socialMediaId,setSocialMediaId] = useState('');
  const [aadharCardNumber,setAadharCardNumber] = useState('');
  const [panCardNumber,setPanCardNumber] = useState('');
  const [source,setSource] = useState('Added by User');
  const [handledBy,setHandledBy] = useState('');

  useEffect(() => {
    setPre(candidateData.prefix || 'Mr.');
    setFirstName(candidateData.first_name || '');
    setLastName(candidateData.last_name || '');
    setEmails(candidateData.email || '');
    setSecondary_email(candidateData.secondary_email || '');
    setTotalExperience(candidateData.total_exp || '');
    setCurrentJobTitle(candidateData.current_job_title || '');
    setCurrentEmployer(candidateData.current_employer || '');
    setCurrentSalary(candidateData.current_salary || '');
    setExpectedSalary(candidateData.expected_salary || '');
    setAdditionalInfo(candidateData.additional_information || '');
    setAadharCardNumber(candidateData.addahar_card_no || '');
    setPanCardNumber(candidateData.pan_card_no || '');
    setSource(candidateData.source || '');
    

}, [candidateData]);


  const resetForm = (run) => {
    console.log(experienceDetails)
    setPre('Mr.');
    setFirstName('');
    setLastName('');
    setEmails('');
    setSecondary_email('');
    setIsTemporary(false);
    setTotalExperience('');
    setCurrentJobTitle('');
    setCurrentEmployer('');
    setCurrentSalary('');
    setExpectedSalary('');
    setAdditionalInfo('');
    setTwitter('');
    setFacebook('');
    setInstagram('');
    setLinkedin('');
    setOtherMediaName('');
    setSocialMediaId('');
    setAadharCardNumber('');
    setPanCardNumber('');
    setSource('Added by User');
    setHandledBy('');
    setEducationalDetails([
      {
        id: 1,
        institute: '',
        major: '',
        isSchoolEducation: false,
        degree: '',
        eduStartMonth: '',
        eduStartYear: '',
        eduEndMonth: '',
        eduEndYear: '',
        isCurrentlyPursuing: false
      }
    ])
    setExperienceDetails([
      {
        id: 1,
        occupation: '',
        company: '',
        experienceSummary: '',
        expStartMonth: '',
        expStartYear: '',
        expEndMonth: '',
        expEndYear: '',
        isCurrentlyWorking: false,
      },
    ])
    setAddresses([
      {
        id: 1,
        address: '',
        isTemporary: false
      }
    ])
    if(run=='not'){
      notify2('All Data Has Been Cleared')
    }
    
  };
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      address: '',
      isTemporary: false
    }
  ]);
  useEffect(() => {

    if(addressData!=''){
      const newMobileFields = addressData.map((address, index) => ({
        id: index + 1,
        address: address.address ,
        isTemporary: address.type=='p'?false:true, 
      }));
  
      setAddresses(newMobileFields);
    }
  }, [addressData]);

  useEffect(() => {
    if (experienceDetailsData!='') {
      const newdata = experienceDetailsData.map((detail, index) => ({
        id: index + 1,
        occupation: detail.occupation,
        company: detail.company,
        experienceSummary: detail.summary,
        expStartMonth: detail.start_month,
        expStartYear: detail.start_year,
        expEndMonth: detail.end_month,
        expEndYear: detail.end_year,
        isCurrentlyWorking: false,
      }));
  
      setExperienceDetails(newdata);
    }
  }, [experienceDetailsData]);



  useEffect(() => {
    if (educationalDetailsData!='') {
      const newdata = educationalDetailsData.map((detail, index) => ({
        id: index + 1,
        institute: detail.institute,
        major: detail.major,
        isSchoolEducation: detail.type === 's',
        degree: detail.degree,
        eduStartMonth: detail.start_month,
        eduStartYear: detail.start_year,
        eduEndMonth: detail.end_month,
        eduEndYear: detail.end_year,
        isCurrentlyPursuing: false,
      }));
  
      setEducationalDetails(newdata);
    }
  }, [educationalDetailsData]);

  useEffect(() => {
    if (socialMediaData) {
      for(const detail of socialMediaData){
        if(detail.type=='p'){
          if(detail.social_media == 'Twitter'){
            setTwitter(detail.social_id)
          }
          if(detail.social_media == 'Face Book'){
            setFacebook(detail.social_id)
          }
          if(detail.social_media =='Instagram'){
            setInstagram(detail.social_id)
          }
          if(detail.social_media == 'Linked In'){
            setLinkedin(detail.social_id)
          }
        }
        else{
          setOtherMediaName(detail.social_media)
          setSocialMediaId(detail.social_id)
    
        }
      }
    }
    
  }, [socialMediaData]);
  
  
  
  const handleAddAddress = () => {
    setAddresses((prevAddresses) => [
      ...prevAddresses,
      {
        id: prevAddresses.length + 1,
        address: '',
        isTemporary: false
      }
    ]);
  };

  const handleRemoveAddress = (id) => {
    setAddresses((prevAddresses) => prevAddresses.filter((address) => address.id !== id));
  };

  const handleAddressChange = (id, property, value) => {
    setAddresses((prevAddresses) =>
      prevAddresses.map((address) =>
        address.id === id ? { ...address, [property]: value } : address
      )
    );
  };

  
  const [educationalDetails, setEducationalDetails] = useState([
    {
      id: 1,
      institute: '',
      major: '',
      isSchoolEducation: false,
      degree: '',
      eduStartMonth: '',
      eduStartYear: '',
      eduEndMonth: '',
      eduEndYear: '',
      isCurrentlyPursuing: false
    }
  ]);

  const handleAddEducationalDetails = () => {
    setEducationalDetails((prevDetails) => [
      ...prevDetails,
      {
        id: prevDetails.length + 1,
        institute: '',
        major: '',
        isSchoolEducation: false,
        degree: '',
        eduStartMonth: '',
        eduStartYear: '',
        eduEndMonth: '',
        eduEndYear: '',
        isCurrentlyPursuing: false
      }
    ]);
  };

  const handleRemoveEducationalDetails = (id) => {
    setEducationalDetails((prevDetails) => prevDetails.filter((detail) => detail.id !== id));
  };

  const handleEducationalDetailsChange = (id, property, value) => {
    setEducationalDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.id === id ? { ...detail, [property]: value } : detail
      )
    );
  };
  const [experienceDetails, setExperienceDetails] = useState([
    {
      id: 1,
      occupation: '',
      company: '',
      experienceSummary: '',
      expStartMonth: '',
      expStartYear: '',
      expEndMonth: '',
      expEndYear: '',
      isCurrentlyWorking: false,
    },
  ]);


  const handleExperienceDetailsChange = (id, field, value) => {
    setExperienceDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.id === id ? { ...detail, [field]: value } : detail
      )
    );
  };


  const handleRemoveExperienceDetails = (id) => {
    setExperienceDetails((prevDetails) => prevDetails.filter((detail) => detail.id !== id));
  };


  const handleAddExperienceDetails = () => {
    const newId = experienceDetails.length + 1;
    setExperienceDetails((prevDetails) => [
      ...prevDetails,
      {
        id: newId,
        occupation: '',
        company: '',
        experienceSummary: '',
        expStartMonth: '',
        expStartYear: '',
        expEndMonth: '',
        expEndYear: '',
        isCurrentlyWorking: false,
      },
    ]);
  };
 
    const  editform = async ()=>{
      try {
        await axios.put(`http://localhost:3001/api/candidate_form/${id}`, {
          pre,firstName,lastName,emails,secondary_email,totalExperience,currentJobTitle,currentEmployer,currentSalary,expectedSalary,additionalInfo,aadharCardNumber,panCardNumber,source,handledBy,mobileFields,twitter,facebook,linkedin,instagram,otherMediaName,socialMediaId,addresses,isTemporary,educationalDetails,experienceDetails
        });
        console.log('updated successfully');
        Navigate('/candidate');
      } catch (error) {
        console.error('Error updating job opening', error);
      }
    };

  

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

<h2 className='main_title'> {!id&&<center>Add Candidate</center>} {id&&<center>Edit Candidate</center>} </h2>
    <div className='main'>
      <div className='Section'>
      <div className="group-header">Personal Details</div>
    <div className="flex-container">
      <div className="light-box">
        
        <label htmlFor="fname">First Name:  <span class="mandatory-star">*</span></label>
        <div className='first'>
        <select style={{width:'60px'}} value={pre} onChange={(e)=>setPre(e.target.value)}>
                        <option>Mr.</option>
                        <option>Ms.</option>
                        <option>Mrs.</option>
                        <option>None</option>
                    </select>
        <input type="text" id="fname"
        value={firstName}
        onChange={(e)=>setFirstName(e.target.value)}
        required />
        </div>

        <label htmlFor="lname">Last Name:  <span class="mandatory-star">*</span></label>
        <input type="text" id="lname"
        value={lastName}
        onChange={(e)=>setLastName(e.target.value)}
        required />
 <label htmlFor='email'>Email:  <span class="mandatory-star">*</span></label>
          <input
            type="text"
            id='email'
            value={emails}
        onChange={(e)=>setEmails(e.target.value)}
            required
          />
         {mobileFields.map((field) => (
        <div key={field.id}>
          <label htmlFor={`mobile${field.id}`}>{field.label}</label>
          <input
            type="number"
            id={`mobile${field.id}`}
            value={field.value}
            onChange={(e) => handleMobileChange(field.id, e.target.value)}
            required
          />
          {mobileFields.length > 1 && (
            <button className='btn' onClick={() => handleRemoveMobileField(field.id)}>Remove</button>
          )}
        </div>
      ))}
      {mobileFields.length < 2 && <button className='add' onClick={handleAddMobileField}>+ Add</button>}
      
       
      </div>
    
      <div className="light-box">
     
         
           <label htmlFor='semail'>Secondary Email</label>
          <input
            type="text"
            id='semail'
            value={secondary_email}
        onChange={(e)=>setSecondary_email(e.target.value)}
            required
          />
        

        {addresses.map((address) => (
          <div key={address.id}>
            <label htmlFor={`address${address.id}`}>Address:</label>
            <textarea
              name={`address${address.id}`}
              id={`address${address.id}`}
              value={address.address}
              onChange={(e) => handleAddressChange(address.id, 'address', e.target.value)}
              required
            ></textarea>
            <div className="radio-group">
              <div>
              <label htmlFor={`temporary${address.id}`}>Temporary</label>
              <input
                type="radio"
                name={`type${address.id}`}
                id={`temporary${address.id}`}
                checked={address.isTemporary}
                onChange={() => handleAddressChange(address.id, 'isTemporary', true)}
              />
              </div>

            <div>
            <label htmlFor={`permanent${address.id}`}>Permanent</label>
              <input
                type="radio"
                name={`type${address.id}`}
                id={`permanent${address.id}`}
                checked={!address.isTemporary}
                onChange={() => handleAddressChange(address.id, 'isTemporary', false)}
              />
            </div>
            </div>
            {addresses.length > 1 && (
              <button className='btn' onClick={() => handleRemoveAddress(address.id)}>Remove</button>
            )}
          </div>
        ))}
        {addresses.length <2 && <button className='add' onClick={handleAddAddress}>+ Add</button>}

    </div>

    </div>

    <div className="group-header">Professional Details</div>
    <div className="flex-container">
      <div className="light-box">
        <label>Total Experience: <span class="mandatory-star">*</span></label>
        <input type="text" name="experience"
        value={totalExperience}
        onChange={(e)=>setTotalExperience(e.target.value)} />
        
        <label>Current Job Title:</label>
        <input type="text" name="currentJobTitle" 
        value={currentJobTitle}
        onChange={(e)=>setCurrentJobTitle(e.target.value)} 
        />

        <label>Current Employer:</label>
        <input type="text" name="currentEmployer" 
        value={currentEmployer}
        onChange={(e)=>setCurrentEmployer(e.target.value)} />
      </div>


      <div className="light-box">
        <label>Current Salary:</label>
        <input type="tel" name="currentSalary"
        value={currentSalary}
        onChange={(e)=>setCurrentSalary(e.target.value)}  />

        <label>Expected Salary:</label>
        <input type="tel" name="expectedSalary"
        value={expectedSalary}
        onChange={(e)=>setExpectedSalary(e.target.value)}  />

        <label>Additional Information:</label>
        <textarea name="additionalInfo" 
        value={additionalInfo}
        onChange={(e)=>setAdditionalInfo(e.target.value)} ></textarea>
      </div>
      </div>

      <div className="group-header">Social Media Details</div>
      <div className="flex-container">
      <div className="light-box">
        {/* Left side */}
        <label>Twitter:</label>
        <input type="text" name="twitter"
        value={twitter}
        onChange={(e)=>setTwitter(e.target.value)}  />

        <label>Facebook:</label>
        <input type="text" name="facebook" 
        value={facebook}
        onChange={(e)=>setFacebook(e.target.value)} />

        <label>Instagram:</label>
        <input type="text" name="instagram"
        value={instagram}
        onChange={(e)=>setInstagram(e.target.value)}  />

        <label>LinkedIn:</label>
        <input type="text" name="linkedin"
        value={linkedin}
        onChange={(e)=>setLinkedin(e.target.value)}  />
      </div>

      <div className="light-box">
        {/* Right side */}
        <label>Other Social Media Name:</label>
        <input type="text" name="scmed-name" 
        value={otherMediaName}
        onChange={(e)=>setOtherMediaName(e.target.value)} />

        <label>Social Media ID:</label>
        <input type="text" name="scmed-id"
        value={socialMediaId}
        onChange={(e)=>setSocialMediaId(e.target.value)}  />


      </div>
    </div>


    <div className="group-header"> Other Details</div>
    <div className="flex-container">
      <div className="light-box">
        {/* Left side */}
        <label>Aadhar Card Number:</label>
        <input type="text" name="aadhar-card"
        value={aadharCardNumber}
        onChange={(e)=>setAadharCardNumber(e.target.value)}  />

        <label>PAN Card Number:</label>
        <input type="text" name="pan-card" 
        value={panCardNumber}
        onChange={(e)=>setPanCardNumber(e.target.value)} />
      </div>

      <div className="light-box">
        <label>Source:</label>
        <select className="full"
        value={source}
        onChange={(e)=>setSource(e.target.value)} >
          <option>Added by User</option>
          <option>Advertisement</option>
          <option>From Job Portal</option>
          <option>Cold Call</option>
          <option>Employee Referral</option>
          <option>External Referral</option>
          <option>From Search Engine</option>
          <option>From Social Media</option>
        </select>

        <label>Handled By:</label>
        <select className="full" 
        value={handledBy}
        onChange={(e)=>setHandledBy(e.target.value)} >
          <option value=''>select..</option>
          {
  user.map((data) => (
    <option key={data.username} value={data.username}>
      {data.username}
    </option>
  ))
}

          
        </select>
      </div>
    </div>
   
   
    <div className="group-header"> Educational Details</div>

{educationalDetails.map((detail) => (
  <div key={detail.id}>
     
    <div className="flex-container">
      <div className="light-box">
    <label htmlFor={`institute${detail.id}`}>Institute/School:</label>
    <input
      type="text"
      name={`institute${detail.id}`}
      value={detail.institute}
      onChange={(e) => handleEducationalDetailsChange(detail.id, 'institute', e.target.value)}
    />

    <label htmlFor={`major${detail.id}`}>Major/Department:</label>
    <input
      type="text"
      name={`major${detail.id}`}
      value={detail.major}
      onChange={(e) => handleEducationalDetailsChange(detail.id, 'major', e.target.value)}
    />

    <div className="radio-group">
      <label htmlFor={`schoolEducation${detail.id}`}>School Education</label>
      <input
        type="checkbox"
        id={`schoolEducation${detail.id}`}
        checked={detail.isSchoolEducation}
        onChange={() => handleEducationalDetailsChange(detail.id, 'isSchoolEducation', !detail.isSchoolEducation)}
      />
    </div>

    <label htmlFor={`degree${detail.id}`}>Degree/Grade:</label>
    <input
      type="text"
      name={`degree${detail.id}`}
      value={detail.degree}
      onChange={(e) => handleEducationalDetailsChange(detail.id, 'degree', e.target.value)}
    />

    <label >Duration:</label>
    <div className='duration'>
      <div>

    <label htmlFor={`eduStartMonth${detail.id}`}>Month:</label>
    <select
      style={{ width: '50px' }}
      name={`edu-start-month${detail.id}`}
      value={detail.eduStartMonth}
      onChange={(e) => handleEducationalDetailsChange(detail.id, 'eduStartMonth', e.target.value)}
    >
      <option></option>
      {Array.from({ length: 12 }, (_, index) => (
        <option key={index + 1} value={index + 1}>
          {index + 1}
        </option>
      ))}
    </select>
      </div>
         
      <div>
      <label htmlFor={`eduStartYear${detail.id}`}>Year:</label>
    <input
      style={{ width: '80px', height: '20px' }}
      type="number"
      id={`eduStartYear${detail.id}`}
      value={detail.eduStartYear}
      onChange={(e) => handleEducationalDetailsChange(detail.id, 'eduStartYear', e.target.value)}
    />
      </div>
       <div>To</div>
       <div>
       <label htmlFor={`eduEndMonth${detail.id}`}>Month:</label>
    <select
      style={{ width: '50px' }}
      name={`edu-end-month${detail.id}`}
      value={detail.eduEndMonth}
      onChange={(e) => handleEducationalDetailsChange(detail.id, 'eduEndMonth', e.target.value)}
      disabled={detail.isCurrentlyPursuing}
    >
      <option></option>
      {Array.from({ length: 12 }, (_, index) => (
        <option key={index + 1} value={index + 1}>
          {index + 1}
        </option>
      ))}
    </select>
       </div>

       <div>
       <label htmlFor={`eduEndYear${detail.id}`}>Year:</label>
    <input
      style={{ width: '80px', height: '20px' }}
      type="number"
      id={`eduEndYear${detail.id}`}
      value={detail.eduEndYear}
      onChange={(e) => handleEducationalDetailsChange(detail.id, 'eduEndYear', e.target.value)}
      disabled={detail.isCurrentlyPursuing}
    />
       </div>
    </div>
   

    
        

    

    <div className="radio-group">
      <label htmlFor={`currentlyPursuing${detail.id}`}>Currently Pursuing</label>
      <input
        type="checkbox"
        id={`currentlyPursuing${detail.id}`}
        checked={detail.isCurrentlyPursuing}
        onChange={() =>{ handleEducationalDetailsChange(detail.id, 'isCurrentlyPursuing', !detail.isCurrentlyPursuing);}}
      />
    </div>

    {educationalDetails.length > 1 && <button className='btn' onClick={() => handleRemoveEducationalDetails(detail.id)}>
      Remove
    </button>}
    {educationalDetails.length < 2 && 
      <button className='add' onClick={handleAddEducationalDetails}>
  + Add Educational Details
</button>
    }
    
  </div>
  
  </div>
  
    </div>

))}


      
<div className="group-header"> Experience Details</div>
{experienceDetails.map((detail) => (
  <div key={detail.id} className="flex-container">
    <div className="light-box">
      <label>Occupation/Title:</label>
      <input
        type="text"
        name="occupation"
        value={detail.occupation}
        onChange={(e) => handleExperienceDetailsChange(detail.id, 'occupation', e.target.value)}
      />

      <label>Company:</label>
      <input
        type="text"
        name="company"
        value={detail.company}
        onChange={(e) => handleExperienceDetailsChange(detail.id, 'company', e.target.value)}
      />

      <label>Summary:</label>
      <textarea
        name="experience-summary"
        value={detail.experienceSummary}
        onChange={(e) => handleExperienceDetailsChange(detail.id, 'experienceSummary', e.target.value)}
      ></textarea>

      <label>Work Duration:</label>
      <div className="duration">
        <div>
          <label>Month</label>
          <select
            style={{ width: '50px' }}
            name="exp-start-month"
            value={detail.expStartMonth}
            onChange={(e) => handleExperienceDetailsChange(detail.id, 'expStartMonth', e.target.value)}
          >
            <option></option>
            {Array.from({ length: 12 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="year">Year</label>
          <input
            style={{ width: '80px', height: '20px' }}
            type="number"
            id="year"
            value={detail.expStartYear}
            onChange={(e) => handleExperienceDetailsChange(detail.id, 'expStartYear', e.target.value)}
          />
        </div>
        <div>to</div>
        <div>
          <label>Month</label>
          <select
            style={{ width: '50px' }}
            name="exp-end-month"
            value={detail.expEndMonth}
            onChange={(e) => handleExperienceDetailsChange(detail.id, 'expEndMonth', e.target.value)}
            disabled={detail.isCurrentlyWorking}
          >
            <option></option>
            {Array.from({ length: 12 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="year">Year</label>
          <input
            style={{ width: '80px', height: '20px' }}
            type="number"
            id="year"
            value={detail.expEndYear}
            onChange={(e) => handleExperienceDetailsChange(detail.id, 'expEndYear', e.target.value)}
            disabled={detail.isCurrentlyWorking}
          />
        </div>
      </div>

      <div className="radio-group">
        <label htmlFor="check"> I currently work here</label>
        <input
          type="checkbox"
          id="check"
          checked={detail.isCurrentlyWorking}
          onChange={() => handleExperienceDetailsChange(detail.id, 'isCurrentlyWorking', !detail.isCurrentlyWorking)}
        />
      </div>

      <br />
      {
        experienceDetails.length>1 &&<button className="btn" onClick={() => handleRemoveExperienceDetails(detail.id)}>
        Remove
      </button>
      }
      {
        experienceDetails.length<2 && <button className="add" onClick={handleAddExperienceDetails}>
        + Add Experience Details
      </button>
      }


    </div>
  </div>
))}


    <div className='Footer'>
  <button className="reset-button" onClick={()=>resetForm('not')} >Reset</button>
  {id&&<button className="submit-button" onClick={editform}>
          Edit Form
      </button>}
      {!id&&
      <button className="submit-button" onClick={submit}>
       Submit Form
      </button>}
  </div>
  </div>
 
</div>
</div>
  )
}

export default Candidate_form