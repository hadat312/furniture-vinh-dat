import React from 'react';
// import { ROUTERS } from '../../constants/router';
// import { Button, Card } from 'antd';
// import history from '../../utils/history';

import './home.css';

function HomePage(props) {
  const userInfo = {
    userId: "user01",
    name: "Đạt"
  }
  localStorage.setItem("userId", JSON.stringify(userInfo));
  return (
    <div style={{ paddingTop: 80 }}>
      <div style={{ height: 500, width: '100%' }}>
        carousel
      </div>
      <div>
        home
      </div>
    </div>
  );
}

export default HomePage;