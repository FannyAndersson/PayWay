import React, { useState, useEffect, useContext } from "react";
import Transaction from "./Transaction";
import { UserContext } from '../../AuthUserContext';
import { Tabs, Tab } from 'react-materialize';


const TransactionPage = () => {
    const [data, setData] = useState([]);

    const { user } = useContext(UserContext);

    useEffect(() => {

        let mounted = true;

        const getTransaction = async () => {

            try {
                const userID = user._id;
                let key = "/api/users/";
                let url = key + userID + "/transactions";
                const result = await fetch(url);
                const jsonData = await result.json();
                const allTransactions = [...jsonData.incomingTransactions, ...jsonData.outgoingTransactions].sort((a, b) => {
                    return a.date > b.date ? -1 : 1
                });
                if (mounted) {
                    setData([...allTransactions
                    ]);
                }

            } catch (error) {
                console.error('Error:', error);
            }
        }

        getTransaction();

        return () => {
            mounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const incomingTransactions = data ? data.filter(transaction => transaction.recipient === user._id)
                                .map(transaction => {
                                return (
                                    <Transaction
                                        className={"incoming"} 
                                        contact={transaction.sender.name} 
                                        transaction={transaction} 
                                        key={transaction._id} 
                                    />
                                )}) : null;

    const outgoingTransactions = data ? data.filter(transaction => transaction.recipient !== user._id)
                                .map(transaction => {
                                return (
                                <Transaction 
                                    className={"outgoing"} 
                                    contact={transaction.recipient.name} 
                                    transaction={transaction} 
                                    key={transaction._id} 
                                />
                                )}) : null;

    return data.length !== 0 ? (
        <React.Fragment>
            <Tabs className="tab-demo z-depth-1">
                <Tab title="All" active>
                    {data.map(transaction => {
                        if (transaction.recipient === user._id) {
                            return (
                                <Transaction className={"incoming"} contact={transaction.sender.name} transaction={transaction} key={transaction._id} />
                            )
                        } else {
                            return (<Transaction className={"outgoing"} contact={transaction.recipient.name} transaction={transaction} key={transaction._id} />)
                        }
                    })}
                </Tab>
                <Tab title="Incoming" > 
                    {incomingTransactions.length ? incomingTransactions : (<p>You have no incoming transactions.</p>)}
                </Tab>
                <Tab title="Outgoing">
                    {outgoingTransactions.length ? outgoingTransactions : (<p>You have no outgoing transactions.</p>)}
                </Tab>
            </Tabs>
        </React.Fragment>
    ) : (
        <p>{`You don't have any transactions yet`}</p>
        )
}

export default TransactionPage;



