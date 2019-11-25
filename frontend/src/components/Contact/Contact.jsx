import React from 'react';

import { CollectionItem, Icon } from 'react-materialize';


const Contact = (props) => {
    const { favorite } = props;
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

                <button className="btn-contact-delete" onClick={() => props.deleteFavorite(favorite._id)}> <Icon> delete</Icon></button>

            </span>
        </CollectionItem>
    )
}


export default Contact;