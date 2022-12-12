import { Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import CreateDepartmentForm from "../../../components/CreateDepartmentForm";
import useCreateDepartment from "../../../hooks/useCreateDepartment";

CreateADepartment.propTypes = {};

function CreateADepartment(props) {
  const { mutate: create } = useCreateDepartment();
  const { closeDialog } = props;
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values) => {
    await create(values, {
      onSuccess: () => {
        enqueueSnackbar("Create Department successfully", {
          variant: "success",
        });
        closeDialog();
      },
      onError: (error) => {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      },
    });
  };

  return (
    <>
      <Typography color="green" variant="h4">
        Create A Department
      </Typography>
      <CreateDepartmentForm onSubmit={handleSubmit} />
    </>
  );
}

export default CreateADepartment;
