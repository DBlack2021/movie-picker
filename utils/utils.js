const apiKey = 'dea81014c2ec4aeceb134efbf3cfff1f'

export const getMovieData = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
  const response = await fetch(url);
  const result = await response.json();

  try {
    return getStarring(result.id).then((starring) => {
      const data = {
        id: result.id,
        title: result.original_title,
        poster: result.poster_path,
        stars: result.vote_average,
        description: result.overview,
        genres: result.genres.map(obj => obj.name),
        starring: starring
      }
      return data;
    })
  } catch(err) {
    return {
      description: "", 
      genres: [], 
      id: 0, 
      poster: "", 
      stars: "", 
      title: "",
      starring: []
    }
  }
}

export const searchMovies = async (query) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1`
  const response = await fetch(url);
  const results = await response.json();
  return results;
}

export const getStarring = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
  const response = await fetch(url);
  const credits = await response.json();
  return credits.cast;
}

export const getActorData = async (id) => {
  const url = `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=en-US`
  const response = await fetch(url);
  const actorData = await response.json();
  const actorObj = {    
    biography: actorData.biography,
    name: actorData.name,
    profile_path: actorData.profile_path,
  }
  return actorObj;
}

export const getActorCredits = async (id) => {
  const url = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apiKey}&language=en-US`
  const response = await fetch(url);
  const credits = await response.json();
  return credits.cast;
}