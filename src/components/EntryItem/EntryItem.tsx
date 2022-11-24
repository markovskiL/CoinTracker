import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import MuiIcon, { MuiIconType } from "../MuiIcon/MuiIcon";
import { grey } from "@mui/material/colors";
import { contextMenuProps } from "../EntriesList/EntriesList";
import MouseRightClickIcon from "../../Icons/mouse_right_click.svg";
import EntryContextMenu from "../EntryContextMenu/EntryContextMenu";
export interface EntryProps {
  id: string;
  entry_type: "Expense" | "Income";
  category_id: string;
  category_name: string;
  icon_name: string;
  date: string;
  amount: number;
  description: string;
}

interface props {
  entry: EntryProps;
  entryIndex: number;
  contextMenu: contextMenuProps;
  closeContextMenu: () => void;
}

const EntryItem: React.FC<props> = ({
  entry,
  entryIndex,
  contextMenu,
  closeContextMenu,
}) => {
  return (
    <Box
      position={"relative"}
      marginBottom={"0rem"}
      display={"flex"}
      alignItems={"center"}
      gap={"2.2rem"}
      bgcolor={
        contextMenu.show && entryIndex === contextMenu.index
          ? grey[300]
          : "inherit"
      }
      sx={{
        cursor: "pointer",
        padding: "0.5rem",
        transition: "background-color 0.2s ease-in-out",
        "&:hover": {
          backgroundColor:
            entryIndex !== contextMenu.index ? grey[100] : "none",
        },
      }}
    >
      <Box fontSize={"1.8em"}>
        <MuiIcon iconName={entry.icon_name as MuiIconType}></MuiIcon>
      </Box>
      <Box flexGrow={1}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          marginBottom={"0.5rem"}
        >
          <Box display={"flex"} gap={"1rem"} alignItems={"center"}>
            <Stack>
              <Typography marginRight={"15px"} fontSize={"1.05em"}>
                {entry.category_name}
              </Typography>
              <Typography color={grey[500]} fontSize={"0.8em"} lineHeight={1}>
                {entry.date}
              </Typography>
            </Stack>
            {contextMenu.show && entryIndex === contextMenu.index && (
              <img
                src={MouseRightClickIcon}
                alt="mouse-right-click-icon"
                style={{ height: "30px" }}
              />
            )}
          </Box>

          <Typography
            fontSize={"1.05em"}
            color={entry.entry_type === "Income" ? "success.main" : "error"}
          >
            {entry.entry_type === "Income" ? "+" : "-"}
            {entry.amount}
          </Typography>
        </Box>
        <Divider />
      </Box>
      {contextMenu.show && entryIndex === contextMenu.index && (
        <EntryContextMenu
          x={0}
          y={-152}
          closeContextMenu={closeContextMenu}
          index={contextMenu.index}
        />
      )}
    </Box>
  );
};

export default EntryItem;
