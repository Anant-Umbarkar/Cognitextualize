import React, { useEffect, useState } from 'react'
import UploadFileBtn from '../../Components/UI/Button/UploadFileBtn'
import axios from 'axios'
import Sequence from '../../Components/Sequence/Sequence';
import { useSelector } from 'react-redux';
import StickyHeadTable from '../../Components/UI/StickyHeadTable/StickyHeadTable';
import Form from '../../Components/Form/Form';
import Module from '../../Components/Module/Module';
import CO from '../../Components/CO/CO';

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
          }
        );
        
        setTableData({columns:ColumnData,data:data.data});
        console.log(tableData);
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
  }, [file])


  return (
    <div>
      <h2>General Info</h2>
      <Form/>
      <CO/>
      <Module/>
      <Sequence/>
      <UploadFileBtn setfile={setfile} />
      {tableData.data[0]!=undefined?<StickyHeadTable data={tableData.data} columns={tableData.columns}/>
      :null}
    </div>
  )
}

export default Home