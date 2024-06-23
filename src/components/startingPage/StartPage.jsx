import { Box, Typography } from "@mui/material";
import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

export default function StartingPage() {
  return (
    <>
      <Header />
      <Box sx={{ textAlign: "center", marginTop: "300px" }}>
        <Typography variant="h2" fontWeight={700}>
          Войдите для просмотра контента
        </Typography>
        <Typography variant="h4" sx={{ mt: "50px" }}>
          Требуется VPN
        </Typography>
      </Box>
      <Outlet />
    </>
  );
}
