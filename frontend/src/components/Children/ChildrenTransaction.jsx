import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-materialize';
import Transaction from '../TransactionPage/Transaction';



const ChildrenTransactions = (props) => {
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const { match } = props;
    const { params: { _id } } = match
    const id = _id;
    const [text, setText] = useState('');


    const createChildTransactionsList = (data, mounted) => {
        const allTransactions = [...data.incomingTransactions, ...data.outgoingTransactions].sort((a, b) => {
            return a.date > b.date ? -1 : 1
        });
        if (mounted) {
            setData([...allTransactions
            ]);
            setName(data.childName);
            setPhone(data.childPhone)
        }
    }

    useEffect(() => {

        let mounted = true;

        const getTransaction = async () => {
            const childID = _id;
            let key = "/api/child-transactions/";
            let url = key + childID;
            try {
                
                const result = await fetch(url);
                const jsonData = await result.json();
                if(jsonData) {
                    createChildTransactionsList(jsonData, mounted);
                }                

            } catch (error) {
                console.error('Error:', error);
                if('caches' in window) {
                    console.log('Perhaps I have some cache for you?');
                    caches.match(url)
                        .then(res => {
                            if(res) {
                                return res.json();
                            }
                            else {
                                console.log('Sorry, I have no cache for this case');
                                setText('You are offline. Data cannot be updated now.');
                            }
                        })
                        .then(data => {
                            if(data) {
                                console.log('Happy cache!');
                                createChildTransactionsList(data, mounted);
                            }
                        })
                }
            }
        }

        getTransaction();

        return () => {
            mounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const incomingTransactions = data ? data.filter(transaction => transaction.recipient === id)
                                .map(transaction => {
                                return (
                                    <Transaction
                                        className={"incoming"} 
                                        contact={transaction.sender.name} 
                                        transaction={transaction} 
                                        key={transaction._id} 
                                    />
                                )}) : null;

    const outgoingTransactions = data ? data.filter(transaction => transaction.recipient !== id)
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
            <div className="child-transaction-info">
                <h4>{name}</h4>
                <h5>{phone}</h5>
            </div>
            <Tabs className="tab-demo z-depth-1">
                <Tab title="All" active>
                    {data.map(transaction => {
                        if (transaction.recipient === id) {
                            return (<Transaction className={"incoming"} contact={transaction.sender.name} transaction={transaction} key={transaction._id} />)
                        } else {
                            return (
                                <Transaction className={"outgoing"} contact={transaction.recipient.name} transaction={transaction} key={transaction._id} />
                            )
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
    ) : (<React.Fragment>
        <h4>{name}</h4>
        <h5>{phone}</h5>
        <p>{text ? text : `${name} doesn't have any transactions yet`}</p>
    </React.Fragment>
        )
}

export default ChildrenTransactions;