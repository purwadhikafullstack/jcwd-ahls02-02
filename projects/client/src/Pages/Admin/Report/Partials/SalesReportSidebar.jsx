import Text from "../../../../Components/atoms/Text";
import { Box } from "@mui/material";

const SalesReportSidebar = (props) => {
  const { selectedTab, setSelectedTab, setSelectedType, setCurrentPage } =
    props;

  const tabMenu = ["Transaction", "Product", "User"];

  const handleChangeMenu = async (type, index) => {
    try {
      setCurrentPage(1);
      setSelectedTab(index);
      setSelectedType(type);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Box>
        <Text fontSize="h5" fontWeight="bold">
          Sales Report
        </Text>
      </Box>
      <Box sx={{ pt: 2 }}>
        {tabMenu.map((value, index) => {
          return (
            <Box
              key={`${index}-${value}`}
              onClick={() => {
                handleChangeMenu(value, index);
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
              <Text>{value}</Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default SalesReportSidebar;
