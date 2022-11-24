import { Stack, Typography, Button } from "@mui/material";
import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DispatchContext, StateContext } from "../../../contexts/UserDataContext";
import CategoriesAmountList from "../CategoriesAmountList/CategoriesAmountList";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";


const IncomesAmount: React.FC = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const navigate = useNavigate();
  const button = useRef<HTMLButtonElement>(
    null as unknown as HTMLButtonElement
  );
  const currentUserId = auth.currentUser?.uid;

  const handleClick = async () => {
    if (currentUserId) {
      try {
        await setDoc(doc(db, "users", currentUserId), state.user);
        dispatch({
          type: "SIGN-UP-SUCCESS",
        });
      } catch {}
    }

    navigate("/overview");
  };

  return (
    <Stack
      alignItems={"center"}
      width={"100%"}
      height={{ xxs: "100%", md: "auto" }}
    >
      <Stack alignItems={"center"} width={"100%"} height={"100%"}>
        <Typography
          paragraph
          sx={{ marginBottom: "3rem", textAlign: "center" }}
        >
          Set how much money you earn from each income monthly
        </Typography>
        <CategoriesAmountList
          categoryArray={state.user.incomes}
          button={button.current}
        />
      </Stack>
      <Button
        variant="contained"
        ref={button}
        sx={{
          width: "100%",
          marginBottom: "2rem",
          marginTop: "2rem",
        }}
        onClick={handleClick}
      >
        COMPLETE
      </Button>
    </Stack>
  );
};
export default IncomesAmount;
