import React, {useState, useContext} from 'react'
import {UserContext} from '../../AuthUserContext'
import {Tabs, Tab} from 'react-materialize'


const ViewChildren = () => {
    // eslint-disable-next-line
    const [childrenData, setChildrenData] = useState([])
    const {user} = useContext(UserContext)
    console.log(user.children.pending, 'this user')
            
    const getAllChildren = async ()=>{
                try{




                }catch(error){
                    console.log(error)
                }
            }




    return (
        <>
        <Tabs className="tab-demo z-depth-1">
        <Tab title="Confirmed" active>
        <h5>My Confirmed Children</h5>
        </Tab>

        <Tab title="Pending">
        <h5>Pending AKA the "Ungrateful Ones"</h5>
        </Tab>
        </Tabs> 
        </>
    )
}

export default ViewChildren;
