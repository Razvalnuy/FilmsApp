import { Box } from "@mui/material";
import { useEffect } from "react";

import { apiFilmsSort } from "../../fetchs/apiFilmsSort";
import { FILTERS__TYPE } from "../../utils/utils";
import MultiActionAreaCard from "../FilmCard/FilmCard";
import Filters from "../Filters/Filters";
import Header from "../Header/Header";
import Cookies from "js-cookie";
import { apiGetFavorit } from "../../fetchs/apiGetFavorit";
import { useDispatch, useSelector } from "react-redux";

export function Main() {
  const filtersState = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const token = JSON.parse(Cookies.get("token"));

  function changeChecked(checked, id) {
    const updatedFilmsList = filtersState.filmsList.map((movie) => {
      return movie.id === id ? { ...movie, checked: checked } : movie;
    });
    dispatch({
      type: FILTERS__TYPE.isActivefilmsList,
      filmsList: updatedFilmsList,
    });
  }

  useEffect(() => {
    try {
      if (filtersState.movieName !== "") {
        console.log("Поиск по запросу");
      } else {
        async function getFilms() {
          const { results, total_pages } = await apiFilmsSort(
            token,
            filtersState.isActiveSelect,
            filtersState.isActiveCurrentPage
          );
          const newResults = results.map((movie) => ({
            ...movie,
            checked: false,
          }));
          const getFavorits = await apiGetFavorit(
            token,
            filtersState.isActiveCurrentPage
          );

          newResults.filter(async (movie) => {
            getFavorits.results.some((favorit) => {
              return movie.id === favorit.id ? (movie.checked = true) : false;
            });
          });

          if (newResults) {
            dispatch({
              type: FILTERS__TYPE.updateTotalPage,
              totalPages: total_pages,
            });
            dispatch({
              type: FILTERS__TYPE.isActivefilmsList,
              filmsList: newResults,
            });
          }
          console.log("allFilms", newResults);
        }
        getFilms();
      }
    } catch (err) {
      console.log("errFetchFilmsSort", err);
    }
  }, [
    token,
    filtersState.isActiveSelect,
    filtersState.isActiveCurrentPage,
    dispatch,
    filtersState.movieName,
    filtersState.isActiveTotalPages,
  ]);

  return (
    <>
      <Header />
      <Box>
        <Box
          sx={{
            marginTop: "100px",
            display: "flex",
          }}
        >
          <Filters />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {filtersState.filmsList.map((film) => (
              <MultiActionAreaCard
                key={film.id}
                id={film.id}
                title={film.title}
                rating={film.vote_average.toFixed(1)}
                image={film}
                checked={film.checked}
                onChangeChecked={changeChecked}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
