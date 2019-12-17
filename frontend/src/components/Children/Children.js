import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../AuthUserContext';
import { Tabs, Tab, Collection } from 'react-materialize';
import Contact from './Contact';

import { Link, } from 'react-router-dom';

const Children = () => {
    const [children, setChildren] = useState({});
    const { user } = useContext(UserContext);
    const [text, setText] = useState('');


    const createChildrenList =(data, mounted) => {
        const allChildren = data ? {confirmed: data[0], pending: data[1]} : null;
        if (mounted) {
            setChildren({...allChildren});
        }
    }

    useEffect(() => {
        let mounted = true;
        const userID = user._id;
        let key = "/api/users/";
        let url = key + userID + "/children";
        const getChildren = async () => {
            try {
                
                const result = await fetch(url);
                const data = await result.json();
                if(data) {
                    createChildrenList(data, mounted);
                }

            } catch (error) {
                console.error(error);
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
                                createChildrenList(data, mounted);
                            }
                        })
                }
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
            <p>{text ? text : `Loading`}</p>
            )
}

export default Children;
