import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../contexts/tokenContext";
import { FILTERS__TYPE } from "../../utils/utils";
import {
  IsAllActiveContext,
  IsAllActiveDispatchContext,
} from "../../contexts/isActiveContext";
import { Box } from "@mui/material";
import Filters from "../Filters/Filters";
import MultiActionAreaCard from "../FilmCard/FilmCard";
import Header from "../Header/Header";

import { apiFilmsSort } from "../../fetchs/apiFilmsSort";

export default function Main() {
  const [filmsList, setFilmsList] = useState([]);
  const isActive = useContext(IsAllActiveContext);
  const dispatch = useContext(IsAllActiveDispatchContext);

  const token = useContext(TokenContext);

  useEffect(() => {
    try {
      async function getFilms() {
        const allFilms = await apiFilmsSort(
          token,
          isActive.isActiveSelect,
          isActive.isActiveCurrentPage
        );
        console.log(`Результат`, allFilms);
        dispatch({
          type: FILTERS__TYPE.updateTotalPage,
          totalPages: allFilms.total_pages,
        });
        setFilmsList(allFilms.results);
      }
      getFilms();
    } catch (err) {
      console.log("errFetchFilmsSort", err);
    }
  }, [token, isActive.isActiveSelect, isActive.isActiveCurrentPage, dispatch]);

  return (
    <>
      <Box>
        <Header sx={{ position: "fixed" }} />

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
            {filmsList.map((film) => (
              <MultiActionAreaCard
                key={film.id}
                id={film.id}
                title={film.title}
                rating={film.vote_average.toFixed(1)}
                image={film}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
