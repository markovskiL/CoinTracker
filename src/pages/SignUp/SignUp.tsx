import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import UserForm from "../../components/UserForm/UserForm";

const SignUp: React.FC = () => {
  return (
    <>
      <Typography
        variant="h5"
        component={"h2"}
        sx={{ letterSpacing: "5px", marginBottom: "1.5rem" }}
      >
        SIGN UP
      </Typography>
      <UserForm validation={true} type={"signUp"} />
      <Typography
        paragraph
        sx={{ marginTop: "1rem", marginBottom: "0", color: "GrayText" }}
      >
        Already have account ?
      </Typography>

      <Link to={"/"}>
        <Typography
          sx={{
            textDecoration: "underline",
            "&:hover": { color: "success.main" },
          }}
        >
          Sign in please.
        </Typography>
      </Link>
    </>
  );
};

export default SignUp;
