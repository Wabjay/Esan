import React, { useEffect, useState } from "react";
import { HeadProvider as Head } from "react-head";
import Content from "../components/Content/Content";
import { Link, useNavigate } from "react-router-dom";
// import { TailSpin } from 'react-loader-spinner'
import { useAuthState } from "react-firebase-hooks/auth";
import { storage, db, auth } from "../firebase-config";
import "./../components/Forms/Forms.css"



const AdminHome = () => {

  const navigate = useNavigate();


  const [user, error] = useAuthState(auth);
  useEffect(() => {
    // if (!user) navigate("/")
    !user && navigate("/")
  }, [user]);

  return (
    <div className="container">
      <Head title="Lasu Books" />
      <button onClick={() => {
          navigate('/addbook');
        }}
        className="createButton btn search_btn"
      >
        Add Book
      </button>
     
      <Content levelpage="adminlevel"/>
    

    </div>
  );
};

export default AdminHome;