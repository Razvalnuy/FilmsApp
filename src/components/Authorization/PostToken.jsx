import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SetTokenContext } from "../../contexts/tokenContext";

export function PostToken() {
  const [open, setOpen] = useState(true);

  const setToken = useContext(SetTokenContext);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log("post", email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Введите токен</DialogTitle>
        <DialogContent sx={{ width: "500px" }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="email"
            label="Токен"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setToken(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Link to="/getToken">
            <Button onClick={handleClose}>Отмена</Button>
          </Link>
          <Link to="/main">
            <Button type="submit">Ок</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
