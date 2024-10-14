import { Button } from '@headlessui/react';
import PropTypes from 'prop-types';
import React from 'react';
import cartStore from '../../store/cartStore';
import { showToast } from '../../utils/customToast';

const ProductCard = ({ info, handleClick }) => {
  const { addToCart } = cartStore();

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast('success', product.title + ' has been added to cart 😁');
  };
  return (
    <div className="max-w-sm box">
      <div className="cover-section hover:cursor-pointer">
        <img
          className="w-full h-48 object-cover"
          src={info.image}
          alt="Sunset in the mountains"
          onClick={() => handleClick(info.sku)}
        />
      </div>
      <div className="px-6 py-4">
        <div className="text-md mb-1">{info.title}</div>
        <p className="text-gray-700 text-base font-semibold mb-3">$ {info.price}</p>
        <div className="button-section">
          <Button className="c-btn c-btn-full c-btn-primary" onClick={() => handleAddToCart(info)}>
            Add to Card
          </Button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  info: PropTypes.object,
  handleClick: PropTypes.func
};

export default ProductCard;
