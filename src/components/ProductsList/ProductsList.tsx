import { ProductsData, Product } from '../../interfaces/index';

interface Props {
  productsData: ProductsData | null;
}

const ProductsList = ({ productsData }: Props) => {
  return (
    <div>
      {Array.isArray(productsData?.data)
        ? productsData?.data.map((product: Product, index: number) => <p key={index}>{product.name}</p>)
        : productsData?.data.name}
    </div>
  );
};

export default ProductsList;
