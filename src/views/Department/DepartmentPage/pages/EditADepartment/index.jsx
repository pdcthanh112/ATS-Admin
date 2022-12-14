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

function EditDepartmentForm({ onSubmit, editDepartment, onNotEdit }) {
  const schema = yup.object().shape({
    name: yup
      .string()
      .trim("Wrong format name")
      .required("Please enter product name!"),
    phone: yup.string().required("Please enter the phone!"),
    room: yup.string().required("Please select room"),
  });
  const form = useForm({
    defaultValues: {
      name: editDepartment.name,
      phone: editDepartment.phone,
      room: editDepartment.room,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    onSubmit({
      ...values,
    });
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div>
          <Typography color="green" variant="h4" className="mt-4">
            Edit A Department
          </Typography>
          <div className="row my-2">
            <div className="col-lg-5 col-sm-6 ml-8">
              <MyTextField name="id" label="ID" value={editDepartment.id} />
            </div>
          </div>
          <div className="row my-2">
            <div className="col-lg-5 col-sm-6 mx-4">
              <InputField name="name" label="Name" form={form} />
            </div>
            <div className="col-lg-5 col-sm-6 mx-4"></div>
          </div>
          <div className="row my-2">
            <div className="col-lg-4 col-sm-6 mx-4">
              <InputField name="room" label="Department Room" form={form} />
            </div>
          </div>
          <div className="row my-2">
            <div className="col-lg-4 col-sm-6 mx-4">
              <InputField name="phone" label="Phone" form={form} />
            </div>
          </div>

          <div className="col-lg-6 col-sm-6 mx-4">
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="error"
                onClick={() => onNotEdit()}
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Confirm
              </Button>
            </Stack>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditDepartmentForm;
