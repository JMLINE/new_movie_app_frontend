import React, { useState } from "react";
import Register from "./Register";

import Login from "./Login";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Button from "@material-ui/core/Button";

const Auth = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      className="auths"
      style={{
        backgroundColor: "red",
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "row",
        height: "5em",
      }}
    >
      <Router>
        <Link
          to="/login"
          style={{ textDecoration: "none" }}
          onClick={handleClickOpen}
        >
          <Button
            variant="outlined"
            style={{ color: "yellow" }}
            href="#outlined-buttons"
          >
            Login
          </Button>
        </Link>

        <Link
          to="/register"
          style={{ textDecoration: "none" }}
          onClick={handleClickOpen}
        >
          <Button type="button" style={{ color: "white" }}>
            Register
          </Button>
        </Link>

        <Switch>
          <Route exact path="/login">
            <Login
              updateToken={props.updateToken}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
              open={open}
            />
          </Route>
          <Route exact path="/register">
            <Register
              updateToken={props.updateToken}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
              open={open}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Auth;
