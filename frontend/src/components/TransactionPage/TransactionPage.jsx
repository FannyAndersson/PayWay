import React from "react";
import Transaction from "./Transaction";

const TransactionPage = () => {
  return (
    <div className="container">
      <h1>Transactions</h1>
      <p>All, incoming and outgoing</p>
      <button>All</button>
      <button>Incoming</button>
      <button>Outgoing</button>

      <Transaction />
    </div>
  );
};

export default TransactionPage;
