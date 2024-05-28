import { Box, Card, IconButton, Pagination, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import React, { useContext } from "react";
import RangeSlider from "../RangeSlider/RangeSlider";
import CheckboxesTags from "../CheckboxesTags/CheckboxesTags";
import BasicSelect from "../BasicSelect/BasicSelect";
import {
  IsAllActiveContext,
  IsAllActiveDispatchContext,
} from "../../contexts/isActiveContext";
import { FILTERS__TYPE } from "../../utils/utils";

export default function Filters() {
  const isActive = useContext(IsAllActiveContext);
  const dispatch = useContext(IsAllActiveDispatchContext);

  return (
    <Box sx={{ flex: "none" }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          minHeight: "800px",
          margin: "0px 24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography variant="h6">Фильтры</Typography>
          <IconButton
            onClick={() => {
              dispatch({
                type: FILTERS__TYPE.resetFilters,
              });
              console.log("Reset filters");
            }}
          >
            <Close />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, margin: "20px 0 20px 0" }}>
          <BasicSelect />
          <RangeSlider />
          <CheckboxesTags />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <Pagination
            size="small"
            count={isActive.isActiveTotalPages}
            color="primary"
            page={isActive.isActiveCurrentPage}
            onChange={(event, value) =>
              dispatch({
                type: FILTERS__TYPE.updateCurrentPage,
                value: value,
              })
            }
          />
        </Box>
      </Card>
    </Box>
  );
}
