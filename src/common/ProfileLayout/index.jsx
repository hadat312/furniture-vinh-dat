import { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Banner from '../Banner';
import Sidebar from '../Sidebar';
import { connect } from 'react-redux';
import * as Style from './styles'
function ProfileLayout(props) {
  const { exact, path, component: Component, ...other } = props;
  const userInfoLocalStorage = JSON.parse(localStorage.getItem('userInfo'));
  if (!userInfoLocalStorage) {
    return <Redirect to="/home" />;
  }
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <>
            <Header {...routeProps} />
            <Banner {...routeProps}/>
            <Style.Container>
              <Sidebar {...routeProps} />
              <Style.MainContainer>
                <Component {...other} {...routeProps} />
              </Style.MainContainer>
            </Style.Container>
            <Footer />
          </>
        )
      }}
    />
  );
}

const mapStateToProps = (state) => {
  const { userInfo } = state.userReducer;
  return {
    userInfo
  }
};

export default ProfileLayout;
