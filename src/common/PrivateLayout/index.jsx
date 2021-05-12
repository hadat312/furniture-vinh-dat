import { Redirect, Route } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Banner from '../Banner';
function PrivateLayout(props) {
  const { exact, path, component: Component, ...other } = props;
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
            <Header/>
            <Banner/>
            <Component {...other} {...routeProps} />
            <Footer/>
          </>
        )
      }}
    />
  );
}

export default PrivateLayout;
