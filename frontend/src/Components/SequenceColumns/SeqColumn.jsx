import React, { useState } from 'react'
import classes from './SeqColumn.module.css'

const SeqColumn = ({id,denotedBy,fieldType,last,Add,Remove,Update,FieldTitle}) => {
  const [ftype,setFtype]=useState(fieldType);
  const [fTitle,setFtitle]=useState(FieldTitle);
  return (
    <div className={classes.SeqColumn}>
        <h3>Column {id}</h3>
        <div className={classes.SeqColumn_FieldInfo}>Field Title: <input value={fTitle} onChange={(e)=>{
          setFtitle(e.target.value);
          Update(id,"FieldTitle",e.target.value);
        }} type='text' required/>
        </div>
        <div className={classes.SeqColumn_FieldInfo}>Field Type: <select onChange={(e)=>{
          setFtype(e.target.value);
          Update(id,"FieldType",e.target.value);
        }} defaultValue={fieldType} className={classes.SeqColumn_Select}>
                <option defaultChecked value="Def">Choose</option>
                <option value="QT">Question Type</option>
                <option value="QN">Question Number</option>
                <option value="Q">Question</option>
                <option value="Mrk">Marks</option>
                <option value="CO">Course Outcome</option>
                <option value="MO">Module</option>
            </select>
        </div>
        {ftype=="QN" && ftype!="QT" ?
        <div className={classes.SeqColumn_FieldInfo}>Denoted by: <select onChange={(e)=>{
          Update(id,"DenotedBy",e.target.value);
        }} required={fieldType=="QN"} defaultValue={denotedBy} className={classes.SeqColumn_Select}>
                <option defaultChecked value="Def">Choose</option>
                <option value="Q">Q followed by Integer ex: Q1)</option>
                <option value="A">Alphabet only ex: A)</option>
                <option value="I">Integer only ex: 1)</option>
                <option value="R">Roman numbers ex: iv)</option>
            </select>
        </div>
        :null}
        {ftype!="QN" && ftype=="QT" ?
          <div className={classes.SeqColumn_FieldInfo}>Specify Types: <br></br>(space separated) <textarea 
            onChange={(e)=>{
              Update(id,"DenotedBy",e.target.value);
            }} 
            required={fieldType=="QT"} 
            className={classes.SeqColumn_Select}>
          </textarea>
        </div>
        :null}
        {last?
        <div onClick={()=>{Add()}} className={classes.SeqColumn_AddMore}>+</div>:null}
        {last && id!=1?
        <div onClick={()=>{Remove()}} className={classes.SeqColumn_Remove}>x</div>:null}
    </div>
  )
}

export default SeqColumn