import { useState } from "react";
import Address from "./partials/Address";
import MyProfile from "./partials/MyProfile";
import Password from "./partials/Password";
import ProfilePicture from "./partials/ProfilePicture";
import ProfileTabs from "./partials/ProfileTabs";
import { Box } from "@mui/material";

const ProfilePage = () => {

  const [openTab, setOpenTab] = useState(0);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <ProfileTabs setOpenTab={setOpenTab} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {openTab === 0 && <MyProfile />}
          {openTab === 1 && <ProfilePicture />}
          {openTab === 2 && <Address />}
          {openTab === 3 && <Password />}
        </Box>
      </Box>
    </div>
  );
};

export default ProfilePage;
