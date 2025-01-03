import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import SimpleMovieCard from "../simpleMovieCard"; 

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const ActorDetails = ({ actor, movies }) => {
  return (
    <>
      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography variant="h5" color="textSecondary">
              Biography
            </Typography>
            <Typography variant="body1">{actor.biography}</Typography>
            <br />
            <Typography variant="h6" color="textSecondary">
              Birthday: {actor.birthday}
              <br />
              Birthplace: {actor.place_of_birth}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h4" gutterBottom>
        Appears In:
      </Typography>
      <Paper>
        <Grid container spacing={2}>
          {movies.slice(0, 12).map((movie) => (
        <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
          <SimpleMovieCard movie={movie} />
        </Grid>
        ))}
        </Grid>
      </Paper>
    </>
  );
};

export default ActorDetails;