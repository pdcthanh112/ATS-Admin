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

CreateDepartmentForm.propTypes = {
  onSubmit: PropTypes.func,
};

function CreateDepartmentForm({ onSubmit }) {
  const schema = yup.object().shape({
    name: yup
      .string()
      .trim("Wrong format name")
      .required("Please enter your name!"),
    phone: yup.string().required("Please enter phone!"),
    room: yup.string().required("Please enter the department room!"),
  });
  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      room: "",
    },
    resolver: yupResolver(schema),
  });
  //  console.log(form.formState.errors, "Valid form");

  const handleSubmit = (values) => {
    onSubmit({
      ...values,
    });

    console.log("value ", { ...values });
  };

  const { formState } = form;
  const { isSubmitting } = formState;

  return (
    <div>
      {isSubmitting && <LinearProgress />}
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="row">
          <div className="col-lg-10 col-sm-6 mx-5">
            <InputField name="name" label="Name" form={form} />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-sm-6 mx-5">
            <InputField name="room" label="Department Room" form={form} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-sm-6 mx-5">
            <InputField name="phone" label="Phone" form={form} />
          </div>
        </div>

        <div className="flex justify-center my-2">
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="success" type="submit">
              <i className="fa fa-edit"></i> Create New Department
            </Button>
          </Stack>
        </div>
      </form>
    </div>
  );
}

export default CreateDepartmentForm;
