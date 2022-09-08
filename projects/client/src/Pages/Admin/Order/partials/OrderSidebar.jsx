import Text from "../../../../Components/atoms/Text";
import { Box } from "@mui/material";

const OrderSidebar = (props) => {
  const {
    selectedTab,
    setSelectedTab,
    setSelectedStatus,
    setCurrentPage,
  } = props;
  const tabMenu = [
    { label: "All", status: "" },
    { label: "Waiting for Payment", status: "Waiting for Payment" },
    { label: "Waiting for Confirmation", status: "Waiting for Confirmation" },
    { label: "Order Processed", status: "Processed" },
    { label: "Order in Delivery", status: "Sent" },
    { label: "Order Confirmed", status: "Completed" },
    { label: "Cancelled Order", status: "Cancelled" },
  ];

  const handleChangeMenu = async (status, index) => {
    try {
      setSelectedTab(index);
      setSelectedStatus(status);
      setCurrentPage(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Box>
        <Text fontSize="h5" fontWeight="bold">
          Order List
        </Text>
      </Box>
      <Box sx={{ pt: 2 }}>
        {tabMenu.map((value, index) => {
          return (
            <Box
              key={`${index}-${value.status}`}
              onClick={() => {
                handleChangeMenu(value.status, index);
              }}
              sx={[
                {
                  m: 1,
                  p: 1,
                  "&:hover": {
                    backgroundColor: "#dff0f3",
                  },
                  "&:active": {
                    backgroundColor: "#bfe1e7",
                  },
                },
                selectedTab === index && {
                  backgroundColor: "#f7fbfc",
                  color: "#5FB6C3",
                  "&:hover": { backgroundColor: "#dff0f3" },
                  "&:active": {
                    backgroundColor: "#bfe1e7",
                  },
                },
              ]}
            >
              <Text>{value.label}</Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default OrderSidebar;
