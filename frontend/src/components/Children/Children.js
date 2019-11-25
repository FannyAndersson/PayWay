import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../AuthUserContext';
import { Tabs, Tab, Collection } from 'react-materialize';
import Contact from './Contact';

import { Link, } from 'react-router-dom';

const Children = () => {
    const [children, setChildren] = useState([]);
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
                if (mounted) {
                    setChildren({ ...result });
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
    }, [])



    if (children[0] === undefined) return <div>Loading...</div>

    if (children[1] === undefined) return <div>Loading...</div>

    else {
        return (

            <Tabs className="tab-demo z-depth-1">
                <Tab title="Confirmed" active>
                    <Collection >
                        {children[0].map(child => {
                            return (
                                <Link to={`/profile/children/transactions/${child._id}`} key={child._id + 1}> <Contact key={child._id} contact={child} /></Link>

                            )
                        })}
                    </Collection>
                </Tab>

                <Tab title="Pending" >
                    <Collection >
                        {children[1].map(child => {
                            return (
                                <Contact key={child._id} contact={child} />
                            )
                        })}
                    </Collection>
                </Tab>
            </Tabs>


        )
    }
}

export default Children;
