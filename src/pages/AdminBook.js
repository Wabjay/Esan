import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc, orderBy, query} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { Modal } from "antd";
import {useNavigate, Link} from "react-router-dom"
// import { TailSpin } from 'react-loader-spinner'
import { useParams } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";


function AdminBook({ isAuth }) {
  let navigate = useNavigate();
  const { confirm } = Modal;
  const [isLoading, setIsLoading] = useState(true);
  const [postLists, setPostList] = useState([]);
  const [showLists, setShowList] = useState([]);
  const postsCollectionRef =collection(db, "posts")

  const [user, error] = useAuthState(auth);
  useEffect(() => {
    // if (!user) navigate("/")
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
          // setLoading(false);
        }
      },
      onCancel() { },
    });
    
  };

  // useEffect(() => {
  //   const getPosts = async () => {
  //     const data = await getDocs(postsCollectionRef);
  //     setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     setPostList(data.docs.map((doc) => (doc.data().level === pathlevel && { ...doc.data(), id: doc.id })));
  //     setIsLoading(false)
  //   };

  //   getPosts();
  // }, [deletePost]);

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




  return (<>
         <div className="bookList_banner"><p>{path.level}level Books</p></div>

    <div className="homePage blogList">
      {showLists.map((post) => (
            post.level === pathlevel &&
            <div className="bookCard">
              {/* <img src={post.pdf} alt="" className="blogList_img" /> */}
              <div className="adminDelete">
                <div>
                  {/* <p className="level">Level: <span className="">{post.level}evel</span></p> */}
                  <p className="CourseTitle">Course Title: <span className="">{post.CourseTitle}</span></p>
                  <p className="CourseCode">Course Code: <span className="">{post.courseCode}</span></p>
                </div>
                <div className="deletePost">
                    <button
                      onClick={() => {
                        deletePost(post.id);
                      }}
                      style={{padding: "4px 8px", borderRadius: "3px"}}
                    >
                      &#128465; Delete
                    </button>
                </div>
              </div>
              {/* <Link to={{pathname:`/adminpost/${post.id}`,
       state: {id: post.id}
       }}>
              <p className="blogTopic">{post.CourseTitle}</p>
            </Link> */}
            </div>
         )
        )
      }
      
    </div>
         </>
  );
}

export default AdminBook;
