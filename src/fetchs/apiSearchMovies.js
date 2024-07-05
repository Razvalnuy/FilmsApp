// import { urlOptins } from "../utils/utils";

export const apiSearchMovies = (token, currentPage, movieName) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const getMovies = async () => {
      // const { basisURL, account, favorite, movies, ru } = urlOptins;
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=true&language=ru-RU&page=${currentPage}`,
        options
      );

      const moviesList = await data.json();
      return moviesList;
    };
    return getMovies();
  } catch (err) {
    console.log(`moviesList`, err);
  }
};
