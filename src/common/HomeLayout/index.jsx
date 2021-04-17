import { Route } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
function HomeLayout(props) {
  const { exact, path, component: Component, ...other } = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <>
            <Header/>
            <Component {...other} {...routeProps} />
            <Footer/>
          </>
        )
      }}
    />
  );
}

export default HomeLayout;
