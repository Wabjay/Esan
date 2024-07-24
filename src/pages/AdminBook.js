import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc, orderBy, query} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { Modal } from "antd";
import {useNavigate, Link} from "react-router-dom"
 import { useParams } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import "../components/Bookcard/BookCard.css"


function AdminBook({ isAuth }) {
  let navigate = useNavigate();
  const { confirm } = Modal;
  const [isLoading, setIsLoading] = useState(true);
  const [postLists, setPostList] = useState([]);
  const [showLists, setShowList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const questionsCollectionRef = collection(db, "questions");
  const [showQuestionLists, setShowQuestionList] = useState([]);
  const [showPostLists, setShowPostList] = useState([]);
  const [questionLists, setQuestionList] = useState([]);
  const [tab, setTab] = useState('courses');

  const [user, error] = useAuthState(auth);
  useEffect(() => {
    !user && navigate("/")
  }, [user]);


  const path = useParams();
  const pathlevel = path.level + "l";

  const deletePost = async (id) => {
    confirm({
      title: "Delete book ",
      content: "Delete book?",
      async onOk() {
        try {
          const postDoc = doc(db, "posts", id);
          await deleteDoc(postDoc)
        
            .catch((error) => {
              console.log(error)
            });
        } finally {
        }
      },
      onCancel() { },
    });
    
  };


  useEffect(() => {
    const getPosts = async () => {
      const postData = await getDocs(postsCollectionRef);
      const questionData = await getDocs(questionsCollectionRef);
      setPostList(postData.docs.map((doc) => (doc.data().level === pathlevel && { ...doc.data(), id: doc.id })));
      setQuestionList(questionData.docs.map((doc) => (doc.data().level === pathlevel && { ...doc.data(), id: doc.id })));
      
      // Initial Books to show 
      setShowPostList(postData.docs.map((doc) => (doc.data().level === pathlevel && { ...doc.data(), id: doc.id })));
      setShowQuestionList(questionData.docs.map((doc) => (doc.data().level === pathlevel && { ...doc.data(), id: doc.id })));
      
      setIsLoading(false);
      // setIsLoading(false)
    };

    

    getPosts();
  }, [pathlevel, deletePost]);




  return (
    <div className="adminBg">
      <div className="bookList_banner"><p>{path.level} level Books</p></div>
      <div className={`tabs`}>
  <p onClick={()=> setTab('courses')} className={`${tab === 'courses' && 'active'}`}>General Courses</p>
  <p onClick={()=> setTab('questions')} className={`${tab === 'questions' && 'active'}`}>Past Question</p>
</div>
      <div className="homePage blogList">
      {
  tab === 'courses'? 
  showPostLists.map((post) => (
          post.level === pathlevel &&
          <div className="bookCard">
            {/* <img src={post.pdf} alt="" className="blogList_img" /> */}

            <p className="book">{post.courseCode}</p>

            <p className="deleteBook"
              onClick={() => {
                deletePost(post.id);
              }}
            >
              Delete
            </p>
          </div>
        )
        ) :
        showQuestionLists.map((post) => (
          post.level === pathlevel &&
          <div className="bookCard">
            {/* <img src={post.pdf} alt="" className="blogList_img" /> */}

            <p className="book">{post.courseCode}</p>

            <p className="deleteBook"
              onClick={() => {
                deletePost(post.id);
              }}
            >
              Delete
            </p>
          </div>
        )
      )
        }

      </div>
    </div>
  );
}

export default AdminBook;
