import {
  Box,
  CardMedia,
  Container,
  IconButton,
  List,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ArrowBack, Star } from "@mui/icons-material";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { apiDetailsFilm } from "../../fetchs/apiDetailsFilm";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../contexts/tokenContext";
import { IsAllActiveContext } from "../../contexts/isActiveContext";

export default function ActiveFilm() {
  const token = useContext(TokenContext);
  const [detailsFilm, setDetailsFilm] = useState({});
  const { isActiveIdFilm } = useContext(IsAllActiveContext);

  useEffect(() => {
    try {
      async function getDetailsFetch() {
        const getDetails = await apiDetailsFilm(token, isActiveIdFilm);
        setDetailsFilm(getDetails);
      }
      getDetailsFetch();
    } catch (err) {
      console.warn("err", err);
    }
  }, [isActiveIdFilm, token]);

  const imgURL = `https://image.tmdb.org/t/p/w500${
    detailsFilm.poster_path || detailsFilm.backdrop_path
  }`;

  async function getDetails() {}
  getDetails();

  return (
    <Box>
      <Header titleFilm={detailsFilm.title} sx={{ position: "fixed" }} />
      <Container>
        <Paper
          sx={{
            marginTop: "100px",
            minHeight: "calc(100vh - 110px)",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <CardMedia
              component="img"
              image={imgURL}
              alt={detailsFilm.title}
              sx={{ width: 400, height: "100%" }}
            />

            <Box sx={{ paddingLeft: "24px" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "15px",
                }}
              >
                <Typography sx={{ fontWeight: 500 }} variant="h2">
                  {detailsFilm.title}
                </Typography>

                <IconButton sx={{ marginLeft: "25px" }}>
                  <Star sx={{ fontSize: "40px" }} />
                </IconButton>
              </Box>
              <Box>
                <Link to="/">
                  <IconButton sx={{ marginTop: "25px" }}>
                    <ArrowBack fontSize="large" />
                  </IconButton>
                </Link>
              </Box>
              <Typography
                variant="h6"
                sx={{ paddingLeft: "20px", paddingBottom: "10px" }}
              >
                Дата выхода: {detailsFilm.release_date}
              </Typography>
              <Typography
                variant="h6"
                sx={{ paddingLeft: "20px", paddingBottom: "10px" }}
              >
                Рейтинг: {detailsFilm.vote_average?.toFixed(0)}
              </Typography>
              <Typography variant="h6" sx={{ paddingLeft: "20px" }}>
                {detailsFilm.overview}
              </Typography>
              {/* //todo Допилить актеров ) */}
              {/* <List sx={{ paddingLeft: "20px", marginTop: "10px" }}>
                <Typography variant="h5">Актеры</Typography>
                <Typography variant="h6">Киану Ривз</Typography>
                <Typography variant="h6">Лоренс Фишбёрн</Typography>
                <Typography variant="h6">Кэрри-Энн Мосс</Typography>
                <Typography variant="h6">Хьюго Уивинг</Typography>
              </List> */}
              {/* //todo Посмотреть про списки в MUI */}
              <List>
                <ListItem>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Страна</TableCell>
                        <TableCell>Год</TableCell>
                        <TableCell>Жанр</TableCell>
                        <TableCell>Режиссер</TableCell>
                        <TableCell>Сценарий</TableCell>
                        <TableCell>Бюджет</TableCell>
                        <TableCell>Зрители</TableCell>
                        <TableCell>Время</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      <TableRow>
                        <TableCell>{detailsFilm.origin_country}</TableCell>
                        <TableCell>
                          {detailsFilm.release_date?.slice(0, 4)}
                        </TableCell>
                        <TableCell>
                          {detailsFilm.genres
                            ? detailsFilm.genres.map(
                                (genre) => genre.name + " "
                              )
                            : ""}
                        </TableCell>
                        <TableCell>
                          {detailsFilm.production_companies
                            ? detailsFilm.production_companies.map(
                                (companies) => companies.name + " . "
                              )
                            : ""}
                        </TableCell>
                        <TableCell>
                          {detailsFilm.production_countries
                            ? detailsFilm.production_countries.map(
                                (countries) => countries.iso_3166_1 + " "
                              )
                            : ""}
                        </TableCell>
                        <TableCell>${detailsFilm.budget} </TableCell>
                        <TableCell>
                          {detailsFilm.popularity?.toFixed(1)}
                        </TableCell>
                        <TableCell>{detailsFilm.runtime} мин. </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </ListItem>
              </List>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
