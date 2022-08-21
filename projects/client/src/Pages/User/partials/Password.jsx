import { HelpOutline, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Button from "../../../Components/atoms/Button";
import Text from "../../../Components/atoms/Text";
import { ToastNotification } from "../../../Components/Toast";
import { API_URL } from "../../../helper";

const Password = () => {
  const [password, setPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidity, setPasswordValidity] = useState("null");
  const [passwordInfo, setPasswordInfo] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const [PasswordConfValidity, setPasswordConfValidity] = useState("null");

  const user = useSelector((state) => {
    return state.userReducer;
  });

  const handleCheckPassword = (password) => {
    let temp = password.split("");
    let checkNumber = "";
    let checkLowerCase = "";
    let checkUpperCase = "";
    let checkSymbol = "";

    let symbols = `~!@#$%^&*()_-+={[}]|:;"'<,>.?/`;
    let arraySymbols = symbols.split("");

    temp.forEach((value) => {
      if (value / 2) {
        checkNumber = true;
      }
    });

    temp.forEach((value) => {
      if (value.toLowerCase() !== value.toUpperCase()) {
        if (value.toLowerCase() === value) {
          checkLowerCase = true;
        }
      }
    });

    temp.forEach((value) => {
      if (value.toLowerCase() !== value.toUpperCase()) {
        if (value.toUpperCase() === value) {
          checkUpperCase = true;
        }
      }
    });

    for (let i = 0; i < temp.length; i++) {
      for (let k = 0; k < arraySymbols.length; k++) {
        if (temp[i] === arraySymbols[k]) {
          checkSymbol = true;
        }
      }
    }

    if (password === "") {
      setPasswordValidity("null");
    }

    if (checkLowerCase !== true) {
      setPasswordValidity(false);
      setPasswordInfo("Password must include a lowercase");
    }

    if (checkUpperCase !== true) {
      setPasswordValidity(false);
      setPasswordInfo("Password must include an uppercase");
    }

    if (checkNumber !== true) {
      setPasswordValidity(false);
      setPasswordInfo("Password must include a number");
    }

    if (checkSymbol !== true) {
      setPasswordValidity(false);
      setPasswordInfo("Password must include a symbol");
    }

    if (temp.length < 8) {
      setPasswordValidity(false);
      setPasswordInfo("Password must at least contain 8 characters");
    }

    if (
      checkLowerCase &&
      checkUpperCase &&
      checkNumber &&
      checkSymbol &&
      temp.length >= 8
    ) {
      setPasswordInfo("Your password is strong!");
      setPasswordValidity(true);
      setPasswordConf(password);
      setNewPassword(password);
    }
  };

  const handleRecheckPassword = (passwordConfirmation) => {
    if (passwordConfirmation === passwordConf) {
      setPasswordConfValidity(true);
    } else if (passwordConfirmation !== passwordConf) {
      setPasswordConfValidity(false);
    }
  };

  const handleSubmitPassword = async () => {
    try {
      const data = {
        password,
        newPassword,
      };
      const token = Cookies.get("userToken");

      const res = await axios.patch(
        `${API_URL}/users/profile/password/${user.id}`,
        {
          data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.data.success) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastNotification />
      <Grid container spacing={2} alignItems="center">
        <Grid items xs={12} sx={{ pb: 2 }}>
          <Text fontSize="h5">Change Password</Text>
          <Text>Change your password to a new one</Text>
        </Grid>

        <FormControl>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3} alignItems="center">
              <Text textAlign="right">Old Password</Text>
            </Grid>
            <Grid item xs={9} alignItems="center" justifyContent="flex-start">
              <TextField
                id="user-old-password"
                placeholder="Old Password"
                type="password"
                variant="outlined"
                defaultValue={password}
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

            <Grid item xs={3} alignItems="center">
              <Text textAlign="right">New Password {' '}
              <Tooltip title={<>
                <Text>
                  Password rules:
                  <ul>
                    <li>At least has 8 characters</li>
                    <li>Includes lowercase character</li>
                    <li>Includes uppercase character</li>
                    <li>Includes number</li>
                    <li>Includes symbol</li>
                  </ul>
                </Text>
              </>}>
                <HelpOutline sx={{ fontSize: 15 }} color="primary"/>
              </Tooltip>
              </Text>
            </Grid>
            <Grid item xs={9} alignItems="center" justifyContent="flex-start">
              <TextField
                id="user-new-password"
                placeholder="New Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                defaultValue={password}
                fullWidth
                onChange={(e) => handleCheckPassword(e.target.value)}
                error={passwordValidity === "null" ? null : !passwordValidity}
                color={passwordInfo ? "success" : null}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>{passwordInfo}</FormHelperText>
            </Grid>

            <Grid item xs={3} alignItems="center">
              <Text textAlign="right">Confirmation Password</Text>
            </Grid>
            <Grid item xs={9} alignItems="center" justifyContent="flex-start">
              <TextField
                required
                id="user-confirmation-password"
                placeholder="Confirmation Password"
                type="password"
                variant="outlined"
                defaultValue={password}
                fullWidth
                name="passConf"
                autoComplete="passConf"
                onChange={(e) => handleRecheckPassword(e.target.value)}
                error={
                  PasswordConfValidity === "null" ? null : !PasswordConfValidity
                }
                color={PasswordConfValidity ? "success" : null}
              />
            </Grid>

            <Grid container justifyContent="flex-end" sx={{ py: 3 }}>
              <Grid xs={3} item />
              <Grid
                xs={9}
                item
                textAlign="left"
                sx={{ pt: "16px", pr: 0, pb: 0, pl: "16px" }}
              >
                <Button
                  width="150px"
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmitPassword()}
                  disabled={
                    !password || !passwordValidity || !PasswordConfValidity
                  }
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </FormControl>
      </Grid>
    </>
  );
};

export default Password;
