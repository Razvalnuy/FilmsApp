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
import React, { useContext } from "react";
import RangeSlider from "../RangeSlider/RangeSlider";
import CheckboxesTags from "../CheckboxesTags/CheckboxesTags";
import BasicSelect from "../BasicSelect/BasicSelect";
import {
  IsAllActiveContext,
  IsAllActiveDispatchContext,
} from "../../contexts/isActiveContext";
import { FILTERS__TYPE } from "../../utils/utils";
import { apiGetFavorit } from "../../fetchs/apiGetFavorit";
import Cookies from "js-cookie";
import { apiSearchMovies } from "../../fetchs/apiSearchMovies";

export default function Filters() {
  const isActive = useContext(IsAllActiveContext);
  const dispatch = useContext(IsAllActiveDispatchContext);
  const token = JSON.parse(Cookies.get("token"));

  async function getFavorite() {
    const listFavorit = await apiGetFavorit(token);
    console.log("userListFavorit", listFavorit);
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
              value={isActive.movieName}
              onChange={(event) => {
                dispatch({
                  type: FILTERS__TYPE.isActiveSearch,
                  search: event.target.value,
                });
              }}
            />
            <Button
              disabled={!isActive.movieName.trim()}
              variant="contained"
              onClick={async () => {
                const movieSearchList = await apiSearchMovies(
                  token,
                  1,
                  isActive.movieName
                );
                console.log("movieSearchList", movieSearchList);
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
            count={isActive.isActiveTotalPages}
            color="primary"
            page={isActive.isActiveCurrentPage}
            onChange={async (event, value) => {
              dispatch({
                type: FILTERS__TYPE.updateCurrentPage,
                value: value,
              });

              const movieSearchList = await apiSearchMovies(
                token,
                value,
                isActive.movieName
              );
              console.log("movieSearchList", movieSearchList);
              dispatch({
                type: FILTERS__TYPE.isActivefilmsList,
                filmsList: movieSearchList.results,
              });
            }}
          />
        </Box>
      </Card>
    </Box>
  );
}
