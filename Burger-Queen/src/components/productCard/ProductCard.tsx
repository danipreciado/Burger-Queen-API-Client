import React, { useEffect, useState } from 'react'; 
import styles from './ProductCard.module.css';
import { getProductData } from '../../request/request';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  type: string;
  quantity: number;
}

export interface ProductCardProps {
  onSelectProduct: (product: Product) => void;
  selectedProducts: Product[];
  selectedCategory?: string;
}
  
const ProductCard: React.FC<ProductCardProps> = ({ onSelectProduct, selectedProducts, selectedCategory }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const filteredProducts = selectedCategory ? products.filter(product => product.type === selectedCategory) : products;

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      const data = await getProductData(token || '');
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product: Product) => {
    if (!selectedProducts.find((selectedProduct) => selectedProduct.id === product.id)) {
      onSelectProduct(product);
    }
  }; 

  return (
    <>
      {filteredProducts.map((product) => (
        <div
          data-testid={`product_test_${product.id}`}
          key={product.id}
          className={`${styles.cardProduct} ${selectedProducts.find((selectedProduct) => selectedProduct.id === product.id) ? styles.disabled : ''}`}
          onClick={() => handleProductClick(product)}
        >
          <img className={styles.imgproduct} alt={product.name} src={product.image} />
          <div className={styles.titlecard}>
            <p>{product.name}</p>
            <p className= {styles.price}>{`$${product.price}`}</p>
          </div>
        </div>
      ))} 
    </>
  ); 

};

export default ProductCard;

