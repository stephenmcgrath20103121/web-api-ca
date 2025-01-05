import React from "react";
import { useParams } from 'react-router-dom';
import ActorDetails from "../components/actorDetails/";
import PageTemplate from "../components/templateActorPage";
import { getActor, getActorMovies } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'

const ActorDetailsPage = () => {
  const { id } = useParams(); 
  const { data: actor, ActError, isActLoading, isActError } = useQuery(
    ["actorDetails", { id: id }],
    getActor
  );

  const { data: movies, MovError, isMovLoading, isMovError } = useQuery(
    ["actorMovies", { id }],
    () => getActorMovies(id)
  );

  if (isActLoading || isMovLoading) {
    return <Spinner />;
  }

  if (isActError) {
    return <div>Error while loading actor details: {ActError.message}</div>;
  }

  if (isMovError) {
    return <div>Error while loading actor movie details: {MovError.message}</div>;
  }

  return (
    <>
      {actor ? (
        <>
          <PageTemplate actor={actor}>
            <ActorDetails actor={actor} movies={movies?.cast || []} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for actor details</p>
      )}
    </>
  );
};

export default ActorDetailsPage;