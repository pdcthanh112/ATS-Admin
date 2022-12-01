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
    try {
      console.log(values, "submit valueee");
      await create(values);
      enqueueSnackbar("Create successfully", { variant: "success" });
      closeDialog();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
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
