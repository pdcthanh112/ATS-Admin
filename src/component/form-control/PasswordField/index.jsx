import React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import Box from "@mui/material/Box";

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function PasswordField(props) {
  const { form, name, label, disabled, size } = props;
  const { formState } = form;
  const hasError = formState.errors[name];

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: size ? size : "30ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            {...field}
            variant="outlined"
            margin="normal"
            required
            type="password"
            fullWidth
            label={label}
            disabled={disabled}
            error={!!hasError}
            helperText={formState.errors[name]?.message}
          />
        </Box>
      )}
    />
  );
}

export default PasswordField;
