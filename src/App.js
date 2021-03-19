import React, { useState, useEffect } from "react";
import HomeFetch from "./components/HomeFetch";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth/Auth";
import Watchlist from "./components/Watchlist";
import SideBar from "./components/SideBar";
import HomeScreen from "./components/HomeScreen";

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
    console.log(newToken);
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
        <Auth updateToken={updateToken} /> <HomeFetch token={sessionToken} />
      </>
    );
  };

  return (
    <>
      <div>
        {" "}
        {/* <SideBar
                      token={sessionToken}
                      updateToken={updateToken}
                      clickLogout={clearToken}
                    /> */}{" "}
        {protectedViews()}{" "}
        {sessionToken !== localStorage.getItem("token") ? (
          <div>
            <HomeScreen />
          </div>
        ) : (
          ""
        )}{" "}
      </div>{" "}
    </>
  );
}

export default App;
