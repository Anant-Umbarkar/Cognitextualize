import React from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function MainPage() {
  return (
    <div
      className="bg-image"
      style={{
        backgroundImage: `url("https://res.cloudinary.com/dcglxmssd/image/upload/v1729187218/ht4i9pebxllaojxudptq.png")`,
        height: "90vh",
        backgroundSize: "cover",
        backgroundRepeat:"no-repeat",
        backgroundPosition: "center", // Ensures the image is centered
      }}
    ></div>
  );
}
