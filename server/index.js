const Server = require('./server.js');
const Lobby = require('./lobby.js');
const db = require('./db.js');
const env = require('./env.js');

async function runServer() {
    // Connect to database first
    const database = await db.connect(env.dbPath);

    var server = new Server(process.env.NODE_ENV !== 'production');
    server.initDb();
    var httpServer = server.init();
    var _lobby = new Lobby(httpServer, { db: database });

    server.run();
}

module.exports = runServer;
