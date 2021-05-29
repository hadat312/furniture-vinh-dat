import React, { useState } from 'react';
import history from '../../utils/history';

import logo3 from  '../../images/logo3.png'

import './styles.css'
function ErrorPage() {

  return (
    <>
      <div className="header-error-container">
        <div className="header-brand">
          <img src={logo3} alt="" />
        </div>
      </div>

      <div className="error-background">
        <div className="error-content container">
          <div className="side-left-nothing-found">
            <h1>Oops !</h1>
            <h1>
              Page not found
            </h1>
            <p className="direction-page">
              PLEASE GO BACK TO
            <span onClick={() => history.push('/phong-khach')}> HOMEPAGE </span>
            </p>
          </div>

          <div className="side-right-nothing-found">

          </div>


        </div>

      </div>
    </>
  )

  // return (
  //   <svg viewBox="0 0 1320 300">
  //     {/* pattern */}
  //     <defs>
  //       <pattern id="GPattern" x="0" y="0" width="20" height="20"
  //         patternUnits="userSpaceOnUse"
  //         patternTransform="rotate(35)" >
  //         <animateTransform attributeType="xml"
  //           attributeName="patternTransform"
  //           type="rotate"
  //           from="35"
  //           to="395"
  //           begin="0"
  //           dur="160s" repeatCount="indefinite" />
  //         <circle cx="10" cy="10" r="10" stroke="none" fill="yellow">
  //           <animate attributeName="r"
  //             type="xml"
  //             from="1" to="1"
  //             values="1; 10; 1"
  //             begin="0s" dur="2s"
  //             repeatCount="indefinite"
  //           />
  //         </circle>
  //       </pattern>
  //     </defs>
  //     {/* Symbol */}
  //     <symbol id="s-text">
  //       <text text-anchor="middle"
  //         x="35%" y="50%" dy=".35em">
  //         4
  //   </text>
  //     </symbol>
  //     <symbol id="v-text">
  //       <text text-anchor="middle"
  //         x="50%" y="50%" dy=".35em">
  //         0
  //   </text>
  //     </symbol>
  //     <symbol id="g-text">
  //       <text text-anchor="middle"
  //         x="65%" y="50%" dy=".35em">
  //         4
  //   </text>
  //     </symbol>
  //     {/* Duplicate symbols */}
  //     <use xlinkHref="#s-text" className="text" />
  //     <use xlinkHref="#s-text" className="text" />
  //     <use xlinkHref="#s-text" className="text" />
  //     <use xlinkHref="#s-text" className="text" />
  //     <use xlinkHref="#s-text" className="text" />
  //     <use xlinkHref="#v-text" className="text1" />
  //     <use xlinkHref="#v-text" className="text1" />
  //     <use xlinkHref="#v-text" className="text1" />
  //     <use id="g-usetag" xlinkHref="#g-text" className="text2" style={{ fill: "url(#GPattern)" }} />
  //   </svg>
  // );
}

export default ErrorPage;