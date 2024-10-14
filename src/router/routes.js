import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/Checkout/Checkout';
import Home from '../pages/Home/Home';
import Products from '../pages/Products/Products';
import Transactions from '../pages/Transactions/Transactions';

const routes = [
  { path: '/', name: 'Product', element: <Home /> },
  { path: '/cart', name: 'Cart', element: <Cart /> },
  { path: '/checkout', name: 'Checkout', element: <Checkout /> },
  { path: '/transactions', name: 'Transactions', element: <Transactions /> },
  { path: '/products', name: 'Products', element: <Products /> }
];

export default routes;
