import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import UserForm from "../../components/UserForm/UserForm";

const SignIn: React.FC = () => {
  return (
    <>
      <Typography
        variant="h5"
        component={"h2"}
        sx={{ letterSpacing: "5px", marginBottom: "1.5rem" }}
      >
        SIGN IN
      </Typography>
      <UserForm validation={false} type={"signIn"} />
      <Typography
        paragraph
        sx={{ marginTop: "1rem", marginBottom: "0", color: "GrayText" }}
      >
        Don't have account yet?
      </Typography>
      <Link to={"sign-up"}>
        <Typography
          sx={{
            textDecoration: "underline",
            "&:hover": { color: "success.main" },
          }}
        >
          Sign up now, it is free!
        </Typography>
      </Link>
    </>
  );
};

export default SignIn;
