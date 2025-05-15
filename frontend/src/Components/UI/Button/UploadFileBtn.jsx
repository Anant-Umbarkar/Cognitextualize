import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadFileBtn = ({ setfile }) => {
    const fileInput = useRef();
    const navigate = useNavigate();

    // Function to handle file selection
    const handleFileChange = async (e) => {
        await setfile(e.target.files[0]);
    };

    // Function to open the file input and track click count
    const uploadFile = () => {
        // Increment click count in localStorage
        let clickCount = parseInt(localStorage.getItem('uploadClickCount')) || 0;
        clickCount += 1;
        localStorage.setItem('uploadClickCount', clickCount);

        // Check if click count exceeds threshold
        if (clickCount > 300) {
            navigate('/limit-exceeded'); // redirect path
            return;
        }

        // Open file input dialog
        fileInput.current.value = ''; // Allow re-selection of same file
        fileInput.current.click();
    };

    return (
        <div className="d-flex align-items-center justify-content-center mt-4 p-4">
            {/* Hidden file input */}
            <input
                ref={fileInput}
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            {/* Button to open file input dialog */}
            <button
                onClick={uploadFile}
                style={{"backgroundColor":"#3366ff"}}
                className="btn box-shadow border-white text-white p-3 fs-5"
            >
                Upload file
            </button>
        </div>
    );
};

export default UploadFileBtn;
