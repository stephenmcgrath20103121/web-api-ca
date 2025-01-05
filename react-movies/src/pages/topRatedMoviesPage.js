import React, {useState} from "react";
import { getTopRatedMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToWatchList from '../components/cardIcons/addToWatchList'

const TopRatedMoviesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {  data, error, isLoading, isError }  = useQuery(["top_rated", { page: currentPage }], getTopRatedMovies);
    if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;
  const totalPages = data.total_pages;

  return (
    <>
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      action={(movie) => {
        return <AddToWatchList movie={movie} />
      }}
      currentPage={currentPage}
      setCurrentPage={(page) => {
      if (page > 0 && page <= totalPages) {
        setCurrentPage(page);
      }
    }}
    totalPages={totalPages}
    />
    </>
  );
};
export default TopRatedMoviesPage;