import { createContext, useReducer } from "react";
import {
  FILTERS__TYPE,
  defaultFilterStates,
  totalPageUtils,
} from "../utils/utils";

const IsAllActiveContext = createContext(null);
const IsAllActiveDispatchContext = createContext(null);

export function FiltersProvider({ children }) {
  const [isActive, dispatch] = useReducer(filtersReducer, defaultFilterStates);

  return (
    <IsAllActiveContext.Provider value={isActive}>
      <IsAllActiveDispatchContext.Provider value={dispatch}>
        {children}
      </IsAllActiveDispatchContext.Provider>
    </IsAllActiveContext.Provider>
  );
}

export function filtersReducer(isActive, action) {
  switch (action.type) {
    case FILTERS__TYPE.resetFilters: {
      return defaultFilterStates;
    }
    case FILTERS__TYPE.updateSelect: {
      return {
        ...isActive,
        isActiveSelect: action.indexSelect,
      };
    }
    case FILTERS__TYPE.updateSlider: {
      return {
        ...isActive,
        isActiveSlider: action.updateSlider,
      };
    }
    case FILTERS__TYPE.updateAutocomplete: {
      return {
        ...isActive,
        isActiveGenres: action.updateAutocomplete,
      };
    }
    case FILTERS__TYPE.updateCurrentPage: {
      console.log("working!");
      return {
        ...isActive,
        isActiveCurrentPage: action.value,
      };
    }
    case FILTERS__TYPE.updateTotalPage: {
      const totalPages = totalPageUtils(action);
      return {
        ...isActive,
        isActiveTotalPages: totalPages,
      };
    }
    case FILTERS__TYPE.isActiveIdFilm: {
      return {
        ...isActive,
        isActiveIdFilm: action.id,
      };
    }
    case FILTERS__TYPE.isActiveSearch: {
      return {
        ...isActive,
        movieName: action.search,
      };
    }
    case FILTERS__TYPE.isActivefilmsList: {
      return {
        ...isActive,
        filmsList: action.filmsList,
      };
    }

    default: {
      console.warn("Unknow action type...");
    }
  }
}

export { IsAllActiveContext, IsAllActiveDispatchContext };
