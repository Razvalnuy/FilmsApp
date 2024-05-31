import { Typography } from "@mui/material";
import React from "react";
import Header from "../Header/Header";

export default function StartingPage() {
  return (
    <>
      <Header />
      <Typography
        variant="h3"
        fontWeight={700}
        sx={{ textAlign: "center", marginTop: "300px" }}
      >
        Войдите для просмотра контента
      </Typography>
    </>
  );
}
