import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import "./HomeFetch.css";

function HomeFetchModal(props) {
  const useStyles = makeStyles((theme) => ({
    modal: {
      // width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: "5em",
      marginRight: "5em",
    },
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));

  function closeModal() {
    props.handleClose2();
  }

  const classes = useStyles();
  return (
    <div className="searchBar">
      {props.title === "" || props.errorMessage === true ? (
        ""
      ) : (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={props.open2}
          onClose={props.handleClose2}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          width="90%"
        >
          <Fade in={props.open2}>
            <div className={classes.root}>
              <Grid
                container
                spacing={3}
                style={{
                  backgroundImage: "linear-gradient(to right, #0b486b, #f56217",
                  maxHeight: 550,
                  overflow: "auto",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  style={{ textAlign: "center", fontSize: "35pt" }}
                >
                  {props.title}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={props.poster}
                    style={{
                      width: "16em",
                      height: "20em",
                    }}
                  ></img>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Paper className={classes.paper}>
                    {props.plot}
                    <p></p>
                    <p>
                      <b>Directed By:</b> {props.directedBy}
                    </p>
                    <p>
                      <b>Written By:</b> {props.writtenBy}
                    </p>
                    <p>
                      <b>Starring:</b> {props.actors}
                    </p>
                    <p>
                      <b>
                        {props.year} || {props.rated}
                      </b>
                    </p>
                    <p>
                      {props.rating} on {props.ratingSource}
                    </p>
                  </Paper>
                </Grid>

                <Grid
                  item
                  xs={6}
                  sm={9}
                  md={10}
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="contained"
                    color="default"
                    marginLeft="5em"
                    onClick={() => {
                      props.postMovie();
                      props.clearSearch();
                      closeModal();
                    }}
                  >
                    Add to Watchlist
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={3}
                  md={2}
                  style={{
                    display: "flex",
                    alignItems: "right",
                    justifyContent: "right",
                  }}
                >
                  <Button
                    variant="contained"
                    color="default"
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Fade>
        </Modal>
      )}
    </div>
  );
}

export default HomeFetchModal;
