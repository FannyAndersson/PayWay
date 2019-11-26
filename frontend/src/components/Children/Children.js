import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../AuthUserContext';
import { Tabs, Tab, Collection } from 'react-materialize';
import Contact from './Contact';

import { Link, } from 'react-router-dom';

const Children = () => {
    const [children, setChildren] = useState({});
    const { user } = useContext(UserContext);

    useEffect(() => {
        let mounted = true;
        const getChildren = async () => {
            try {
                const userID = user._id;
                let key = "/api/users/";
                let url = key + userID + "/children";
                const data = await fetch(url);
                const result = await data.json();
                const allChildren = result ? {confirmed: result[0], pending: result[1]} : null;
                if (mounted) {
                    setChildren({...allChildren});
                }

            } catch (error) {
                console.error(error);
            }
        }

        getChildren();

        return () => {
            mounted = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let confirmedChildren = [];
    let pendingChildren = [];

    if(Object.keys(children).length) {
        confirmedChildren = children.confirmed ? children.confirmed.map(child => {
            return (
                <Link to={`/profile/children/transactions/${child._id}`} key={child._id + 1}> <Contact key={child._id} contact={child} /></Link>
            )
        }) : null;

        pendingChildren = children.pending ? children.pending.map(child => {
            return (
                <Link to={`/profile/children/transactions/${child._id}`} key={child._id + 1}> <Contact key={child._id} contact={child} /></Link>
    
            )
        }) : null;
    }

    return Object.keys(children).length ? 
         (

            <Tabs className="tab-demo z-depth-1">
                <Tab title="Confirmed" active>
                    <Collection >
                        {confirmedChildren ? confirmedChildren : (<p>You have no confirmed children</p>)}
                    </Collection>
                </Tab>

                <Tab title="Pending" >
                    <Collection >
                    {pendingChildren ? pendingChildren : (<p>You have no parent's requests.</p>)}
                    </Collection>
                </Tab>
            </Tabs>


        ) : (
            <p>{`Loading`}</p>
            )
}

export default Children;
