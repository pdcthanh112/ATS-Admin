import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
MyDatePicker.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function MyDatePicker({ form, name, label, disabled, placeholder }) {
  const { formState } = form;
  const hasError = formState.errors[name] && formState.touchedFields[name];
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <InputLabel
              id="demo-simple-select-label"
              style={{ fontSize: "12px", marginTop: "16px" }}
            >
              {label}
            </InputLabel>
          </Box>
          <DatePicker
            {...field}
            labelId="demo-simple-select-label"
            renderInput={(params) => <TextField {...params} />}
            inputFormat="YYYY-MM-DD"
            placeholder={placeholder}
            disabled={disabled}
            error={hasError}
            variant="outlined"
            margin="normal"
            helperText={formState.errors[name]?.message}
            InputProps={{ style: { fontSize: 14 } }}
          />
        </>
      )}
    />
  );
}
export default MyDatePicker;
