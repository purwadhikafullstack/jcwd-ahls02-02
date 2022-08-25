import { Avatar, FormControl, Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../Components/atoms/Button";
import Text from "../../../Components/atoms/Text";
import { ToastNotification } from "../../../Components/Toast";
import { API_URL } from "../../../helper";
import { editProfileAction } from "../../../Redux/Actions/userAction";

const ProfilePicture = () => {
  const user = useSelector((state) => {
    return state.userReducer;
  });
  console.log(user);
  const dispatch = useDispatch();
  const filePickerRef = useRef(null);
  // Image yang akan dikirim
  // selectedFile untuk ditampilkan di FE
  const [image, setImage] = useState(
    user.profile_picture && `${API_URL}${user.profile_picture}`
  );
  const [selectedFile, setSelectedFile] = useState(
    user.profile_picture && `${API_URL}${user.profile_picture}`
  );

  const [inputKey, setInputKey] = useState(null);
  const [formIsChanged, setFormIsChanged] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(null);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const token = Cookies.get("userToken");

      let formProfilePicture = new FormData();
      formProfilePicture.append("image", image);

      const res = await axios.patch(
        `${API_URL}/users/profile/profile-picture/${user.id}`,
        formProfilePicture,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(editProfileAction(res.data.data));
        setIsSubmitting(false);
      } else {
        toast.error("Please try again");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("There's an error. Please try again");
    }
  };

  const addImageToPost = (event) => {
    if (
      event.target.files[0].type === "image/jpeg" ||
      event.target.files[0].type === "image/png" ||
      event.target.files[0].type === "image/gif"
    ) {
      if (event.target.files[0].size <= 1000000) {
        setFormIsChanged(true)
        setImage(event.target.files[0]);
        const reader = new FileReader();

        //cek apakah ada file yang diupload
        if (event.target.files[0]) {
          reader.readAsDataURL(event.target.files[0]);
        }

        reader.onload = (readerEvent) => {
          setSelectedFile(readerEvent.target.result);
        };
      } else {
        setInputKey(Date.now);
        toast.error("Your file must not exceed 1MB");
      }
    } else {
      setInputKey(Date.now);
      toast.error("File type error");
    }
  };

  const removeUploadedFile = () => {
    setSelectedFile(null);
    setImage(null);
    setInputKey(Date.now);
  };

  return (
    <Grid container spacing={2}>
      <ToastNotification />
      <Grid>
        <Text fontSize="h5">Profile Picture</Text>
      </Grid>

      <Container>
        <FormControl>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
              p: 4,
            }}
          >
            <Grid
              container
              spacing={0}
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Avatar
                alt={`profile-picture-${user.name}`}
                src={selectedFile}
                sx={{ justifySelf: "center", width: 150, height: 150 }}
              />
            </Grid>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                pt: 2,
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                width="100px"
                onClick={() => filePickerRef.current.click()}
              >
                Change
              </Button>
              <Button
                variant="contained"
                color="error"
                width="100px"
                onClick={removeUploadedFile}
              >
                Remove
              </Button>
              <input
                type="file"
                hidden
                ref={filePickerRef}
                key={inputKey || ""}
                onChange={addImageToPost}
              />
            </Box>
          </Box>
          <Button
            width="300px"
            variant="contained"
            color="primary"
            onClick={() => handleSubmit()}
            disabled={!formIsChanged}
            isSubmitting={isSubmitting}
          >
            Submit
          </Button>
        </FormControl>
      </Container>
    </Grid>
  );
};

export default ProfilePicture;
