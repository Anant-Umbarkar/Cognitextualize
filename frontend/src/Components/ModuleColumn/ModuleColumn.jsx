import React, { useState } from 'react'
import classes from './ModuleColumn.module.css'
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
const ModuleColumn = ({id,last,Add,Remove,Update,fieldHours}) => {
  const [fHours,setFHours]=useState(fieldHours);
  console.log(last)
  return (
    <div className={classes.ModuleColumn}>
        <h3>Module {id}</h3>
        <div className={classes.SeqColumn_FieldInfo}>Number of Hours: <input value={fHours} onChange={(e)=>{
          setFHours(e.target.value);
          Update(id,e.target.value);
        }} type='text' required/>
        </div>
        {last?
        <div onClick={()=>{Add()}} className={classes.SeqColumn_AddMore}>
          <AddIcon />
        </div>:null}
        {last && id!=1?
        <div onClick={()=>{Remove()}} className={classes.SeqColumn_Remove}>
          <CancelIcon/>
        </div>:null}
    </div>
  )
}

export default ModuleColumn