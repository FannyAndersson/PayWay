import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../AuthUserContext'
import { Tabs, Tab } from 'react-materialize'

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
                console.log(result, "children");
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

    console.log(children[1], "data");
    if (children[1] === undefined) return <div>no</div>
    else {
        return (

            <Tabs className="tab-demo z-depth-1">
                <Tab title="Confirmed" active>
                    <p>confirmed</p>
                </Tab>

                <Tab title="Pending" >
                    <p>pending</p>
                    <ul>
                        {children[1].map(child => {
                            return (
                                <li key={child._id}>{child.name}</li>
                            )
                        })}
                    </ul>
                </Tab>
            </Tabs>


        )
    }
}

export default Children;
