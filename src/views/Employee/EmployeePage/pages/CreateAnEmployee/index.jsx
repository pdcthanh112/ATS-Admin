import { Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import CreateAccountForm from "../../../components/CreateAccountForm";
import useCreateAccount from "../../../hooks/useCreateAccount";

CreateAnEmployee.propTypes = {};

function CreateAnEmployee(props) {
  const { mutate: createAccount } = useCreateAccount();
  const { closeDialog } = props;
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values) => {
    try {
      console.log(values, "submit valueee");
      await createAccount(values);
      enqueueSnackbar("Create successfully", { variant: "success" });
      closeDialog();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <>
      <Typography color="green" variant="h4">
        Create An Employee
      </Typography>
      <CreateAccountForm onSubmit={handleSubmit} />
    </>
  );
}

export default CreateAnEmployee;
