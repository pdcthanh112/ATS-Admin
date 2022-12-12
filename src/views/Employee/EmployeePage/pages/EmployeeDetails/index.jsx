import { Typography } from "@mui/material";
import React from "react";
import MyTextField from "../../../../../component/form-control/TextField";

function EmployeeDetails({ employeeDetails }) {
  return (
    <>
      <Typography color="green" variant="h4">
        Employee Details
      </Typography>
      <form>
        <div>
          <div className="row my-5">
            <div className="col-lg-4 col-sm-6 mx-4">
              <MyTextField name="id" label="ID" value={employeeDetails?.id} />
            </div>
            <div className="col-lg-4 col-sm-6 mx-4">
              <MyTextField
                name="code"
                label="Employee Code"
                value={employeeDetails?.employeeCode}
              />
            </div>
          </div>
          <div className="row my-5">
            <div className="col-lg-4 col-sm-6 mx-4">
              <MyTextField
                name="name"
                label="Name"
                value={employeeDetails?.name}
              />
            </div>
            <div className="col-lg-4 col-sm-6 mx-4">
              <MyTextField
                name="jobLevel"
                label="Level"
                value={employeeDetails?.jobLevel}
              />
            </div>
          </div>

          <div className="row my-5">
            <div className="col-lg-4 col-sm-6 mx-4">
              <MyTextField
                name="department"
                label="Department"
                value={employeeDetails?.department.name}
              />
            </div>
            <div className="col-lg-4 col-sm-6 mx-4">
              <MyTextField
                name="position"
                label="Position"
                value={employeeDetails?.position.name}
              />
            </div>
          </div>
          <div className="row my-5">
            <div className="col-lg-4 col-sm-6 mx-4">
              <MyTextField
                name="dob"
                label="Day of Birth"
                value={employeeDetails?.dob}
              />
            </div>
            <div className="col-lg-4 col-sm-6 mx-4">
              <MyTextField
                name="phone"
                label="Phone"
                value={employeeDetails?.phone}
              />
            </div>
          </div>

          <div className="row my-5">
            <div className="col-lg-4 col-sm-6 mx-4">
              <MyTextField
                name="address"
                label="Address"
                value={employeeDetails?.address}
              />
            </div>
            <div className="col-lg-4 col-sm-6 mx-4">
              <Typography>Image</Typography>
              <img src={employeeDetails?.image} width="200" height="100" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default EmployeeDetails;
