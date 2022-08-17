import { Refresh, RotateRight } from "@mui/icons-material";
import { Button as ButtonMui, CircularProgress } from "@mui/material";

const Button = (props) => {
  const {
    variant,
    size,
    color,
    disabled = false,
    isSubmitting = false,
    onClick,
    children,
    width,
    height,
  } = props;

  return (
    <ButtonMui
      // style={{ maxHeight: "30px", minWidth: "50px", minHeight: "30px" }}
      style={{ width: `${width}`, height: `${height}` }}
      variant={variant}
      size={size}
      color={color}
      disabled={disabled || isSubmitting}
      onClick={onClick}
      sx={{ textTransform: `capitalize` }}
    >
      {!isSubmitting ? children : <RotateRight className="icon-spin" />}
    </ButtonMui>
  );
};

export default Button;
