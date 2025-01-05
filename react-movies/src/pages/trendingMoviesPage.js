import React, {useState} from "react";
import { getTrendingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToWatchList from '../components/cardIcons/addToWatchList'

const TrendingMoviesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 0;

  const {  data, error, isLoading, isError }  = useQuery(["trending", { page: currentPage }], getTrendingMovies);
  if (isLoading) {
    return <Spinner />
  }
  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;

  return (
    <>
    <PageTemplate
      title="Trending Movies"
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
export default TrendingMoviesPage;