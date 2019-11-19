import React from "react";

const Transaction = (props) => {

    console.log(props, "props");

    const { contact, className, transaction } = props;
    console.log(className, "class");
    console.log(transaction, "tr");

    return (
        <div className={className}>
            <p>{contact}</p>
            <p>{transaction.amount}</p>
        </div>
    );
};

export default Transaction;
