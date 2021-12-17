import React from 'react';
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom'
import { Navbar } from './components'
import {
  Dashboard,
  Home,
  LogIn,
  LogUp
} from './containers';

const AuthRoute = ({ isLogged }) => (
  <Route path="/dashboard">
    {
      isLogged
      ? (<>
          <h6>Dashboard</h6>
          {/* <Dashboard /> */}
        </>
        )
      : (
          <Redirect
            to={{
              pathname:'/'
            }}
          />
        )
    }
  </Route>
)

function App(props) {
  const { isLogged } = props
  return (
    <Router>
      <div className='principal-container'>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/log-in">
            <LogIn />
          </Route>
          <Route path="/log-up">
            <LogUp />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <AuthRoute 
            isLogged={isLogged}
          />
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = ({ account }) => ({
  isLogged: account.isLogged
})

export default connect(mapStateToProps)(App);
