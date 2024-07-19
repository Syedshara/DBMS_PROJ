import React from 'react'
import Sec1 from  '../section/Sec1'
import Sec2 from  '../section/Sec2'
import Sec3 from  '../section/Sec3'
import Sec4 from  '../section/Sec4'

const Section = ({resetForm,addJobPosting,v1,v2,setV1,setV2,selectedDate,setSelectedDate,selectedDate1,setSelectedDate1,v3,v4,setV3,setV4,v5,v6,setV5,setV6,v7,v8,setV7,setV8,v9,v10,setV9,setV10,v11,setV11,setSelectedOption,selectedOption,setSelectedOption1,selectedOption1,jobOpening,setJobOpening,id,editform,check,setCheck,optionData,optionData1}) => {
  return (
    <div className='Section'>
         <Sec1 v1={v1} v2 = {v2} v11 = {v11}  setV1={setV1} setV2={setV2} setV11={setV11}  selectedOption={selectedOption}
      setSelectedOption={setSelectedOption} selectedOption1={selectedOption1}
      setSelectedOption1={setSelectedOption1} 
      jobOpening={jobOpening} setJobOpening={setJobOpening} check={check} setCheck={setCheck}
      optionData={optionData}
      optionData1={optionData1}
      />
         <Sec2 selectedDate={selectedDate} setSelectedDate={setSelectedDate} selectedDate1={selectedDate1} setSelectedDate1={setSelectedDate1} v3={v3} setV3={setV3}
           jobOpening={jobOpening} setJobOpening={setJobOpening}/>
         <Sec3 v4={v4} setV4={setV4} v5={v5} setV5={setV5} v6={v6} setV6={setV6} v7={v7} setV7={setV7}
           jobOpening={jobOpening} setJobOpening={setJobOpening}/>
         <Sec4 v8={v8} setV8={setV8} v9={v9} setV9={setV9} v10={v10} setV10={setV10} resetForm={resetForm} addJobPosting={addJobPosting}
           jobOpening={jobOpening} setJobOpening={setJobOpening} id={id} editform={editform}
           />

    </div>
  )
}

export default Section