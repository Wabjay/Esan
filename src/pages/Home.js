import React, { useState } from "react";
import { HeadProvider as Head } from "react-head";
import Content from "../components/Content/Content";
import "./../styles/Home.css"
import Logo from '../images/esan_logo.svg'


const Home = () => {
  const [typing, setTyping] = useState("")



  return (
    <div className="home_container" style={{ backgroundColor: '#1E1E1E' }}>
      <div>
        
      <Head title="Esan Books" />
      <img src={Logo} alt="Esan Logo" style={{marginBottom: "40px", marginTop: "-60px"}}/>
        
      <div className="explore_text">
      <p><span>Explore</span> ESAN - LASU </p>
      <p className="green">Library 🔥</p>
      </div>
      {/* <SearchBox /> */}
      <Content levelpage="level"/>
    
      </div>

    </div>
  );
};

export default Home;