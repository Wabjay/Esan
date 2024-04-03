// import React, { useState } from 'react'
// import Search from "./../images/search-black.png"
// import './../styles/SearchBox.css'

// import { getDocs, collection, doc, orderBy } from "firebase/firestore";
// import { db } from "../firebase-config";
// import { storage } from "../firebase-config";

// export default function SearchBox({search}) {
//   const [searchQuery, setSearchQuery] = useState('');



//   const handleSearch = async (searchQuery) => {
//     setIsLoading(true);
  
//     const data = await getDocs(postsCollectionRef);
  
//     // Filter posts based on search query
//     const filteredPosts = data.docs.filter(doc =>
//       doc.data().level === pathlevel && doc.data().title.includes(searchQuery)
//     );
  
//     // Update state with filtered posts
//     setPostList(filteredPosts.map(doc => ({ ...doc.data(), id: doc.id })));
  
//     // Log filtered posts
//     filteredPosts.map(doc => console.log(doc.data()));
  
//     setIsLoading(false);
//   };
  
//   return (
//     <div className='searchbox'>
//       <img src={Search} alt=""/>
//       <input  type="text"
//         value={searchQuery}
//         onChange={handleSearch}/>
//     </div>
//   )
// }
