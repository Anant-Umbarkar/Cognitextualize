import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
// import heroImage from './your-image-path.png'; // replace with actual image path

const Home = () => {
  const [loggedIn, setloggedIn] = useState(localStorage.getItem("token"));

  useEffect(()=>{
    setloggedIn(localStorage.getItem("token"));
  },[localStorage.getItem("token")])

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <h1 className={styles.header}>Welcome to Cognitextualize</h1>
        <p className={styles.description}>
          Analyze question papers with ease and gain deep insights instantly.
        </p>
        <Link to={loggedIn?"/analyze":"/auth"}>
        <button className={styles.ctaButton}>Get Started</button>
        </Link>
      </div>
      <div className={styles.rightSection}>
        <img src="https://res.cloudinary.com/dcglxmssd/image/upload/v1744548914/e3hdxl84ewdhyhicn94c.gif" alt="Hero" className={styles.image} />
        {/* <img src="https://res.cloudinary.com/dcglxmssd/image/upload/v1744548913/od6tvmbhybf692dhjjwl.gif" alt="Hero" className={styles.image} /> */}
      </div>
    </div>
  );
};

export default Home;
