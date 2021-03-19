import React from "react";
import Test from "./Test";
import Watchlist from "./Watchlist";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./SideBar.css";
import Button from "@material-ui/core/Button";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import HomeScreen from "./HomeScreen";
import HomeFetch from "./HomeFetch";

const SideBar = (props) => {
  return (
    <>
      <Router>
        <div className="sidebar">
          <div className="sidebar-list-styling">
            {props.token === localStorage.getItem("token") ? (
              <div>
                <ul className="sidebar-list list-unstyled">
                  <li>
                    <Link to="/Watchlist">Watchlist</Link>
                  </li>
                  <li>
                    <Link to="/test">Test</Link>
                  </li>
                  <li>
                    <Link to="/home">Home</Link>
                  </li>
                  <li>
                    <Button
                      style={{ color: "black" }}
                      color="danger"
                      onClick={props.clickLogout}
                    >
                      Logout
                    </Button>
                    <Redirect to="/home" />
                  </li>
                </ul>
                <p id="searchBar">
                  <HomeFetch token={props.token} />
                </p>
              </div>
            ) : (
              <div>
                <ul>
                  <Link to="/login">Login</Link>
                  &nbsp;
                  <Link to="/register">Register</Link>
                </ul>
              </div>
            )}
          </div>

          <div className="sidebar-route">
            <Switch>
              <Route exact path="/test">
                <Test />
              </Route>
              <Route exact path="/Watchlist">
                <Watchlist token={props.token} />
              </Route>
              <Route exact path="/home">
                <HomeScreen />
              </Route>
            </Switch>

            <div className="auth">
              {props.token === localStorage.getItem("token") ? (
                ""
              ) : (
                <Switch>
                  <Route exact path="/login">
                    <Login updateToken={props.updateToken} />
                  </Route>
                  <Route exact path="/register">
                    <Register updateToken={props.updateToken} />
                  </Route>
                </Switch>
              )}
            </div>
          </div>
        </div>
      </Router>
    </>
  );
};

export default SideBar;
