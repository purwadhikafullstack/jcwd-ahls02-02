import { Box, Card, CardContent, CardMedia, Tooltip } from "@mui/material";
import Button from "./atoms/Button";
import Text from "./atoms/Text";

const ProductCard = (props) => {
  const { id, name, price, image, quantity, needs_receipt, handleDetail } =
    props;

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
            position: "relative",
          }}
        >
          <CardMedia
            component="img"
            alt={name}
            image={image}
            sx={{ maxWidth: "100%", maxHeight: "100%" }}
          />
          {needs_receipt === "true" && (
            <Box
              sx={{
                backgroundColor: "#F7C749",
                // borderRadius: "5px",
                p: "5px",
                position: "absolute",
                top: "10px",
                left: "-2px",
              }}
            >
              <Text
                fontSize="caption"
                fontWeight="bold"
                color="white"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Needs Prescription
              </Text>
            </Box>
          )}
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

            <Text fontSize="body2" color="grey.600" sx={{ textAlign: "left" }}>
              IDR {price.toLocaleString()}
            </Text>
            {quantity > 0 ? (
              <Text
                fontSize="subtitle2"
                color="grey.600"
                sx={{ textAlign: "left" }}
              >
                Stock: {quantity}
              </Text>
            ) : (
              <Text
                fontSize="subtitle2"
                color="error"
                sx={{ textAlign: "left", fontStyle: "italic" }}
              >
                Out of stock
              </Text>
            )}

            <Button
              variant="contained"
              sx={{ width: "100%", mt: 1 }}
              onClick={() => handleDetail(id)}
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
