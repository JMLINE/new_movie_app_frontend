import React from "react";
import Register from "./Register";
import Login from "./Login";
import "./authStyle.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import { Container, Row, Col } from "reactstrap";

const Auth = (props) => {
  return (
    <div className="auths">
      <Router>
        <ul className="sidebar-list list-unstyled">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/login">
            <Login updateToken={props.updateToken} />
          </Route>
          <Route exact path="/register">
            <Register updateToken={props.updateToken} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
export default Auth;
