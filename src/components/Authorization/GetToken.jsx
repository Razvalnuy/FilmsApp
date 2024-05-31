import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

export function GetToken() {
  const [open, setOpen] = useState(true);
  const [text, setText] = useState("");

  const handleClose = () => {
    setOpen(false);
    console.log(
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2M1ZDI3Y2UzMGNhYjJiYWEwYTBiN2MxMGM2NDc2YSIsInN1YiI6IjY2M2JmNjQ3MWEzZDAyYTE0MDc4MDUwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2grBVV_YHSHRbl1ouPqOvXu5w3-HV5FjJ2Y5HMbXy0s"
    );
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
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Запросить токен</DialogTitle>
        <DialogContent sx={{ width: "500px" }}>
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
            onChange={(event) => setText(event.target.value)}
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
