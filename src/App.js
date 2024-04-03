import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop"
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Books from "./pages/Books";
import AdminHome from "./pages/AdminHome";
import AdminBook from "./pages/AdminBook";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "./firebase-config";
import Onboard from "./pages/Onboard";

function App() {
  const [user, error] = useAuthState(auth);
  const [onboard, setOnboard] = useState(false)

  // useEffect(() => {
  //   const onboard = sessionStorage.getItem('onboard')
  //   setOnboard(onboard)
  // console.log(onboard)
  // }, [onboard])
 
 



  return (
    <div className="App">
     <Router>
      <ScrollToTop />
        {user ? 
        <>
        <Navbar />
        
      <Routes>
        <Route exact path="/" element={<AdminHome />} />
        <Route exact path="/createpost" element={<CreatePost/>} />
          {/* <Route exact path="/admin" element={<AdminHome />} /> */}
          <Route exact path="/adminlevel/:level" element={<AdminBook/>} />
          <Route exact path="*" element={<AdminHome />}/>
        </Routes>
        </>
        : 
        // onboard ? 
        <Routes>
         <Route exact path="/" element={<Home />} />
         <Route exact path="/home" element={<Home />} />
         <Route exact path="/login" element={<Login/>} />
           <Route exact path="/level/:level" element={<Books />} />
           <Route exact path="*" element={<Home />}/>
         {/* </Routes>
         :
         <Routes> */}
           <Route exact path="/onboard" element={<Onboard/>} />
           {/* <Route exact path="*" element={<Onboard/>} /> */}
         </Routes>
}
     </Router>
        </div>
  );
}

export default App;
