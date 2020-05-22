import React from 'react';
import Login from './component/login';
import DashBoard from './component/dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (localStorage.username && localStorage.password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: localStorage.username,
          password: localStorage.password,
        },
      });
    }
    dispatch({
      type: 'LOAD_USERS_LIST',
    });
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/DashBoard" component={DashBoard} />

        {localStorage.username && localStorage.password ? (
          <Redirect to="/DashBoard" />
        ) : (
          <Redirect to="/Login" />
        )}
      </Switch>
    </Router>
  );
}

export default App;
