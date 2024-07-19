import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Header';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Vendor = () => {
      
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
    


  const {id} = useParams();
  const [vendorData, setVendorData] = useState('');
  const [mobileVendorData, setMobileVendorData] = useState('');
  useEffect(() => {
    if(id){
      const fetchJobOpening = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/vendor_form/${id}`);
  
          setVendorData(response.data.vendorData);
          setMobileVendorData(response.data.mobileVendorData);
          console.log(mobileVendorData)
    
        } catch (error) {
          console.error('Error fetching job opening', error);
        }
    }
    
    fetchJobOpening();
    };

  }, []);
  
  useEffect(() => {

    if(mobileVendorData!=''){
      const newMobileFields = mobileVendorData.map((mobile, index) => ({
        id: index + 1,
        label: 'Mobile No:',
        value: mobile.mobile, 
      }));
  
      setMobileFields(newMobileFields);
    }
  }, [mobileVendorData]);

  const [vendorName, setVendorName] = useState('');
  const [email, setEmail] = useState('');
  const [vendorCode, setVendorCode] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [vendorOwner, setVendorOwner] = useState('');
  const [termsOfService, setTermsOfService] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [mainAddress, setMainAddress] = useState('');


  useEffect(() => {
    setVendorName(vendorData.vendor_name || '');
    setEmail(vendorData.email || '');
    setPhone(vendorData.phone||'')
    setVendorCode(vendorData.vendor_id||'')
    setVendorOwner(vendorData.vendor_owner||'')
    setTermsOfService(vendorData.terms_of_service||'')
    setPostalCode(vendorData.postal_code ||'')
    setMainAddress(vendorData.main_address||'')
    setWebsite(vendorData.website||'')
  },[vendorData]);


const Navigate = useNavigate();
  const  editform = async ()=>{
    try {
      await axios.put(`http://localhost:3001/api/vendor_form/${id}`, {
       vendorName,email,vendorCode,phone,website,vendorOwner,termsOfService,postalCode,mainAddress,mobileFields
      });
      console.log('updated successfully');
      notify2('Updated Successfully')
      Navigate('/vendor');
    } catch (error) {
      console.error('Error updating job opening', error);
      notify("Something went wrong")
    }
  };
  const [mobileFields, setMobileFields] = useState([{ id: 1, label: 'Mobile No:', value: '' }]);
  
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

  const resetForm =  (run) => {
    setVendorName('');
    setEmail('');
    setVendorCode('');
    setPhone('');
    setMobileFields([{ id: 1, label: 'Mobile No:', value: '' }]);
    setWebsite('');
    setVendorOwner('');
    setTermsOfService('');
    setPostalCode('');
    setMainAddress('');
    
    if (run=='not') {
      notify2('All Data Has Been Cleared');
    }
  };
  
  const submit = async () => {
    const formFields = [
      vendorCode,
      email,
      vendorName,
      phone,
      website,
      vendorOwner,
      termsOfService,
      postalCode,
      mainAddress,
    ];
  
    try {
      // Check if vendorCode is not an empty string and vendorName is not empty
      if (vendorCode !== '' && vendorName !== '') {
        formFields.forEach((f) => console.log(f));
  
        const response = await axios.post('http://localhost:3001/api/vendorData', {
          vendorCode,
          email,
          vendorName,
          phone,
          website,
          vendorOwner,
          termsOfService,
          postalCode,
          mainAddress,
          mobileFields,
        });
  
        console.log('Inserted data:', response.data);
        notify2('Successfully inserted');
        resetForm('running');
        setTimeout(() => {
          Navigate('/vendor');
        }, 900);
        
      } else {
        notify('Please fill in all required fields');
      }
    } catch (error) {
      notify('Invalid Input');
      console.error('Error inserting data', error);
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
<h2 className='main_title'> {!id && <center>Add Vendor</center>}{id && <center>Edit Vendor</center>}  </h2>
    <div className='main'>
     <div className='Section'>
     <div className="group-header">Basic Details</div>
      <div className="flex-container">
        <div className="light-box">
          <label htmlFor="venderName">Vendor Name:      <span class="mandatory-star">*</span></label>
          <input
            type="text"
            id="venderName"
            name="vender name"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            required
          />

          <label htmlFor="emailId">Email ID:</label>
          <input type="email" id="emailId" name="email_id" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />

          <label htmlFor="vendorCode">Vendor Code:      <span class="mandatory-star">*</span></label>
          <input
            type="text"
            id="vendorCode"
            name="vendor code"
            value={vendorCode}
            onChange={(e) => setVendorCode(e.target.value)}
            disabled={vendorData}
            required
          />
        </div>

        <div className="light-box">
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />

          {mobileFields.map((field) => (
            <div key={field.id}>
              <label htmlFor={`mobile${field.id}`}>{field.label}</label>
              <input
                type="text"
                id={`mobile${field.id}`}
                value={field.value}
                onChange={(e) => handleMobileChange(field.id, e.target.value)}
                required
              />
              {mobileFields.length > 1 && (
                <button className='btn' onClick={() => handleRemoveMobileField(field.id)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          {mobileFields.length < 2 && (
            <button className='add' onClick={handleAddMobileField}>
              + Add
            </button>
          )}
        </div>
      </div>

      <div className="group-header"> Vendor Details</div>
      <div className="flex-container">
        <div className="light-box">
          <label htmlFor="website">Website:</label>
          <input type="text" id="website" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} required />

          <label htmlFor="vendorOwner">Vendor Owner:</label>
          <input
            type="text"
            id="vendorOwner"
            name="vendor owner"
            value={vendorOwner}
            onChange={(e) => setVendorOwner(e.target.value)}
            required
          />

          <label htmlFor="termsOfService">Terms of Service:</label>
          <textarea
            id="termsOfService"
            value={termsOfService}
            onChange={(e) => setTermsOfService(e.target.value)}
          ></textarea>

          <label htmlFor="postalCode">Postal Code:</label>
          <input
            type="tel"
            id="postalCode"
            name="postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />

          <label htmlFor="mainAddress">Main Address:</label>
          <textarea
            id="mainAddress"
            value={mainAddress}
            onChange={(e) => setMainAddress(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className='Footer'>
      <button className="reset-button" onClick={()=>resetForm('not')}>Reset</button>

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
  );
};

export default Vendor;
