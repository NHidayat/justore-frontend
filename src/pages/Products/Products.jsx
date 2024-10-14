import React, { useEffect, useState, useCallback } from 'react';
import axiosInterface from '../../utils/axiosInterface';
import { showToast } from '../../utils/customToast';
import { formatDecimal, getErrorResponseMessage } from '../../utils/helper';
import ProductEdit from './ProductEdit';
import CustomPagination from '../../components/CustomPagination';
import ProductAdd from './ProductAdd';
import ConfirmDialog from '../../components/ConfirmDialog';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    totalData: 0,
    totalPage: 0
  });
  const [dialogs, setDialogs] = useState({
    productAdd: { open: false },
    productEdit: { open: false, productSku: null },
    productDelete: { open: false, message: '', productSku: '' }
  });

  const toggleDialog = (type, payload = {}) => {
    setDialogs((prev) => ({
      ...prev,
      [type]: { ...prev[type], ...payload }
    }));
  };

  const fetchProducts = useCallback(async () => {
    try {
      const params = { page: pageInfo.page, limit: 10 };
      const { data } = await axiosInterface.get('products', { params });
      setProducts(data.data.data);
      setPageInfo(data.data.pageInfo);
    } catch (error) {
      showToast('error', getErrorResponseMessage(error));
    }
  }, [pageInfo.page]);

  const deleteProduct = useCallback(
    async (productSku) => {
      try {
        await axiosInterface.delete(`products/${productSku}`);
        showToast('success', 'Success delete product');
        toggleDialog('productDelete', { open: false });
        fetchProducts();
      } catch (error) {
        showToast('error', getErrorResponseMessage(error));
      }
    },
    [fetchProducts]
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handlePageChange = (page) => setPageInfo((prev) => ({ ...prev, page }));

  const onDialogSuccess = () => fetchProducts();

  return (
    <div className="content">
      <ConfirmDialog
        title="Delete Product"
        message={dialogs.productDelete.message}
        open={dialogs.productDelete.open}
        handleOpen={() => toggleDialog('productDelete', { open: !dialogs.productDelete.open })}
        onConfirm={() => deleteProduct(dialogs.productDelete.productSku)}
      />
      <ProductEdit
        productSku={dialogs.productEdit.productSku}
        open={dialogs.productEdit.open}
        handleOpen={() => toggleDialog('productEdit', { open: !dialogs.productEdit.open })}
        onProcessSuccess={onDialogSuccess}
      />
      <ProductAdd
        open={dialogs.productAdd.open}
        handleOpen={() => toggleDialog('productAdd', { open: !dialogs.productAdd.open })}
        onProcessSuccess={onDialogSuccess}
      />
      <div className="content-title">Products List</div>
      <div className="content-body mt-5">
        <div className="action mb-5 text-right">
          <button
            className="c-btn c-btn-primary"
            onClick={() => toggleDialog('productAdd', { open: true })}>
            Add New Product
          </button>
        </div>
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
              {products.map((product, i) => (
                <tr className="border-b" key={i}>
                  <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                    {product.title}
                  </th>
                  <td className="px-6 py-4">{formatDecimal(product.price)}</td>
                  <td className="px-6 py-4">{product.sku}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span
                      className="font-semibold text-blue-500 cursor-pointer"
                      onClick={() =>
                        toggleDialog('productEdit', { open: true, productSku: product.sku })
                      }>
                      Edit
                    </span>
                    <span className="text-gray-400"> | </span>
                    <span
                      className="font-semibold text-red-500 cursor-pointer"
                      onClick={() =>
                        toggleDialog('productDelete', {
                          open: true,
                          message: `Are you sure you want to delete ${product.title}?`,
                          productSku: product.sku
                        })
                      }>
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-sm">Total Data: {pageInfo.totalData}</div>
        <CustomPagination
          totalPages={pageInfo.totalPage}
          currentPage={pageInfo.page}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Product;
