import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
          setErrorMessage("");
        }
      });
  };
  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        {errorMessage === "" ? (
          <> </>
        ) : (
          <div
            style={{ background: "red" }}
            className="alert alert-danger"
            role="alert"
          >
            Username and password combination is incorrect. Please try again.
          </div>
        )}
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            name="username"
            value={username}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
            type="password"
            value={password}
          />
        </FormGroup>
        <Button color="dark" type="submit">
          Login{" "}
        </Button>
      </Form>
    </div>
  );
}
export default Login;
