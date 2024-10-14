import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import PropTypes from 'prop-types';

const ConfirmDialog = ({ title, message, open, handleOpen, onConfirm }) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={() => handleOpen()}
        transition
        className="fixed text-center inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="min-w-96 space-y-4 border bg-white p-12 rounded-md">
            <DialogTitle className="font-bold">{title}</DialogTitle>
            <div className="my-5">{message}</div>
            <div>
              <button onClick={handleOpen} className="c-btn bg-red-500 text-white">
                Cancel
              </button>{' '}
              <button onClick={onConfirm} className="c-btn c-btn-primary">
                Cofirm
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

ConfirmDialog.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  open: PropTypes.bool,
  handleOpen: PropTypes.func,
  onConfirm: PropTypes.func
};

export default ConfirmDialog;
