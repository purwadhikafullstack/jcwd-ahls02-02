import * as React from "react";
import Box from "@mui/material/Box";
import { AccountCircle, Home, LockOpen, Portrait } from "@mui/icons-material";
import SidebarMenu from "../../../Components/SidebarMenu";

function ProfileTabs(props) {
  const { openTab, setOpenTab } = props;

  const profileMenu = [
    {
      tab: 0,
      icon: <AccountCircle color={openTab === 0 ? "primary" : "inherit"} />,
      text: "My Profile",
    },
    {
      tab: 1,
      icon: <Portrait color={openTab === 1 ? "primary" : "inherit"} />,
      text: "Profile Picture",
    },
    {
      tab: 2,
      icon: <Home color={openTab === 2 ? "primary" : "inherit"} />,
      text: "My Address",
    },
    {
      tab: 3,
      icon: <LockOpen color={openTab === 3 ? "primary" : "inherit"} />,
      text: "Change Password",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu
        title="User Profile"
        menu={profileMenu}
        openTab={openTab}
        setOpenTab={setOpenTab}
      />
    </Box>
  );
}

export default ProfileTabs;
