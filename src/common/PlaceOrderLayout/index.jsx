import { Redirect, Route } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Banner from '../Banner';
import { connect } from 'react-redux';
function PlaceOrderLayout(props) {
  const { exact, path, component: Component, cartList, ...other } = props;
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (!userInfo || cartList.data.length === 0) {
    return <Redirect to="/" />;
  }
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <>
            <Header {...routeProps}/>
            <Banner {...routeProps}/>
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

export default connect(mapStateToProps)(PlaceOrderLayout);
