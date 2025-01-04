import React, { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router-dom";
import Header from "../components/headerMovieList";
import Grid from "@mui/material/Grid2";
import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

const LoginPage = props => {
    const context = useContext(AuthContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        context.authenticate(userName, password);
    };

    let location = useLocation();

    // Set 'from' to path where browser is redirected after a successful login - either /home or the protected path user requested
    const { from } = location.state ? { from: location.state.from.pathname } : { from: "/home" };

    if (context.isAuthenticated === true) {
        return <Navigate to={from} />;
    }

    return (
        <Grid container direction="column" alignItems="center">
      <Grid size={12}>
        <Header title={"Log In"} />
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
        <Button variant="contained" onClick={login}>
          Log In
        </Button>
        </Grid>
      </Grid>
    );
};

export default LoginPage;
