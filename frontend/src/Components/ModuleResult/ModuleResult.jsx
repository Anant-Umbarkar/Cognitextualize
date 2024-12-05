import React from 'react'
import classes from './ModuleResult.module.css'
import GradientProgress from '../UI/ProgressBar/GradientProgress'
import PieChart from '../UI/Pie_chart/PieChartModule';

const ModuleResult = ({moduleData, label}) => {
  if(label=="Module"){
    moduleData.splice(6);
  }
  return (
    <div className={classes.ModuleResult}>
      <h2>{label} wise result</h2>
      {moduleData.map((item,i)=>{
                return <PieChart key={i}/> 
                // return <GradientProgress title={label+" "+i} actual={item.actual} expected={item.expected}/> 
            })}
        {/* <h2>{label} wise analysis:</h2>
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
             */}
        {/* </div> */}
    </div>
  )
}

export default ModuleResult