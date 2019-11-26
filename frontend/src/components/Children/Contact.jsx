import React from 'react';

import { CollectionItem, Icon } from 'react-materialize';


const Contact = (props) => {
    const { contact } = props;
    return (
        <CollectionItem className="avatar">
            <Icon className="circle">
                account_circle
</Icon>
            <span className="title">
                {contact.name}
            </span>
            <p>
                {contact.phone}
            </p>
        </CollectionItem>
    )
}


export default Contact;