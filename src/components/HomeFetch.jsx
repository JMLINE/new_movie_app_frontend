import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "./HomeFetch.css";
import Button from "@material-ui/core/Button";
import { Alert, AlertTitle } from "@material-ui/lab";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import HomeFetchModal from "../components/HomeFetchModal";

let ApiKey = "9c95d3df";

function HomeFetch(props) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [rated, setRated] = useState("");
  const [plot, setPlot] = useState("");
  const [poster, setPoster] = useState("");
  const [directedBy, setDirectedBy] = useState("");
  const [rating, setRating] = useState("");
  const [ratingSource, setRatingSource] = useState("");
  const [actors, setActors] = useState("");
  const [writtenBy, setWrittenBy] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [viewed, setViewed] = useState();
  const [errorMessage, setErrorMessage] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [postError, setPostError] = useState(false);
  const [blankCard, setBlankCard] = useState(true);
  const [open2, setOpen2] = React.useState(true);
  const [state, setState] = React.useState({
    open: true,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const searchFetch = (e) => {
    e.preventDefault();
    fetch(`http://www.omdbapi.com/?apikey=${ApiKey}&t=${userSearch}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.Title);
        setYear(data.Year);
        setRated(data.Rated);
        setPlot(data.Plot);
        setPoster(data.Poster);
        setDirectedBy(data.Director);
        setActors(data.Actors);
        setWrittenBy(data.Writer);
        setRating(data.Ratings[0].Value);
        setRatingSource(data.Ratings[0].Source);
        setViewed(false);

        setBlankCard(false);
        setOpen2(true);
      })
      .catch(function (error) {
        console.log(error);
        setErrorMessage(true);
        setBlankCard(true);
      });
    {
      clearData();
    }
  };

  function postMovie() {
    fetch(`http://localhost:3000/movies/save`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
      body: JSON.stringify({
        movies: {
          title: title,
          year: year,
          rated: rated,
          poster: poster,
          plot: plot,
          rating: rating,
          ratingSource: ratingSource,
          actors: actors,
          writtenBy: writtenBy,
          viewed: viewed,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.message === "No Token Provided") {
          setPostError(true);
          return;
        }
        setPostSuccess(true);
      })
      .catch(function (error) {
        console.log("ERROR ERROR", error);
        setPostError(true);
        setPostSuccess(false);
      });
    {
      clearData();
    }
  }

  function clearData() {
    setTimeout(() => {
      setErrorMessage(false);
      setPostSuccess(false);
      setPostError(false);
    }, 6000);
  }
  function clearSearch() {
    setUserSearch("");
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "100%",
        flexGrow: 1,
        align: "center",
      },
    },
  }));

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleOpen = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const classes = useStyles();

  return (
    <div className="searchBar">
      <Grid container spacing={3}>
        <Grid item xs={4}></Grid>
        <Grid item xs={11} sm={11} md={4}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              placeholder="Search"
              variant="outlined"
              value={userSearch}
              onChange={(e) => {
                setUserSearch(e.target.value);
              }}
            />

            <Button
              style={{
                maxWidth: "70px",
                maxHeight: "50px",
                minWidth: "70px",
                minHeight: "50px",
              }}
              onClick={searchFetch}
              type="submit"
              variant="contained"
            >
              Search
            </Button>
          </form>
        </Grid>
        <Grid item xs={4}></Grid>

        <Grid item xs={6}>
          {errorMessage === true ? (
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={handleClick}
              key={vertical + horizontal}
              autoHideDuration={1000}
            >
              <Alert severity="warning">
                Error. Please Check Spelling and Try Again.
              </Alert>
            </Snackbar>
          ) : (
            ""
          )}

          {postSuccess === true ? (
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={handleClick}
              key={vertical + horizontal}
              autoHideDuration={1000}
            >
              <Alert severity="success">Movie Successfully Added!</Alert>
            </Snackbar>
          ) : (
            ""
          )}

          {postError === true ? (
            <div>
              <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClick}
                key={vertical + horizontal}
                autoHideDuration={1000}
              >
                <Alert severity="error">
                  Must sign in to add to watchlist!
                </Alert>
              </Snackbar>
            </div>
          ) : (
            ""
          )}
          {props.token === localStorage.getItem("token") &&
          postError === true ? (
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={handleClick}
              key={vertical + horizontal}
              autoHideDuration={1000}
            >
              <Alert severity="error">
                An Error Occured. Please Try Again.
              </Alert>
            </Snackbar>
          ) : (
            ""
          )}
        </Grid>
        {blankCard === true ? (
          ""
        ) : (
          <div>
            <HomeFetchModal
              title={title}
              year={year}
              rated={rated}
              plot={plot}
              poster={poster}
              rating={rating}
              directedBy={directedBy}
              actors={actors}
              writtenBy={writtenBy}
              ratingSource={ratingSource}
              errorMessage={errorMessage}
              userSearch={userSearch}
              postMovie={postMovie}
              postSuccess={postSuccess}
              clearData={clearData}
              clearSearch={clearSearch}
              handleOpen={handleOpen}
              handleClose2={handleClose2}
              open2={open2}
            />
          </div>
        )}
      </Grid>
    </div>
  );
}

export default HomeFetch;
