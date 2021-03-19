import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import "./watchListStyle.css";

function Watchlist(props) {
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
        console.log(data);
        setMyMovieList(data);
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

  const movieMapper = () => {
    return myMovieList.map(function (movies, index) {
      const date = movies.createdAt;
      const [year, month, day] = date.split("-");
      const dateObj = { month, day, year };

      return (
        <div className="watchListCards">
          <div key={index} className="cards">
            <h2>{movies.title}</h2>
            <img
              src={movies.poster}
              style={{ height: "15em" }}
              alt="Not Found"
            />
            <p>
              Date Added: {dateObj.month}/{dateObj.day}/{dateObj.year}
            </p>
            <p>Released: {movies.year}</p>
            <p>Rated: {movies.rated}</p>
            <Button
              onClick={() => {
                deleteMovies(movies);
              }}
            >
              Remove
            </Button>
            <Button>Watched</Button>
          </div>
        </div>
      );
    });
  };
  return (
    <>
      <h1 id="watchlistTitle">My Watchlist</h1>
      <div className="watchListCards2">{movieMapper()}</div>
    </>
  );
}
export default Watchlist;
