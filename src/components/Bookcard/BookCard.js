import React from "react";
import "./BookCard.css";
import 'react-lazy-load-image-component/src/effects/blur.css';
import Download from '../../images/download.svg';

const BookCard = ({ pdf, content, id }) => {
  const downloadPDF = async () => {
    try {
      const response = await fetch(pdf);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${content}.pdf`; // Set the default file name
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the PDF:', error);
    }
  };

  return (
    <div className="bookCard">
      <p className="book">{content}</p>
      <button className="pdfBorder" onClick={downloadPDF}>
        <img src={Download} alt="download button" />
      </button>
    </div>
  );
};

export default BookCard;
