import { Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import CreatePositionForm from "../../../components/CreateAPositionForm";
import useCreatePosition from "../../../hooks/useCreatePosition";

CreateAPosition.propTypes = {};

function CreateAPosition(props) {
  const { mutate: create } = useCreatePosition();
  const { closeDialog } = props;
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values) => {
    await create(values, {
      onSuccess: () => {
        enqueueSnackbar("Create Position successfully", { variant: "success" });
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
        Create A Position
      </Typography>
      <CreatePositionForm onSubmit={handleSubmit} />
    </>
  );
}

export default CreateAPosition;
