// import custom routes, add your custom routes here ...

const sendMoney = require('./send-money');
const exampleRoutes = require("./example-routes");
const logout = require("./logout");
const emailRoute = require("./email-route");


const routesList = [];

// ... and here
routesList.push(exampleRoutes);
routesList.push(logout);
routesList.push(sendMoney);
routesList.push(emailRoute);


function useCustomRoutes(app, db) {
  // tell express server to use routes
  routesList.forEach(useRoute => {
    useRoute(app, db);
  });
}

module.exports = useCustomRoutes;
