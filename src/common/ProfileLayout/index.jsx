import { Redirect, Route } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Banner from '../Banner';
import { connect } from 'react-redux';
function ProfileLayout(props) {
  const { exact, path, component: Component, cartList, ...other } = props;
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (!userInfo) {
    return <Redirect to="/" />;
  }
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <>
            <Header />
            <Banner />
            <Component {...other} {...routeProps} />
            <Footer />
          </>
        )
      }}
    />
  );
}

const mapStateToProps = (state) => {
  const { cartList } = state.cartReducer;
  return {
    cartList
  }
};

export default connect(mapStateToProps)(ProfileLayout);
