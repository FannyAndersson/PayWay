import React from 'react';

import { CollectionItem, Icon } from 'react-materialize';


const Contact = (props) => {
    const { favorite } = props;
    return (
        <CollectionItem className="avatar">
            <Icon className="circle">
                account_circle
</Icon>
            <span className="title">
                {favorite.name}
            </span>
            <p>
                {favorite.phone}
            </p>
        </CollectionItem>
    )
}


export default Contact;