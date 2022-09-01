import { Card, Box } from "@mui/material";
import Text from "../../../Components/atoms/Text";

const ShippingMethod = (props) => {
  return (
    <>
      <Card variant="outlined" sx={{ p: 2 }}>
        <Box>
          <Text fontSize="h6" fontWeight="bold">
            Shipping Method
          </Text>
        </Box>
      </Card>
    </>
  );
};

export default ShippingMethod;
