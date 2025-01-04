import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import Header from "../components/headerMovieList";
import Grid from "@mui/material/Grid2";
import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

const SignUpPage = props => {
  const context = useContext(AuthContext)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);

  const register = () => {
    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = passwordRegEx.test(password);

    if (validPassword && password === passwordAgain) {
      context.register(userName, password);
      setRegistered(true);
    }
  }

  if (registered === true) {
    return <Navigate to="/login" />;
  }

  return (
    <Grid container direction="column" alignItems="center">
      <Grid size={12}>
        <Header title={"Sign Up"} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}} direction="column" alignItems="center">
      <Typography component="h3" variant="h5" style={{ backgroundColor: "rgb(220,220,220)", fontFamily: "sans-serif", padding: "8px", borderStyle: "solid", borderWidth: "2px", borderColor: "rgb(120, 120, 120)", borderRadius: "4px" }}>
          Username
        </Typography>
        <TextField
          sx={{ margin: 1, minWidth: 300, backgroundColor: "rgb(160, 128, 224, 0.5)" }}
          id="username"
          label="Username"
          value={userName}
          onChange={e => {
            setUserName(e.target.value);}}
        />
        <Typography component="h3" variant="h5" style={{ backgroundColor: "rgb(220,220,220)", fontFamily: "sans-serif", padding: "8px", borderStyle: "solid", borderWidth: "2px", borderColor: "rgb(120, 120, 120)", borderRadius: "4px" }}>
          Password
        </Typography>
        <TextField
          sx={{ margin: 1, minWidth: 300, backgroundColor: "rgb(160, 128, 224, 0.5)" }}
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);}}
        />
        <Typography component="h3" variant="h5" style={{ backgroundColor: "rgb(220,220,220)", fontFamily: "sans-serif", padding: "8px", borderStyle: "solid", borderWidth: "2px", borderColor: "rgb(120, 120, 120)", borderRadius: "4px" }}>
          Verify Password
        </Typography>
        <TextField
          sx={{ margin: 1, minWidth: 300, backgroundColor: "rgb(160, 128, 224, 0.5)" }}
          id="passwordAgain"
          label="Verify Password"
          type="password"
          value={passwordAgain}
          onChange={e => {
            setPasswordAgain(e.target.value);}}
        />
        <Button variant="contained" onClick={register}>
          Sign Up
        </Button>
        </Grid>
      </Grid>
  );
};

export default SignUpPage;
