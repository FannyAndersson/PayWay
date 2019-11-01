// import custom routes, add your custom routes here ...
const exampleRoutes = require('./example-routes');
const logout = require('./logout');
const sendMoney = require('./send-money');

const routesList = [];

// ... and here
routesList.push(exampleRoutes);
routesList.push(logout);
routesList.push(sendMoney);

function useCustomRoutes(app, db) {

    // tell express server to use routes
    routesList.forEach(useRoute => {
        useRoute(app, db);
    });

};

module.exports = useCustomRoutes;