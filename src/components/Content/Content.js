
import React from "react";
import level1 from "../../images/100level.svg"
import level2 from "../../images/200level.svg"
import level3 from "../../images/300level.svg"
import level4 from "../../images/400level.svg"
import View from "../../images/view.svg"
// import Door_step from "../../images/door_step.png"
import "./Content.css"
import { Link } from "react-router-dom";
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Content = ({ levelpage }) => {


  return (
      <div className="general_cards">
        <div className="card">
          <Link to={`/${levelpage}/100`}>
            <img src={level1} alt="" className="card_image" />
          </Link>
        </div>

        <div className="card">
          <Link to={`/${levelpage}/200`}>
            <img src={level2} alt="" className="card_image" />
          </Link>
        </div>
        <div className="card">
          <Link to={`/${levelpage}/300`}>
            <img src={level3} alt="" className="card_image" />
          </Link>
        </div>

        <div className="card">
          <Link to={`/${levelpage}/400`}>
            <img src={level4} alt="" className="card_image" />
          </Link>
        </div>
      </div>
  );
};

export default Content;
