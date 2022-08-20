import { Grid } from "@mui/material";
import Text from "../../../Components/atoms/Text";

const Address = () => {
  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Text fontSize="h5">My Adress</Text>
      </Grid>
    </Grid>
  );
};

export default Address;