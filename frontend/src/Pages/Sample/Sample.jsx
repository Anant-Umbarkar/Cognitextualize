import React from 'react'
import classes from './Sample.module.css' // Ensure file name matches

const Sample = () => {
  return (
    <div className={classes.container}>
      <div className={classes.textSection}>
        <h1>Report</h1>
        <p>The report contains information such as metadata, per question analysis
        CO, Module and Bloom's Taxonomy level analysis with the overall score of the question paper
       Click below button to download report generated for a question paper</p>
        <a href='https://drive.google.com/file/d/1ZNu6UD9mWlXhLJJ2iw52nmR8JSWibJyj/view?usp=sharing'>
          <button>Download Report</button>
        </a>
      </div>
      <div className={classes.image_section}>
        <img src='https://res.cloudinary.com/dcglxmssd/image/upload/v1747158539/cloudinary/undraw_report_esij_gqprgw.svg' alt="report"/>
      </div>
    </div>
  )
}

export default Sample
