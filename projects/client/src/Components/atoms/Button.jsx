import { RotateRight } from "@mui/icons-material";
import { Button as ButtonMui } from "@mui/material";

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
    sx
  } = props;

  return (
    <ButtonMui
      variant={variant}
      size={size}
      color={color}
      disabled={disabled || isSubmitting}
      onClick={onClick}
      sx={{ width: `${width}`, height: `${height}`, textTransform: `capitalize`, ...sx }}
    >
      {!isSubmitting ? children : <RotateRight className="icon-spin" />}
    </ButtonMui>
  );
};

export default Button;
