import { Route, Redirect } from 'react-router-dom';
import Header from '../Header';
import SideBarAdmin from '../SideBarAdmin'

function AdminLayout(props) {
  const { exact, path, component: Component, ...other } = props;
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo && userInfo.id) {
    if (userInfo.userRole !== 'admin') {
      return <Redirect to="/home" />;
    }
  } else {
    return <Redirect to="/home/login" />;
  }
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <>
            {/* <Header {...routeProps} /> */}
            <div style={{ display: 'flex', maxWidth: '1370px', margin: 'auto' }}>
              <SideBarAdmin {...routeProps}  style={{width: "300px"}}/>
              <div style={{ width: 'calc(100% - 300px)', marginLeft: '26px', marginTop: "0px"}}>
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
