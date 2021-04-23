import React, { useState, useEffect } from "react";
import "./watchListStyle.css";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";

import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "reactstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

function Watchlist(props) {
  const [myMovieList, setMyMovieList] = useState([]);
  const [modal, setModal] = useState(false);
  const [actorList, setActorList] = useState([]);

  const toggle = () => setModal(!modal);

  const fetchWatchList = () => {
    fetch(`http://localhost:3000/movies/watchlist`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMyMovieList(data);
        setActorList(data.actors);
      });
  };
  const updateViewed = (data) => {
    fetch(`http://localhost:3000/movies/save/${data.id}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
      body: JSON.stringify({
        movies: {
          viewed: true,
        },
      }),
    }).then((res) => {
      fetchWatchList();
    });
  };

  useEffect(() => {
    fetchWatchList();
  }, []);

  const deleteMovies = (data) => {
    fetch(`http://localhost:3000/movies/watchlist/${data.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    }).then(() => fetchWatchList());
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));
  function reDirect() {
    <Redirect to="/home" />;
  }
  const classes = useStyles();
  const movieMapper = () => {
    return myMovieList.map(function (movies, index) {
      const date = movies.createdAt;
      const [year, month, day] = date.split("-");
      const dateObj = { month, day, year };

      let actorNames = movies.actors.split(",");

      let actor1 = actorNames[0];
      let actor2 = actorNames[1];
      let actor3 = actorNames[2];
      let actor4 = actorNames[3];

      return (
        <div className="watchListCards2">
          {movies.viewed === true ? (
            ""
          ) : (
            <div key={index} className="cards">
              <Container>
                <Row
                  style={{
                    padding: "1em",
                    textAlign: "center",
                  }}
                >
                  <Col lg="3">
                    <img
                      src={movies.poster}
                      style={{
                        height: "18em",
                        width: "12em",
                      }}
                    ></img>
                  </Col>
                  <Col lg="6">
                    <b>
                      <h2>{movies.title}</h2>
                    </b>{" "}
                    {`${movies.year}  |  ${movies.rated}  |  ${movies.rating}`}
                    <br></br>
                    <br></br>
                    {movies.plot}
                    <br></br>
                    <br></br>
                    {actor1 === "N/A" ? (
                      "Actors Unknown"
                    ) : (
                      <div>
                        <a
                          href={`https://en.wikipedia.org/wiki/${actor1}`}
                          target="_blank"
                          style={{ textDecoration: "none" }}
                        >
                          {actor1},
                        </a>
                        <a
                          href={`https://en.wikipedia.org/wiki/${actor2}`}
                          target="_blank"
                          style={{ textDecoration: "none" }}
                        >
                          {actor2},
                        </a>
                        <a
                          href={`https://en.wikipedia.org/wiki/${actor3}`}
                          target="_blank"
                          style={{ textDecoration: "none" }}
                        >
                          {actor3},
                        </a>
                        <a
                          href={`https://en.wikipedia.org/wiki/${actor4}`}
                          target="_blank"
                          style={{ textDecoration: "none" }}
                        >
                          {actor4}
                        </a>
                      </div>
                    )}
                    <br></br>
                    <br></br>
                    {`Written by:  ${movies.writtenBy}`}
                  </Col>

                  <Col lg="3" style={{ textAlign: "right" }}>
                    {" "}
                    <b> Date Added:</b> {dateObj.month}/{dateObj.day}/
                    {dateObj.year}
                    <br></br>
                    <br></br>
                    <Button
                      id="watchedButton"
                      onClick={() => {
                        updateViewed(movies);
                      }}
                    >
                      <AddIcon fontSize="small"></AddIcon>
                      Watched
                    </Button>
                    <br></br>
                    <br></br>
                    <Button
                      id="deleteButton"
                      outline
                      color="danger"
                      onClick={() => {
                        deleteMovies(movies);
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                      Remove
                    </Button>
                  </Col>
                </Row>
              </Container>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <>
      <ListItemIcon style={{ display: "flex", justifyContent: "left" }}>
        <div
          style={{
            borderStyle: "solid",
            backgroundColor: "black",
            color: "white",
          }}
          className="backButton"
        >
          <ArrowBackIcon fontSize="small" />

          <Link
            to="/home"
            onClick={reDirect}
            style={{ textDecoration: "none", color: "white" }}
          >
            Go Back
          </Link>
        </div>
      </ListItemIcon>
      <Container>
        <Row>
          <Col sm="12">
            {" "}
            <h1 id="watchlistTitle">My Watchlist</h1>
          </Col>
        </Row>
      </Container>
      {/* <Route exact path="/home"></Route> */}

      <div className="watchListCards2">{movieMapper()}</div>
    </>
  );
}
export default Watchlist;
