import React, { useState, useCallback } from 'react';
import FormInput from '../../components/FormInput';
import cartStore from '../../store/cartStore';
import { formatDecimal, getErrorResponseMessage } from '../../utils/helper';
import { BarLoader } from 'react-spinners';
import { showToast } from '../../utils/customToast';
import axiosInterface from '../../utils/axiosInterface';
import { useNavigate } from 'react-router-dom';

const inputs = [
  {
    id: 1,
    name: 'receiver_name',
    type: 'text',
    placeholder: 'Receiver Name',
    label: 'Receiver Name',
    required: true
  },
  {
    id: 2,
    name: 'receiver_phone',
    type: 'number',
    placeholder: 'Receiver Phone',
    label: 'Receiver Phone',
    required: true
  },
  {
    id: 3,
    name: 'receiver_address',
    type: 'text',
    placeholder: 'Receiver Address',
    label: 'Receiver Address',
    required: true
  }
];

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, totalAmount, clearCart } = cartStore(); // Single destructuring untuk store
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    receiver_name: '',
    receiver_phone: '',
    receiver_address: ''
  });

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const payload = {
          ...values,
          items: cart.map((o) => ({
            sku: o.sku,
            qty: o.quantity
          }))
        };
        await axiosInterface.post('transactions', payload);
        clearCart();
        showToast('success', 'Your transaction is successfully');
        navigate('/transactions');
      } catch (error) {
        showToast('error', getErrorResponseMessage(error));
      } finally {
        setLoading(false);
      }
    },
    [cart, values, clearCart, navigate]
  );

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  }, []);

  return (
    <>
      <div className="content-title">Checkout</div>
      <div className="content-body">
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
            ))}
            <button
              className="c-btn c-btn-primary c-btn-big w-full mt-4 disabled:bg-blue-400"
              disabled={loading}>
              PROCESS ($ {formatDecimal(totalAmount())})
            </button>
            {loading && (
              <div className="loader mt-4">
                <BarLoader width="100%" color="blue" />
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
