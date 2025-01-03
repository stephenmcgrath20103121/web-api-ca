import React, {useState} from "react";
import { getPopularMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToWatchList from '../components/cardIcons/addToWatchList'
import { Pagination } from "@mui/material";

const PopularMoviesPage = (props) => {
  const [page, setPage] = useState(1);

  const {  data, error, isLoading, isError }  = useQuery(['popular', page],() => getPopularMovies(page))
  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;

  const handlePageChange = (event,value) => {
    setPage(value);
  }

  return (
    <>
    <PageTemplate
      title="Popular Movies"
      movies={movies}
      action={(movie) => {
        return <AddToWatchList movie={movie} />
      }}
    />
    <Pagination
      count={data.total_pages}
      page={page}
      onChange={handlePageChange}
      sx={{ display: "flex", justifyContent: "center"}}
    />
    </>
  );
};
export default PopularMoviesPage;