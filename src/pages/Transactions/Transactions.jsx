import React, { useEffect, useState } from 'react';
import axiosInterface from '../../utils/axiosInterface';
import { showToast } from '../../utils/customToast';
import { formatDate, formatDecimal, getErrorResponseMessage } from '../../utils/helper';
import TransactionDetail from './TransactionDetail';

const Transactions = () => {
  const [transactionsList, setTransactionsList] = useState([]);
  const [transactionDetail, setTransactionDetail] = useState({
    open: false,
    transactionId: null
  });

  const handleTransactionDetail = (transactionId) => {
    setTransactionDetail({
      open: !transactionDetail.open,
      transactionId
    });
  };

  const fetchTransactions = async () => {
    try {
      const params = {
        page: 1,
        limit: 8
      };
      const { data } = await axiosInterface.get('transactions', { params });
      setTransactionsList(data.data.data);
    } catch (error) {
      showToast('error', getErrorResponseMessage(error));
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <>
      <div className="content-title">Your Transactions</div>
      <div className="content-body">
        <TransactionDetail
          open={transactionDetail.open}
          handleClose={handleTransactionDetail}
          transactionId={transactionDetail.transactionId}
        />
        <div className="trnsaction-list">
          {transactionsList?.map((o, i) => (
            <div className="transaction-item box mb-2" key={i}>
              <div className="box-content">
                <div className="box-header text-right text-gray-500 text-sm">
                  {formatDate(o.date_created)}
                </div>
                <div className="box-title font-semibold text-lg">{o.transaction_id}</div>
                <div className="box-body text-gray-700 flex justify-between flex-col md:flex-row">
                  <div className="tranaction-info">
                    <div className="font-semibold">{o.receiver_name}</div>
                    <div className="text-sm">{o.receiver_phone}</div>
                    <div className="text-sm">{o.receiver_address}</div>
                  </div>
                  <div className="amount">
                    <div className="text-sm mb-2">Quantity: {o.qty}</div>
                    <div className="text-lg font-semibold">$ {formatDecimal(o.total_amount)}</div>
                  </div>
                </div>
                <div className="box-footer text-right">
                  <span
                    className="text-blue-500 hover:cursor-pointer font-semibold text-sm"
                    onClick={() => handleTransactionDetail(o.transaction_id)}>
                    Show transaction detail
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

Transactions.propTypes = {};

export default Transactions;
