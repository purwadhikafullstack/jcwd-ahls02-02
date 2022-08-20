import { Grid } from "@mui/material";
import Text from "../../../Components/atoms/Text";

const ProfilePicture = () => {
  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Text fontSize="h5">Profile Picture</Text>
      </Grid>
    </Grid>
  );
};

export default ProfilePicture;