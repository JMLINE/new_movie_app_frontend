import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
const api_key = "0ee501d44ddbea684b5c527c4a15be42";

function HomeModal(props) {
  const [videoKey, setVideoKey] = useState();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const movieTrailerFetch = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${props.id}/videos?api_key=${api_key}&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setVideoKey(data.results[0].key);
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    movieTrailerFetch();
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        View Trailer
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        backgroundColor="#ab003c"
      >
        <DialogContent>
          <DialogContentText
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="iframeContainer">
              <iframe
                src={`https://www.youtube.com/embed/${videoKey}`}
                style={{
                  width: "30em",
                  height: "25em",
                  display: "flex",
                  justifyContent: "center",
                }}
              ></iframe>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default HomeModal;
