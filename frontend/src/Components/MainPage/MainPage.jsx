import React from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
export default function MainPage() {
  const bgImageStyle = {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
    height: "100vh",
    backgroundSize: "cover",
  };

  return (
    <div>
      <div className="bg-image" style={bgImageStyle}>
        <div className="container h-100 d-flex justify-content-center text-white">
          <div className="jumbotron my-auto">
            <h1 className="display-3">Question Paper Quality Analyzing Tool</h1>
        <button className="btn btn-success pm-2 fs-4">Start Using
       </button>
       <a href="#next">
       <button className="btn btn-success pm-2 fs-4 rounded m-2"> 
       <ArrowForwardIosIcon  />
       </button>
       </a>
            </div>
        </div>
      </div>
      <h1 id="next"></h1>
    </div>
  );
}
