const FILTERS__TYPE = {
  resetFilters: "resetFilters",
  updateSelect: "updateSelect",
  updateSlider: "updateSlider",
  updateAutocomplete: "updateAutocomplete",
  updateCurrentPage: "updateCurrentPage",
  updateTotalPage: "updateTotalPage",
  isActiveIdFilm: "isActiveIdFilm",
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
  genre: "genre",
  popular: "popular",
  top_rated: "top_rated",
  list: "list",
};

const defaultFilterStates = {
  isActiveSelect: 1,
  isActiveSlider: [1905, 2005],
  isActiveGenres: [],
  isActiveCurrentPage: 1,
  isActiveTotalPages: 1,
  isActiveIdFilm: 0,
};

function totalPageUtils(action) {
  return action.totalPages >= 500 ? 500 : action.totalPages;
}

export {
  FILTERS__TYPE,
  imgUtils,
  urlOptins,
  defaultFilterStates,
  totalPageUtils,
};
