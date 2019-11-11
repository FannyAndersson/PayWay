// import custom routes, add your custom routes here ...
const exampleRoutes = require('./example-routes');
const logout = require('./logout');
const createChild = require('./createChild');
const register = require("./register");
const sendMoney = require("./send-money");
const emailRoute = require("./email-route");
const updateUser = require("./update-user");
const resetPassword = require("./reset-password");
const confirmParent = require("./confirm-parent");

const routesList = [];

// ... and here
routesList.push(exampleRoutes);
routesList.push(logout);
routesList.push(register);
routesList.push(sendMoney);
routesList.push(emailRoute);
routesList.push(updateUser);
routesList.push(resetPassword);
routesList.push(createChild);
routesList.push(confirmParent);

function useCustomRoutes(app, db) {
    // tell express server to use routes
    routesList.forEach(useRoute => {
        useRoute(app, db);
    });
}

module.exports = useCustomRoutes;