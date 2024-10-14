import { Slide, toast } from 'react-toastify';

export const showToast = (type, message) => {
  toast(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    type: type,
    transition: Slide
  });
};
