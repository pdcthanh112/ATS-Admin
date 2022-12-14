import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FormHelperText } from "@mui/material";
import Box from "@mui/material/Box";
InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled, placeholder, value, size } = props;
  const { formState } = form;
  const hasError = formState.errors[name];
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <div>
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
              placeholder={placeholder}
              label={label}
              id="outlined-basic"
              fullWidth
              disabled={disabled}
              error={hasError}
              variant="outlined"
              // margin="normal"
              InputProps={{ style: { fontSize: 14 } }}
              InputLabelProps={{ style: { fontSize: 14 } }}
            />
          </Box>
          {hasError && (
            <FormHelperText sx={{ fontSize: 12, paddingTop: 0 }} error>
              {formState.errors[name]?.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
export default InputField;
