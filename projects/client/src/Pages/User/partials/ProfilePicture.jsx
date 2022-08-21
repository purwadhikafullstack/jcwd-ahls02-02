import { Avatar, FormControl, Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useRef, useState } from "react";
import Button from "../../../Components/atoms/Button";
import Text from "../../../Components/atoms/Text";

const ProfilePicture = () => {
  const filePickerRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(
    "https://upload.wikimedia.org/wikipedia/en/8/88/Bugcat_Capoo.jpg"
  );
  const [inputKey, setInputKey] = useState(null);
  const [image, setImage] = useState(null);

  const handleSubmit = () => {
    console.log(selectedFile);
  };

  const addImageToPost = (event) => {
    setImage(event.target.files[0]);
    const reader = new FileReader();
    //cek apakah ada file yang diupload
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const removeUploadedFile = () => {
    setSelectedFile(null);
    setInputKey(Date.now);
  };

  return (
    <Grid container spacing={2}>
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
                alt="Remy Sharp"
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
          >
            Submit
          </Button>
        </FormControl>
      </Container>
    </Grid>
  );
};

export default ProfilePicture;
