import { create } from 'zustand';
import axiosInterface from '../utils/axiosInterface';

const cartStore = create((set, get) => ({
  cart: [],

  fetchProducts: async () => {
    try {
      const response = await axiosInterface.get('products', {
        data: {
          page: 1,
          limit: 8
        }
      });
      set({ products: response.data });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },

  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find((item) => item.sku === product.sku);
      if (existingProduct) {
        return {
          cart: state.cart.map((item) => {
            const quantity = item.quantity + 1;
            return item.sku === product.sku
              ? { ...item, quantity, amount: quantity * product.price }
              : item;
          })
        };
      } else {
        return { cart: [...state.cart, { ...product, quantity: 1, amount: 1 * product.price }] };
      }
    }),

  getProductCart: (productSku) => {
    const cart = get().cart;
    const product = cart.find((item) => item.sku === productSku);
    return product;
  },

  reduceQuantity: (productSku) =>
    set((state) => {
      const existingProduct = state.cart.find((item) => item.sku === productSku);
      if (existingProduct && existingProduct.quantity > 1) {
        return {
          cart: state.cart.map((item) => {
            const quantity = item.quantity - 1;
            return item.sku === productSku
              ? { ...item, quantity, amount: quantity * existingProduct.price }
              : item;
          })
        };
      } else {
        return { cart: state.cart.filter((item) => item.sku !== productSku) };
      }
    }),

  clearCart: () => set({ cart: [] }),

  totalQuantity: () => {
    const cart = get().cart;
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  totalAmount: () => {
    const cart = get().cart;
    return cart.reduce((total, item) => total + item.amount, 0);
  }
}));

export default cartStore;
