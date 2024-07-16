import {
  Box,
  Button,
  Card,
  IconButton,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { Close, Star } from "@mui/icons-material";
import React from "react";
import RangeSlider from "../RangeSlider/RangeSlider";
import CheckboxesTags from "../CheckboxesTags/CheckboxesTags";
import BasicSelect from "../BasicSelect/BasicSelect";
import { FILTERS__TYPE, defaultCurrentPage } from "../../utils/utils";
import { apiGetFavorit } from "../../fetchs/apiGetFavorit";
import { apiSearchMovies } from "../../fetchs/apiSearchMovies";
import { useDispatch, useSelector } from "react-redux";

export default function Filters() {
  const filtersState = useSelector((state) => state.filters.filters);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.user.token);
  async function getFavorite() {
    const listFavorit = await apiGetFavorit(token);
    console.log("Избранные фильмы: ", listFavorit);
  }

  return (
    <Box sx={{ flex: "none" }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          minHeight: "800px",
          margin: "0px 24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography variant="h6">Фильтры</Typography>
          <IconButton
            onClick={() => {
              dispatch({
                type: FILTERS__TYPE.resetFilters,
                indexSelect: 1,
              });
            }}
          >
            <Close />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, margin: "20px 0 20px 0" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "25px",
            }}
          >
            <TextField
              variant="standard"
              placeholder="Название фильма"
              fullWidth
              value={filtersState.movieName}
              onChange={async (event) => {
                dispatch({
                  type: FILTERS__TYPE.isActiveSearch,
                  search: event.target.value,
                });

                const movieSearchList = await apiSearchMovies(
                  token,
                  defaultCurrentPage,
                  filtersState.movieName
                );
                dispatch({
                  type: FILTERS__TYPE.isActivefilmsList,
                  filmsList: movieSearchList.results,
                });
                dispatch({
                  type: FILTERS__TYPE.updateTotalPage,
                  totalPages: movieSearchList.total_pages,
                });
              }}
            />
            <Button
              disabled={!filtersState.movieName.trim()}
              variant="contained"
              onClick={async () => {
                dispatch({
                  type: FILTERS__TYPE.isActiveSearch,
                  search: filtersState.movieName,
                });
                const movieSearchList = await apiSearchMovies(
                  token,
                  defaultCurrentPage,
                  filtersState.movieName
                );
                dispatch({
                  type: FILTERS__TYPE.isActivefilmsList,
                  filmsList: movieSearchList.results,
                });
                dispatch({
                  type: FILTERS__TYPE.updateCurrentPage,
                  value: 1,
                });
                dispatch({
                  type: FILTERS__TYPE.updateTotalPage,
                  totalPages: movieSearchList.total_pages,
                });
              }}
            >
              Поиск
            </Button>
          </Box>
          <BasicSelect />
          <RangeSlider />
          <CheckboxesTags />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <IconButton onClick={getFavorite}>
            <Star />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <Pagination
            size="small"
            count={filtersState.isActiveTotalPages}
            color="primary"
            page={filtersState.isActiveCurrentPage}
            onChange={async (event, value) => {
              dispatch({
                type: FILTERS__TYPE.updateCurrentPage,
                value: value,
              });

              if (filtersState.movieName) {
                const movieSearchList = await apiSearchMovies(
                  token,
                  value,
                  filtersState.movieName
                );
                dispatch({
                  type: FILTERS__TYPE.isActivefilmsList,
                  filmsList: movieSearchList.results,
                });
              }
            }}
          />
        </Box>
      </Card>
    </Box>
  );
}
