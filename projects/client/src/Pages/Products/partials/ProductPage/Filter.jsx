import { Search } from "@mui/icons-material";
import {
  Box,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useRef } from "react";
import Button from "../../../../Components/atoms/Button";

const FilterProducts = (props) => {
  const { getDataFilter, category } = props;
  // const [category, setCategory] = useState()

  const [name, setName] = useState();
  const [tempName, setTempName] = useState();
  const [idCategory, setIdCategory] = useState();
  const [minPrice, setMinPrice] = useState();
  const [tempMinPrice, setTempMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [tempMaxPrice, setTempMaxPrice] = useState();
  const [sort, setSort] = useState("");

  const defaultName = useRef(null);
  const defaultMinPrice = useRef(null);
  const defaultMaxPrice = useRef(null);
  const defaultSort = useRef(null);

  const handleFilter = () => {
    setName(tempName);
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
    getDataFilter(tempName, idCategory, tempMinPrice, tempMaxPrice, sort);
  };

  const handleReset = () => {
    getDataFilter(null, null, null, null, null);
    setName(null);
    setIdCategory(null);
    setMinPrice(null);
    setMaxPrice(null);
    setSort("");
    defaultName.current.value = "";
    defaultMinPrice.current.value = "";
    defaultMaxPrice.current.value = "";
    defaultSort.current.value = "";
  };

  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  const handleChangeCategory = (id) => {
    setIdCategory(id);
    getDataFilter(name, id, minPrice, maxPrice, sort);
  };

  return (
    <div>
      <Box sx={{ mt: 3 }}>
        <Typography
          fontSize="20px"
          textAlign="left"
          sx={{ p: 1, mt: 2, fontWeight: "bold" }}
        >
          Category
        </Typography>
        <Box sx={{ maxHeight: "200px", overflowY: "auto" }}>
          {category
            ? category.map((item, index) => {
                return (
                  <Box textAlign="left" key={`c-${index}`}>
                    <Button onClick={() => handleChangeCategory(item.id)}>
                      <Typography
                        fontSize="14px"
                        textAlign="left"
                        sx={{ pl: 1 }}
                        color={idCategory === item.id ? "primary" : "black"}
                      >
                        {item.category_name}
                      </Typography>
                    </Button>
                  </Box>
                );
              })
            : null}
        </Box>
        <Divider sx={{ my: 2 }} />
        <Typography
          fontSize="20px"
          textAlign="left"
          sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
        >
          Filter
        </Typography>
        <FormControl sx={{ mx: 1 }} fullWidth variant="outlined">
          <InputLabel>Product Name</InputLabel>
          <OutlinedInput
            type="text"
            endAdornment={
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            }
            defaultValue={name}
            label="Product Search"
            onChange={(e) => setTempName(e.target.value)}
            inputRef={defaultName}
          />
        </FormControl>

        <Typography
          fontSize="18px"
          textAlign="left"
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          Price
        </Typography>
        <Box sx={{ pl: 1, mt: 1 }}>
          <TextField
            // defaultValue={minPrice}
            fullWidth
            id="min_price"
            label="Minimum Price"
            variant="outlined"
            onChange={(e) => setTempMinPrice(e.target.value)}
            type="number"
            sx={{ my: 1 }}
            inputRef={defaultMinPrice}
          />
          <TextField
            value={maxPrice}
            fullWidth
            id="max_price"
            label="Maximum Price"
            variant="outlined"
            onChange={(e) => setTempMaxPrice(e.target.value)}
            type="number"
            sx={{ my: 1 }}
            inputRef={defaultMaxPrice}
          />
        </Box>
        <Typography
          fontSize="18px"
          textAlign="left"
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          Sort By
        </Typography>
        <Box sx={{ pl: 1, pt: 1, mt: 1 }}>
          <FormControl fullWidth>
            <Select value={sort} onChange={handleChangeSort} displayEmpty>
              <MenuItem value="">
                <Typography color="grey.600" textAlign="left">
                  Choose One
                </Typography>
              </MenuItem>
              <MenuItem value={`sort=name&order=asc`}>
                Product Name (a-z)
              </MenuItem>
              <MenuItem value={`sort=name&order=desc`}>
                Product Name (z-a)
              </MenuItem>
              <MenuItem value={`sort=selling_price&order=asc`}>
                From Lowest Price
              </MenuItem>
              <MenuItem value={`sort=selling_price&order=desc`}>
                From Highest Price
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" width="100%" onClick={handleFilter}>
            FILTER
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            color="error"
            width="100%"
            onClick={handleReset}
          >
            RESET
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default FilterProducts;
