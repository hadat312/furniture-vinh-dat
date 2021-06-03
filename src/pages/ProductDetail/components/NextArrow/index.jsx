import React from 'react';
import { AiOutlineRight } from "react-icons/ai";
import './nextArrow.css';

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <AiOutlineRight
      className="next-arrow"
      onClick={onClick}
    />
  );
}

export default NextArrow;