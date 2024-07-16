import {
  FILTERS__TYPE,
  defaultFilterStates,
  totalPageUtils,
} from "../utils/utils";

const defaultStateFilters = {
  filters: defaultFilterStates,
};

export function filtersReducer(state = defaultStateFilters, action) {
  switch (action.type) {
    case FILTERS__TYPE.resetFilters: {
      return {
        ...defaultStateFilters,
        filters: { ...defaultFilterStates, isActiveSelect: action.indexSelect },
      };
    }
    case FILTERS__TYPE.updateSelect: {
      return {
        ...state,
        filters: {
          ...state.filters,
          isActiveSelect: action.indexSelect,
          isActiveCurrentPage: action.value,
          movieName: action.search,
        },
      };
    }
    case FILTERS__TYPE.updateSlider: {
      return {
        ...state,
        filters: {
          ...state.filters,
          isActiveSlider: action.updateSlider,
        },
      };
    }
    case FILTERS__TYPE.updateAutocomplete: {
      return {
        ...state,
        filters: {
          ...state.filters,
          isActiveGenres: action.updateAutocomplete,
        },
      };
    }
    case FILTERS__TYPE.updateCurrentPage: {
      return {
        ...state,
        filters: {
          ...state.filters,
          isActiveCurrentPage: action.value,
        },
      };
    }
    case FILTERS__TYPE.updateTotalPage: {
      const totalPages = totalPageUtils(action);
      return {
        ...state,
        filters: {
          ...state.filters,
          isActiveTotalPages: totalPages,
        },
      };
    }
    case FILTERS__TYPE.isActiveIdFilm: {
      return {
        ...state,
        filters: {
          ...state.filters,
          isActiveIdFilm: action.id,
        },
      };
    }
    case FILTERS__TYPE.isActiveSearch: {
      return {
        ...state,
        filters: {
          ...state.filters,
          movieName: action.search,
        },
      };
    }
    case FILTERS__TYPE.isActivefilmsList: {
      return {
        ...state,
        filters: {
          ...state.filters,
          filmsList: action.filmsList,
        },
      };
    }
    default:
      return state;
  }
}
