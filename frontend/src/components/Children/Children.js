import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../AuthUserContext';
import { Tabs, Tab, Collection } from 'react-materialize';
import Contact from './Contact';

import { Link, } from 'react-router-dom';

const Children = () => {
    const [children, setChildren] = useState([]);
    const [loading, setLoading] =useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        let mounted = true;
        const getChildren = async () => {
            setLoading(true);
            try {
                const userID = user._id;
                let key = "/api/users/";
                let url = key + userID + "/children";
                const data = await fetch(url);
                const result = await data.json();

                if (mounted && result) {
                    setLoading(false);
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



    if (loading) return <div>Loading...</div>

    else {
        return (
            
            <Tabs className="tab-demo z-depth-1">
                <Tab title="Confirmed" active>
                {children.length && children[0].length ? 
                <Collection >
                        {children[0].map(child => {
                            return (
                                <Link to={`/profile/children/transactions/${child._id}`} key={child._id + 1}> <Contact key={child._id} contact={child} /></Link>

                            )
                        })}
                    </Collection> : <Link style={{marginTop: "20px", display: "block"}}  to="/profile/children/add-child" title="Add a contact to Children">Add a contact to Children</Link>
                }
                    
                </Tab>

                <Tab title="Pending" >
                    <Collection >
                        {children.length && children[1].length ? children[1].map(child => {
                            return (
                                <Contact key={child._id} contact={child} />
                            )
                        }) : null}
                    </Collection>
                </Tab>
            </Tabs>


        )
    }
}

export default Children;
