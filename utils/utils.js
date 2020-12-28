export const getMovieData = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=dea81014c2ec4aeceb134efbf3cfff1f&language=en-US`
  const response = await fetch(url);
  const result = await response.json();

  try {
    const data = {
      id: result.id,
      title: result.original_title,
      poster: result.poster_path,
      stars: result.vote_average,
      description: result.overview,
      genres: result.genres.map(obj => obj.name)
    }
    return data;
  } catch(err) {
    return {
      description: "", 
      genres: [], 
      id: 0, 
      poster: "", 
      stars: "", 
      title: ""
    }
  }
}

export const searchMovies = async (query) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=dea81014c2ec4aeceb134efbf3cfff1f&language=en-US&query=${query}&page=1`
  const response = await fetch(url);
  const results = await response.json();
  return results;
}

export const getGenres = async (genres) => {
  const url = "https://api.themoviedb.org/3/genre/movie/list?api_key=dea81014c2ec4aeceb134efbf3cfff1f&language=en-US";
  const response = await fetch(url);
  const genreData = await response.json();
  return genreData.genres.filter(genre => genres.includes(genre.id))
}