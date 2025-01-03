import React, { useState } from "react";
import { useQuery } from "react-query";
import Grid from "@mui/material/Grid2";
import { getCredits, getMovieRecommendations } from '../../api/tmdb-api';
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Spinner from '../spinner'
import MovieReviews from "../movieReviews";
import SimpleMovieCard from "../simpleMovieCard";
import ActorCard from "../actorCard";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {data: recommendations, isRecLoading, isRecError} = useQuery(
    ["movieRecommendation", movie.id], () => getMovieRecommendations(movie.id)
  );
  const recommendationResult = recommendations?.results || [];

  const {data: credits, isCredLoading, isCredError} = useQuery(
    ["movieCredits", movie.id], () => getCredits(movie.id)
  );
  const cast = credits?.cast || [];

  if (isRecLoading || isCredLoading) {
    return <Spinner />;
  } 

  if ( isRecError) {
    return <Typography>Error while loading recommendations</Typography>
  }

  if ( isCredError) {
    return <Typography>Error while loading credits</Typography>
  }

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count}`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Production Countries" sx={{...chip}} color="primary" />
        </li>
        {movie.production_countries.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>

      <Paper>
        <Typography variant="h5" component="h3" sx={{ marginTop: 4 }}>
        Cast
        </Typography>
          <Grid container spacing={1.5}>
            {cast.slice(0,12).map((castMember) => (
              <Grid item key={castMember.id} xs={12} sm={6} md={4} lg={3}>
                <ActorCard cast={castMember} />
              </Grid>
            ))}
          </Grid>
      </Paper>

      <Paper>
        <Typography variant="h5" gutterBottom>
          Recommendations:
        </Typography>
          <Grid container spacing={2}>
            {recommendationResult.slice(0, 15).map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <SimpleMovieCard movie={movie} />
          </Grid>
            ))}
          </Grid>
      </Paper>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
      </>
  );
};
export default MovieDetails ;