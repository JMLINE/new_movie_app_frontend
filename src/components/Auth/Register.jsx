import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    fetch(`http://localhost:3000/user/register`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
          email: email,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        props.updateToken(data.sessionToken);
      });
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
          Sign Up
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ textAlign: "center" }}>
            Join us for FREE!
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
            label="Email"
            type="email"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
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
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.handleClose();
              handleSubmit();
            }}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {localStorage.setItem("username", username)}
    </div>
  );
};
export default Register;
