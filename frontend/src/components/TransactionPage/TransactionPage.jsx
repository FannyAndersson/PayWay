import React, { useState, useEffect } from "react";
import Transaction from "./Transaction";
import { Tabs, Tab } from 'react-materialize';

const TransactionPage = () => {
    const [data, setData] = useState({ transactions: [] });


    useEffect(() => {
        console.log(data, "state");

        const getTransaction = async () => {
            try {
                const userID = "5dcea6d8a51e1b38d0c53e45";
                let key = "/api/users/";
                let url = key + userID + "/transactions"
                const result = await fetch(url)

                const jsonData = await result.json();
                setData(jsonData);
                console.log(data, "state");
                console.log(jsonData, "data");
                console.log('SUCCESS: ', "dataaaa");
            } catch (error) {
                console.error('Error:', error);
            }
        }
        getTransaction();

    }, [])

    // const getTransaction = async () => {
    //     try {
    //         const userID = "5dcea6d8a51e1b38d0c53e45";
    //         let key = "/api/users/";
    //         let url = key + userID + "/transactions"
    //         const result = await fetch(url)
    //         //     method: 'GET',
    //         //     // body: JSON.stringify(userID),
    //         //     headers: {
    //         //         'Content-Type': 'application/json'
    //         //     }
    //         // });
    //         const jsonData = await result.json();
    //         setData(jsonData);
    //         console.log(data, "state");
    //         console.log(jsonData, "data");
    //         console.log('SUCCESS: ', "dataaaa");
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // }

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



