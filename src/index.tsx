import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./contexts/AuthContext";
import UserContextProvider from "./contexts/UserDataContext";
import { theme } from "./theme";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </UserContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
