const http = require('http');
const app = require('./app');
const sequelize = require('./api/DB/mysql_stories');
const ck = require('ckey');

const port = ck.PORT || 3001;
const server = http.createServer(app);



const startServer = async (server) => {
    try {
        await sequelize.authenticate();
        await sequelize.sync(
            // { force: true }
        );
        server.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    } catch (err) {
        console.log("Unable to connect to the database: ", err);
    }
};
startServer(server);
