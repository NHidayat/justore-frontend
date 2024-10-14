import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import axiosInterface from '../../utils/axiosInterface';
import { showToast } from '../../utils/customToast';
import { formatDate, formatDecimal, getErrorResponseMessage } from '../../utils/helper';

export default function TransactionDetail({ open, handleClose, transactionId }) {
  const [transaction, setTransaction] = useState({});

  const fetchTransactionDetail = useCallback(async () => {
    if (transactionId) {
      try {
        const result = await axiosInterface.get('transactions/' + transactionId);
        setTransaction(result.data.data);
      } catch (error) {
        showToast('error', getErrorResponseMessage(error));
      }
    }
  }, [transactionId]);

  useEffect(() => {
    fetchTransactionDetail();
  }, [transactionId, fetchTransactionDetail]);

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-2xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <div className="header">
                  <div className="text-sm text-gray-500">
                    {formatDate(transaction.date_created)}
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 mb-10">
                  <div className="info-section">
                    <div className="font-bold text-lg mb-2">{transaction.transaction_id}</div>
                    <div className="text-lg font-semibold mb-4">
                      $ {formatDecimal(transaction.total_amount)}
                    </div>
                    <div className="font-semibold">{transaction.receiver_name}</div>
                    <div className="text-sm">{transaction.receiver_phone}</div>
                    <div className="text-sm">{transaction.receiver_address}</div>
                  </div>
                  <div className="items-sections border-s pl-5">
                    <div className="title font-semibold mb-2">Items</div>
                    {transaction?.items?.map((item, i) => (
                      <div className="item text-sm mb-4" key={i}>
                        <div className="title">
                          {item.title} x {item.qty}
                        </div>
                        <div className="amount">${item.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

TransactionDetail.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  transactionId: PropTypes.any
};
