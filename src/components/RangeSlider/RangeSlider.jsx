import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import { FILTERS__TYPE } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";

function valuetext(value) {
  return `${value}year`;
}

export default function RangeSlider() {
  const filtersState = useSelector((state) => state.filters.filters);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    dispatch({
      type: FILTERS__TYPE.updateSlider,
      updateSlider: newValue,
    });
  };

  return (
    <Box
      sx={{
        margin: "0px 15px",
        maxWidth: 300,
      }}
    >
      <Typography sx={{ marginBottom: "35px", fontWeight: 500 }}>
        Год релиза:
      </Typography>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={filtersState.isActiveSlider}
        onChange={handleChange}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        min={1900}
        max={2024}
      />
    </Box>
  );
}
