import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { FormActions } from '../../store/store';
import { FaCircleInfo } from "react-icons/fa6";


const field = [
  {
    id: 1,
    label: "College Name",
    name: "Collegename",
  },
  {
    id: 2,
    label: "Branch",
    name: "branch",
  },
  {
    id: 3,
    label: "Year Of Study",
    name: "year",
  },
  {
    id: 4,
    label: "Semester",
    name: "semester",
  },
  {
    id: 5,
    label: "Course Name",
    name: "cname",
  },
  {
    id: 6,
    label: "Course Code",
    name: "ccode",
  },
  {
    id: 7,
    label: "Course Teacher",
    name: "cteacher",
  },
  {
    id: 8,
    label: "No. Of Questions",
    name: "NOQuestions",
  },
  {
    id: 9,
    label: "Total Marks",
    name: "TMarks",
  },
  {
    id: 10,
    label: "University Name",
    name: "UName",
  },
];

const Form = () => {
  const dispatch = useDispatch();
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
    "University Name": '',
  });

  useEffect(() => {
    dispatch(FormActions.changeFormData(formData));
  }, [formData, dispatch]);

  const handleChange = (e, label) => {
    setFormData((prevForm) => ({
      ...prevForm,
      [label]: e.target.value,
    }));
  };

  return (
    <div className="mt-4 p-3">
      <div className="heading container-fluid d-flex align-items-center justify-content-start">
        <h1>Enter Details</h1>
        <FaCircleInfo />
        <span className="tooltiptext">Metadata to be used for information purpose</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {field.map(item => (
              <TextField
                key={item.id}
                label={item.label}
                name={item.name}
                onChange={(e) => handleChange(e, item.label)}
                required
                style={{
                  margin: '8px',
                  flexBasis: 'calc(25% - 16px)', // Two fields per row
                  background: 'white',
                }}
              />
            ))}
          </div>
        </div>
        {/* <div>
          <img
            src="https://res.cloudinary.com/dcglxmssd/image/upload/v1729187756/lh0doufcqv968mepmxoz.svg"
            alt="side image"
            style={{ width: '400px', height: 'auto', marginLeft: '20px',marginRight:"15em" }}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Form;
