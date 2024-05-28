import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

export default function Header({titleFilm }) {
  return (
    <AppBar position="fixed" sx={{ overflow: "hidden" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
			{titleFilm ? 'Фильмы - ' + titleFilm : 'Фильмы'} 
        </Typography>
        <IconButton>
          <AccountCircle sx={{ color: "white" }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
