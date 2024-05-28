import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import StarOutline from "@mui/icons-material/StarOutline";

import {
  Box,
  CardActionArea,
  CardActions,
  IconButton,
  Paper,
} from "@mui/material";

import { Link } from "react-router-dom";
import { IsAllActiveDispatchContext } from "../../contexts/isActiveContext";
import { FILTERS__TYPE } from "../../utils/utils";

export default function MultiActionAreaCard({ title, rating, image, id }) {
  const imgURL = `https://image.tmdb.org/t/p/w500${
    image.poster_path || image.backdrop_path
  }`;
  const dispatch = useContext(IsAllActiveDispatchContext);

  function handleCLick() {
    dispatch({
      type: FILTERS__TYPE.isActiveIdFilm,
      id: id,
    });
  }

  return (
    <Paper sx={{ width: 345, height: 335, margin: "20px" }}>
      <Card>
        <Link to="activeFilm" onClick={handleCLick}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={imgURL}
              alt={title}
            />
          </CardActionArea>
        </Link>

        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Рейтинг {rating}
            </Typography>
          </Box>
          <CardActions>
            <IconButton size="small" color="primary">
              <StarOutline />
            </IconButton>
          </CardActions>
        </CardContent>
      </Card>
    </Paper>
  );
}
