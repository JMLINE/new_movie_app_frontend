import React, { useState, useEffect } from "react";
import WatchedGraph from "./WatchedGraph";
import { Container, Row, Col } from "reactstrap";
import TotalViewGraph from "./TotalViewGraph";

function History(props) {
  const [myMovieList, setMyMovieList] = useState([]);

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
      });
  };

  useEffect(() => {
    fetchWatchList();
  }, []);
  //For Rating scores
  let goodArray = [];
  let okArray = [];
  let badArray = [];
  //For good/bad/rating
  let movieArrayGood = [];
  let movieArrayBad = [];
  let movieArrayOk = [];
  //For watched/unwatched sorting
  let movieArray = [];
  let notWatched = [];

  function dumbFunction() {
    return null;
  }

  const mapMovieData = () => {
    return myMovieList.map(function (movies, index) {
      movies.viewed === true
        ? movieArray.push(movies)
        : notWatched.push(movies);
    });
  };

  const movieList = () => {
    return movieArray.map(function (newMovies, index) {
      let movieRatings2 = newMovies.rating.split("/");
      let totalRating2 = movieRatings2[0];

      totalRating2 >= 7 ? movieArrayGood.push(newMovies) : dumbFunction();
      {
        totalRating2 < 7 && totalRating2 > 5
          ? movieArrayOk.push(newMovies)
          : dumbFunction();
      }
      totalRating2 < 5 ? movieArrayBad.push(newMovies) : dumbFunction();
    });
  };

  const okList = () => {
    return movieArrayOk.map(function (okMovies, index) {
      let movieRatings2 = okMovies.rating.split("/");
      let totalRating2 = movieRatings2[0];
      okArray.push(parseFloat(totalRating2));

      return (
        <>
          {okMovies.title}
          <br></br>
        </>
      );
    });
  };

  const goodList = () => {
    return movieArrayGood.map(function (goodMovies, index) {
      let movieRatings2 = goodMovies.rating.split("/");
      let totalRating2 = movieRatings2[0];
      goodArray.push(parseFloat(totalRating2));

      return (
        <>
          {goodMovies.title}

          <br></br>
        </>
      );
    });
  };
  const badList = () => {
    return movieArrayBad.map(function (badMovies, index) {
      let movieRatings2 = badMovies.rating.split("/");
      let totalRating2 = movieRatings2[0];

      badArray.push(parseFloat(totalRating2));
      return (
        <>
          {badMovies.title}
          <br></br>
        </>
      );
    });
  };

  // ************MIGHT USE LATER*******************************
  // // let newAvG = myAverageArrayG.reduce((a, b) => a + b, 0);
  // // console.log("this is new", newAvG);
  // // let movieAverageG = (newAvG / myAverageArrayG.length).toFixed(2);

  // let newAvO = myAverageArrayO.reduce((a, b) => a + b, 0);
  // console.log("this is new", newAvO);
  // console.log((newAvO / myAverageArrayO.length).toFixed(2));

  // let newAvB = myAverageArrayB.reduce((a, b) => a + b, 0);
  // console.log("this is new", newAvB);
  // console.log((newAvB / myAverageArrayB.length).toFixed(2));

  return (
    <>
      <Container>
        <Row>
          <Col md="12" style={{ textAlign: "center", fontSize: "26pt" }}>
            Watched
            <div className="chart-container"></div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <Container>
        <Row
          style={{
            marginTop: "5em",
          }}
        >
          <Col
            md="6"
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          ></Col>
          <Col
            md="6"
            style={{
              // margin: "5em",
              display: "flex",
              justifyContent: "flex-end",
            }}
          ></Col>
        </Row>
      </Container>
      {mapMovieData()}
      {movieList()}
      <Container>
        <Row style={{ height: "15em" }}>
          <Col md="4" style={{ textAlign: "center", marginBottom: "3em" }}>
            <h4 style={{ textAlign: "center" }}>
              <u>Great</u>
            </h4>
            <div
              className="greatScroll"
              style={{ maxHeight: 100, overflow: "auto" }}
            >
              {goodList()}
            </div>
          </Col>
          <Col
            md="4"
            style={{
              textAlign: "left",
              marginBottom: "3em",
            }}
          >
            {" "}
            <h4 style={{ textAlign: "center" }}>
              <u>Good</u>
            </h4>
            <div
              className="decentScroll"
              style={{ maxHeight: 100, overflow: "auto" }}
            >
              {okList()}
            </div>
          </Col>
          <Col md="4" style={{ textAlign: "center", marginBottom: "3em" }}>
            {" "}
            <h4 style={{ textAlign: "center" }}>
              <u>Bad</u>
            </h4>
            <div
              className="badScroll"
              style={{ maxHeight: 100, overflow: "auto" }}
            >
              {badList()}
            </div>
          </Col>

          <br></br>

          <Col md="6" sm="12" style={{ marginBottom: "3em" }}>
            <WatchedGraph
              goodData={goodArray.length}
              okData={okArray.length}
              badData={badArray.length}
            />
          </Col>

          <Col md="6" sm="12" style={{ marginBottom: "3em" }}>
            <TotalViewGraph totalMovies={movieArray.length} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default History;
