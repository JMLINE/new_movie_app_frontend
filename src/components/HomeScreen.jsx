import React, { useState, useEffect } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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
  media: {
    // width: "100%",
    // height: "100%",
  },
});
function HomeScreen() {
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
      <div>
        <h1 style={{ textAlign: "center" }}>Now Playing</h1>
        <Grid
          container
          // direction="row"
          // justify="center"
          // alignItems="stretch"
          spacing={3}
        >
          {nowPlayingList.map((results, index) => (
            <Grid item xs={12} sm={4} key={index}>
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
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {results.overview}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <br></br>
                      Release Date: {results.release_date}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <br></br>
                      Average Score: {results.vote_average}
                      <br></br>
                      Based on {results.vote_count} Votes.
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

  return (
    <div>
      <h1>Now Playing</h1>
    </div>
  );
  // );
}
export default HomeScreen;
