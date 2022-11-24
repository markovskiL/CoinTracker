import { Button, Modal, Stack } from "@mui/material";
import React from "react";
interface props {
  isMounted: boolean;
  showButtons: boolean;
  toggleEntryModal: () => void;
  setEntryType: (props: "Expense" | "Income") => void;
}
const AddButtonsModal: React.FC<props> = ({
  isMounted,
  showButtons,
  toggleEntryModal,
  setEntryType,
}) => {
  return (
    <div>
      <Modal
        keepMounted
        open={isMounted}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        sx={{ backgroundColor: "transparent" }}
      >
        <Stack
          width={"fit-content"}
          gap={"1.5rem"}
          position={"absolute"}
          sx={{
            bottom: {
              xxs: "202px",
              xs: "135px",
            },
            right: {
              xxs: "5px",
              xs: "10px",
              sm: "10%",
              md: "25%",
              lg: "32%",
              xl: "36%",
            },

            opacity: showButtons ? 1 : 0,
            transition: "opacity 0.225s ease-in-out",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              toggleEntryModal();
              setEntryType("Expense");
            }}
          >
            Add Expense
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              toggleEntryModal();
              setEntryType("Income");
            }}
          >
            Add Income
          </Button>
        </Stack>
      </Modal>
    </div>
  );
};

export default AddButtonsModal;
