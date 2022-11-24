import { Close } from "@mui/icons-material";
import { Dialog, DialogTitle, Box, IconButton, DialogContent, Typography, DialogActions, Button } from "@mui/material";
import { useContext } from "react";
import { DispatchContext, StateContext } from "../../contexts/UserDataContext";

const ConfirmDialog = () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const initialState = { show: false, index: null, confirmed: false };
  return (
    <Dialog
      open={true}
      onClose={() => {
        dispatch({
          type: "SET-DELETE-ENTRY-CONFIRMATION",
          payload: initialState,
        });
      }}
      maxWidth="sm"
      fullWidth
      sx={{ zIndex: 1303 }}
    >
      <DialogTitle>Confirm the action</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton
          onClick={() => {
            dispatch({
              type: "SET-DELETE-ENTRY-CONFIRMATION",
              payload: initialState,
            });
          }}
        >
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>Are you sure you want to delete this entry ?</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => {
            dispatch({
              type: "SET-DELETE-ENTRY-CONFIRMATION",
              payload: initialState,
            });
          }}
        >
          Cancel
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            dispatch({
              type: "SET-DELETE-ENTRY-CONFIRMATION",
              payload: { ...state.deleteEntryConfirmation, confirmed: true },
            });
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;
