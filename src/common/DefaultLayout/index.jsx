import { Redirect, Route } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Banner from '../Banner';
function DefaultLayout(props) {
  const { exact, path, component: Component, ...other } = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <>
            <Header {...routeProps}/>
            <Banner/>
            <Component {...other} {...routeProps} />
            <Footer/>
          </>
        )
      }}
    />
  );
}

export default DefaultLayout;
