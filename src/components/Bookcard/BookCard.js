
import React from "react";
import "./BookCard.css"
import 'react-lazy-load-image-component/src/effects/blur.css';
import Download from '../../images/download.svg'


const  BookCard = ({pics, content, id}) => {
   // console.log(id)
 return (

    <div className="bookCard">
       <p className="book">{content}</p>
       <a href={pics} className="pdfBorder">
          <img src={Download} alt="download button" />
       </a>
    </div>
  );
};

export default BookCard;
