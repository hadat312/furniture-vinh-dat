
import { Route } from 'react-router-dom';
import Header from '../Header';
function ErrorLayout(props) {
  const { exact, path, component: Component, ...other } = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <>
            <Header {...routeProps}/>
            <Component {...other} {...routeProps} />
          </>
        )
      }}
    />
  );
}

export default ErrorLayout;
