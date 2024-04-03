import React, { useEffect, useState } from "react";
import { getDocs, collection, doc, orderBy } from "firebase/firestore";
import { db } from "../firebase-config";
import BlogCard from "../components/Bookcard/BookCard";
import { TailSpin } from 'react-loader-spinner'
import { useParams, useNavigate } from 'react-router-dom';
import { HeadProvider as Head } from "react-head";
import SearchBox from "../components/SearchBox";
import Button from './../images/back.png'

import Search from "./../images/search-black.png"
import './../styles/SearchBox.css'

function Books() {
  const [isLoading, setIsLoading] = useState(true);
  const [postLists, setPostList] = useState([]);
  const [showLists, setShowList] = useState([]);
  const [tab, setTab] = useState('courses');
  const postsCollectionRef = collection(db, "posts");
  const [searchQuery, setSearchQuery] = useState('');

  // const orders = orderBy("post", "desc")

  const path = useParams();
  const pathlevel = path.level + "l";

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

    //   getPosts();
    // }, []);


    // const getPosts = async () => {
    //   const data = await getDocs(postsCollectionRef);
    //   setPostList(data.docs.map((doc) => (doc.data().level === pathlevel && { ...doc.data(), id: doc.id })));
    //      data.docs.map((doc) => console.log(doc.data().level));

    // //   console.log(data.docs)/
    //   console.log(postLists)
    //   setIsLoading(false)
    // }

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

    const searchFrom = postLists.filter((doc) =>  doc.level === pathlevel && doc.courseCode.toLowerCase().includes(searchQuery.toLowerCase()))
  
    console.log(searchFrom)
    // // Filter posts based on search query
    // const filteredPosts = postLists.filter(doc =>
    //  doc.title.includes(searchQuery)
    // );
  
    // Update state with filtered posts
    setShowList(searchFrom);
  
    // Log filtered posts
    // filteredPosts.map(doc => console.log(doc.data()));
  
    setIsLoading(false);
  };

  const showResults = (response) => {
console.log(response)  };


  return (
    <>
      <Head title="Lasu Books" />
      {isLoading ? <div className="Bookspinner">
        <TailSpin
          height="80"
          width="80"
          color="#214973"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        /></div> : (
      
          <div className="bookList_banner" style={{ background: pathlevel === "100l" ? "#ffb21d" : pathlevel === "200l" ? "#c9da3e" : pathlevel === "300l" ? "#73ccd7" : "#273360" }}>
            <div className="">
            <img src={Button} alt=""  className="backbutton" onClick={goBack}/>
              <p>{path.level} Level </p>

              {/* <SearchBox search={showResults} /> */}


              <div className='searchbox'>
      <img src={Search} alt=""/>
      <input  type="text"
        value={searchQuery}
        onChange={handleSearch}/>
    </div>
<div className={`tabs`}>
  <p onClick={()=> setTab('courses')} className={`${tab === 'courses' && 'active'}`}>General Courses</p>
  <p onClick={()=> setTab('questions')} className={`${tab === 'questions' && 'active'}`}>Past Question</p>
</div>
{
  tab === 'courses'? 
              <div className="bookList">
                {showLists?.map((post) => (
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
              <div>

              </div>
}

            </div>

          </div>
      
      )}
    </>
  );
}

export default Books;