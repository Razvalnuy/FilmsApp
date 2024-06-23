import { Box } from "@mui/material";
import { useContext, useEffect } from "react";
import {
  IsAllActiveContext,
  IsAllActiveDispatchContext,
} from "../../contexts/isActiveContext";
import { apiFilmsSort } from "../../fetchs/apiFilmsSort";
import { FILTERS__TYPE } from "../../utils/utils";
import MultiActionAreaCard from "../FilmCard/FilmCard";
import Filters from "../Filters/Filters";
import Header from "../Header/Header";
import Cookies from "js-cookie";
import { apiGetFavorit } from "../../fetchs/apiGetFavorit";

export function Main() {
  const isActive = useContext(IsAllActiveContext);
  const dispatch = useContext(IsAllActiveDispatchContext);
  const token = JSON.parse(Cookies.get("token"));

  function changeChecked(checked, id) {
    const updatedFilmsList = isActive.filmsList.map((movie) => {
      return movie.id === id ? { ...movie, checked: checked } : movie;
    });
    dispatch({
      type: FILTERS__TYPE.isActivefilmsList,
      filmsList: updatedFilmsList,
    });
  }

  useEffect(() => {
    try {
      if (isActive.movieName) {
			console.log('Нахоуй вывод');
      } else {
        async function getFilms() {
          const { results, total_pages } = await apiFilmsSort(
            token,
            isActive.isActiveSelect,
            isActive.isActiveCurrentPage
          );
          const newResults = results.map((movie) => ({
            ...movie,
            checked: false,
          }));
          const getFavorits = await apiGetFavorit(
            token,
            isActive.isActiveCurrentPage
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
            console.log("allFilms", isActive.filmsList);
          }
        }
        getFilms();
      }
    } catch (err) {
      console.log("errFetchFilmsSort", err);
    }
  }, [token, isActive.isActiveSelect, isActive.isActiveCurrentPage, dispatch]);

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
            {isActive.filmsList.map((film) => (
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
