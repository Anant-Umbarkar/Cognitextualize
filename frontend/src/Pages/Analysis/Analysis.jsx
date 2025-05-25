import React, { useEffect, useState,useRef } from 'react'
import UploadFileBtn from '../../Components/UI/Button/UploadFileBtn'
import axios from 'axios'
import Sequence from '../../Components/Sequence/Sequence';
import { useSelector } from 'react-redux';
import StickyHeadTable from '../../Components/UI/StickyHeadTable/StickyHeadTable';
import Form from '../../Components/Form/Form';
import Module from '../../Components/Module/Module';
import CO from '../../Components/CO/CO';
import ModuleResult from '../../Components/ModuleResult/ModuleResult';
import MainPage from '../../Components/MainPage/MainPage';
import Footer from '../../Components/Footer/Footer';
import GradientProgress from '../../Components/UI/ProgressBar/GradientProgress';
import BloomTaxonomyTriangle from '../../Components/UI/Triangle/BloomTaxonomyTriangle';
import './Analysis.css';
import QuestionResults from '../../Components/Question_Results/QuestionResults';
import PieChartModule from '../../Components/UI/Pie_chart/PieChartModule';
import Wrapper from '../../Components/UI/wrapper/Wrapper';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Report from '../Report/Report';

let Dummydata={
  "QuestionData": [
      {
          "Question Type": "Obj",
          "QN": "Q1",
          "SubQN": "A)",
          "Q": "What are Primary Standard? Discuss criteria/Requirements for choosing primary \nstandard substances towards preperation of standard solutions used in titrimetry. \n6\nCO3Module 1",
          "M": 12,
          "CO": "CO3",
          "Module": "Module 1",
          "Bloom's Verbs": "What, Discuss",
          "Bloom's Taxonomy Level": 2,
          "Remark": "Matches Expected Blooms Level"
      },
      {
          "Question Type": "An-S",
          "QN": "Q1",
          "SubQN": "B)",
          "Q": "List different sources of natural water and compare them with respect to Purity, \nImpurities present and their significance.\n--OR--\nDefine hardness of water? Why it is caused. List different units used to measure \nhardness of water with interrelation among them.\n6\nCO2Module 2",
          "M": 12,
          "CO": "CO2",
          "Module": "Module 2",
          "Bloom's Verbs": "List, compare, Define, Why, List, measure",
          "Bloom's Taxonomy Level": 5,
          "Remark": "Lower then Expected Blooms Level"
      },
      {
          "Question Type": "Desc",
          "QN": "Q1",
          "SubQN": "C)",
          "Q": "With neat labeled diagram, discuss Pb-Ag system. 6\nCO1Module 3",
          "M": 12,
          "CO": "CO1",
          "Module": "Module 3",
          "Bloom's Verbs": "discuss",
          "Bloom's Taxonomy Level": 2,
          "Remark": "Lower then Expected Blooms Level"
      },
      {
          "Question Type": "Obj",
          "QN": "Q2",
          "SubQN": "A)",
          "Q": "Define alloy and discuss with example purposes of making alloys.\n--OR--\nWhat are carbon steels? How are they classified? Give composition, properties and \nuses of High Carbon Steel.\n4\nCO3Module 4",
          "M": 8,
          "CO": "CO3",
          "Module": "Module 4",
          "Bloom's Verbs": "Define, discuss, What, How, Give",
          "Bloom's Taxonomy Level": 2,
          "Remark": "Matches Expected Blooms Level"
      },
      {
          "Question Type": "Obj",
          "QN": "Q2",
          "SubQN": "B)",
          "Q": "State compound composition of Portland cement and mention functions of each \nconstituent in setting and hardening of Portland cement with reactions.\n6\nCO3Module 4\n\n(P.T.O.)",
          "M": 12,
          "CO": "CO3",
          "Module": "Module 4",
          "Bloom's Verbs": "State",
          "Bloom's Taxonomy Level": 1,
          "Remark": "Higher then Expected Blooms Level"
      },
      {
          "Question Type": "Desc",
          "QN": "Q3",
          "SubQN": "A)",
          "Q": "With neat labeled diagram discuss constuction and working of TGA equipment. With \nproper example describe TGA thermogram. List at least four applications. \n10\nCO1Module 6",
          "M": 20,
          "CO": "CO1",
          "Module": "Module 6",
          "Bloom's Verbs": "discuss, describe, List",
          "Bloom's Taxonomy Level": 2,
          "Remark": "Lower then Expected Blooms Level"
      },
      {
          "Question Type": "An-M",
          "QN": "Q3",
          "SubQN": "B)",
          "Q": "Following data was recorded while determining calorific value of gaseous fuel by \nBoy’s gas calorimeter.\ni) Volume of gas burnt at STP = 0.09m3\nii) Mass of water used in time ‘t’ = 24 Kg\niii)Temperature of inlet water = 22 0C\niv) Temperature of outlet  water = 35 0C\nv) Mass of steam condensed = 0.03 Kg\nCalculate Higher and Lower calorific value.\n(Given: Latent heat of condensation of water vapour 587 Kcal/Kg)\n\n3\nCO2Module 5",
          "M": 6,
          "CO": "CO2",
          "Module": "Module 5",
          "Bloom's Verbs": "Calculate",
          "Bloom's Taxonomy Level": 3,
          "Remark": "Lower then Expected Blooms Level"
      },
      {
          "Question Type": "An-M",
          "QN": "Q3",
          "SubQN": "C)",
          "Q": "A sample of coal containing 5% hydrogen was tested in Bomb Calorimeter for it’s \ncalorific value, following data were recorded. Weight of coal burnt= 0.98gm, Acid \ncorrection = 55 Cal. Rise in temperature = 2.52 0C, Water equivalent of bomb & \ncalorimeter = 550 gm, Weight of water taken in copper calorimeter = 2200 gm     \nLatent heat of condensation of steam = 587 cal/gm\nCalculate Gross & Net calorific value.\n4\nCO2Module 5",
          "M": 8,
          "CO": "CO2",
          "Module": "Module 5",
          "Bloom's Verbs": "Calculate",
          "Bloom's Taxonomy Level": 3,
          "Remark": "Lower then Expected Blooms Level"
      },
      {
          "Question Type": "An-M",
          "QN": "Q3",
          "SubQN": "D)",
          "Q": "Compare solid and gaseous fuels with respect to Calorific value,Ignition temperature, \nVelocity of combustion, Control of combustion, Risk of fire hazard, use for IC \nengines, Transport and storage, Products of combustion.\n5\nCO2Module 2\n\n(P.T.O.)\nDONOT MAKE THIS DOCU PUBLIC\nSELECT COURSE CODE\nDr. Pendse M.H. - Powar A.A.\n218\n20%\n\n(P.T.O.)",
          "M": 10,
          "CO": "CO2",
          "Module": "Module 2",
          "Bloom's Verbs": "Compare, use",
          "Bloom's Taxonomy Level": 3,
          "Remark": "Lower then Expected Blooms Level"
      }
  ],
  "ModuleData": [
      {
          "expected": 20.588235294117645,
          "actual": 12
      },
      {
          "expected": 14.705882352941178,
          "actual": 22
      },
      {
          "expected": 17.647058823529413,
          "actual": 12
      },
      {
          "expected": 14.705882352941178,
          "actual": 20
      },
      {
          "expected": 17.647058823529413,
          "actual": 14
      },
      {
          "expected": 14.705882352941178,
          "actual": 20
      }
  ],
  "BloomsData": [
      {
          "expected": 50,
          "actual": 12
      },
      {
          "expected": 30,
          "actual": 52
      },
      {
          "expected": 20,
          "actual": 24
      },
      {
          "expected": 0,
          "actual": 0
      },
      {
          "expected": 0,
          "actual": 12
      },
      {
          "expected": 0,
          "actual": 0
      }
  ],
  "COData": [
      {
          "expected": 50,
          "actual": 32
      },
      {
          "expected": 30,
          "actual": 36
      },
      {
          "expected": 20,
          "actual": 32
      }
  ]
}

let dummyBloomSeq={
  '1': {
    level: 1,
    weights: 50,
    marks: 0,
    BT_penalty: 0,
    No_Of_Questions: 0
  },
  '2': {
    level: 2,
    weights: 30,
    marks: 0,
    BT_penalty: 0,
    No_Of_Questions: 0
  },
  '3': {
    level: 3,
    weights: 20,
    marks: 0,
    BT_penalty: 0,
    No_Of_Questions: 0
  },
  '4': { level: 0, weights: 0, marks: 0, BT_penalty: 0, No_Of_Questions: 0 },
  '5': { level: 0, weights: 0, marks: 0, BT_penalty: 0, No_Of_Questions: 0 },
  '6': { level: 0, weights: 0, marks: 0, BT_penalty: 0, No_Of_Questions: 0 }
};

let dummySeq=[
  {
      "id": 1,
      "FieldTitle": "Question Type",
      "FieldType": "QT",
      "DenotedBy": "An-M Desc An-S Obj"
  },
  {
      "id": 2,
      "FieldTitle": "QN",
      "FieldType": "QN",
      "DenotedBy": "Q"
  },
  {
      "id": 3,
      "FieldTitle": "SubQN",
      "FieldType": "QN",
      "DenotedBy": "A"
  },
  {
      "id": 4,
      "FieldTitle": "Q",
      "FieldType": "Q",
      "DenotedBy": "Def"
  },
  {
      "id": 5,
      "FieldTitle": "M",
      "FieldType": "Mrk",
      "DenotedBy": "Def"
  },
  {
      "id": 6,
      "FieldTitle": "CO",
      "FieldType": "CO",
      "DenotedBy": "Def"
  },
  {
      "id": 7,
      "FieldTitle": "Module",
      "FieldType": "MO",
      "DenotedBy": "Def"
  }
];

let COINFO_dummy=[
  {
      "id": 1,
      "score": "5",
      "level": "1"
  },
  {
      "id": 2,
      "score": "3",
      "level": "2"
  },
  {
      "id": 3,
      "score": "2",
      "level": "3"
  }
];

const GetLevel=(coString)=>{
  console.log(coString)
  let CO_int= parseInt(coString.replace("CO", ""), 10);
  console.log(CO_int)
  let found=COINFO_dummy.find(item=>item.id==CO_int);
  // console.log(coString,found.level)
  return parseInt(found.level,10);
}

const transformModuleData = (data, type, labels) => {
  // Create a new array by mapping over the data
  // console.log(data)
  return data.map((item, index) => ({
    label: `${labels} ${index + 1}`, // Append the index (starting from 1) to the label
    value: item[type]      // Use either 'expected' or 'actual' based on the 'type' argument
  }));
  return [];
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
];

const Analysis = () => {
  // file state
  const [file, setfile] = useState(null);
  const [tableData,setTableData]=useState({data:[],columns:[]});
  const [Overall,setOverall]=useState({CO:{},Bloom:{},Module:{}});
  const [moduleImprove,setModuleImprove]=useState([]);
  const [BloomImprove,setBloomImprove]=useState([]);
  const [COImprove,setCOImprove]=useState([]);
  const state=useSelector(state=>state);
  const [updatedBloom,setUpdatedBloom]=useState({})

  const CO_e_chart = useRef();
  const CO_a_chart = useRef();
  const MO_e_chart = useRef();
  const MO_a_chart = useRef();
  const BT_e_chart = useRef();
  const BT_a_chart = useRef();

  // console.log(state) 

  // useEffect(()=>{

  //   let actualModuleData=transformModuleData(tableData.data.ModuleData,"actual","Module");
  //   let expectedModuleData=transformModuleData(tableData.data.ModuleData,"expected","Module");

  //   let actualCOData=transformModuleData(tableData.data.COData,"actual","CO");
  //   let expectedCOData=transformModuleData(tableData.data.COData,"expected","CO");

  //   let actualBloomData=transformModuleData(tableData.data.BloomsData,"actual","Bloom");
  //   let expectedBloomData=transformModuleData(tableData.data.BloomsData,"expected","Bloom");

  //   let overallData={
  //     CO:{
  //       actual:actualCOData,
  //       expected:expectedCOData
  //     },
  //     Bloom:{
  //       actual:actualBloomData,
  //       expected:expectedBloomData
  //     },
  //     Module:{
  //       actual:actualModuleData,
  //       expected:expectedModuleData
  //     }
  //   };

  //   let improve=[];

  //   for(let i=0;i<actualModuleData.length;i++){
  //     if((actualModuleData[i].value-expectedModuleData[i].value)<0){
  //       improve.push(actualModuleData[i].label);
  //     }
  //   }

  //   setModuleImprove(improve);

  //   improve=[];
  //   for(let i=0;i<actualBloomData.length;i++){
  //     if((actualBloomData[i].value-expectedBloomData[i].value)<0){
  //       improve.push(actualBloomData[i].label);
  //     }
  //   }

  //   setBloomImprove(improve);

  //   improve=[];
  //   for(let i=0;i<actualCOData.length;i++){
  //     console.log(actualCOData[i].label,(actualCOData[i].value-expectedCOData[i].value),actualCOData[i].value,expectedCOData[i].value)
  //     if((actualCOData[i].value-expectedCOData[i].value)<0){
  //       improve.push(actualCOData[i].label);
  //     }
  //   }

  //   setCOImprove(improve);  

  //   improve=[];

  //   setOverall(overallData);
  // },[tableData])

  

  


  // UNCOMMENT THIS PART

  useEffect(() => {
    let sequence=state.Sequence;
    COINFO_dummy=state.COInfo;
    let moduleHrs=[];
    let copref={};

    state.ModuleInfo.map(item=>{
      moduleHrs=[...moduleHrs,item.hours]
    });

    COINFO_dummy.map(item=>{
      copref[item.id]={
        level:+item.level,
        score:(+item.score)*10
      }
    });


    const uploadFileHandler = async () => {

      const FileData = new FormData();
      FileData.append("FormData",JSON.stringify(state.FormData));
      FileData.append("ModuleInfo",JSON.stringify(moduleHrs));
      FileData.append("COPref",JSON.stringify(copref));
      FileData.append("file", file);
      // FileData.append("upload_preset", "gmcn2mfb");
      console.log(moduleHrs);
      // check if file is allowed
      const allowed = [
        "image/jpeg",
        "image/png",
        "application/pdf",
        "text/csv",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Add .xlsx
    ];
    
      
      if (!allowed.includes(file.type)) {
        alert("Invalid filetype!!");
        return;
      }
      

      // upload the file on cloudinary
      // await axios
      //   .post(
      //     "https://api.cloudinary.com/v1_1/dcglxmssd/auto/upload",
      //     FileData
      //   ).then(res => {
      //     if (res.status == 200) {
      //       axios.post(import.meta.env.VITE_BACKEND_URL + "/totext/",{fileurl:res.data.url}, {
      //         "Content-Type": "application/json"
      //       }).then(data => {
      //         console.log(data);
      //       })
      //       console.log(res)
      //     } else {
      //       alert("Error uploading the file")
      //     }
      //   });

    

      const token = localStorage.getItem('token');

      // Sending request to get the result
      // axios.post("https://cognitextualize-9mqt.onrender.com/totext/",FileData, {
      axios.post("http://localhost/totext/",FileData, {
        "Content-Type": "multipart/form-data",
        headers:{
          Authorization:`Bearer ${token}`
        }
      }).then(data => {
        // console.log(data.data.Quesstion)
        let ColumnData=Object.keys(data.data.QuestionData[0]).map((item,i)=>{
          return {id: i,label:item,minWidth: 30, align:'center'}
        });
        // ColumnData.push(
        //   {
        //     id: 17,
        //     label: "Bloom's Verbs",
        //     minWidth: 30,
        //     align: 'center'
        //   },
        //   {
        //     id: 18,
        //     label: "Bloom's Taxonomy Level",
        //     minWidth: 30,
        //     align: 'center'
        //   },
        //   {
        //     id: 19,
        //     label: "Remark",
        //     minWidth: 30,
        //     align: 'center'
        //   },
        // );
        
        setTableData({columns:ColumnData,data:data.data});
        setUpdatedBloom(data.data.updatedBloom)

        let actualModuleData=transformModuleData(data.data.ModuleData,"actual","Module");
        let expectedModuleData=transformModuleData(data.data.ModuleData,"expected","Module");

        let actualCOData=transformModuleData(data.data.COData,"actual","CO");
        let expectedCOData=transformModuleData(data.data.COData,"expected","CO");

        let actualBloomData=transformModuleData(data.data.BloomsData,"actual","Bloom");
        let expectedBloomData=transformModuleData(data.data.BloomsData,"expected","Bloom");

        let overallData={
          CO:{
            actual:actualCOData,
            expected:expectedCOData
          },
          Bloom:{
            actual:actualBloomData,
            expected:expectedBloomData
          },
          Module:{
            actual:actualModuleData,
            expected:expectedModuleData
          }
        };

        let improve=[];
        console.log(state.ModuleInfo)
        for(let i=0;i<actualModuleData.length && i<state.ModuleInfo.length;i++){
          if((actualModuleData[i].value-expectedModuleData[i].value)<0){
            improve.push(actualModuleData[i].label);
          }
        }

        setModuleImprove(improve);

        improve=[];
        for(let i=0;i<actualBloomData.length;i++){
          if((actualBloomData[i].value-expectedBloomData[i].value)<0){
            improve.push(actualBloomData[i].label);
          }
        }

        setBloomImprove(improve);

        improve=[];
        for(let i=0;i<actualCOData.length;i++){
          console.log(actualCOData[i].label,(actualCOData[i].value-expectedCOData[i].value),actualCOData[i].value,expectedCOData[i].value)
          if((actualCOData[i].value-expectedCOData[i].value)<0){
            improve.push(actualCOData[i].label);
          }
        }

        setCOImprove(improve);  

        improve=[];

        setOverall(overallData);
        console.log(data);
      })

      

        // test without uploading the file
      // axios.post(import.meta.env.VITE_BACKEND_URL + "/totext/",{fileurl:"https://google.com"}, {
      //   "Content-Type": "application/json"
      // }).then(data => {
      //   console.log(data); 
      // })
      // console.log(res)

    }
    file != null ? uploadFileHandler() : "";
  //   let labels=["Question Type","QN","SubQN","Q","M","CO","Module","Bloom's Verbs","Bloom's Taxonomy Level","Remark"]

  //     let ColumnData=labels.map((item,ind)=>{
  //           return {id: ind,
  //           label: item,
  //           minWidth: 30,
  //           align: 'center'}
  //         },);
          
        // setTableData({columns:ColumnData,data:data.QuestionData});
  }, [file])


  return (
    <div>
      <div className='sticky-top'>
      </div>
      <MainPage/>
      <Form id="formm"/>
      {/* <div style={{width:"100%",margin:"1em auto", display:"flex",justifyContent:"center",gap:"1em"}}>
        <p><b>Select Syllabus<span style={{color:"red"}}>*</span>: </b></p>
        <input type='file'/>
      </div> */}
      <CO/>
      <Module/>
      {/* <Sequence/> */}
      <UploadFileBtn setfile={setfile} />


        {/* RESULT */}

      
      
      {tableData.data.QuestionData != undefined?
      <>
        <Wrapper mode={"light"}>
        <div style={{width:"100%",textAlign:"center",margin:"1em 0"}}>
          <h1 style={{fontWeight:"800"}}>Result</h1>
        </div>
        {/* <h1>Question wise analysis:</h1> */}
        <br></br>
        </Wrapper>  
        {tableData.data.QuestionData.map((item, index) => (
          <Wrapper mode="white" key={index}>
            <h3 style={{marginLeft:"1.5em"}}><b>Question {index+1}:</b></h3>
            <StickyHeadTable updatedBloom={tableData.data.updatedBloom} data={[item]} columns={tableData.columns}/>
            <br></br>
            <h3 style={{ marginLeft: '3em' }}>Analysis:</h3>
            <br></br>
            <div className="bloom-taxonomy-container">
              <BloomTaxonomyTriangle data={tableData.data.updatedBloom} label={"Course Outcome Bloom's Taxonomy Level"} highlightedLevel={GetLevel(item.CO)} />
              <BloomTaxonomyTriangle data={tableData.data.updatedBloom} label={"Question's Bloom's Taxonomy Level"} highlightedLevel={parseInt(item["Bloom's Taxonomy Level"],10)} />
            </div>
            <QuestionResults dummyBloomSeq={tableData.data.updatedBloom} actualLevel={tableData.data.updatedBloom[item["Bloom's Taxonomy Level"]].level} expectedLevel={updatedBloom[GetLevel(item.CO)].level} threshold={GetLevel(item.CO)}/>
            <hr></hr>
            <br></br>
            <br></br>
          </Wrapper>
        ))}
        {/* <StickyHeadTable updatedBloom={tableData.data.updatedBloom} data={tableData.data.QuestionData} columns={tableData.columns}/> */}

        <Wrapper>
        <h2 style={{margin:"1em 2em",fontWeight:"500"}}>Module wise results:</h2>
        <div 
          style={{width:"100%",margin:"1em auto", display:"flex",justifyContent:"center",gap:"1em"}}>
          <PieChartModule ref={MO_e_chart} chartLabel={"Expected"} data={Overall.Module.expected} />
          <PieChartModule ref={MO_a_chart} chartLabel={"Found"} data={Overall.Module.actual}/>
          
        </div>
        {moduleImprove.length>0?<>
          <h4 style={{margin:"0 auto", backgroundColor:"#ff000070",width:"fit-content",padding:"0.5em",borderBottom: "5px solid red"}}>Increase the marks distribution for: {moduleImprove.map(item=>{
            return <>{item}, </>;
          })}</h4>
          
          </>:null}

        <h2 style={{margin:"1em 2em",fontWeight:"500"}}>Course Outcome wise results:</h2>
        <div 
          style={{width:"100%",margin:"1em auto", display:"flex",justifyContent:"center",gap:"1em"}}>
          <PieChartModule ref={CO_a_chart} chartLabel={"Expected"} data={Overall.CO.expected}/>
          <PieChartModule ref={CO_a_chart} chartLabel={"Found"} data={Overall.CO.actual}/>
        
        </div>
        {COImprove.length>0?<>
          <h4 style={{margin:"0 auto", backgroundColor:"#ff000070",width:"fit-content",padding:"0.5em",borderBottom: "5px solid red"}}>Increase the marks distribution for: {COImprove.map(item=>{
            return <>{item}, </>;
          })}</h4>
          
          </>:null}


        <h2 style={{margin:"1em 2em",fontWeight:"500"}}>Bloom wise results:</h2>
        <div
          style={{width:"100%",margin:"1em auto", display:"flex",justifyContent:"center",gap:"1em"}}>
          <PieChartModule ref={BT_e_chart} chartLabel={"Expected"} data={Overall.Bloom.expected}/>
          <PieChartModule ref={BT_a_chart} chartLabel={"Found"} data={Overall.Bloom.actual}/>
        
        </div>
        {BloomImprove.length>0?<>
          <h4 style={{margin:"0 auto", backgroundColor:"#ff000070",width:"fit-content",padding:"0.5em",borderBottom: "5px solid red"}}>Increase the marks distribution for: {BloomImprove.map(item=>{
            return <>{item}, </>;
          })}</h4>
          
          </>:null}

          <GradientProgress title="Final Score In Percentage" expected={100} actual={tableData.data.FinalScore}/>
          </Wrapper>

        {/* <ModuleResult moduleData={tableData.data.ModuleData} label={"Module"}/> */}
        {/* <ModuleResult moduleData={tableData.data.BloomsData} label={"Blooms"}/> */}
        {/* <ModuleResult moduleData={tableData.data.COData} label={"CO"}/> */}
        {/* {overallData.CO.actual!=undefined?<GradientProgress title="Final Score In Percentage" actual={Overall.CO.actual}/>:null} */}
        <Report formdata={state.FormData} data={tableData.data} updatedBloom={tableData.data.updatedBloom}/>
      </>
      :null}
   
    </div>
  )
}

export default Analysis
