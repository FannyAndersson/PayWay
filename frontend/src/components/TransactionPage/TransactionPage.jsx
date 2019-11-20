import React, { useState, useEffect, useContext } from "react";
import Transaction from "./Transaction";
import { UserContext } from '../../AuthUserContext';
import { Tabs, Tab } from 'react-materialize';
import { Row, Col, TextInput, Button } from 'react-materialize';


const TransactionPage = () => {
    const [data, setData] = useState([]);
    const { user } = useContext(UserContext);
    const userID = user._id;

    console.log(user, "context");

    // console.log(userID, "id");

    useEffect(() => {

        const getTransaction = async () => {
            try {

                // const userID = "5dcea6d8a51e1b38d0c53e45";
                let key = "/api/users/";
                let url = key + userID + "/transactions"
                console.log(url, "URL");
                const result = await fetch(url)
                const jsonData = await result.json();
                console.log(jsonData);
                setData(jsonData)

            } catch (error) {
                console.error('Error:', error);
            }
        }
        getTransaction();

    }, [])

    console.log(data, "data");
    const { incomingTransactions, outgoingTransactions, message } = data;
    console.log(incomingTransactions, "incomigns");
    console.log(outgoingTransactions, "out");

    return data.length !== 0 ? (
        <React.Fragment>
            <Tabs className="tab-demo z-depth-1">
                <Tab title="All" active>

                </Tab>
                <Tab title="Incoming" >
                    Incoming
                    {incomingTransactions.map(transaction => {
                        return (
                            <Transaction className={"transaction"} contact={transaction.sender.name} transaction={transaction} key={transaction._id} />
                        )
                    })}
                </Tab>
                <Tab title="Outgoing">
                    Outgoing
                    {outgoingTransactions.map(transaction => {
                        return (
                            <Transaction className={"transaction"} contact={transaction.recipient.name} transaction={transaction} key={transaction._id} />
                        )
                    })}
                </Tab>
            </Tabs>
        </React.Fragment>
    ) : (<div>No</div>)
}

export default TransactionPage;



