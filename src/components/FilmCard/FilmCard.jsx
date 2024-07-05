import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, CardActions, Checkbox } from "@mui/material";
import { Link } from "react-router-dom";
import { FILTERS__TYPE, imgUtils } from "../../utils/utils";
import { apiAddFavorite } from "../../fetchs/apiAddFavorite";
import Cookies from "js-cookie";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useDispatch } from "react-redux";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function MultiActionAreaCard({
  title,
  rating,
  image,
  id,
  checked,
  onChangeChecked,
}) {
  const imgURL = imgUtils(image);

  const token = JSON.parse(Cookies.get("token"));
  async function addOrDelFilm() {
    onChangeChecked(!checked, id);
    await apiAddFavorite(token, id, !checked);
  }

  const dispatch = useDispatch();

  return (
    <Card sx={{ textAlign: "left", width: 450, height: 400, margin: "5px" }}>
      <Link
        to={`/detailsFilm`}
        onClick={() =>
          dispatch({
            type: FILTERS__TYPE.isActiveIdFilm,
            id,
          })
        }
      >
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
          <Checkbox
            {...label}
            icon={<BookmarkBorderIcon />}
            checkedIcon={<BookmarkIcon />}
            checked={checked}
            onChange={addOrDelFilm}
          />
        </CardActions>
      </CardContent>
    </Card>
  );
}
