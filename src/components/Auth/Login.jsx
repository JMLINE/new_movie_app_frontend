import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Alert, AlertTitle } from "@material-ui/lab";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = () => {
    fetch(`http://localhost:3000/user/signin`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.hasOwnProperty("error")) {
          setErrorMessage(data.error);
        } else {
          props.updateToken(data.sessionToken);
          setErrorMessage(false);
        }
      });
  };

  function clearError() {
    setErrorMessage(false);
  }
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
          Sign in to your account
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ textAlign: "center" }}>
            Welcome back!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="username"
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            value={username}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            value={password}
            required
          />
        </DialogContent>
        {localStorage.setItem("username", username)}

        {errorMessage === false ? (
          <> </>
        ) : (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Username or Password is incorrect. Please try again.
          </Alert>
        )}
        <DialogActions>
          <Button
            onClick={() => {
              props.handleClose();
              clearError();
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              // props.handleClose();
              handleSubmit();
            }}
            color="primary"
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Login;
