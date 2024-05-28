import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useContext } from "react";
import {
  IsAllActiveContext,
  IsAllActiveDispatchContext,
} from "../../contexts/isActiveContext";
import { FILTERS__TYPE } from "../../utils/utils";

export default function BasicSelect() {
  const sort = ["Популярности", "Рейтинг"];
  const isActive = useContext(IsAllActiveContext);
  const dispatch = useContext(IsAllActiveDispatchContext);

  const handleChange = (event) => {
    const index = event.target.value;
    dispatch({
      type: FILTERS__TYPE.updateSelect,
      indexSelect: index,
    });
	 dispatch({
		type: FILTERS__TYPE.updateCurrentPage,
		value: 1,
	 });
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Сортировать по:</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={isActive.isActiveSelect}
        label="Сортировать по:"
        onChange={handleChange}
      >
        <MenuItem value={1}>{sort[0]}</MenuItem>
        <MenuItem value={2}>{sort[1]}</MenuItem>
      </Select>
    </FormControl>
  );
}
