import { Box, Card, CardContent, CardMedia, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "./atoms/Button";
import Text from "./atoms/Text";

const ProductCard = (props) => {
  const { id, name, price, image } = props;
  const navigate = useNavigate();

  return (
    <Tooltip title={name} followCursor>
      <Card
        sx={{
          display: { xs: "flex", sm: "block" },
          justifyContent: "space-between",
          dropShadow: "3px 3px 2px #F6F6F6",
        }}
      >
        <Box
          sx={{
            height: "150px",
            maxWidth: "100%",
            width: { xs: "50%", sm: "90%" },
            display: "flex",
            mx: "auto",
            alignItems: "center",
            justifyContent: "center",
            p: 1,
          }}
        >
          <CardMedia
            component="img"
            alt={name}
            image={image}
            sx={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Box>
        <Box sx={{ width: { xs: "50%", sm: "100%" }, my: "auto" }}>
          <CardContent>
            <Text
              fontSize="subtitle1"
              fontWeight="bold"
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
            <Button
              variant="contained"
              sx={{ width: "100%", mt: 2 }}
              onClick={() => navigate(`/product/${id}`)}
            >
              Detail
            </Button>
          </CardContent>
        </Box>
      </Card>
    </Tooltip>
  );
};

export default ProductCard;
