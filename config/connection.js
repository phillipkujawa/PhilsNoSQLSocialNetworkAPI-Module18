const { connect, connection } = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb://192.168.1.55:27017/socialDB';

connect(connectionString);

module.exports = connection;