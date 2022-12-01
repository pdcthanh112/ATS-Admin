import { InputLabel, Typography } from "@material-ui/core";
import { FormHelperText, TextareaAutosize } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";
TextAreaField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function TextAreaField(props) {
  const { form, name, label, disabled, placeholder } = props;
  const { formState } = form;
  const hasError = formState.errors[name];
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <>
          <InputLabel
            id="demo-simple-select-label"
            style={{ fontSize: "12px", marginTop: "28px" }}
          >
            {label}
          </InputLabel>
          <TextareaAutosize
            {...field}
            placeholder={placeholder}
            disabled={disabled}
            error={hasError}
            variant="outlined"
            margin="normal"
            labelId="demo-simple-select-label"
            aria-label="minimum height"
            minRows={3}
            className="border-[1px] border-gray-300 rounded-md hover:border-black p-6 mt-0 w-full text-black text-2xl"
          />
          {hasError && (
            <FormHelperText sx={{ fontSize: 12, paddingTop: 0 }} error>
              {formState.errors[name]?.message}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
}
export default TextAreaField;
