import React, { useCallback, useEffect, useState } from 'react';
import cartStore from '../../store/cartStore';
import axiosInterface from '../../utils/axiosInterface';
import ProductCard from '../Product/ProductCard';
import ProductDialog from '../Product/ProductDialog';

const Home = () => {
  const { cart } = cartStore();
  const [products, setProducts] = useState([]);
  const [productDialog, setProductDialog] = useState({
    open: false,
    productSku: null
  });

  const handleProductDialog = (productSku) => {
    setProductDialog({
      open: !productDialog.open,
      productSku
    });
  };

  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await axiosInterface.get('products');
      setProducts(data.data.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <>
      <ProductDialog
        open={productDialog.open}
        productSku={productDialog.productSku}
        handleClose={handleProductDialog}
      />
      <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-4">
        {products.map((o) => (
          <ProductCard handleClick={handleProductDialog} info={o} key={o.sku} />
        ))}
      </div>
    </>
  );
};

export default Home;
