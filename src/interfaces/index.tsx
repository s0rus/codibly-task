export interface ProductsData {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Product[] | Product;
}

export interface Product {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}
