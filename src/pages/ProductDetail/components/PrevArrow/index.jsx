import React from 'react';
import { AiOutlineLeft } from "react-icons/ai";
import './prevArrow.css'

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <AiOutlineLeft
      className="prev-arrow"
      onClick={onClick}
    />
  );
}

export default PrevArrow;