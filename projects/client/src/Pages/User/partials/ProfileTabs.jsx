import * as React from "react";
import Box from "@mui/material/Box";
import { AccountCircle, Home, LockOpen, Portrait } from "@mui/icons-material";
import SidebarMenu from "../../../Components/SidebarMenu";

function ProfileTabs(props) {
  const { setOpenTab } = props;

  const profileMenu = [
    { tab: 0, icon: <AccountCircle />, text: "My Profile" },
    { tab: 1, icon: <Portrait />, text: "Profile Picture" },
    { tab: 2, icon: <Home />, text: "My Address" },
    { tab: 3, icon: <LockOpen />, text: "Change Password" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu
        title="User Profile"
        menu={profileMenu}
        setOpenTab={setOpenTab}
      />
    </Box>
  );
}

export default ProfileTabs;
