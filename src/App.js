import React, { useState, useEffect } from "react";
import Auth from "./components/Auth/Auth";
import SideBar from "./components/SideBar";
import HomeScreen from "./components/HomeScreen";
import "./App.css";

function App() {
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);
  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };
  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  };

  const protectedViews = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <>
        <SideBar
          token={sessionToken}
          updateToken={updateToken}
          clickLogout={clearToken}
        />{" "}
      </>
    ) : (
      <>
        <Auth updateToken={updateToken} /> {/* <HomeFetch /> */}{" "}
      </>
    );
  };

  return (
    <>
      <div>
        {" "}
        {protectedViews()}{" "}
        {sessionToken !== localStorage.getItem("token") ? (
          <div>
            <HomeScreen token={sessionToken} />{" "}
          </div>
        ) : (
          ""
        )}{" "}
      </div>{" "}
    </>
  );
}

export default App;
