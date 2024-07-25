import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import BlogCard from "../components/Bookcard/BookCard";
import Loader from "../components/Loader";
import { useParams, useNavigate } from 'react-router-dom';
import { HeadProvider as Head } from "react-head";
import Search from "./../images/search-black.png";
import Button from './../images/back.png';
import Profile from '../images/White.png';
import './../styles/SearchBox.css';

const CACHE_DURATION = 48 * 60 * 60 * 1000; // 48 hours in milliseconds

function Books() {
  const [isLoading, setIsLoading] = useState(true);
  const [color, setColor] = useState("");
  const [postLists, setPostList] = useState([]);
  const [questionLists, setQuestionList] = useState([]);
  const [showPostLists, setShowPostList] = useState([]);
  const [showQuestionLists, setShowQuestionList] = useState([]);
  const [tab, setTab] = useState('courses');
  const [searchQuery, setSearchQuery] = useState('');

  const path = useParams();
  const pathlevel = path.level + "l";

  useEffect(() => {
    setColor(pathlevel === "100l" ? "#ffb21d" : pathlevel === "200l" ? "#c9da3e" : pathlevel === "300l" ? "#73ccd7" : "#273360");

    const getData = async () => {
      const now = new Date().getTime();
      const lastFetchTime = parseInt(localStorage.getItem('lastFetchTime'), 10);

      if (lastFetchTime && (now - lastFetchTime < CACHE_DURATION)) {
        const cachedPosts = JSON.parse(localStorage.getItem('posts'));
        const cachedQuestions = JSON.parse(localStorage.getItem('questions'));

        if (cachedPosts && cachedQuestions) {
          const posts = cachedPosts;
          const questions = cachedQuestions;

          setPostList(posts);
          setQuestionList(questions);
          setShowPostList(posts.filter(post => post.level === pathlevel));
          setShowQuestionList(questions.filter(question => question.level === pathlevel));
          
          // Set a timeout to update setIsLoading to false after 3 seconds
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
          
          return;
        }
      }

      const postData = await getDocs(collection(db, "posts"));
      const questionData = await getDocs(collection(db, "questions"));

      const posts = postData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const questions = questionData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      setPostList(posts);
      setQuestionList(questions);
      setShowPostList(posts.filter(post => post.level === pathlevel));
      setShowQuestionList(questions.filter(question => question.level === pathlevel));

      localStorage.setItem('posts', JSON.stringify(posts));
      localStorage.setItem('questions', JSON.stringify(questions));
      localStorage.setItem('lastFetchTime', now.toString());

      setIsLoading(false);
    };

    getData();
  }, [pathlevel]);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (tab === 'courses') {
      setShowPostList(postLists.filter(post => post.level === pathlevel && post.courseCode.toLowerCase().includes(query)));
    } else {
      setShowQuestionList(questionLists.filter(question => question.level === pathlevel && question.courseCode.toLowerCase().includes(query)));
    }
  };

  return (
    <>
      <Head title="Lasu Books" />
      {isLoading ? (
        <Loader bgcolor={color} />
      ) : (
        <div className="bookList_banner" style={{ background: color }}>
          <div>
            <div style={{ height: "fit-content", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <img src={Button} alt="Back" className="backbutton" onClick={goBack} />
              <img src={Profile} alt="Profile" style={{ width: "142px", height: "50px" }} />
            </div>
            <p>{path.level} Level </p>

            <div className="searchbox">
              <img src={Search} alt="Search" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            
            <div className="tabs">
              <p onClick={() => setTab('courses')} className={tab === 'courses' ? 'active' : ''}>General Courses</p>
              <p onClick={() => setTab('questions')} className={tab === 'questions' ? 'active' : ''}>Past Question</p>
            </div>

            <div className="bookList">
              {tab === 'courses' ? (
                showPostLists.map(post => (
                  post.level === pathlevel && (
                    <BlogCard
                      key={post.id}
                      pdf={post.pdf}
                      id={post.id}
                      content={post.courseCode}
                      author={post.CourseTitle}
                    />
                  )
                ))
              ) : (
                showQuestionLists.map(question => (
                  question.level === pathlevel && (
                    <BlogCard
                      key={question.id}
                      pdf={question.pdf}
                      id={question.id}
                      content={question.courseCode}
                      author={question.CourseTitle}
                    />
                  )
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Books;
