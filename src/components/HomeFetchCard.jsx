import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import "./HomeFetch.css";

function HomeFetchCard(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(0),
        width: "100%",
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className="searchBar">
      {props.title === "" || props.errorMessage === true ? (
        ""
      ) : (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          height="100%"
        >
          <Grid item xs={7}>
            <Card className={classes.root} style={{ width: "25em" }}>
              <CardActionArea>
                <CardMedia
                  justify-content="center"
                  component="img"
                  alt="none"
                  image={props.poster}
                  title={props.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {props.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="div"
                  >
                    {props.plot}
                    <p>
                      {props.year} || {props.rated}
                    </p>
                    <p>
                      {props.rating} on {props.ratingSource}
                    </p>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant="contained"
                  color="default"
                  onClick={() => {
                    props.postMovie();
                    props.clearSearch();
                  }}
                >
                  Add to Watchlist
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
export default HomeFetchCard;
