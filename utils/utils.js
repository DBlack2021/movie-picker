export const getMovieData = async (query) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=dea81014c2ec4aeceb134efbf3cfff1f&language=en-US&query=${query}&page=1`
  const response = await fetch(url);
  const results = await response.json();
  const firstResult = results.results[0];
  
  try {
    const genres = await getGenres(firstResult.genre_ids);
    const data = {
      id: firstResult.id,
      title: firstResult.original_title,
      poster: firstResult.poster_path,
      stars: firstResult.vote_average,
      description: firstResult.overview,
      genres: genres.map(obj => obj.name)
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

export const getGenres = async (genres) => {
  const url = "https://api.themoviedb.org/3/genre/movie/list?api_key=dea81014c2ec4aeceb134efbf3cfff1f&language=en-US";
  const response = await fetch(url);
  const genreData = await response.json();
  return genreData.genres.filter(genre => genres.includes(genre.id))
}