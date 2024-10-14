import React, { useCallback, useEffect, useRef, useState } from 'react';
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

  const loaderRef = useRef(null); // Referensi untuk loader

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    ); // Mengatur threshold ke 1.0 untuk memicu saat elemen sepenuhnya terlihat

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
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
        {products.map((o, i) => (
          <ProductCard handleClick={handleProductDialog} info={o} key={i} />
        ))}
      </div>
      <div ref={loaderRef} className="loader my-8">
        {loading && <BarLoader width={'100%'} color="blue" />}
      </div>
    </>
  );
};

export default Home;
