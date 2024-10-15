import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { BarLoader } from 'react-spinners';
import FormInput from '../../components/FormInput';
import axiosInterface from '../../utils/axiosInterface';
import { showToast } from '../../utils/customToast';
import { getErrorResponseMessage } from '../../utils/helper';

const ProductAdd = ({ open, handleOpen, onProcessSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    title: '',
    image: null,
    price: '',
    stock: '',
    description: ''
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onChangeImage = (e) => {
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('image', values.image);
      formData.append('price', values.price);
      formData.append('stock', values.stock);
      formData.append('description', values.description);

      await axiosInterface.post('products', formData);
      showToast('success', 'Success create new product!');
      handleOpen();
      onProcessSuccess();
    } catch (error) {
      showToast('error', getErrorResponseMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => handleOpen()}
        transition
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="min-w-96 space-y-4 border bg-white p-12 rounded-md">
            <DialogTitle className="font-bold">Add New Product</DialogTitle>
            <div>
              <form onSubmit={handleSubmit}>
                <FormInput
                  name={'title'}
                  label={'Product Title'}
                  placeholder={'Product Title'}
                  value={values.title}
                  onChange={onChange}
                  required
                />
                <FormInput
                  type={'file'}
                  name={'image'}
                  label={'Image'}
                  onChange={onChangeImage}
                  required
                />
                <FormInput
                  name={'price'}
                  label={'Price'}
                  placeholder={'Price'}
                  value={values.price}
                  onChange={onChange}
                  required
                />
                <FormInput
                  name={'stock'}
                  label={'Stock'}
                  placeholder={'Stock'}
                  value={values.stock}
                  onChange={onChange}
                  required
                />
                <label htmlFor="" className="block">
                  Description
                </label>
                <textarea
                  name="description"
                  value={values.description}
                  onChange={onChange}></textarea>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleOpen()}
                    className="c-btn bg-red-500 text-white"
                    type="reset">
                    Cancel
                  </button>
                  <button className="c-btn c-btn-primary" disabled={loading}>
                    Save
                  </button>
                </div>
                <div className="loader mt-4">
                  {loading && <BarLoader width={'100%'} color="blue" />}
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

ProductAdd.propTypes = {
  productSku: PropTypes.string,
  open: PropTypes.bool,
  handleOpen: PropTypes.func,
  onProcessSuccess: PropTypes.func
};

export default ProductAdd;
