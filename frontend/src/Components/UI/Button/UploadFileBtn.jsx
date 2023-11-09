import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';

const UploadFileBtn = ({setfile}) => {
    // ref for input
    const fileInput=useRef();

    // funtion to get file from the user
    const uploadFile=()=>{
        // open the input
        fileInput.current.value = ''; // Clear the value to allow selecting the same file
        fileInput.current.click();
    }

    // handle file change
    const handleFileChange=async(e)=>{
        // setting the file
        await setfile(e.target.files[0]);
    }
  return (<>
    <input ref={fileInput} type='file' onChange={handleFileChange} style={{display:"none"}}/>
    <button onClick={uploadFile} >Upload file</button>
    </>
  )
}

export default UploadFileBtn