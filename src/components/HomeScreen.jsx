import React, { useState, useEffect } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import HomeFetch from "./HomeFetch";
import HomeModal from "./HomeModal";

const api_key = "0ee501d44ddbea684b5c527c4a15be42";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    flexGrow: 1,
    margin: 30,
  },
  card: {
    textAlign: "center",
    height: 800,
  },
});
function HomeScreen(props) {
  const [nowPlayingList, setNowPlayingList] = useState([]);

  const nowPlayingSearch = () => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}`)
      .then((response) => response.json())
      .then((data) => {
        setNowPlayingList(data.results);
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    nowPlayingSearch();
  }, []);

  const classes = useStyles();

  return (
    <>
      <HomeFetch token={props.token} />
      <div>
        <h1 style={{ textAlign: "center" }}>Now Playing</h1>
        <Grid container spacing={3}>
          {nowPlayingList.map((results, index) => (
            <Grid
              item
              xs={12}
              md={6}
              key={index}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Card className={classes.root} style={{ height: "60em" }}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    component="img"
                    alt="No Picture to Display"
                    image={`https://image.tmdb.org/t/p/w500/${results.poster_path}?api_key=0ee501d44ddbea684b5c527c4a15be42`}
                    title="Now Playing"
                    // style={{ height: "10em" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {results.title}
                    </Typography>
                    {/* <br></br> */}
                    <div
                      className="plotScroll"
                      style={{ maxHeight: 100, overflow: "auto" }}
                    >
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {results.overview}
                      </Typography>
                    </div>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <br></br>
                      <b>Release Date:</b> {results.release_date}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <br></br>
                      <b>Average Score:</b>{" "}
                      {results.vote_average < 5 ? (
                        <p style={{ backgroundColor: "red" }}>
                          {results.vote_average}
                        </p>
                      ) : results.vote_average < 7 ? (
                        <p style={{ backgroundColor: "yellow" }}>
                          {results.vote_average}
                        </p>
                      ) : results.vote_average >= 7 ? (
                        <p
                          style={{
                            backgroundColor: "green",
                            color: "white",
                          }}
                        >
                          {results.vote_average}
                        </p>
                      ) : (
                        <p>{results.vote_average}</p>
                      )}
                      *Based on {results.vote_count} Votes.
                      <br></br>
                      <br></br>
                      <div
                        className="trailerBtn"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <HomeModal title={results.title} id={results.id} />
                      </div>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
export default HomeScreen;
