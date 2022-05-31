import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  CssBaseline,
  Container,
  TextField,
  Typography,
  IconButton,
  Stack,
  FormControl,
  InputAdornment,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProductsList from './components/ProductsList/ProductsList';
import PaginationNav from './components/PaginationNav/PaginationNav';
import { ProductsData } from './interfaces/index';
import LoopIcon from '@mui/icons-material/Loop';
import ErrorIcon from '@mui/icons-material/Error';
import Information from './components/Information/Information';

const BASE_URL = 'https://reqres.in/api/products?per_page=5';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '0', 10);
  const initialID = query.get('id');
  const [productsData, setProductsData] = useState<ProductsData | null>(null);
  const [searchInput, setSearchInput] = useState<string>('');

  const [isLoading, toggleLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (page: number) => {
    try {
      const response = await fetch(`${BASE_URL}&page=${page}`);
      const data = await response.json();
      setProductsData(data);
    } catch (error) {
      setError('Something went wrong. Try again later.');
    }
    toggleLoading(false);
  };

  const fetchSpecificProduct = async (searchInput: string) => {
    try {
      const response = await fetch(`${BASE_URL}&id=${searchInput}`);
      const data = await response.json();
      setProductsData(data);
    } catch (error) {
      setError('Something went wrong. Try again later.');
    }
    toggleLoading(false);
  };

  useEffect(() => {
    if (!initialID) {
      if (!page) navigate('/?page=1');
      fetchProducts(page);
    } else {
      fetchSpecificProduct(initialID);
    }
  }, [page, initialID, navigate]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, '');
    setSearchInput(newValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput) return;

    await fetchSpecificProduct(searchInput);
    setSearchInput('');
    navigate(`/?id=${searchInput}`);
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth='md' sx={{ marginTop: '2rem' }}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography sx={{ fontSize: '5vmin' }} variant='h3' component='h1'>
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

        {isLoading ? (
          <Information IconElement={LoopIcon} label='Loading...' />
        ) : error ? (
          <Information IconElement={ErrorIcon} label={error} />
        ) : (
          <>
            <ProductsList productsData={productsData} />
            {page && !initialID ? (
              <PaginationNav page={page} totalPages={productsData?.total_pages || 0} />
            ) : (
              <Button variant='contained' sx={{ marginTop: '2rem' }} component={Link} to={'/?page=1'}>
                Go back
              </Button>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default App;
