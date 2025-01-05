export const getMovies = async ({ queryKey }) => {
  const [, pagePart] = queryKey;
  const { page } = pagePart;
  const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/discover?page=${page}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
};

export const getUpcomingMovies = async ({ queryKey }) => {
  const [, pagePart] = queryKey;
  const { page } = pagePart;
  const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/upcoming?page=${page}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
};

  export const getPopularMovies = async ({ queryKey }) => {
    const [, pagePart] = queryKey;
    const { page } = pagePart;
    const response = await fetch(
      `http://localhost:8080/api/movies/tmdb/popular?page=${page}`, {
      headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
    )
    return response.json();
  };

  export const getTopRatedMovies = async ({ queryKey }) => {
    const [, pagePart] = queryKey;
    const { page } = pagePart;
    const response = await fetch(
      `http://localhost:8080/api/movies/tmdb/topRated?page=${page}`, {
      headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
    )
    return response.json();
  };
  
  export const getMovie = async (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    const response = await fetch(
      `http://localhost:8080/api/movies/${id}`, { 
      headers: {
        'Authorization': window.localStorage.getItem('token')
        }
    }
    )
    return response.json();
  };
  
  export const getGenres = async () => {
    const response = await fetch(
      'http://localhost:8080/api/movies/tmdb/genres', {
      headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
    )
    return response.json();
  };
  
  export const getMovieImages = async ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    const response = await fetch(
      `http://localhost:8080/api/movies/images/${id}`, { 
      headers: {
        'Authorization': window.localStorage.getItem('token')
        }
    }
    )
    return response.json();
  };

  export const getMovieReviews = async ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    const response = await fetch(
      `http://localhost:8080/api/movies/reviews/${id}`, { 
      headers: {
        'Authorization': window.localStorage.getItem('token')
        }
    }
    )
    return response.json();
  };
  
  export const getMovieRecommendations = (id) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1` 
    ).then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.status_message || "Something went wrong");
          });
        }
          return response.json();
        }) 
        .catch((error) => {
          throw error
    });
  };

  export const getActor = async ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    const response = await fetch(
      `http://localhost:8080/api/actors/${id}`, { 
      headers: {
        'Authorization': window.localStorage.getItem('token')
        }
    }
    )
    return response.json();
  };

  export const getActorImages = async (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    const response = await fetch(
      `http://localhost:8080/api/actors/images/${id}`,
      { headers: {
        'Authorization': window.localStorage.getItem('token')
        }
      }
    )
    return response.json();
  };
  
  export const getActorMovies = (id) => {
    return fetch(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then ((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
        return response.json();
      })
      .catch((error) => {
        throw error
    });
  };


  export const getCredits = async ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    const response = await fetch(
      `http://localhost:8080/api/movies/actors/${id}`, { 
      headers: {
        'Authorization': window.localStorage.getItem('token')
        }
    }
    )
    return response.json();
  };

  export const getFavouriteMovies = async (username) => {
    const response = await fetch(
      `http://localhost:8080/api/favourites/movies/${username}`,
      { headers: {
        'Authorization': window.localStorage.getItem('token')
        }
      }
    );
    return response.json();
  }

export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const signup = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};
