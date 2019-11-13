import React from "react";
import Transaction from "./Transaction";

const TransactionPage = () => {
  return (
    <div className="transactions">
      <h1>Transactions</h1>
      <p>All, incoming and outgoing</p>
      <Transaction />
    </div>
  );
};

export default TransactionPage;
