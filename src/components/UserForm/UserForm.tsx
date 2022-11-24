import { Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography} from "@mui/material";
import { DispatchContext, StateContext } from "../../contexts/UserDataContext";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,} from "firebase/auth";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { auth } from "../../firebase-config";
import signInErrorMessages from "../../data/signInErrorMessages.json";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { userSchema } from "../../validations/SignUpValidation";
import { yupResolver } from "@hookform/resolvers/yup";

interface UserFormProps {
  validation: boolean;
  type: "signIn" | "signUp";
}

const UserForm: React.FC<UserFormProps> = ({ type }) => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [passVisible, setPassVisible] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [noConnection, setNoConnection] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(userSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: undefined,
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [username, password] = watch(["username", "password"]);

  const handleClickShowPassword = () => {
    setPassVisible((prev) => !prev);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const SignInUser = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, username, password);
    } catch (error: any) {
      switch (error.code) {
        case "auth/invalid-email": {
          setInvalidUsername(true);
          break;
        }
        case "auth/wrong-password": {
          setInvalidPassword(true);
          break;
        }
        case "auth/internal-error": {
          if (!password) {
            setInvalidPassword(true);
          }
          break;
        }
        case "auth/user-not-found": {
          setUserNotFound(true);
          break;
        }
        case "auth/network-request-failed": {
          setNoConnection(true);
          break;
        }
      }
      setButtonDisabled(true);
    }
  };
  const SignUpUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, username, password);
      dispatch({ type: "SET-USERNAME", payload: username });
      dispatch({ type: "SET-PASSWORD", payload: password });
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use": {
          setUsernameTaken(true);
          setButtonDisabled(true);
          break;
        }
        case "auth/network-request-failed": {
          setNoConnection(true);
        }
      }
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length >= 1) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [errors.username, errors.password, errors]);

  useEffect(() => {
    if (usernameTaken) {
      setUsernameTaken(false);
    }
    if (invalidUsername) {
      setInvalidUsername(false);
    }
    if (invalidPassword) {
      setInvalidPassword(false);
    }
    if (userNotFound) {
      setUserNotFound(false);
    }
    if (noConnection) {
      setNoConnection(false);
    }
    if (buttonDisabled) {
      setButtonDisabled(false);
    }
    // eslint-disable-next-line
  }, [username]);

  useEffect(() => {
    if (invalidPassword) {
      setInvalidPassword(false);
      setButtonDisabled(false);
    }
    // eslint-disable-next-line
  }, [password]);

  useEffect(() => {
    if (state.redirectToWizardEnabled) {
      navigate("/welcome-wizard");
    }
    // eslint-disable-next-line
  }, [state.redirectToWizardEnabled]);

  return (
    <form
      onSubmit={type === "signUp" ? handleSubmit(SignUpUser) : SignInUser}
      style={{ width: "100%", maxWidth: "700px" }}
    >
      <Stack gap={"1rem"} alignItems={"center"} width={"100%"}>
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <TextField
            id="username"
            label="Username"
            {...register("username")}
            autoFocus
            error={!!errors?.username || usernameTaken || invalidUsername}
            helperText={
              errors.username?.message ||
              (usernameTaken && signInErrorMessages.username_taken) ||
              (invalidUsername && signInErrorMessages.username_invalid)
            }
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <InputLabel
            htmlFor="password"
            error={!!errors?.password || invalidPassword}
          >
            Password
          </InputLabel>
          <OutlinedInput
            id="password"
            {...register("password")}
            type={passVisible ? "text" : "password"}
            error={!!errors?.password || invalidPassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {passVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />

          {(!!errors?.password || invalidPassword) && (
            <FormHelperText error id="accountId-error">
              {errors.password?.message ||
                (invalidPassword &&
                  password &&
                  signInErrorMessages.password_invalid) ||
                (invalidPassword &&
                  !password &&
                  signInErrorMessages.no_password)}
            </FormHelperText>
          )}
        </FormControl>
        {(userNotFound || noConnection) && (
          <Typography fontSize={"0.8em"} textAlign={"center"} color={"error"}>
            {(userNotFound && signInErrorMessages.user_not_found) ||
              (noConnection && signInErrorMessages.connection_lost)}
          </Typography>
        )}
        <Button
          variant="contained"
          disabled={buttonDisabled}
          type={"submit"}
          sx={{ marginTop: "1.5rem", width: "fit-content" }}
        >
          {type === "signUp" ? "Sign Up" : "Sign In"}
        </Button>
      </Stack>
    </form>
  );
};

export default UserForm;
