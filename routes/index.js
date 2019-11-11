// import custom routes, add your custom routes here ...
const exampleRoutes = require('./example-routes');
const logout = require('./logout');
const createChild = require('./createChild');
const register = require("./register");
const sendMoney = require("./send-money");
const emailRoute = require("./email-route");
const updateUser = require("./update-user");
const resetPassword = require("./reset-password");
<<<<<<< HEAD
const getChildTransactions = require('./get-child-transactions');
=======
const confirmParent = require("./confirm-parent");
const rejectParent = require("./reject-parent");
>>>>>>> development

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
<<<<<<< HEAD
routesList.push(getChildTransactions);
=======
routesList.push(confirmParent);
routesList.push(rejectParent);
>>>>>>> development

function useCustomRoutes(app, db) {
    // tell express server to use routes
    routesList.forEach(useRoute => {
        useRoute(app, db);
    });
}

module.exports = useCustomRoutes;