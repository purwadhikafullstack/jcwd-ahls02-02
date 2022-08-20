import { Container, FormControl, Grid, TextField } from "@mui/material";
import { useState } from "react";
import Button from "../../../Components/atoms/Button";
import Text from "../../../Components/atoms/Text";

const Password = () => {
  const [password, setPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmationPassword, setConfirmationPassword] = useState(null);

  const handleSubmit = () => {
    console.log(password);
    console.log(newPassword);
    console.log(confirmationPassword);
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid>
          <Text fontSize="h5">My Profile</Text>
        </Grid>

        <Container>
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
                <Text textAlign="right">New Password</Text>
              </Grid>
              <Grid item xs={9} alignItems="center" justifyContent="flex-start">
                <TextField
                  id="user-new-password"
                  placeholder="New Password"
                  type="password"
                  variant="outlined"
                  defaultValue={password}
                  fullWidth
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Grid>

              <Grid item xs={3} alignItems="center">
                <Text textAlign="right">Confirmation Password</Text>
              </Grid>
              <Grid item xs={9} alignItems="center" justifyContent="flex-start">
                <TextField
                  id="user-confirmation-password"
                  placeholder="Confirmation Password"
                  type="password"
                  variant="outlined"
                  defaultValue={password}
                  fullWidth
                  onChange={(e) => setConfirmationPassword(e.target.value)}
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
                    onClick={() => handleSubmit()}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </FormControl>
        </Container>
      </Grid>
    </>
  );
};

export default Password;
