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
import { imgUtils } from "../../utils/utils";

export default function ActiveFilm() {
  const token = useContext(TokenContext);
  const [detailsFilm, setDetailsFilm] = useState({});
  const { isActiveIdFilm } = useContext(IsAllActiveContext);
  const {
    title,
    release_date,
    vote_average,
    overview,
    runtime,
    budget,
    production_countries,
    production_companies,
    genres,
    origin_country,
    popularity,
  } = detailsFilm;

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

  const imgURL = imgUtils(detailsFilm);

  return (
    <Box>
      <Header titleFilm={title} sx={{ position: "fixed" }} />
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
              alt={title}
              sx={{ width: 500, height: "100%" }}
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
                  {title}
                </Typography>

                <IconButton sx={{ marginLeft: "25px" }}>
                  <Star sx={{ fontSize: "40px" }} />
                </IconButton>
              </Box>
              <Box>
                <Link to="/main">
                  <IconButton sx={{ marginTop: "25px" }}>
                    <ArrowBack fontSize="large" />
                  </IconButton>
                </Link>
              </Box>
              <Typography
                variant="h6"
                sx={{ paddingLeft: "20px", paddingBottom: "10px" }}
              >
                Дата выхода: {release_date}
              </Typography>
              <Typography
                variant="h6"
                sx={{ paddingLeft: "20px", paddingBottom: "10px" }}
              >
                Рейтинг: {vote_average?.toFixed(0)}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  paddingLeft: "20px",
                  overflowY: "scroll",
                  maxHeight: "250px",
                }}
              >
                {overview}
              </Typography>

              <List
                sx={{ marginTop: "30px", position: "fixed", maxWidth: "250px" }}
              >
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
                        <TableCell>{origin_country}</TableCell>
                        <TableCell>{release_date?.slice(0, 4)}</TableCell>
                        <TableCell>
                          {genres
                            ? genres.map((genre) => genre.name + " ")
                            : ""}
                        </TableCell>
                        <TableCell>
                          {production_companies
                            ? production_companies[0].name
                            : ""}
                        </TableCell>
                        <TableCell>
                          {production_countries
                            ? production_countries.map(
                                (countries) => countries.iso_3166_1 + " "
                              )
                            : ""}
                        </TableCell>
                        <TableCell>${budget} </TableCell>
                        <TableCell>{popularity?.toFixed(1)}</TableCell>
                        <TableCell>{runtime} мин. </TableCell>
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
