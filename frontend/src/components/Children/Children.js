import React, { useState, useContext } from 'react'
import { UserContext } from '../../AuthUserContext'
import { Tabs, Tab } from 'react-materialize'

const Children = () => {
    const [children, setChildren] = useState([])
    const { user } = useContext(UserContext)
    console.log(user, 'this user')

    return (

        <Tabs className="tab-demo z-depth-1">
            <Tab title="Confirmed" active>
                <p>confirmed</p>
            </Tab>

            <Tab title="Pending" >
                <p>pending</p>

            </Tab>
        </Tabs>


    )
}

export default Children;
