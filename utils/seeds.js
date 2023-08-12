const mongoose = require('mongoose');
const User = require('../models/User');
const Thought = require('../models/Thought');

mongoose.connect('mongodb://192.168.1.55:27017/socialDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const users = [
    {
        username: "john_doe",
        email: "john.doe@example.com"
    },
    {
        username: "jane_smith",
        email: "jane.smith@example.com"
    }
];

const thoughts = [
    {
        thoughtText: "This is John's thought!",
        username: "john_doe"
    },
    {
        thoughtText: "This is Jane's thought!",
        username: "jane_smith"
    }
];

User.deleteMany({})
    .then(() => User.insertMany(users))
    .then(data => {
        console.log(data.length + " users records inserted!");
        return Thought.deleteMany({});
    })
    .then(() => Thought.insertMany(thoughts))
    .then(data => {
        console.log(data.length + " thoughts records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
