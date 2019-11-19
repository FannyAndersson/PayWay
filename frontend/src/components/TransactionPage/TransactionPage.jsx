import React, { useState, useEffect } from "react";
import Transaction from "./Transaction";
import { Tabs, Tab } from 'react-materialize';

const TransactionPage = () => {
    const [data, setData] = useState([]);


    useEffect(() => {

        const getTransaction = async () => {
            try {
                const userID = "5dcea6d8a51e1b38d0c53e45";
                let key = "/api/users/";
                let url = key + userID + "/transactions"
                const result = await fetch(url)
                const jsonData = await result.json();
                console.log(jsonData);
                setData([jsonData])
                console.log(data, "data");

            } catch (error) {
                console.error('Error:', error);
            }
        }
        getTransaction();

    }, [])

    console.log(data, "data");

    return (
        <React.Fragment>
            <div className="container">
                <h1>Transactions</h1>
                <p>All, incoming and outgoing</p>
                <button >All</button>
                <button>Incoming</button>
                <button>Outgoing</button>


            </div>


            <Tabs className="tab-demo z-depth-1">
                <Tab title="All">
                    All transactions

                </Tab>
                <Tab title="Incoming" active>
                    Incoming
</Tab>
                <Tab title="Outgoing">
                    Outgoing
</Tab>
            </Tabs>
        </React.Fragment>
    );
}

export default TransactionPage;



