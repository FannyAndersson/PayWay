import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../AuthUserContext';

// private route component - step one, save component prop to Component variable, rest of props to 'rest' variable
const PrivateRoute = ({ component: Component, ...rest }) => {

    // get the currently logged in user from context
    const { user } = useContext(UserContext);

    // supply a render prop to our route which renders component with supplied props if user is logged in
    // and redirects to /login if not
    const routeProps = {
        ...rest,
        render: (props) => {

            return user ? <Component { ...props } /> : <Redirect to="/login" />;

        },
    };

    return <Route { ...routeProps } />;

}

export default PrivateRoute;