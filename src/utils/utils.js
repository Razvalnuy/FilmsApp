const FILTERS__TYPE = {
  resetFilters: "resetFilters",
  updateSelect: "updateSelect",
  updateSlider: "updateSlider",
  updateAutocomplete: "updateAutocomplete",
  updateCurrentPage: "updateCurrentPage",
  updateTotalPage: "updateTotalPage",
  isActiveIdFilm: "isActiveIdFilm",
  isActiveSearch: "isActiveSearch",
  isActivefilmsList: "isActivefilmsList",
};

function imgUtils(data) {
  const imgURL = `https://image.tmdb.org/t/p/w500${
    data.poster_path || data.backdrop_path
  }`;
  return imgURL;
}

const urlOptins = {
  basisURL: "https://api.themoviedb.org/3",
  ru: "language=ru",
  movie: "movie",
  movies: "movies",
  genre: "genre",
  popular: "popular",
  top_rated: "top_rated",
  list: "list",
  account: "account",
  favorite: "favorite",
};

const defaultFilterStates = {
  isActiveSelect: 1,
  isActiveSlider: [1905, 2005],
  isActiveGenres: [],
  isActiveCurrentPage: 1,
  isActiveTotalPages: 1,
  isActiveIdFilm: 0,
  movieName: "",
  filmsList: [],
};

const defaultCurrentPage = 1;
function totalPageUtils(action) {
  return action.totalPages >= 500 ? 500 : action.totalPages;
}
function checkFavorit(array, activeFilmId) {
  return Boolean(array.find((movie) => movie.id === +activeFilmId));
}

const tokenVerification =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2M1ZDI3Y2UzMGNhYjJiYWEwYTBiN2MxMGM2NDc2YSIsInN1YiI6IjY2M2JmNjQ3MWEzZDAyYTE0MDc4MDUwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2grBVV_YHSHRbl1ouPqOvXu5w3-HV5FjJ2Y5HMbXy0s";

export {
  FILTERS__TYPE,
  imgUtils,
  urlOptins,
  defaultFilterStates,
  totalPageUtils,
  tokenVerification,
  checkFavorit,
  defaultCurrentPage,
};
