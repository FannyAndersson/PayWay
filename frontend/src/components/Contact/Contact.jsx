import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';

import { CollectionItem, Icon } from 'react-materialize';


const Contact = (props) => {
    const { favorite } = props;
    const [sendMeCash, setSendMeCash] = useState(false);

    const sendMeMoney = () => {
        setSendMeCash(true);
    }
    return (
        <CollectionItem className="avatar" style={{ minHeight: "65px" }}>
            <Icon className="circle">
                account_circle
</Icon>
            <span className="title">
                {favorite.name}
            </span>
            <p>
                {favorite.phone}
            </p>

            <span className="secondary-content">
                <button className="btn-contact-send-money" title={`Send money to ${favorite.name}`} onClick={sendMeMoney}> <Icon>send</Icon></button>
                <button className="btn-contact-delete" title={`Delete ${favorite.name} from favorites`} onClick={() => props.deleteFavorite(favorite._id)}> <Icon> delete</Icon></button>
                

            </span>

            {sendMeCash ? <Redirect to={{
                pathname: '/send-money',
                state: {recipientPhone: favorite.phone}
            }} /> : null}
        </CollectionItem>
    )
}


export default Contact;