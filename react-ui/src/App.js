import React from 'react';
import Home from './Components/Home/Home';
import { Router, Route } from 'react-router-dom';

import { history } from './Components/helpers';
import { authenticationService } from './Components/services';
import { PrivateRoute } from './Components/PrivateRoute/PrivateRoute';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };

  }
  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
  }

  logout() {
    authenticationService.logout();
    history.push('/login');
  }

  render() {
    return (<Router history={history}>
      <div>
        <PrivateRoute exact path="/" component={Home} />


        <Route path="/login" >
          <Login history={history} />
        </Route>

        <Route path="/register">
          <Register />
        </Route>


      </div>
    </Router>)

  }
}

export default App;
