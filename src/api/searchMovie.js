export async function getMovieSearch(keywords) {
  const response = fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_SECRET_CODE}&language=it-IT&query=${keywords}&page=1`
  )
    .then((resp) => resp.json())
    .then((data) => {
      const sortPopularData = data?.results?.sort(function (a, b) {
        return b.popularity - a.popularity;
      });

      return sortPopularData;
    });

  return response;
}
