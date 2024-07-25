import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { Modal } from "antd";
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import "../components/Bookcard/BookCard.css";
import Button from './../images/back.png';

function AdminBook({ isAuth }) {
  let navigate = useNavigate();
  const { confirm } = Modal;
  const [isLoading, setIsLoading] = useState(true);
  const [postLists, setPostList] = useState([]);
  const [questionLists, setQuestionList] = useState([]);
  const [showPostLists, setShowPostList] = useState([]);
  const [showQuestionLists, setShowQuestionList] = useState([]);
  const [tab, setTab] = useState('courses');

  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const path = useParams();
  const pathlevel = path.level + "l";

  const deletePost = async (id) => {
    confirm({
      title: "Delete book",
      content: "Are you sure you want to delete this book?",
      async onOk() {
        try {
          const postDoc = doc(db, "posts", id);
          await deleteDoc(postDoc)
            .then(() => {
              setPostList(prev => prev.filter(post => post.id !== id));
              setShowPostList(prev => prev.filter(post => post.id !== id));
            })
            .catch((error) => {
              console.error("Error deleting document: ", error);
            });
        } catch (error) {
          console.error("Error confirming delete: ", error);
        }
      },
      onCancel() { },
    });
  };

  useEffect(() => {
    const getData = async () => {
      const postData = await getDocs(collection(db, "posts"));
      const questionData = await getDocs(collection(db, "questions"));

      const posts = postData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const questions = questionData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      setPostList(posts);
      setQuestionList(questions);
      setShowPostList(posts.filter(post => post.level === pathlevel));
      setShowQuestionList(questions.filter(question => question.level === pathlevel));
      
      setIsLoading(false);
    };

    getData();
  }, [pathlevel]);

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="adminBg">
      <div className="bookList_banner"  style={{ height: "fit-content", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <img src={Button} alt="Back" className="backbutton" onClick={goBack} />
        <p  style={{ textAlign: "right"}}>{path.level} level Books</p></div>
      <div className={`tabs`}>
        <p onClick={() => setTab('courses')} className={`${tab === 'courses' && 'active'}`}>General Courses</p>
        <p onClick={() => setTab('questions')} className={`${tab === 'questions' && 'active'}`}>Past Questions</p>
      </div>
      <div className="homePage blogList">
        {tab === 'courses' ? 
          showPostLists.map((post) => (
            post.level === pathlevel && (
              <div key={post.id} className="bookCard">
                <p className="book">{post.courseCode}</p>
                <p className="deleteBook"
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </p>
              </div>
            )
          )) : 
          showQuestionLists.map((question) => (
            question.level === pathlevel && (
              <div key={question.id} className="bookCard">
                <p className="book">{question.courseCode}</p>
                <p className="deleteBook"
                  onClick={() => deletePost(question.id)}
                >
                  Delete
                </p>
              </div>
            )
          ))
        }
      </div>
    </div>
  );
}

export default AdminBook;
