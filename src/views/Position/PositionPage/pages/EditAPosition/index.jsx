import { yupResolver } from "@hookform/resolvers/yup";
import { MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../../../component/form-control/InputField";
import MyTextField from "../../../../../component/form-control/TextField";
import { Typography } from "@mui/material";
import SelectField from "../../../../../component/form-control/SelectField";
import useGetDepartmentName from "../../../../Employee/hooks/useGetDepartmentName";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#d33b33",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function EditPositionForm({ onSubmit, editPosition, onNotEdit }) {
  const schema = yup.object().shape({
    name: yup
      .string()
      .trim("Wrong format name")
      .required("Please enter product name!"),
    departmentId: yup.string().required("Please select the department!"),
  });
  const form = useForm({
    defaultValues: {
      name: editPosition.name,
      departmentId: editPosition.department.id,
    },
    resolver: yupResolver(schema),
  });
  const { data: departments } = useGetDepartmentName();

  const handleSubmit = (values) => {
    onSubmit({
      ...values,
    });
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div>
          <Typography color="green" variant="h4">
            Edit A Position
          </Typography>
          <div className="row my-5">
            <div className="col-lg-5 col-sm-6 mx-4">
              <MyTextField name="id" label="ID" value={editPosition.id} />
            </div>
          </div>
          <div className="row my-5">
            <div className="col-lg-7 col-sm-6 mx-4">
              <InputField name="name" label="Name" form={form} />
            </div>
          </div>
          <div className="row my-5">
            <div className="col-lg-7 col-sm-6 mx-4">
              <SelectField
                name="departmentId"
                label="Department"
                form={form}
                rows={departments?.data.map((x) => {
                  return (
                    <MenuItem key={x.id} value={x.id}>
                      {x.name}
                    </MenuItem>
                  );
                })}
              />
            </div>
          </div>
          <div className="row my-5">
            <div className="col-lg-5 col-sm-6 mx-4 mt-20">
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="primary" type="submit">
                  Confirm
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => onNotEdit()}
                >
                  Cancel
                </Button>
              </Stack>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditPositionForm;
