import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Router from './router/router';

function App() {
  return (
    <>
      <ToastContainer />
      <Router />
    </>
  );
}

export default App;
