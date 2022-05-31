import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import { Product } from '../../interfaces';

interface Props {
  product: Product;
}

const ProductsListItem = ({ product: { id, name, year, color } }: Props) => {
  return (
    <TableRow
      key={name}
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
        backgroundColor: color,
      }}
    >
      <TableCell>{id}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{year}</TableCell>
    </TableRow>
  );
};

export default ProductsListItem;
