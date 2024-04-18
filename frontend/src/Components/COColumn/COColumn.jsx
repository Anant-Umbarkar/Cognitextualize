import React, { useState } from 'react'
import classes from './COColumn.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { FormActions } from '../../store/store';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
const COColumn = ({id,last,Add,Remove,Update,w8}) => {
  const [weight,setWeight]=useState(w8);
  const [BTType,setBTType]=useState();
  let selected=useSelector(state=>state.selectedCO)
  const dispatch=useDispatch();
  return (
    <div className={classes.COColumn}>
        <h3>CO{id}</h3>
        <div className={classes.inputFields}>
        <div className={classes.SeqColumn_FieldInfo}>Weightage: <input value={weight} style={{width:2+"em"}} onChange={(e)=>{
          setWeight(e.target.value);
          Update(id,"score",e.target.value);
        }} type='text' required/>
        </div>

        <div className={classes.SeqColumn_FieldInfo}>BT Level: <select style={{width:15+"em"}} onChange={(e)=>{
          if(selected.includes(e.target.value)){
            alert("Blooms Taxonomy Level Already Selected For Some Other Course Outcome")
            e.target.value="Def";
            return;
          } else {
            setBTType(e.target.value);
            Update(id,"level",e.target.value);
            dispatch(FormActions.addSelectedCO(e.target.value))
          }
          
        }} defaultValue={BTType} className={classes.SeqColumn_Select}>
                <option defaultChecked value="Def">Choose</option>
                <option value="1">Create</option>
                <option value="2">Evaluate</option>
                <option value="3">Apply</option>
                <option value="4">Understand</option>
                <option value="5">Analyse</option>
                <option value="6">Remember</option>
            </select>
        </div>
        </div>

        {last?
        <div onClick={()=>{Add()}} className={classes.SeqColumn_AddMore}>
          <AddIcon/>
        </div>:null}
        {last && id!=1?
        <div onClick={()=>{Remove()}} className={classes.SeqColumn_Remove}>
          <CancelIcon/>
        </div>:null}
    </div>
  )
}

export default COColumn