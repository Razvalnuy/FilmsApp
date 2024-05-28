import React, { useReducer } from "react";
import Main from "./components/Main/Main";
import { Route, Routes } from "react-router-dom";
import ActiveFilm from "./components/ActiveFilm/ActiveFilm";
import { FILTERS__TYPE } from "./utils/utils";
import {
  IsAllActiveContext,
  IsAllActiveDispatchContext,
} from "./contexts/isActiveContext";

export default function App() {
  const [isActive, dispatch] = useReducer(filtersReducer, {
    isActiveSelect: 1,
    isActiveSlider: [1905, 2005],
    isActiveGenres: [],
    isActiveCurrentPage: 1,
    isActiveTotalPages: 1,
    isActiveIdFilm: 0,
  });

  return (
    <>
      <IsAllActiveContext.Provider value={isActive}>
        <IsAllActiveDispatchContext.Provider value={dispatch}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/activeFilm" element={<ActiveFilm />} />
          </Routes>
        </IsAllActiveDispatchContext.Provider>
      </IsAllActiveContext.Provider>
    </>
  );
}

function filtersReducer(isActive, action) {
  switch (action.type) {
    case FILTERS__TYPE.resetFilters: {
      return {
        isActiveSelect: 0,
        isActiveSlider: [1905, 2005],
        isActiveGenres: [],
        isActiveCurrentPage: 1,
        isActiveIdFilm: 0,
      };
    }
    case FILTERS__TYPE.updateSelect: {
      return { ...isActive, isActiveSelect: action.indexSelect };
    }
    case FILTERS__TYPE.updateSlider: {
      return { ...isActive, isActiveSlider: action.updateSlider };
    }
    case FILTERS__TYPE.updateAutocomplete: {
      return { ...isActive, isActiveGenres: action.updateAutocomplete };
    }
    case FILTERS__TYPE.updateCurrentPage: {
      return { ...isActive, isActiveCurrentPage: action.value };
    }
    case FILTERS__TYPE.updateTotalPage: {
      const totalPages = action.totalPages >= 500 ? 500 : action.totalPages;
      return { ...isActive, isActiveTotalPages: totalPages };
    }
    case FILTERS__TYPE.isActiveIdFilm: {
      return { ...isActive,  isActiveIdFilm: action.id};
    }

    default: {
      console.warn("Unknow action type...");
    }
  }
}
