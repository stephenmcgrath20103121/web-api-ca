import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";
import { updateFavouriteMovies } from "../../api/tmdb-api";

const RemoveFromFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const authContext = useContext(AuthContext);

  const handleRemoveFromFavorites = async (e) => {
    e.preventDefault();
    try {
      const updatedFavorites = context.favorites.filter((id) => id !== movie.id); 
      console.log("Updated favourites list before backend call:", updatedFavorites);
      context.removeFromFavorites(movie);
      const response = await updateFavouriteMovies(authContext.userName, updatedFavorites);
      console.log(response);
    } catch (error) {
      console.error("Error updating favorite movies:", error);
    }
  };
  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromFavorites}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavoritesIcon;