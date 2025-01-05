import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";
import { updateFavouriteMovies } from "../../api/tmdb-api";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const authContext = useContext(AuthContext);

  const handleAddToFavorites = async (e) => {
    e.preventDefault();
    try {
      const updatedFavorites = [...context.favorites, movie.id];
      console.log("Updated favourites list:", updatedFavorites);
      context.addToFavorites(movie);
      const response = await updateFavouriteMovies(authContext.userName, updatedFavorites);
      console.log(response);
    } catch (error) {
      console.error("Error updating favorite movies:", error);
    }
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;