import React from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ReactDOM from "react-dom/client";
import { SnackbarProvider } from 'notistack';
import "./index.css";
import App from "./App";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { Slide } from '@material-ui/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        TransitionComponent={Slide}
      >

        <PersistGate loading={null} persistor={persistor}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </LocalizationProvider>
        </PersistGate>

      </SnackbarProvider>

    </Provider>
  </React.StrictMode>
);


