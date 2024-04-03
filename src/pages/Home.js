import React, { useState } from "react";
import { HeadProvider as Head } from "react-head";
import Content from "../components/Content/Content";
import SearchBox from "../components/SearchBox";
import "./../styles/Home.css"


const Home = () => {
  const [typing, setTyping] = useState("")



  return (
    <div className="home_container" style={{ backgroundColor: '#1E1E1E' }}>
      <div>
        
      <Head title="Lasu Books" />
      <img src="" alt=""/>
      <p className="explore_text">Explore ESAN - LASU </p>
      <p className="explore_text">Library 🔥</p>
      {/* <SearchBox /> */}
      <Content levelpage="level"/>
    
      </div>

    </div>
  );
};

export default Home;