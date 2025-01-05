import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid2";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages, getCredits } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ActorCard from "../actorCard";

const TemplateMoviePage = ({ movie, children }) => {
    const { data , error, isLoading, isError } = useQuery(
        ["images", { id: movie.id }],
        getMovieImages
      );

      const { data: actors, error: actorError, isLoading: actorIsLoading, isError: actorIsError,} = useQuery(
        ["actors", { id: movie.id }], 
        getCredits
      );
    
      if (isLoading || actorIsLoading ) {
        return <Spinner />;
      }
    
      if (isError) {
        return <h1>{error.message}</h1>;
      }
      const images = data.posters 
    
      if (actorIsError) {
        return <h1>{actorError.message}</h1>;
      }
      const cast = actors.cast;

  return (
    <>
      <MovieHeader movie={movie} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid size={{xs: 3}}>
          <div sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}>
            <ImageList
                sx={{
                    height: "100vh",
                }}
                cols={1}
            >
                {images.map((image) => (
                    <ImageListItem key={image.file_path} cols={1}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                        alt={image.poster_path}
                    />
                    </ImageListItem>
                ))}
            </ImageList>
          </div>
        </Grid>

        <Grid size={{xs: 9}}>
          {children}
        </Grid>
      </Grid>

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

    </>
  );
};

export default TemplateMoviePage;