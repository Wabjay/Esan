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
  const postsCollectionRef =collection(db, "posts")

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
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => (doc.data().level === pathlevel && { ...doc.data(), id: doc.id })));
      setShowList(data.docs.map((doc) => (doc.data().level === pathlevel && { ...doc.data(), id: doc.id })));
      // data.docs.map((doc) =>  doc.data().level === pathlevel && console.log(doc.data()));
      //   console.log(data.docs)/
      // console.log(postLists)
      setIsLoading(false)
      // setIsLoading(false)
    };

   

    getPosts();
  }, [pathlevel, deletePost]);




  return (
    <div className="adminBg">
      <div className="bookList_banner"><p>{path.level} level Books</p></div>

      <div className="homePage blogList">
        {showLists.map((post) => (
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
