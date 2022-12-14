import { yupResolver } from "@hookform/resolvers/yup";
import { LinearProgress } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import moment from "moment/moment";
import InputField from "../../../../component/form-control/InputField";
import SelectField from "../../../../component/form-control/SelectField";
import { MenuItem } from "@mui/material";
import useGetDepartmentName from "../../../Employee/hooks/useGetDepartmentName";

CreatePositionForm.propTypes = {
  onSubmit: PropTypes.func,
};
function CreatePositionForm({ onSubmit }) {
  const schema = yup.object().shape({
    name: yup
      .string()
      .trim("Wrong format name")
      .required("Please enter your name!"),
    departmentId: yup.string().required("Please select the department!"),
  });
  const form = useForm({
    defaultValues: {
      name: "",
      departmentId: "",
    },
    resolver: yupResolver(schema),
  });
  //  console.log(form.formState.errors, "Valid form");

  const handleSubmit = (values) => {
    onSubmit(values);
  };
  const { data: departments } = useGetDepartmentName();

  const { formState } = form;
  const { isSubmitting } = formState;

  return (
    <div>
      {isSubmitting && <LinearProgress />}
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="col-lg mx-2">
          <SelectField
            name="departmentId"
            label="Department"
            form={form}
            rows={departments?.data.map((x) => {
              return <MenuItem value={x.id}>{x.name}</MenuItem>;
            })}
          />
        </div>

        <div className="col-sm-6">
          <InputField name="name" label="Name" form={form} />
        </div>
        <br />
        <div className="flex justify-center">
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="success" type="submit">
              <i className="fa fa-edit"></i> Create New Position
            </Button>
          </Stack>
        </div>
      </form>
    </div>
  );
}

export default CreatePositionForm;
