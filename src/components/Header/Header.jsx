import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

export default function Header({ titleFilm }) {
  return (
    <>
      <AppBar position="fixed" sx={{ overflow: "hidden" }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            {titleFilm ? "Фильмы - " + titleFilm : "Фильмы"}
          </Typography>
          <Link to="/getToken">
            <IconButton>
              <AccountCircle sx={{ color: "white" }} fontSize="large" />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
}
