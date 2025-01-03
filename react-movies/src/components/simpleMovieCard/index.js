import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import img from '../../images/film-poster-placeholder.png';

const SimpleMovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none" }}>
      <Card sx={{ maxWidth: 160, margin: 0.5 }}>
        <CardMedia
          sx={{ height: 240 }}
          image={
            movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`: img }
        />

        <CardContent>
            <Typography variant="subtitle1" noWrap component="p">
              {movie.title}
            </Typography>

            <Typography variant="body2" color="textSecondary">
              {movie.release_date || "N/A"}
            </Typography>
          </CardContent>
      </Card>
    </Link>
  );
};

export default SimpleMovieCard;