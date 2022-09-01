import { Add, Remove } from "@mui/icons-material";
import { Box, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import Button from "./atoms/Button";

const NumberStepper = (props) => {
  const { value, index, onChange, maxValue } = props;

  const [numberValue, setNumberValue] = useState(value);
  const [disableButtonSubtract, setDisableButtonSubtract] = useState(
    value === 1 ? true : false
  );
  const [disableButtonAdd, setDisableButtonAdd] = useState(false);

  const handleStepDown = () => {
    setDisableButtonAdd(false);
    let temp = value;
    temp--;
    setNumberValue(temp);
    onChange(temp, "remove", index);
    if (temp === 1) {
      setDisableButtonSubtract(true);
    }
  };

  const handleStepUp = () => {
    setDisableButtonSubtract(false);
    let temp = value;
    temp++;
    setNumberValue(temp);
    onChange(temp, "add", index);
    if (temp === maxValue) {
      setDisableButtonAdd(true);
    }
  };

  return (
    <>
      <FormControl>
        <Box sx={{ display: "flex", my: "auto" }}>
          <Button
            size="small"
            color="primary"
            width="5px"
            onClick={() => handleStepDown()}
            disabled={disableButtonSubtract}
          >
            <Remove />
          </Button>
          <TextField
            size="small"
            variant="outlined"
            value={numberValue}
            inputProps={{ min: 0, style: { textAlign: "center" } }}
            sx={{ width: "75px", height: "30px" }}
          />
          <Button
            color="primary"
            width="5px"
            onClick={() => handleStepUp()}
            disabled={disableButtonAdd}
          >
            <Add />
          </Button>
        </Box>
      </FormControl>
    </>
  );
};

export default NumberStepper;
