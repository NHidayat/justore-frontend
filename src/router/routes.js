import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/Checkout/Checkout';
import Home from '../pages/Home/Home';
import Transactions from '../pages/Transactions/Transactions';

const routes = [
  { path: '/', name: 'Product', element: <Home /> },
  { path: '/cart', name: 'Cart', element: <Cart /> },
  { path: '/checkout', name: 'Checkout', element: <Checkout /> },
  { path: '/Transactions', name: 'Transactions', element: <Transactions /> }
];

export default routes;
