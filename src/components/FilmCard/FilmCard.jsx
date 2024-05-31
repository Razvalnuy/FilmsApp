import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import StarOutline from "@mui/icons-material/StarOutline";

import { Box, CardActionArea, CardActions, IconButton } from "@mui/material";

import { Link } from "react-router-dom";
import { IsAllActiveDispatchContext } from "../../contexts/isActiveContext";
import { FILTERS__TYPE, imgUtils } from "../../utils/utils";

export default function MultiActionAreaCard({ title, rating, image, id }) {
  const imgURL = imgUtils(image);

  const dispatch = useContext(IsAllActiveDispatchContext);

  function handleCLick() {
    dispatch({
      type: FILTERS__TYPE.isActiveIdFilm,
      id: id,
    });
  }

  return (
    <Card sx={{ textAlign: "left", width: 450, height: 400, margin: "5px" }}>
      <Link to="/activeFilm" onClick={handleCLick}>
        <CardActionArea>
          <CardMedia component="img" height="300" image={imgURL} alt={title} />
        </CardActionArea>
      </Link>

      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Рейтинг {rating.slice(0, 1)}
          </Typography>
        </Box>
        <CardActions>
          <IconButton size="small" color="primary">
            <StarOutline />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
}
