import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  CssBaseline,
  Container,
  TextField,
  Typography,
  IconButton,
  Stack,
  FormControl,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProductsList from './components/ProductsList/ProductsList';
import PaginationNav from './components/PaginationNav/PaginationNav';
import { ProductsData } from './interfaces/index';

const BASE_URL = 'https://reqres.in/api/products?per_page=5';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  const [productsData, setProductsData] = useState<ProductsData | null>(null);
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}&page=${page}`);
        const data = await response.json();
        setProductsData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [page]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, '');

    setSearchInput(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/?id=${searchInput}`);
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth='md'>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h3' component='h1'>
            codibly task.
          </Typography>
          <Stack direction='row' alignItems='center' spacing={1}>
            <FormControl variant='outlined' component='form' onSubmit={handleSubmit}>
              <TextField
                onChange={handleSearchInput}
                value={searchInput}
                InputProps={{
                  inputProps: {
                    min: 1,
                  },
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton type='submit' aria-label='search' edge='end' size='small'>
                        <SearchIcon color='primary' type='submit' />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                id='outlined-basic'
                label='Product ID'
                variant='outlined'
                size='small'
              />
            </FormControl>
          </Stack>
        </Stack>
        <ProductsList productsData={productsData} />
        <Routes>
          <Route path='*' element={<PaginationNav page={page || 1} totalPages={productsData?.total_pages || 1} />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
