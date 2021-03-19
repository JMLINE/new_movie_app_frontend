import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "./HomeFetch.css";
import HomeFetchCard from "../components/HomeFetchCard";
import Button from "@material-ui/core/Button";
import { Alert, AlertTitle } from "@material-ui/lab";
import Grid from "@material-ui/core/Grid";

let ApiKey = "9c95d3df";

function HomeFetch(props) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [rated, setRated] = useState("");
  const [plot, setPlot] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState("");
  const [ratingSource, setRatingSource] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [postError, setPostError] = useState(false);
  const [blankCard, setBlankCard] = useState(true);

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
        setRating(data.Ratings[0].Value);
        setRatingSource(data.Ratings[0].Source);
        setBlankCard(false);
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
        setTitle("");
        setYear("");
        setRated("");
        setPoster("");
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
    }, 5000);
  }
  function clearSearch() {
    setUserSearch("");
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "50ch",
        flexGrow: 1,
        align: "center",
      },
    },
  }));

  const classes = useStyles();
  return (
    <div className="searchBar">
      <Grid container spacing={3}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
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
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          {errorMessage === true ? (
            <Alert style={{ width: "80%" }} severity="error">
              <br></br>
              <AlertTitle>Error</AlertTitle>
              Movie is not in our database. Please check your spelling and try
              again
            </Alert>
          ) : (
            ""
          )}

          {postSuccess === true ? (
            <Alert style={{ width: "80%" }} severity="success">
              <AlertTitle>Success</AlertTitle>
              Success
            </Alert>
          ) : (
            ""
          )}

          {postError === true ? (
            <Alert style={{ width: "80%" }} severity="error">
              <AlertTitle>Error</AlertTitle>
              Must login to save to Watchlist!
            </Alert>
          ) : (
            ""
          )}
          {props.token === localStorage.getItem("token") &&
          postError === true ? (
            <Alert style={{ width: "48%" }} severity="error">
              <AlertTitle>Error</AlertTitle>
              An Error Occured. Please try again.
            </Alert>
          ) : (
            ""
          )}
        </Grid>
        {blankCard === true ? (
          ""
        ) : (
          <div>
            <HomeFetchCard
              title={title}
              year={year}
              rated={rated}
              plot={plot}
              poster={poster}
              rating={rating}
              ratingSource={ratingSource}
              errorMessage={errorMessage}
              userSearch={userSearch}
              postMovie={postMovie}
              postSuccess={postSuccess}
              clearData={clearData}
              clearSearch={clearSearch}
            />
          </div>
        )}
      </Grid>
    </div>
  );
}
export default HomeFetch;
