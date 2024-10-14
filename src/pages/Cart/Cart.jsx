import React from 'react';
import cartStore from '../../store/cartStore';
import { Button } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { formatDecimal } from '../../utils/helper';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, getProductCart, addToCart, reduceQuantity, totalQuantity, totalAmount } =
    cartStore();

  return (
    <div className="content">
      <div className="content-title text-xl font-bold text-gray-700 mb-4">Your Cart</div>
      <div className="content-body">
        <div className="grid grid-cols-12 gap-6">
          <div className="cart col-span-7">
            <div className="cart-list text-gray-700">
              {cart.map((o, i) => (
                <div className="cart-item box grid  grid-cols-12 gap-2 mb-2" key={i}>
                  <div className="col-span-2 box-content">
                    <img src={o.image} alt="product" className="w-20 h-20 object-cover" />
                  </div>
                  <div className="col-span-10 box-content">
                    <div className="item-info flex justify-between mb-4">
                      <div className="item-title text-base">{o.title}</div>
                      <div className="item-price font-semibold text-lg">$ {o.amount}</div>
                    </div>
                    <div className="item-counter flex justify-end align-middle">
                      <button className="c-btn-counter" onClick={() => reduceQuantity(o.sku)}>
                        -
                      </button>
                      <span className="mx-4">{getProductCart(o.sku).quantity}</span>
                      <button className="c-btn-counter" onClick={() => addToCart(o)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="summary box col-span-5 p-5 max-h-fit text-gray-700">
            <div className="summary-header font-semibold mb-4">Shopping Summary</div>
            <div className="summary-body mb-4 flex justify-between align-bottom">
              <span>Total</span>
              <span className="font-bold text-lg">$ {formatDecimal(totalAmount())}</span>
            </div>
            <div className="summary-footer">
              <Button
                className="c-btn c-btn-primary c-btn-full"
                onClick={() => navigate('/checkout')}>
                Checkout ({totalQuantity()})
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
