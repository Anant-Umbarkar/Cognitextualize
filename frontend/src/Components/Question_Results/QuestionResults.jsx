import React from 'react';
import classes from './QuestionResults.module.css';
import StickyHeadTable from '../UI/StickyHeadTable/StickyHeadTable';

const bloomLevelNames = {
    6: 'Remembering',
    5: 'Understanding',
    4: 'Applying',
    3: 'Analyzing',
    2: 'Evaluating',
    1: 'Creating'
  };

  let analysisColumns=[
    {
      id:1,
      label:"Name",
      align:"center",
      minWidth: 30,
    },
    {
      id:2,
      label:"Actual",
      align:"center",
      minWidth: 30,
    },
    {
      id:3,
      label:"Expected",
      align:"center",
      minWidth: 30,
    },
    {
      id:4,
      label:"Deviation",
      align:"center",
      minWidth: 30,
    },
  ];
  

const QuestionResults = ({ dummyBloomSeq, actualLevel, expectedLevel,threshold }) => {
  // Calculate deviation
  const deviation = expectedLevel-actualLevel;

  console.log(threshold)

  const levelsWithUpdatedPositions = Object.entries(dummyBloomSeq)
    .filter(([key, item]) => item.level !== "0")
    .sort(([, a], [, b]) => Number(b.level) - Number(a.level));


  // Determine background color based on deviation value
  const deviationStyle = {
    backgroundColor: deviation > 0 ? 'rgba(0, 128, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)', // Green with opacity for positive, red with opacity for negative
    color: 'white', // Text color
    padding: '10px',
    borderBottom: '4px solid '+(deviation > 0 ? 'rgba(0, 128, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)'), // Bold bottom border
    display: 'inline-block', // To contain the background around the text
  };


  return (
    <div style={{ marginLeft: '5em' }}>
        {/* <div>
            <h2>Analysis</h2>
            <div><b>Actual:</b> Above Question's Bloom's Taxonomy Level : {actualLevel}</div>
            <div><b>Expected:</b> Expected Bloom's Taxonomy Level : {expectedLevel}</div>
            <br></br>
            </div> */}

        <StickyHeadTable updatedBloom={dummyBloomSeq} type='analysis' negative={(expectedLevel-actualLevel)} columns={analysisColumns} data={[{Name:"Level",Actual:actualLevel,Expected:expectedLevel,Deviation:(expectedLevel-actualLevel)}]} />
            {/* <div style={deviationStyle}>
                <b>Deviation:</b> {deviation}
            </div> */}
        <br></br>
        {
            (deviation<0)?<div>
                <h2>Recommendation:</h2>
                <p style={{fontSize:"1.2em"}}>You can frame the question from bloom's taxonomy level <span style={{fontSize:"1.4em", color:"#3366ff",textDecoration:"underline"}}><b>{bloomLevelNames[threshold]}</b></span> and above </p>
            </div>:null
        }
    </div>
  );
};

export default QuestionResults;
