// import custom routes, add your custom routes here ...
const exampleRoutes = require('./example-routes');
const logout = require('./logout');
const createChild = require('./createChild');
const getUserTransactions = require('./user-transactions');
const register = require("./register");
const sendMoney = require("./send-money");
const emailRoute = require("./email-route");
const updateUser = require("./update-user");
const resetPassword = require("./reset-password");
const deleteChild = require("./delete-child");
const getChildTransactions = require('./get-child-transactions');
const confirmParent = require("./confirm-parent");
const rejectParent = require("./reject-parent");
const login = require('./login');
const adminBoard = require('./admin-board')
const createFavorite = require('./createFavorite');
const githubWebhook = require('./github-webhook');
const getChildren = require('./get-children');
const getFavorites = require('./getFavorites');

const routesList = [];

// ... and here
routesList.push(exampleRoutes);
routesList.push(logout);
routesList.push(sendMoney);
routesList.push(emailRoute);
routesList.push(updateUser);
routesList.push(resetPassword);
routesList.push(createChild);
routesList.push(deleteChild);
routesList.push(getChildTransactions);
routesList.push(confirmParent);
routesList.push(rejectParent);
routesList.push(login);
routesList.push(getUserTransactions)
routesList.push(adminBoard)
routesList.push(createFavorite)
routesList.push(register);
routesList.push(githubWebhook);
routesList.push(getChildren);
routesList.push(getFavorites);



function useCustomRoutes(app, db) {
  // tell express server to use routes
  routesList.forEach(useRoute => {
    useRoute(app, db);
  });
}







module.exports = useCustomRoutes;