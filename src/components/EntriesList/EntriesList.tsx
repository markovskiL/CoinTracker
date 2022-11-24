import { Box, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useContext, useEffect, useState } from "react";
import { DispatchContext, StateContext } from "../../contexts/UserDataContext";
import EntryItem, { EntryProps } from "../EntryItem/EntryItem";
export interface contextMenuProps {
  show: boolean;
  x: number;
  y: number;
  index: number;
}

const EntriesList: React.FC = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [entries, setEntries] = useState<EntryProps[]>(state.user.entries);
  const initialContextMenu: contextMenuProps = {
    show: false,
    x: 0,
    y: 0,
    index: -1,
  };
  const [contextMenu, setContextMenu] = useState(initialContextMenu);

  useEffect(() => {
    setEntries(state.user.entries);
  }, [state.entriesChangesCount, state.user.entries]);

  const handleClick = (index: number) => {
    dispatch({ type: "SET-UPDATING-ENTRY-INDEX", payload: index });
  };
  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    const { pageX, pageY } = e;
    setContextMenu({ show: true, x: pageX, y: pageY, index: index });
    dispatch({ type: "TOGGLE-CONTEXT-MENU" });
    return;
  };

  const contextMenuClose = () => {
    setContextMenu(initialContextMenu);
    dispatch({ type: "TOGGLE-CONTEXT-MENU" });
  };

  return (
    <Stack
      width={"90%"}
      maxWidth={"1536px"}
      margin={"1.3rem 0"}
      boxShadow={"10px 9px 5px 0px rgba(0,0,0,0.1)"}
    >
      <Box bgcolor={grey[100]} marginBottom={"1rem"}>
        <Typography color={grey[500]} margin={"0.7rem"} fontSize={"1.1em"}>
          Entries
        </Typography>
      </Box>
      <Box padding={"0.7rem 1.2rem"}>
        {entries.map((entry, index) => (
          <div
            key={entry.id}
            onClick={() => handleClick(index)}
            onContextMenu={(e) => handleContextMenu(e, index)}
          >
            <EntryItem
              entry={entry}
              contextMenu={contextMenu}
              entryIndex={index}
              closeContextMenu={contextMenuClose}
            />
          </div>
        ))}
      </Box>
    </Stack>
  );
};

export default EntriesList;
