import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux'
import {FormActions} from '../../store/store';


const field=[
    {
        id:1,
        label:"College Name",
        name:"Collegename",
    },
    {
        id:2,
        label:"Branch",
        name:"branch",
    },
    {
        id:3,
        label:"Year Of Study",
        name:"year",
    },
    {
        id:4,
        label:"Semester",
        name:"semster",
    },
    {
        id:5,
        label:"Course Name",
        name:"cname",
    },
    {
        id:6,
        label:"Course Code",
        name:"ccode",
    },
    {
        id:7,
        label:"Course Teacher",
        name:"cteacher",
    },
    {
        id:8,
        label:"No. Of Questions",
        name:"NOQuestions",
    },
    {
        id:9,
        label:"Total Marks",
        name:"TMarks",
    },
    {
        id:10,
        label:"Time in Hrs",
        name:"time",
    },
    {
        id:11,
        label:"CO1",
        name:"CO1",
    },
    {
        id:12,
        label:"CO2",
        name:"CO2",
    },
    {
        id:13,
        label:"CO3",
        name:"CO3",
    },
    {
        id:14,
        label:"Hours per module (1 to 6 space seperated) ",
        name:"ModuleHrs",
    },
  ]

const Form = () => {
  const dispatch=useDispatch();
  const [formData, setFormData] = useState({
    "College Name": '',
    "Branch": '',
    "Year Of Study": '',
    "Semester": '',
    "Course Name": '',
    "Course Code": '',
    "Course Teacher": '',
    "No. Of Questions": '',
    "Total Marks": '',
    "Time in Hrs": '',
    "CO1": '',
    "CO2": '',
    "CO3": '',
    "ModuleHrs":''
  });

  useEffect(()=>{
    dispatch(FormActions.changeFormData(formData));
  },[formData])

  const handleChange = (e, label) => {
    setFormData((prevForm) => {
      // Create a new copy of the form data object
      const newForm = { ...prevForm };
      // Update the value of the specified label
      newForm[label] = e.target.value;
      return newForm;
    });
  };
  


  return (<>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {field.map(item=>
            <TextField
            key={item.id}
            label={item.label}
            name={item.name}
            onChange={(e) => handleChange(e, item.label)}
            required
            style={{ margin: '8px', flexBasis: 'calc(25% - 16px)' }}
          />
        )}
    </div>
    </>
  );
};

export default Form;
