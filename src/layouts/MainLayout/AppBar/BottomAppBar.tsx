import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import StatisticsIcon from "@mui/icons-material/Equalizer";
import StyledFab from "@mui/material/Fab";
import { Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import teal from "@mui/material/colors/teal";
import { useNavigate } from "react-router-dom";
import { StyledTab } from "./StyledTab";

type page = "overview" | "categories" | "statistics";
interface props {
  handleClick: () => void;
}

const BottomAppBar: React.FC<props> = ({ handleClick }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const navigateTo = (destination: page) => {
    navigate(destination);
  };
  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value === 0 && currentPath !== "/overview") {
      navigateTo("overview");
    } else if (value === 1 && currentPath !== "/categories") {
      navigateTo("categories");
    } else if (value === 2 && currentPath !== "/statistics") {
      navigateTo("statistics");
    }
    // eslint-disable-next-line
  }, [value]);

  useEffect(() => {
    const { pathname } = window.location;
    setCurrentPath(pathname);
    if (pathname === "/overview" && value !== 0) {
      setValue(0);
    } else if (pathname === "/categories" && value !== 1) {
      setValue(1);
    } else if (pathname === "/statistics" && value !== 2) {
      setValue(2);
    }
    // eslint-disable-next-line
  }, [window.location.pathname]);

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        top: "auto",
        bottom: "0px",
        zIndex: 1301,
      }}
    >
      <Toolbar
        disableGutters={true}
        sx={{
          color: teal.A200,
          position: "relative",
          justifyContent: { xxs: "start", xs: "start", sm: "center" },
          height: "65px",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon position tabs example"
          textColor="inherit"
        >
          <StyledTab label={"Overview"} icon={<HomeIcon />} />
          <StyledTab label={"Categories"} icon={<CategoryIcon />} />
          <StyledTab label={"Statistics"} icon={<StatisticsIcon />} />
        </Tabs>
        <StyledFab
          color="info"
          aria-label="add"
          onClick={handleClick}
          sx={{
            cursor: "pointer",
            height: "65px",
            width: "65px",
            position: "absolute",
            right: {
              xxs: "5px",
              xs: "10px",
              sm: "10%",
              md: "25%",
              lg: "32%",
              xl: "36%",
            },
            top: {
              xxs: "-67px",
              xs: "-30px",
            },
          }}
        >
          <AddIcon sx={{ fontSize: "1.6rem" }} />
        </StyledFab>
      </Toolbar>
    </AppBar>
  );
};
export default BottomAppBar;
