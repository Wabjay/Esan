/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { HeadProvider as Head } from "react-head";
import { Link, useNavigate } from "react-router-dom";
import OnboardImg from '../images/onboard.png'
import "../styles/onboarding.css";

import Indicator from '../images/HomeIndicator.png'
// import { TailSpin } from 'react-loader-spinner'


const Onboard = () => {
  const [typing, setTyping] = useState("")

  const navigate = useNavigate();

  const nav =()=>{
    console.log('first')
    // navigate('/home')
  // sessionStorage.setItem('onboard', true)
  }

  return (
    <div className="onboarding_container"  style={{ backgroundColor: '#1E1E1E' }}>
      <Head title="Esan-Lasu" />
      <div className="onboard" id="">
        <img src={OnboardImg} className="onboarding-image"/>
      </div>
      <div className="started">
        <p className="esan">Enhance <span>Learning Through</span> Seamless <span className="green">BOOKs</span></p>
        {/* <p  className="napher_small">Learn with plaesure with us. wherever you are!</p> */}
        <Link to="/home" className="center"  onClick={nav}>
          Enter to Experience
          </Link>
  

        
      </div>
      {/* <Content levelpage="level"/> */}
    

    </div>
  );
};

export default Onboard;