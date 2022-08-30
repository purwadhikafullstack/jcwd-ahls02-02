]import { Container, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { API_URL } from "../../helper";
import { getProductsDataAction } from "../../Redux/Actions/userProductsAction";
import FilterProducts from "./partials/ProductPage/Filter";
import ProductCards from "./partials/ProductPage/ProductCards";

const ProductPage = () => {
  const [name, setName] = useState();
  const [idCategory, setIdCategory] = useState();
  const [needsReceipt, setNeedsReceipt] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(32);

  const [productData, setProductData] = useState();
  const [category, setCategory] = useState();
  const [totalPage, setTotalPage] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch()

  useEffect(() => {
    getData();
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const res = await axios.get(`${API_URL}/products/categories`);
      if (res) {
        setCategory(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async (
    filterName = name,
    filterCategory = idCategory,
    filterNeedsReceipt = needsReceipt,
    filterMinPrice = minPrice,
    filterMaxPrice = maxPrice,
    filterSort = sort,
    filterPage = page,
    filterLimit = limit
  ) => {
    try {
      let query = "";

      if (filterName) {
        if (query) {
          query += `&name=${filterName}`;
        } else {
          query += `?name=${filterName}`;
        }
      }

      if (filterCategory) {
        if (query) {
          query += `&id_category=${filterCategory}`;
        } else {
          query += `?id_category=${filterCategory}`;
        }
      }

      if (filterNeedsReceipt) {
        if (query) {
          query += `&needs_receipt=${filterNeedsReceipt}`;
        } else {
          query += `?needs_receipt=${filterNeedsReceipt}`;
        }
      }

      if (filterMinPrice) {
        if (query) {
          query += `&min_price=${filterMinPrice}`;
        } else {
          query += `?min_price=${filterMinPrice}`;
        }
      }

      if (filterMaxPrice) {
        if (query) {
          query += `&max_price=${filterMaxPrice}`;
        } else {
          query += `?max_price=${filterMaxPrice}`;
        }
      }

      if (filterPage) {
        if (query) {
          query += `&page=${filterPage}`;
        } else {
          query += `?page=${filterPage}`;
        }
      }

      if (filterLimit) {
        if (query) {
          query += `&limit=${filterLimit}`;
        } else {
          query += `?limit=${filterLimit}`;
        }
      }

      if (filterSort) {
        if (query) {
          query += `&${filterSort}`;
        } else {
          query += `?${filterSort}`;
        }
      }

      const response = await axios.get(`${API_URL}/products${query}`);

      if (response) {
        let data = [];
        response.data.product.forEach((value) => {
          if (value.default_unit === "true") {
            data.push({
              id: value.id,
              name: value.name,
              category: value.category_name,
              image: value.image,
              price: value.selling_price,
              needs_receipt: value.needs_receipt,
              description: value.description,
              quantity: value.quantity,
            });
          }
        });
        dispatch(getProductsDataAction(data))
        setProductData(data);
        setTotalPage(response.data.totalPage);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDataFilter = (
    newName,
    newIdCategory,
    newMinPrice,
    newMaxPrice,
    newSort
  ) => {
    setName(newName);
    setIdCategory(newIdCategory);
    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);
    setSort(newSort);
    setPage(1);

    getData(
      newName,
      newIdCategory,
      needsReceipt,
      newMinPrice,
      newMaxPrice,
      newSort,
      1,
      limit
    );
  };

  const handlePage = (newPage) => {
    setPage(newPage);
    getData(
      name,
      idCategory,
      needsReceipt,
      minPrice,
      maxPrice,
      sort,
      newPage,
      limit
    );
  };

  return (
    <div>
      {!isLoading && (
        <Container>
          <Grid container>
            {/* Filter */}
            <Grid xs={12} md={3} sx={{ p: 1 }}>
              <FilterProducts
                getDataFilter={getDataFilter}
                name={name}
                idCategory={idCategory}
                minPrice={minPrice}
                maxPrice={maxPrice}
                sort={sort}
                category={category}
              />
            </Grid>
            {/* Product Cards */}
            <Grid xs={12} md={9} sx={{ pt: 4, pl: 0 }}>
              <ProductCards
                productData={productData}
                totalPage={totalPage}
                changePage={handlePage}
                page={page}
              />
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default ProductPage;
