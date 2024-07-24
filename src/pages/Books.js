import React, { useEffect, useState } from "react";
import { getDocs, collection, doc, orderBy } from "firebase/firestore";
import { db } from "../firebase-config";
import BlogCard from "../components/Bookcard/BookCard";
import { TailSpin } from 'react-loader-spinner'
import { useParams, useNavigate } from 'react-router-dom';
import { HeadProvider as Head } from "react-head";
import SearchBox from "../components/SearchBox";
import Button from './../images/back.png'
import Profile from '../images/White.png'

import Search from "./../images/search-black.png"
import './../styles/SearchBox.css'
import Loader from "../components/Loader";

function Books() {
  const [isLoading, setIsLoading] = useState(true);
  const [color, setColor] = useState("");
  const [postLists, setPostList] = useState([]);
  const [showQuestionLists, setShowQuestionList] = useState([]);
  const [showPostLists, setShowPostList] = useState([]);
  const [questionLists, setQuestionList] = useState([]);
  const [tab, setTab] = useState('courses');
  const postsCollectionRef = collection(db, "posts");
  const questionsCollectionRef = collection(db, "questions");
  const [searchQuery, setSearchQuery] = useState('');

  // const orders = orderBy("post", "desc")

  const path = useParams();
  const pathlevel = path.level + "l";

  useEffect(() => {
    setColor(pathlevel === "100l" ? "#ffb21d" : pathlevel === "200l" ? "#c9da3e" : pathlevel === "300l" ? "#73ccd7" : "#273360")
    const getPosts = async () => {
      const postData = await getDocs(postsCollectionRef);
      const questionData = await getDocs(questionsCollectionRef);
      setPostList(postData.docs.map((doc) => (doc.data().level === pathlevel && { ...doc.data(), id: doc.id })));
      setQuestionList(questionData.docs.map((doc) => (doc.data().level === pathlevel && { ...doc.data(), id: doc.id })));

      // Initial Books to show 
      setShowPostList(postData.docs.map((doc) => (doc.data().level === pathlevel && { ...doc.data(), id: doc.id })));
      setShowQuestionList(questionData.docs.map((doc) => (doc.data().level === pathlevel && { ...doc.data(), id: doc.id })));

      //   console.log(data.docs)/
      // console.log(postLists)
      setIsLoading(false);
      // setIsLoading(false)
    };

    getPosts();
    // console.log(postLists)
  }, [pathlevel]);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const handleSearch = async (e) => {
    const searchQuery = e.target.value
    setSearchQuery(searchQuery)

    const searchFrom = postLists.filter((doc) => doc.level === pathlevel && doc.courseCode.toLowerCase().includes(searchQuery.toLowerCase()))
    const searchQuestion = questionLists.filter((doc) => doc.level === pathlevel && doc.courseCode.toLowerCase().includes(searchQuery.toLowerCase()))


    // Update state with filtered posts
    setShowPostList(searchFrom);
    setShowQuestionList(searchQuestion);

    // Log filtered posts
    // filteredPosts.map(doc => console.log(doc.data()));

    setIsLoading(false);
  };

  const showResults = (response) => {
    console.log(response);
  };


  return (
    <>
      <Head title="Lasu Books" />
      {isLoading ?
        <Loader bgcolor={color} />
        : (

          <div className="bookList_banner" style={{ background: pathlevel === "100l" ? "#ffb21d" : pathlevel === "200l" ? "#c9da3e" : pathlevel === "300l" ? "#73ccd7" : "#273360" }}>
            <div className="">
              <div style={{ height: "fit-content", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <img src={Button} alt="" className="backbutton" onClick={goBack} />
                <img src={Profile} alt="Profile" style={{ width: "142px", height: "50px" }} />
              </div>
              <p>{path.level} Level </p>

              {/* <SearchBox search={showResults} /> */}


              <div className='searchbox'>
                <img src={Search} alt="" />
                <input type="text"
                  value={searchQuery}
                  onChange={handleSearch} />
              </div>
              <div className={`tabs`}>
                <p onClick={() => setTab('courses')} className={`${tab === 'courses' && 'active'}`}>General Courses</p>
                <p onClick={() => setTab('questions')} className={`${tab === 'questions' && 'active'}`}>Past Question</p>
              </div>
              {
                tab === 'courses' ?
                  <div className="bookList">
                    {showPostLists?.map((post) => (
                      post.level === pathlevel &&
                      // return (
                      <>
                        <BlogCard
                          pics={post.pdf}
                          id={post.id}
                          content={post.courseCode}
                          author={post.CourseTitle}
                        />
                      </>)
                      //    )}
                    )}
                  </div> :
                  <div className="bookList">
                    {showQuestionLists?.map((post) => (
                      post.level === pathlevel &&
                      // return (
                      <>
                        <BlogCard
                          pics={post.pdf}
                          id={post.id}
                          content={post.courseCode}
                          author={post.CourseTitle}
                        />
                      </>)
                      //    )}
                    )}
                  </div>
              }

            </div>

          </div>

        )}
    </>
  );
}

export default Books;