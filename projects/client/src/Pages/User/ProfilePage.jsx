import { useEffect, useState } from "react";
import Address from "./partials/Address";
import MyProfile from "./partials/MyProfile";
import Password from "./partials/Password";
import ProfilePicture from "./partials/ProfilePicture";
import ProfileTabs from "./partials/ProfileTabs";
import { Box } from "@mui/material";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "../../helper";
import { getProfileDataAction } from "../../Redux/Actions/userAction";
import { Container } from "@mui/system";

const ProfilePage = () => {
  const [openTab, setOpenTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => {
    return state.userReducer;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.name) {
      const getUserData = async () => {
        try {
          const token = Cookies.get("userToken");
          const res = await axios.get(`${API_URL}/users/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.data.success) {
            dispatch(getProfileDataAction(res.data.data));
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getUserData();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <div>
      {!isLoading && (
        <Container>
          <Box sx={{ display: "flex" }}>
            <ProfileTabs openTab={openTab} setOpenTab={setOpenTab} />
            <Box component="main" sx={{ flexGrow: 1, p: 3, zIndex: 0 }}>
              {/* <Navbar/> */}
              {openTab === 0 && <MyProfile />}
              {openTab === 1 && <ProfilePicture />}
              {openTab === 2 && <Address />}
              {openTab === 3 && <Password />}
            </Box>
          </Box>
        </Container>
      )}
    </div>
  );
};

export default ProfilePage;
