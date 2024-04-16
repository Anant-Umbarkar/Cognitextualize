import React from 'react'
import classes from './ModuleResult.module.css'

const ModuleResult = ({moduleData, label}) => {
  return (
    <div className={classes.ModuleResult}>
        <h2>{label} wise analysis:</h2>
        <div className={classes.ModuleResult_columns}>
            <p>{label}</p>
            <p>Expected</p>
            <p>Actual</p>
        </div>
        <div className={classes.ModuleResult_data}>
            {moduleData.map((item,i)=>{
                return <div className={classes.ModuleResult_Inner}>
                <p>{label=="Blooms"?"Level":label} {i+1}</p>
                <p>{parseInt(item.expected)}%</p>
                <p>{parseInt(item.actual)}%</p>
                </div>
            })}
            
        </div>
    </div>
  )
}

export default ModuleResult