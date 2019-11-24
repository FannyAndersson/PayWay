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

    useEffect(() => {

        let mounted = true;

        const getTransaction = async () => {

            try {
                const childID = _id;
                let key = "/api/child-transactions/";
                let url = key + childID;
                const result = await fetch(url);
                const jsonData = await result.json();
                const allTransactions = [...jsonData.incomingTransactions, ...jsonData.outgoingTransactions].sort((a, b) => {
                    return a.date > b.date ? -1 : 1
                });
                if (mounted) {
                    setData([...allTransactions
                    ]);
                    setName(jsonData.childName);
                    setPhone(jsonData.childPhone)
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
                    {data.filter(transaction => transaction.recipient === id)
                        .map(transaction => {
                            return (
                                <Transaction className={"incoming"} contact={transaction.sender.name} transaction={transaction} key={transaction._id} />
                            )
                        })
                    }
                </Tab>
                <Tab title="Outgoing">
                    {data.filter(transaction => transaction.recipient !== id)
                        .map(transaction => {
                            return (
                                <Transaction className={"outgoing"} contact={transaction.recipient.name} transaction={transaction} key={transaction._id} />
                            )
                        })
                    }
                </Tab>
            </Tabs>
        </React.Fragment>
    ) : (<React.Fragment>
        <h4>{name}</h4>
        <h5>{phone}</h5>
        <Tabs>
            <Tab title={`${name} doesn't have any transactions yet`} active> </Tab>
        </Tabs >
    </React.Fragment>
        )
}

export default ChildrenTransactions;