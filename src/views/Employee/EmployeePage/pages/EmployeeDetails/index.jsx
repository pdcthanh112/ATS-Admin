import { Typography } from "@mui/material";
import React from "react";
import MyTextField from "../../../../../component/form-control/TextField";

function EmployeeDetails({ employeeDetails }) {
  return (
    <>
      <Typography color="green" variant="h4" className="mt-4">
        Employee Details
      </Typography>
      <form>
        <div>
          <div className="row">
            <div className="col-lg-5 ml-4 mr-2">
              <MyTextField name="id" label="ID" value={employeeDetails?.id} />
            </div>
            <div className="col-lg-5 ml-4 mr-2">
              <MyTextField
                name="code"
                label="Employee Code"
                value={employeeDetails?.employeeCode}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-5 col-sm-6 ml-4 mr-2">
              <MyTextField
                name="name"
                label="Name"
                value={employeeDetails?.name}
              />
            </div>
            <div className="col-lg-5 col-sm-6 ml-4 mr-2">
              <MyTextField
                name="jobLevel"
                label="Level"
                value={employeeDetails?.jobLevel}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-5 col-sm-6 ml-4 mr-2">
              <MyTextField
                name="department"
                label="Department"
                value={employeeDetails?.department.name}
              />
            </div>
            <div className="col-lg-5 col-sm-6 ml-4 mr-2">
              <MyTextField
                name="position"
                label="Position"
                value={employeeDetails?.position.name}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-5 col-sm-6 ml-4 mr-2">
              <MyTextField
                name="dob"
                label="Day of Birth"
                value={employeeDetails?.dob}
              />
            </div>
            <div className="col-lg-5 col-sm-6 ml-4 mr-2">
              <MyTextField
                name="phone"
                label="Phone"
                value={employeeDetails?.phone}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-5 col-sm-6 ml-4 mr-2">
              <MyTextField
                name="address"
                label="Address"
                value={employeeDetails?.address}
              />
            </div>
            <div className="col-lg-5 col-sm-6 ml-4 mr-2">
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
