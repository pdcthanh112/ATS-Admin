import { yupResolver } from "@hookform/resolvers/yup";
import { LinearProgress, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import moment from "moment/moment";
import MyDatePicker from "../../../../component/form-control/DatePicker";
import InputField from "../../../../component/form-control/InputField";
import PasswordField from "../../../../component/form-control/PasswordField";
import SelectField from "../../../../component/form-control/SelectField";
import useGetDepartmentName from "../../hooks/useGetDepartmentName";
import useGetRoles from "../../hooks/useGetRoles";
import getPositions from "../../hooks/useGetPositions";

CreateAccountForm.propTypes = {
  onSubmit: PropTypes.func,
};

function CreateAccountForm({ onSubmit }) {
  const today = new Date().toISOString().slice(0, 10);
  const schema = yup.object().shape({
    name: yup
      .string()
      .trim("Wrong format name")
      .required("Please enter your name!"),
    email: yup.string().required("Please enter email!"),
    employeeCode: yup.string().required("Please enter the employee code!"),
    password: yup.string().required("Please type password"),
    phone: yup.string().required("Please enter the phone No"),
    address: yup.string().required("Please enter the address"),
    dob: yup.date(),
  });
  const { data: departments } = useGetDepartmentName();
  const form = useForm({
    defaultValues: {
      address: "",
      departmentName: "",
      dob: today,
      email: "",
      employeeCode: "",
      gender: "",
      jobLevel: "",
      image:
        "https://firebasestorage.googleapis.com/v0/b/ats-storage-44e44.appspot.com/o/employee-avatar%2Fdefault_avt.png?alt=media&token=c6fec769-60d9-4fd6-9025-47a1dbba6681",
      name: "",
      password: "",
      phone: "",
      positionName: "",
      role: "",
    },
    resolver: yupResolver(schema),
  });
  const [departName, setDepartName] = useState();
  const [disable, setDisable] = useState(true);

  const { data: roles } = useGetRoles();
  const { data: positions } = getPositions(departName);

  const handleSubmit = (values) => {
    let birthDay = moment(values.dob).format("YYYY-MM-DD");
    onSubmit({
      ...values,
      dob: birthDay,
    });

    console.log("value ", { ...values, dob: birthDay });
  };

  const handleChooseDepart = (event) => {
    setDepartName(event.currentTarget.dataset.value);
    setDisable(false);
  };

  const { formState } = form;
  const { isSubmitting } = formState;
  const genders = ["MALE", "FEMALE"];

  return (
    <div>
      {isSubmitting && <LinearProgress />}
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="row">
          <div className="col-lg-5 col-sm-6 mx-4">
            <InputField name="name" label="Name" form={form} />
          </div>
          <div className="col-lg-5 col-sm-6 mx-4">
            <InputField name="employeeCode" label="Employee Code" form={form} />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-5 col-sm-4 mx-4">
            <InputField name="email" label="Email" form={form} />
          </div>
          <div className="col-lg-5 col-sm-6 mx-4">
            <PasswordField name="password" label="Password" form={form} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5 col-sm-6 mx-4 px-4">
            <MyDatePicker name="dob" label="Date of Birth" form={form} />
          </div>
          <div className="col-lg-4 col-sm-6 mx-4 px-3">
            <SelectField
              name="gender"
              label="Gender"
              form={form}
              rows={genders.map((gender) => {
                return <MenuItem value={gender}>{gender}</MenuItem>;
              })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5 col-sm-6 mx-4">
            <InputField name="address" label="Address" form={form} />
          </div>
          <div className="col-lg-5 col-sm-6 mx-4">
            <InputField name="phone" label="Phone" form={form} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5 col-sm-6 mx-4 w-80">
            <SelectField
              name="departmentName"
              label="Department"
              form={form}
              rows={departments?.data.map((x) => {
                return (
                  <MenuItem value={x.name} onClick={handleChooseDepart}>
                    {x.name}
                  </MenuItem>
                );
              })}
            />
          </div>
          <div className="col-lg-5 col-sm-6 mx-5 w-80">
            <SelectField
              name="positionName"
              label="Positions"
              disabled={disable}
              form={form}
              rows={positions?.data.map((x) => {
                return <MenuItem value={x.name}>{x.name}</MenuItem>;
              })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5 col-sm-6 mx-4 w-80">
            <SelectField
              name="role"
              label="Role"
              form={form}
              rows={roles?.data.map((x) => {
                return <MenuItem value={x.name}>{x.name}</MenuItem>;
              })}
            />
          </div>
          <div className="col-lg-5 col-sm-6 mx-4 p-7">
            <InputField name="jobLevel" label="Job Level" form={form} />
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />
        <Stack direction="row" spacing={1}>
          <Button variant="contained" color="success" type="submit">
            <i className="fa fa-edit"></i> Create New Employee
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default CreateAccountForm;
