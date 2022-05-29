import { Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';

type Props = {
  page: number;
  totalPages: number;
};

const PaginationNav = ({ page, totalPages }: Props) => {
  return (
    <Pagination
      page={page}
      count={totalPages}
      renderItem={(item) => <PaginationItem key={item.page} component={Link} to={`/?page=${item.page}`} {...item} />}
    />
  );
};

export default PaginationNav;
