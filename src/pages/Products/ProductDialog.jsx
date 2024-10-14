import { Button, Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import axiosInterface from '../../utils/axiosInterface';
import cartStore from '../../store/cartStore';
import { showToast } from '../../utils/customToast';
import { getErrorResponseMessage } from '../../utils/helper';

export default function ProductDialog({ open, handleClose, productSku }) {
  const { addToCart } = cartStore();
  const [product, setProduct] = useState({});

  const fetchProductDetail = useCallback(async () => {
    if (productSku) {
      try {
        const result = await axiosInterface.get('products/' + productSku);
        setProduct(result.data.data);
      } catch (error) {
        showToast('error', getErrorResponseMessage(error));
      }
    }
  }, [productSku]);

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast('success', `${product.title} has been added to cart`);
  };

  useEffect(() => {
    fetchProductDetail();
  }, [productSku, fetchProductDetail]);

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 p-5 ">
            <div className="bg-white px-4 pb-5 pt-5 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <div className="mt-2 grid grid-cols-2">
                  <div className="img">
                    <img src={product.image} alt="product img" />
                  </div>
                  <div className="info-section">
                    <div className="font-bold text-lg mb-2">{product.title}</div>
                    <div className="font-semibold mb-2">$ {product.price}</div>
                    <div className="text-sm mb-2">Stock: {product.stock}</div>
                    <p className="text-sm ">{product.description}</p>
                    <div className="action mt-4">
                      <Button
                        className="c-btn c-btn-primary"
                        onClick={() => handleAddToCart(product)}>
                        Add to cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => handleClose(false)}
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">
                Save
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => handleClose(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                Cancel
              </button>
            </div> */}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

ProductDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  productSku: PropTypes.any
};
