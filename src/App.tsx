import "./app.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Categories from "./pages/Categories/Categories";
import FirstLayout from "./layouts/FirstLayout";
import { LocalizationProvider } from "@mui/x-date-pickers";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Overview from "./pages/Overview/Overview";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import { StateContext } from "./contexts/UserDataContext";
import Statistics from "./pages/Statistics/Statistics";
import WelcomeWizard from "./pages/WelcomeWizard/WelcomeWizard";

function App() {
  const state = useContext(StateContext);
  const [contextMenu, setContextMenu] = useState(state.contextMenuOpen);

  useEffect(() => {
    setContextMenu(state.contextMenuOpen);
  }, [state.contextMenuOpen]);

  return (
    <div className="App" style={{ overflow: contextMenu ? "hidden" : "auto" }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route
                element={
                  <ProtectedRoute
                    redirectPath={"/overview"}
                    isAllowed={!state.signedIn}
                  />
                }
              >
                <Route element={<FirstLayout />}>
                  <Route index element={<SignIn />} />
                  <Route path="sign-up" element={<SignUp />} />

                  <Route
                    element={
                      <ProtectedRoute
                        redirectPath={"/"}
                        isAllowed={state.redirectToWizardEnabled}
                      />
                    }
                  >
                    <Route path="welcome-wizard" element={<WelcomeWizard />} />
                  </Route>
                </Route>
              </Route>

              <Route
                element={
                  <ProtectedRoute
                    redirectPath={"/"}
                    isAllowed={state.signedIn}
                  />
                }
              >
                <Route element={<MainLayout />}>
                  <Route path="overview" element={<Overview />}></Route>
                  <Route path="categories" element={<Categories />}></Route>
                  <Route path="statistics" element={<Statistics />}></Route>
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<Navigate to={"/"} />}></Route>
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  );
}

export default App;
