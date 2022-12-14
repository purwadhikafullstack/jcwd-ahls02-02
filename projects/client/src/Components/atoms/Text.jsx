import { Typography } from "@mui/material";

const Text = (props) => {
  const {
    textAlign = "left", // left, center, right
    fontWeight = "regular", // light, regular, medium, bold
    fontSize = "default", // h1-h6, subtitle1-2, body1-2, caption, overline
    fontStyle = "normal", // normal, italic, oblique
    underline = "none",
    color,
    display = "block", // block, inline
    sx
  } = props;
  return (
    <Typography
      variant={fontSize}
      underline={underline}
      color={color}
      sx={{
        textAlign: `${textAlign}`,
        fontWeight: `${fontWeight}`,
        fontStyle: `${fontStyle}`,
        display: `${display}`,
        ...sx
      }}
    >
      {props.children}
    </Typography>
  );
};

export default Text;
