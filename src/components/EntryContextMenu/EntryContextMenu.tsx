import { Box, Button, Stack } from "@mui/material";
import React, { useContext, useRef } from "react";
import { DispatchContext } from "../../contexts/UserDataContext";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
interface props {
  x: number;
  y: number;
  closeContextMenu: () => void;
  index: number;
}
const EntryContextMenu: React.FC<props> = ({
  x,
  y,
  closeContextMenu,
  index,
}) => {
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const dispatch = useContext(DispatchContext);
  useOnClickOutside(contextMenuRef, closeContextMenu);

  const btnFontStyles = {
    fontWeight: "normal",
    textTransform: "none",
    fontSize: "1.02em",
  };

  return (
    <>
      <Box
        sx={{
          height: "120px",
          width: "150px",
          backgroundColor: "white",
          position: "absolute",
          top: y,
          left: x,
          zIndex: 1500,
          padding: "1rem",
          borderRadius: "5px",
        }}
        boxShadow={" -7px 7px 19px -4px rgba(0,0,0,0.15);"}
        onClick={closeContextMenu}
        ref={contextMenuRef}
      >
        <Stack gap={"0rem"} color={"black"}>
          <Button
            color="inherit"
            sx={btnFontStyles}
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: "SET-DUPLICATE-ENTRY-INDEX", payload: index });
              dispatch({ type: "TOGGLE-ADD-ENTRY-MODAL" });
              closeContextMenu();
            }}
          >
            Duplicate
          </Button>
          <Button
            color="inherit"
            sx={btnFontStyles}
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: "SET-DUPLICATE-ENTRY-INDEX", payload: null });
              dispatch({ type: "TOGGLE-ADD-ENTRY-MODAL" });
              closeContextMenu();
            }}
          >
            Create New
          </Button>
          <Button
            color="error"
            sx={btnFontStyles}
            onClick={(e) => {
              e.stopPropagation();
              const payload = { show: true, index: index, confirmed: false };
              dispatch({
                type: "SET-DELETE-ENTRY-CONFIRMATION",
                payload: payload,
              });
              closeContextMenu();
            }}
          >
            Delete
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default EntryContextMenu;
