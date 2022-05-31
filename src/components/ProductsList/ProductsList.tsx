import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ProductsData } from '../../interfaces/index';
import ErrorIcon from '@mui/icons-material/Error';
import Information from '../Information/Information';
import ProductsListItem from '../ProductsListItem/ProductsListItem';

interface Props {
  productsData: ProductsData | null;
}

const ProductsList = ({ productsData }: Props) => {
  return (
    <>
      {productsData?.data ? (
        <TableContainer sx={{ minHeight: 321, marginTop: '2rem' }} component={Paper}>
          <Table aria-label='products table'>
            <TableHead>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ minHeight: 321 }}>
              {Array.isArray(productsData?.data) ? (
                productsData?.data.map((product) => <ProductsListItem key={product.name} product={product} />)
              ) : (
                <ProductsListItem product={productsData?.data} />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Information IconElement={ErrorIcon} label="Unfortunately, we couldn't find your desired product." />
      )}
    </>
  );
};

export default ProductsList;
