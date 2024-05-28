import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

export default function BasicSelect() {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Сортировать по:</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Сортировать по:"
        onChange={handleChange}
      >
        <MenuItem value={1}>Популярности</MenuItem>
        <MenuItem value={2}>Полезные</MenuItem>
        <MenuItem value={3}>Рейтинг</MenuItem>
      </Select>
    </FormControl>
  );
}
