import React, { useEffect, useState } from 'react';
import axiosInterface from '../../utils/axiosInterface';
import { showToast } from '../../utils/customToast';
import { formatDecimal, getErrorResponseMessage } from '../../utils/helper';
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
        <div className="trnsaction-list grid grid-cols-2 gap-2">
          {transactionsList.map((o, i) => (
            <div
              className="transaction-item box mb-2 hover:cursor-pointer"
              key={i}
              onClick={() => handleTransactionDetail(o.transaction_id)}>
              <div className="box-content">
                <div className="box-title font-semibold text-blue-500 text-lg">
                  {o.transaction_id}
                </div>
                <div className="box-body text-gray-700">
                  <div className="text-lg font-semibold">$ {formatDecimal(o.total_amount)}</div>
                  <div className="text-sm mb-2">Quantity: {o.qty}</div>
                  <div className="font-semibold">{o.receiver_name}</div>
                  <div className="text-sm">{o.receiver_phone}</div>
                  <div className="text-sm">{o.receiver_address}</div>
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
