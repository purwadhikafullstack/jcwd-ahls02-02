import { Grid } from "@mui/material";
import Text from "../../../Components/atoms/Text";

const Password = () => {
  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Text fontSize="h5">Change Password</Text>
      </Grid>
    </Grid>
  );
};

export default Password;