import React, { useEffect, useState } from 'react';
import axiosInterface from '../../utils/axiosInterface';
import { showToast } from '../../utils/customToast';
import { formatDecimal, getErrorResponseMessage } from '../../utils/helper';
import ProductEdit from './ProductEdit';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [productEditDialog, setProductEditDialog] = useState({
    open: false,
    productSku: null
  });

  const handleOpenProductEditDialog = (productSku) => {
    setProductEditDialog({
      open: !productEditDialog.open,
      productSku
    });
  };

  const fetchProducts = async () => {
    try {
      const params = {
        page: 1,
        limit: 10
      };
      const { data } = await axiosInterface.get('products', { params });
      setProducts(data.data.data);
    } catch (error) {
      showToast('error', getErrorResponseMessage(error));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="content">
      <ProductEdit
        productSku={productEditDialog.productSku}
        open={productEditDialog.open}
        handleOpen={handleOpenProductEditDialog}
      />
      <div className="content-title">Products List</div>
      <div className="content-body mt-5">
        <div className="relative overflow-x-auto box">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs uppercase">
              <tr className="border-b">
                <th scope="col" className="px-6 py-3">
                  Product Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  SKU
                </th>
                <th scope="col" className="px-6 py-3">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((o, i) => (
                <tr className="border-b" key={i}>
                  <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                    {o.title}
                  </th>
                  <td className="px-6 py-4">{formatDecimal(o.price)}</td>
                  <td className="px-6 py-4">{o.sku}</td>
                  <td className="px-6 py-4">{o.stock}</td>
                  <td className="px-6 py-4">
                    <span
                      className="font-semibold text-blue-500 hover:cursor-pointer"
                      onClick={() => handleOpenProductEditDialog(o.sku)}>
                      Edit
                    </span>
                    <span className="text-gray-400 ">{' | '}</span>
                    <span className="font-semibold text-red-500 hover:cursor-pointer">Delete</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Product;
