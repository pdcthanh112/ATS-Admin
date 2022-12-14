import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "@firebase/storage";
import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import moment from "moment/moment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import MyDatePicker from "../../../../../component/form-control/DatePicker";
import InputField from "../../../../../component/form-control/InputField";
import MyTextField from "../../../../../component/form-control/TextField";
import { storage } from "../../../../../firebase/firebase";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

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

function EditEmployeeForm({ onSubmit, editEmployee, onNotEdit }) {
  const schema = yup.object().shape({
    name: yup
      .string()
      .trim("Wrong format name")
      .required("Please enter product name!"),
    phone: yup.string().required("Please enter the phone!"),
    address: yup.string().required("Please select address"),
    dob: yup.string().required("Please select dob"),
  });
  const form = useForm({
    defaultValues: {
      name: editEmployee.name,
      dob: editEmployee.dob,
      phone: editEmployee.phone,
      address: editEmployee.address,
      image: editEmployee.image,
    },
    resolver: yupResolver(schema),
  });
  const [error, setError] = useState(false);
  const { register, formState } = form;

  const [images, setImages] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const newImages = e.target.files[0];
    newImages["id"] = Math.random();
    setImages(newImages);
  };

  const handleSubmit = (values) => {
    let birthDay = moment(values.dob).format("YYYY-MM-DD");
    values = {
      ...values,
      id: editEmployee.id,
      dob: birthDay,
    };
    if (images.name !== undefined) {
      const metadata = {
        contentType: "image/jpeg",
      };
      const ref = storageRef(storage, `employee-avatar/${images.name}`);
      const uploadTask = uploadBytesResumable(ref, images, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          getDownloadURL(snapshot.ref).then((url) => {
            onSubmit({
              ...values,
              image: url,
            });
          });
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      onSubmit({
        ...values,
      });
    }
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div>
          <Typography color="green" variant="h4" className="mt-4">
            Edit An Employee
          </Typography>
          <div className="row ml-3">
            <div className="col-lg-3 mr-4">
              <MyTextField name="id" label="ID" value={editEmployee.id} />
            </div>
            <div className="col-lg-5 col-sm-6 mt-3">
              <InputField name="name" label="Name" form={form} />
            </div>
          </div>
          <div className="row mt-3">
            <div className="ml-4 col-lg-6">
              <InputField name="phone" label="Phone" form={form} />
            </div>
            <div className="col-lg-3 col-sm-6 mx-4">
              <MyDatePicker name="dob" label="Date of Birth" form={form} />
            </div>
          </div>
          <div className="mt-3">
            <div className="ml-4">
              <InputField
                name="address"
                label="Address"
                form={form}
                size="50ch"
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-5 col-sm-6 mx-4">
              <Typography>Select Image: </Typography>
              <input
                name="images"
                {...register("images")}
                type="file"
                multiple
                id="my-img"
                onChange={handleChange}
              />
              <div className="flex" style={{ width: "80%", height: "60%" }}>
                {images ? (
                  <img
                    className="mt-2"
                    style={{ width: "300px" }}
                    src={URL.createObjectURL(images)}
                    alt="firebase"
                  />
                ) : (
                  <img
                    className="mt-2"
                    style={{ width: "300px" }}
                    src={editEmployee.image}
                    alt="firebase"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-sm-6 mx-4">
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

export default EditEmployeeForm;
