import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

function Navbar(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  function hello() {
    alert("test");
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar style={{ background: "#0ABB06" }} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Moogle
          </Typography>
          <Button
            variant="contained"
            color="default"
            onClick={() => {
              hello();
            }}
          >
            Menu
          </Button>
          {props.token ? (
            <Button
              style={{ color: "white" }}
              color="danger"
              onClick={props.clickLogout}
            >
              Logout
            </Button>
          ) : (
            <a style={{ color: "black", fontSize: "20px" }}></a>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
