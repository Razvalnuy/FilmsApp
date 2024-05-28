import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  IsAllActiveContext,
  IsAllActiveDispatchContext,
} from "../../contexts/isActiveContext";
import { useContext, useEffect, useState } from "react";
import { FILTERS__TYPE } from "../../utils/utils";
import { fetchGenres } from "../../fetchs/apiGenres";
import { TokenContext } from "../../contexts/tokenContext";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags() {
  const token = useContext(TokenContext);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    try {
      const getGenres = async () => {
        const allGenres = await fetchGenres(token);
        setGenres(allGenres.genres);
      };
      getGenres();
    } catch (err) {
      console.log("errFetch", err);
    }
  }, [token]);

  const isActive = useContext(IsAllActiveContext);
  const dispatch = useContext(IsAllActiveDispatchContext);

  function handleSelectChange(event, newValue) {
    dispatch({
      type: FILTERS__TYPE.updateAutocomplete,
      updateAutocomplete: newValue,
    });
  }

  return (
    <Autocomplete
      value={isActive.isActiveGenres}
      onChange={handleSelectChange}
      multiple
      id="checkboxes-tags-demo"
      options={genres}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Жанры"
          placeholder="Избранное"
          variant="standard"
        />
      )}
    />
  );
}
