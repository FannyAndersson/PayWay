import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../AuthUserContext";
import { Row, Col } from 'react-materialize';

//ContextKeeper is a holder of UserContext. It checks if there is session (authenticated user)
//and saves it as user to UserContext
//All components are located inside of ContextKeeper and consume to UserContext
const ContextKeeper = props => {
    const { keepAuthUser } = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(true);

    const checkLogin = async () => {

        try {

            const response = await fetch('/api/login').catch(err => console.error(err, 'Error'));
            const result = { user: await response.json(), status: response.status };
            if (result.user) {
                keepAuthUser(result.user);
            }

            setIsLoading(false);

        } catch (e) {

            setIsLoading(false);

        }


    }

    useEffect(() => {
        checkLogin();
    }, []);

    if (isLoading) {

        return (
            <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Row>
                <Col s={12} m={6} l={3} offset='l4 m3'>
                    {props.children}
                </Col>
            </Row>
        </div>
    );
};

export default ContextKeeper;
