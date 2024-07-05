import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

export default function GetToken() {
  const [open, setOpen] = useState(true);
  const [text, setText] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  function changeText(event) {
    setText(event.target.value);
  }

  return (
    <Fragment>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Запросить токен</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="email"
            label="Ваша почта"
            type="email"
            fullWidth
            value={text}
            variant="standard"
            onChange={changeText}
          />
        </DialogContent>
        <DialogActions>
          <Link to="/">
            <Button onClick={handleClose}>Отмена</Button>
          </Link>
          <Link to="/getPost">
            <Button type="submit">Запросить</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
