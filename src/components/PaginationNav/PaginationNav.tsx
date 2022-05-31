import { Pagination, PaginationItem } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';

type Props = {
  page: number;
  totalPages: number;
};

const PaginationNav = ({ page, totalPages }: Props) => {
  return (
    <>
      {page > totalPages ? (
        <Navigate to='/?page=1' />
      ) : (
        <Pagination
          page={page}
          count={totalPages}
          renderItem={(item) => (
            <PaginationItem key={item.page} component={Link} to={`/?page=${item.page}`} {...item} />
          )}
          sx={{ marginTop: '2rem' }}
        />
      )}
    </>
  );
};

export default PaginationNav;
