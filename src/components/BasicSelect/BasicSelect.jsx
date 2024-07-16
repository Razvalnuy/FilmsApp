import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FILTERS__TYPE } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";

export default function BasicSelect() {
  const sort = ["Популярности", "Рейтинг", "Избранные"];

  const filtersState = useSelector((state) => state.filters.filters);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const index = event.target.value;
    dispatch({
      type: FILTERS__TYPE.updateSelect,
      indexSelect: index,
      value: 1,
      search: "",
    });
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Сортировать по:</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={filtersState.isActiveSelect}
        label="Сортировать по:"
        onChange={handleChange}
      >
        <MenuItem value={1}>{sort[0]}</MenuItem>
        <MenuItem value={2}>{sort[1]}</MenuItem>
        <MenuItem value={3}>{sort[2]}</MenuItem>
      </Select>
    </FormControl>
  );
}
