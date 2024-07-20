const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();

const port = 3001;
app.use(express.json());
app.use(cors());
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'DBMS Project',
  password: 'Demonlord#1',
  port: 5432,
});

app.get('/api/login/:user', async (req, res) => {
  const { user } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users where username = $1 ',[user]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.put('/api/login/:user', async (req, res) => {
  const { user } = req.params;
  const {newPass} = req.body;
  try {
    const result = await pool.query('update users set password=$1 where username = $2 ',[user,newPass]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/jobs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM job_opening ');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/vendor', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vendor');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/candidate', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM candidate');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/api/insertData', async (req, res) => {
  const {
    v1, v2, selectedDate, selectedDate1, v3, v4, v5, v6, v7, v8, v9, v10, v11, selectedOption,selectedOption1
  } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO job_opening VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,$15) RETURNING *',
      [v1, v2,selectedOption || null, selectedOption1 || null,v11 || null,selectedDate,v3|| null,selectedDate1, v4|| null, v5|| null, v6|| null, v7|| null, v8|| null, v9|| null, v10|| null]
    );

    res.json(result.rows[0]);
  } catch (error) {
   
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/vendorData', async (req, res) => {
  const {
    vendorName,
    email,
    vendorCode,
    phone,
    website,
    vendorOwner,
    termsOfService,
    postalCode,
    mainAddress,
    mobileFields

  } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO vendor (vendor_name, email, vendor_id, phone, website, vendor_owner, terms_of_service, postal_code, main_address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [
        vendorName,
        email || null,
        vendorCode,
        phone || null,
        website || null,
        vendorOwner || null,
        termsOfService || null,
        postalCode || null,
        mainAddress || null,
      ]
    );
    for (const mobileNumber of mobileFields) {
      if(mobileNumber.value!==''){
        await pool.query('INSERT INTO mobile_vendor (vendor_id, mobile) VALUES ($1, $2)', 
        [vendorCode, mobileNumber.value]);
      }
      
    }

    res.json(result.rows[0]);
  } catch (error) {
   
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/api/job_opening/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body; // Assuming the updated data is sent in the request body

  try {
    const result = await pool.query(
      'UPDATE job_opening SET posting_title = $1, target_date = $2, date_opened = $3, annual_ctc = $4, postal_code= $5, city= $6, state= $7, country = $8, job_description= $9, requirements= $10, benefits = $11, assigned_manager = $12 ,vendor_id = $13 , client_id = $14 WHERE job_code = $15',
      [
        updatedData.v2,
        updatedData.selectedDate,
        updatedData.selectedDate1,
        updatedData.v3,
        updatedData.v4,
        updatedData.v5,
        updatedData.v6,
        updatedData.v7,
        updatedData.v8,
        updatedData.v9,
        updatedData.v10,
        updatedData.v11,
        updatedData.selectedOption1,
        updatedData.selectedOption,
        id
      ]
    );

    res.json(result.rows[0]); 
  } catch (error) {
    console.error('Error updating job opening', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/candidate_form', async (req, res) => {

  const {randomIdentity,pre,firstName,lastName,emails,secondary_email,totalExperience,currentJobTitle,currentEmployer,currentSalary,expectedSalary,additionalInfo,aadharCardNumber,panCardNumber,source,handledBy,mobileFields,twitter,facebook,linkedin,instagram,otherMediaName,socialMediaId,addresses,educationalDetails,experienceDetails} = req.body; // 

  try {
    
    
    const result = await pool.query(
      'INSERT INTO candidate (resume_id,prefix, first_name, last_name, email, secondary_email, total_exp, current_job_title, current_employer, current_salary,expected_salary,additional_information,addahar_card_no,pan_card_no,source,handled_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12,$13,$14,$15,$16) RETURNING *',
      [
       randomIdentity, pre,firstName,lastName,emails,secondary_email ||null,totalExperience,currentJobTitle||null,currentEmployer||null,currentSalary||null,expectedSalary||null,additionalInfo||null,aadharCardNumber||null,panCardNumber||null,source||null,handledBy
      ]
    );
   
    for (const mobileNumber of mobileFields) {
      if(mobileNumber.value!==''){
        await pool.query('insert into mobile_candidate (resume_id,mobile) values($1,$2)',[
          randomIdentity,
          mobileNumber.value
        ])
      }
      
    }
    
    for (const address of addresses) {
      if(address.address!=''){
        const temp = address.isTemporary?'t':'p';
        if(address.value!==''){
          await pool.query('insert into address (resume_id,address,type) values($1,$2,$3)',[
            randomIdentity,
            address.address,
            temp
          ])
        }
      }
      
      
    }

    for(const detail of educationalDetails){
      if(detail.institute!='' && detail.major !='' && detail.eduStartMonth!='' && detail.eduStartYear!='' && detail.eduEndMonth !='' && detail.eduEndYear !='')
      
      {
        const type = detail.isSchoolEducation ? 's' : 'd';
      if(detail.isCurrentlyPursuing){
        detail.eduEndMonth=null;
        detail.eduEndYear=null;
      }
      await pool.query(
        'INSERT INTO educational_details (resume_id, institute, major, type, start_month, start_year, end_month, end_year, degree) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [
          randomIdentity,
          detail.institute,
          detail.major,
          type,
          detail.eduStartMonth || null,
          detail.eduStartYear  || null,
          detail.eduEndMonth  || null,
          detail.eduEndYear,
          detail.degree
        ]
      );
      }
    }
    for(const detail of experienceDetails){
      if(detail.occupation!='' && detail.company !='' && detail.experienceSummary!='' && detail.expStartMonth!='' && detail.expStartMonth !='' && detail.expEndMonth !='' && detail.expEndYear){
        if(detail.isCurrentlyPursuing){
          detail.eduEndMonth=null;
          detail.eduEndYear=null;
        }
        await pool.query(
          'INSERT INTO experience_details (resume_id, occupation,company, summary, start_month, start_year, end_month, end_year) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
          [
            randomIdentity,
            detail.occupation,
            detail.company,
            detail.experienceSummary,
            detail.expStartMonth,
            detail.expStartYear,
            detail.expEndMonth,
            detail.expEndYear]
            );
          
      }
     
    }
    
    if(twitter!=''){
       await pool.query('insert into social_media(resume_id,social_id,social_media,type)values($1,$2,$3,$4)',[randomIdentity,twitter,'Twitter','p'])
      }
      if(facebook!=''){
        await pool.query('insert into social_media(resume_id,social_id,social_media,type)values($1,$2,$3,$4)',[randomIdentity,facebook,'Face Book','p'])
       }
       if(instagram!=''){
        await pool.query('insert into social_media(resume_id,social_id,social_media,type)values($1,$2,$3,$4)',[randomIdentity,instagram,'Instagram','p'])
       }
       if(linkedin!=''){
        await pool.query('insert into social_media(resume_id,social_id,social_media,type)values($1,$2,$3,$4)',[randomIdentity,linkedin,'Linked In','p'])
       }
       if(otherMediaName!='' && socialMediaId!=''){
        await pool.query('insert into social_media(resume_id,social_id,social_media,type)values($1,$2,$3,$4)',[randomIdentity,socialMediaId,otherMediaName,'u'])
       }
    
    res.json(result.rows[0]); 
  } catch (error) {
    console.error('Error updating job opening', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/vendor_form/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM vendor WHERE vendor_id = $1', [id]);
    const result2 = await pool.query('SELECT * FROM mobile_vendor WHERE vendor_id = $1', [id]);

    res.json({
      vendorData: result.rows[0], // Assuming job_code is unique and returns only one row
      mobileVendorData: result2.rows
    });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/job_opening/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM job_opening WHERE job_code = $1', [id]);
    res.json(result.rows[0]); // Assuming job_code is unique and returns only one row
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/vendor_form/:id', async (req, res) => {
  const { id } = req.params;
  const {vendorName,email,phone,website,vendorOwner,termsOfService,postalCode,mainAddress,mobileFields} = req.body;

  try {
    const result = await pool.query(
      'UPDATE vendor SET vendor_name = $1, email = $2, website = $3, vendor_owner = $4, terms_of_service = $5, postal_code = $6, main_address = $7 ,phone = $8 WHERE vendor_id = $9',
      [
        vendorName||null,email||null,website||null,vendorOwner||null,termsOfService||null,postalCode||null,mainAddress||null,phone||null,
        id
      ]
    );
    await pool.query('delete from  mobile_vendor where vendor_id = $1', 
    [id]);
   
    for (const mobileNumber of mobileFields) {
      if(mobileNumber.value!==''){
        await pool.query('insert into mobile_vendor values ($1,$2)', 
        [id,mobileNumber.value]);
      }
      
    }

    res.json(result.rows[0]); 
  } catch (error) {
    console.error('Error updating vendor', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/candidate_form/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM candidate WHERE resume_id = $1',
      [id]
    );

    const mobileResult = await pool.query(
      'SELECT * FROM mobile_candidate WHERE resume_id = $1',
      [id]
    );

    const addressResult = await pool.query(
      'SELECT * FROM address WHERE resume_id = $1',
      [id]
    );

    const eduResult = await pool.query(
      'SELECT * FROM educational_details WHERE resume_id = $1',
      [id]
    );

    const expResult = await pool.query(
      'SELECT * FROM experience_details WHERE resume_id = $1',
      [id]
    );

    const socialResult = await pool.query(
      'SELECT * FROM social_media WHERE resume_id = $1',
      [id]
    );

    // Combine the results into a single JSON response
    const responseData = {
      candidate: result.rows[0],
      mobile: mobileResult.rows,
      address: addressResult.rows,
      educational_details: eduResult.rows,
      experience_details: expResult.rows,
      social_media: socialResult.rows,
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/candidate_form/:id', async (req, res) => {
  const { id } = req.params;
  const {
    pre,
    firstName,
    lastName,
    emails,
    secondary_email,
    totalExperience,
    currentJobTitle,
    currentEmployer,
    currentSalary,
    expectedSalary,
    additionalInfo,
    aadharCardNumber,
    panCardNumber,
    source,
    handledBy,
    mobileFields,
    twitter,
    facebook,
    linkedin,
    instagram,
    otherMediaName,
    socialMediaId,
    addresses,
    educationalDetails,
    experienceDetails,
  } = req.body;

  try {
    await pool.query(
      'UPDATE candidate SET prefix = $1, first_name = $2, last_name = $3, email = $4, secondary_email = $5, total_exp = $6, current_job_title = $7, current_employer = $8, current_salary = $9, expected_salary = $10, additional_information = $11, addahar_card_no = $12, pan_card_no = $13, source = $14, handled_by = $15 WHERE resume_id = $16',
      [
        pre,
        firstName,
        lastName,
        emails,
        secondary_email || null,
        totalExperience,
        currentJobTitle || null,
        currentEmployer || null,
        currentSalary || null,
        expectedSalary || null,
        additionalInfo || null,
        aadharCardNumber || null,
        panCardNumber || null,
        source || null,
        handledBy,
        id,
      ]
    );

    // Delete existing mobile records for the candidate
    await pool.query('DELETE FROM mobile_candidate WHERE resume_id = $1', [id]);

    // Insert new mobile records
    for (const mobileNumber of mobileFields) {
      if (mobileNumber.value !== '') {
        await pool.query('INSERT INTO mobile_candidate (resume_id, mobile) VALUES ($1, $2)', [
          id,
          mobileNumber.value,
        ]);
      }
    }

    // Delete existing address records for the candidate
    await pool.query('DELETE FROM address WHERE resume_id = $1', [id]);

    // Insert new address records
    for (const address of addresses) {
      if (address.address !== '') {
        const temp = address.isTemporary ? 't' : 'p';
        await pool.query(
          'INSERT INTO address (resume_id, address, type) VALUES ($1, $2, $3)',
          [id, address.address, temp]
        );
      }
    }

    // Delete existing educational_details records for the candidate
    await pool.query('DELETE FROM educational_details WHERE resume_id = $1', [id]);

    // Insert new educational_details records
    for (const detail of educationalDetails) {
      if (
        detail.institute !== '' &&
        detail.major !== '' &&
        detail.eduStartMonth !== '' &&
        detail.eduStartYear !== '' &&
        detail.eduEndMonth !== '' &&
        detail.eduEndYear !== ''
      ) {
        const type = detail.isSchoolEducation ? 's' : 'd';
        if (detail.isCurrentlyPursuing) {
          detail.eduEndMonth = null;
          detail.eduEndYear = null;
        }
        await pool.query(
          'INSERT INTO educational_details (resume_id, institute, major, type, start_month, start_year, end_month, end_year, degree) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
          [
            id,
            detail.institute,
            detail.major,
            type,
            detail.eduStartMonth || null,
            detail.eduStartYear || null,
            detail.eduEndMonth || null,
            detail.eduEndYear,
            detail.degree,
          ]
        );
      }
    }

    // Delete existing experience_details records for the candidate
    await pool.query('DELETE FROM experience_details WHERE resume_id = $1', [id]);

    // Insert new experience_details records
    for (const detail of experienceDetails) {
      if (
        detail.occupation !== '' &&
        detail.company !== '' &&
        detail.experienceSummary !== '' &&
        detail.expStartMonth !== '' &&
        detail.expStartMonth !== '' &&
        detail.expEndMonth !== '' &&
        detail.expEndYear
      ) {
        if (detail.isCurrentlyPursuing) {
          detail.expEndMonth = null;
          detail.expEndYear = null;
        }
        await pool.query(
          'INSERT INTO experience_details (resume_id, occupation, company, summary, start_month, start_year, end_month, end_year) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
          [
            id,
            detail.occupation,
            detail.company,
            detail.experienceSummary,
            detail.expStartMonth,
            detail.expStartYear,
            detail.expEndMonth,
            detail.expEndYear,
          ]
        );
      }
    }

    // Update or insert social media records
    const socialMediaTypes = ['Twitter', 'Face Book', 'Instagram', 'Linked In'];

    for (const type of socialMediaTypes) {
      const value = type.toLowerCase();
      if (req.body[value] !== '') {
        await pool.query(
          'UPDATE social_media SET social_id = $2 WHERE resume_id = $1 AND social_media = $3',
          [id, req.body[value], type]
        );
      }
    }
    
    if (otherMediaName !== '' && socialMediaId !== '') {
      await pool.query(
        'UPDATE social_media SET social_id = $2 WHERE resume_id = $1 AND social_media = $3',
        [id, socialMediaId, otherMediaName]
      );
    }
    

    res.json({ message: 'Candidate information updated successfully' });
  }catch (error) {
    console.error('Error updating job opening', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
