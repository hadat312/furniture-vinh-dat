import { Route, Redirect } from 'react-router-dom';
import Header from '../Header';
import SideBarAdmin from '../SideBarAdmin'

function AdminLayout(props) {
  const { exact, path, component: Component, ...other } = props;
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  // if (!userInfo || userInfo.userRole !== 'admin') {
  //   return <Redirect to="/home" />;
  // }
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <>
            <div style={{ display: 'flex', maxWidth: '1370px', margin: 'auto' }}>
              <SideBarAdmin {...routeProps} style={{ width: "300px" }} />
              <div style={{ width: 'calc(100% - 300px)', marginLeft: '26px' }}>
                <Component {...other} {...routeProps} />
              </div>
            </div>
          </>
        )
      }}
    />
  );
}

export default AdminLayout;
