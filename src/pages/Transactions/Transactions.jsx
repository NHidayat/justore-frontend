import React, { useEffect, useState, useCallback } from 'react';
import axiosInterface from '../../utils/axiosInterface';
import { showToast } from '../../utils/customToast';
import { formatDate, formatDecimal, getErrorResponseMessage } from '../../utils/helper';
import TransactionDetail from './TransactionDetail';
import CustomPagination from '../../components/CustomPagination';
import ConfirmDialog from '../../components/ConfirmDialog';

const Transactions = () => {
  const [transactionsList, setTransactionsList] = useState([]);
  const [pageInfo, setPageInfo] = useState({ page: 1, totalData: 0, totalPage: 0 });
  const [transactionDetail, setTransactionDetail] = useState({ open: false, transactionId: null });
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    message: '',
    transactionId: ''
  });

  const fetchTransactions = useCallback(async () => {
    try {
      const { data } = await axiosInterface.get('transactions', {
        params: { page: pageInfo.page, limit: 10 }
      });
      setTransactionsList(data.data.data);
      setPageInfo(data.data.pageInfo);
    } catch (error) {
      showToast('error', getErrorResponseMessage(error));
    }
  }, [pageInfo.page]);

  const deleteTransaction = useCallback(
    async (trxId) => {
      try {
        await axiosInterface.delete(`transactions/${trxId}`);
        showToast('success', 'Success delete transaction');
        setConfirmDialog((prev) => ({ ...prev, open: false }));
        fetchTransactions();
      } catch (error) {
        showToast('error', getErrorResponseMessage(error));
      }
    },
    [fetchTransactions]
  );

  const handleTransactionDetailToggle = (transactionId) => {
    setTransactionDetail((prev) => ({
      open: !prev.open,
      transactionId
    }));
  };

  const handleConfirmDelete = () => {
    deleteTransaction(confirmDialog.transactionId);
  };

  const handlePageChange = (page) => setPageInfo((prev) => ({ ...prev, page }));

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <>
      <ConfirmDialog
        title={confirmDialog.title}
        message={confirmDialog.message}
        open={confirmDialog.open}
        handleOpen={() => setConfirmDialog((prev) => ({ ...prev, open: !prev.open }))}
        onConfirm={handleConfirmDelete}
      />
      <div className="content-title">Your Transactions</div>
      <div className="content-body">
        <TransactionDetail
          open={transactionDetail.open}
          handleClose={handleTransactionDetailToggle}
          transactionId={transactionDetail.transactionId}
        />
        <div className="transaction-list">
          {transactionsList.map((transaction, i) => (
            <div className="transaction-item box mb-2" key={i}>
              <div className="box-content">
                <div className="box-header text-right text-gray-500 text-sm">
                  {formatDate(transaction.date_created)}
                </div>
                <div className="box-title font-semibold text-lg">{transaction.transaction_id}</div>
                <div className="box-body text-gray-700 flex justify-between flex-col md:flex-row">
                  <div className="transaction-info">
                    <div className="font-semibold">{transaction.receiver_name}</div>
                    <div className="text-sm">{transaction.receiver_phone}</div>
                    <div className="text-sm">{transaction.receiver_address}</div>
                  </div>
                  <div className="amount">
                    <div className="text-sm mb-2">Quantity: {transaction.qty}</div>
                    <div className="text-lg font-semibold">
                      $ {formatDecimal(transaction.total_amount)}
                    </div>
                  </div>
                </div>
                <div className="box-footer text-right">
                  <span
                    className="text-red-500 hover:cursor-pointer font-semibold text-sm"
                    onClick={() =>
                      setConfirmDialog({
                        open: true,
                        title: 'Delete Transaction',
                        message: `Are you sure you want to delete transaction ${transaction.transaction_id}?`,
                        transactionId: transaction.transaction_id
                      })
                    }>
                    Delete
                  </span>
                  <span className="text-gray-300">{' | '}</span>
                  <span
                    className="text-blue-500 hover:cursor-pointer font-semibold text-sm"
                    onClick={() => handleTransactionDetailToggle(transaction.transaction_id)}>
                    Show transaction detail
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="page-info my-5">
          <div className="text-sm">Total Data: {pageInfo.totalData}</div>
          <CustomPagination
            currentPage={pageInfo.page}
            totalPages={pageInfo.totalPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

Transactions.propTypes = {};

export default Transactions;
