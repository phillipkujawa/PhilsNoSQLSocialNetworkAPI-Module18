# Social Network API - Module 18

The social network API is a Mongo DB (Mongoose) backend database containing users, thoughts, friends and reactions 

## Prerequisites

Before you begin, ensure you have installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
- A Mongo DB server (Local or hosted)

## Dependencies

This project uses the following Node.js packages:

- `express` for interacting with the database routes.
- `mongoose` to connect to a MySQL database.

You can install these by running `npm install` in the root directory of the project.

## Usage

1. First, you need to set up your database connection. Update the `connection.js` file in the root directory of the project with the following content, replacing the mongo DB connection string with your actual Mongo DB connection details:

```javascript
const { connect, connection } = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/socialDB';

connect(connectionString);

module.exports = connection;

...
```

2. To start the application, open a terminal in the root directory of the project and run:

```bash
node server.js
```

3. To create the database use the schema provided in db/schema.sql

4. To seed the database run the seed file in utils/seeds.js
```bash
node seeds.js
```
... 

## Live Video
URL: https://www.loom.com/share/c247fadd5be3453abfcd160be1e14a57?sid=db42ff3e-78b4-44ce-a5c6-11175c419598 


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
