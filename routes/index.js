// import custom routes, add your custom routes here ...
const exampleRoutes = require('./example-routes');

const routesList = [];

// ... and here
routesList.push(exampleRoutes);

function useCustomRoutes(app, db) {

    // tell express server to use routes
    routesList.forEach(useRoute => {
        useRoute(app, db);
    });

};

module.exports = useCustomRoutes;