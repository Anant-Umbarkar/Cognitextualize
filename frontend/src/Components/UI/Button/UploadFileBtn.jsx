import { Button } from 'bootstrap';
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
  return (<div
    className="d-flex align-items-center justify-content-center mt-4 p-4"
>
    {/* Hidden file input */}
    <input
        ref={fileInput}
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
    />

    {/* Button to open file input dialog */}
    <button onClick={uploadFile} className="btn btn-success box-shadow border-white text-white p-3 fs-5">
        Upload file
    </button>
</div>
  )
}

export default UploadFileBtn