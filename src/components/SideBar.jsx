import React, { useState } from "react";
import Watchlist from "./Watchlist";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./SideBar.css";
import HomeScreen from "./HomeScreen";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonSharpIcon from "@material-ui/icons/PersonSharp";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AppsIcon from "@material-ui/icons/Apps";
import Grid from "@material-ui/core/Grid";
import History from "./History";
import HistoryIcon from "@material-ui/icons/History";

const StyledMenu = withStyles({
  paper: {},
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles((theme) => ({
  root: {},
}))(MenuItem);
const SideBar = (props) => {
  let userName = localStorage.getItem("username");

  return (
    <>
      <Router>
        <div className="sidebar">
          <div className="sidebar-list-styling">
            <div>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  style={{
                    // width: "auto",
                    backgroundColor: "red",
                    textAlign: "right",
                  }}
                >
                  <div class="dropdown">
                    <Button
                      class="dropbtn"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        backgroundColor: "red",
                      }}
                    >
                      {" "}
                      <ListItemIcon>
                        <b>
                          <PersonSharpIcon fontSize="large" />
                        </b>
                      </ListItemIcon>
                      <ListItemText>
                        <p>
                          {userName.length >= 17 ? (
                            <p> {userName.substr(0, 17)}... </p>
                          ) : (
                            userName
                          )}
                        </p>
                      </ListItemText>
                    </Button>

                    <div
                      class="dropdown-content"
                      style={{ backgroundColor: "red" }}
                    >
                      <div className="homeLink">
                        <StyledMenuItem>
                          <ListItemIcon>
                            <HomeIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>
                            {" "}
                            <Link to="/home">Home</Link>
                          </ListItemText>
                        </StyledMenuItem>
                      </div>
                      <div className="watchLink">
                        <StyledMenuItem>
                          <ListItemIcon>
                            <AppsIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>
                            <Link to="/watchlist">Watchlist </Link>
                          </ListItemText>
                        </StyledMenuItem>
                      </div>

                      <div className="historyLink">
                        <StyledMenuItem>
                          <ListItemIcon>
                            <HistoryIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>
                            {" "}
                            <Link to="/history">History</Link>
                          </ListItemText>
                        </StyledMenuItem>
                      </div>
                      <div className="logoutLink">
                        <StyledMenuItem>
                          <ListItemIcon>
                            <ExitToAppIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText>
                            <Link onClick={props.clickLogout}>Logout</Link>
                            <Redirect to="/home" />
                          </ListItemText>
                        </StyledMenuItem>
                      </div>
                    </div>
                  </div>
                </Grid>

                {props.token === localStorage.getItem("token") ? (
                  <Grid item xs={12} md={12}>
                    <div>
                      <Switch>
                        <Route exact path="/watchlist">
                          <Watchlist token={props.token} />
                        </Route>
                        <Route exact path="/home">
                          <HomeScreen token={props.token} />
                        </Route>{" "}
                        <Route exact path="/history">
                          <History token={props.token} />
                        </Route>
                      </Switch>
                    </div>
                  </Grid>
                ) : (
                  ""
                )}
              </Grid>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
};

export default SideBar;
