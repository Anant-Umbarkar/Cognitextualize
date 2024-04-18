import React, { useEffect, useState } from 'react'
import UploadFileBtn from '../../Components/UI/Button/UploadFileBtn'
import axios from 'axios'
import Sequence from '../../Components/Sequence/Sequence';
import { useSelector } from 'react-redux';
import StickyHeadTable from '../../Components/UI/StickyHeadTable/StickyHeadTable';
import Form from '../../Components/Form/Form';
import Module from '../../Components/Module/Module';
import CO from '../../Components/CO/CO';
import ModuleResult from '../../Components/ModuleResult/ModuleResult';
import Navbar from '../../Components/Navbar/Navbar';
import MainPage from '../../Components/MainPage/MainPage';
import Footer from '../../Components/Footer/Footer';

let data={
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

const Home = () => {
  // file state
  const [file, setfile] = useState(null);
  const [tableData,setTableData]=useState({data:[],columns:[]});
  const state=useSelector(state=>state);

  useEffect(() => {
    let sequence=state.Sequence;
    let coinfo=state.COInfo;
    let moduleHrs=[];
    let copref={};

    state.ModuleInfo.map(item=>{
      moduleHrs=[...moduleHrs,item.hours]
    });

    coinfo.map(item=>{
      copref[item.id]={
        level:+item.level,
        score:(+item.score)*10
      }
    });


    const uploadFileHandler = async () => {

      const FileData = new FormData();
      FileData.append("FormData",JSON.stringify(state.FormData));
      FileData.append("Sequence",JSON.stringify(sequence));
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



      axios.post(import.meta.env.VITE_BACKEND_URL + "/totext/",FileData, {
        "Content-Type": "multipart/form-data"
      }).then(data => {
        let ColumnData=sequence.map(item=>{
          return {id: item.id,
          label: item.FieldTitle,
          minWidth: 30,
          align: 'center'}
        },);
        ColumnData.push(
          {
            id: 17,
            label: "Bloom's Verbs",
            minWidth: 30,
            align: 'center'
          },
          {
            id: 18,
            label: "Bloom's Taxonomy Level",
            minWidth: 30,
            align: 'center'
          },
          {
            id: 19,
            label: "Remark",
            minWidth: 30,
            align: 'center'
          },
        );
        
        setTableData({columns:ColumnData,data:data.data});
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
      <Navbar/>
      </div>
      <MainPage/>
      <Form id="formm"/>
      <CO/>
      <Module/>
      <Sequence/>
      <UploadFileBtn setfile={setfile} />
      {tableData.data.QuestionData!=undefined?
      <>
        <StickyHeadTable data={tableData.data.QuestionData} columns={tableData.columns}/>
        <ModuleResult moduleData={tableData.data.ModuleData} label={"Module"}/>
        <ModuleResult moduleData={tableData.data.BloomsData} label={"Blooms"}/>
        <ModuleResult moduleData={tableData.data.COData} label={"CO"}/>
        <h2 style={{"textAlign":"left"}}>Final Score In Percentage: {tableData.data.FinalScore}</h2>
      </>
      :null}
      <Footer/>
    </div>
  )
}

export default Home