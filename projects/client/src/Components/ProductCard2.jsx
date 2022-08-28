import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Text from "./atoms/Text";

const ProductCard = (props) => {
  const { name, price, image } = props;

  return (
    <Card sx={{ display: { xs: "flex", sm: "block" }, justifyContent:"space-between" }}>
      <Box
        sx={{
          height: "150px",
          display: "flex",
          mx:"auto",
          alignItems: "center",
          p:1,
        }}
      >
        <CardMedia
          component="img"
          alt={name}
          image={image}
          sx={{maxWidth:"100%",maxHeight:"100%"}}
        />
      </Box>
      <CardContent sx={{minWidth:{xs:"150px",sm:null}}}>
        <Text
          variant="subtitle1"
          sx={{
            textAlign: "left",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name.toUpperCase()}
        </Text>
        <Text variant="body2" color="grey.600" sx={{ textAlign: "left" }}>
          IDR {price.toLocaleString()}
        </Text>
        <Button variant="contained" sx={{ width: "100%", mt: 2 }}>
          Detail
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
