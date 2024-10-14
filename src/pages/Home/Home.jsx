import React, { useCallback, useEffect, useState } from 'react';
import axiosInterface from '../../utils/axiosInterface';
import ProductCard from '../Products/ProductCard';
import ProductDialog from '../Products/ProductDialog';
import { showToast } from '../../utils/customToast';
import { getErrorResponseMessage } from '../../utils/helper';
import { BarLoader } from 'react-spinners';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
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

  const fetchProducts = useCallback(async (currentPage) => {
    setLoading(true);
    try {
      const params = {
        limit: 8,
        page: currentPage
      };
      const { data } = await axiosInterface.get('products', { params });
      if (data.data.data.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data.data.data]);
      }
    } catch (error) {
      showToast('error', getErrorResponseMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(page);
  }, [fetchProducts, page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !loading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore]);

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
      <div className="loader my-8">{loading && <BarLoader width={'100%'} color="blue" />}</div>
    </>
  );
};

export default Home;
