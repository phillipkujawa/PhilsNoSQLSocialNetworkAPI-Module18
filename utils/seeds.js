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

let userIdMap = {};
let updatedThoughts = [];

User.deleteMany({})
    .then(() => User.insertMany(users))
    .then(data => {
        console.log(data.length + " users records inserted!");

        // Create a mapping of usernames to user _id's
        data.forEach(user => {
            userIdMap[user.username] = user._id;
        });

        // Update the thoughts array to include the user's _id as userId
        updatedThoughts = thoughts.map(thought => ({
            ...thought,
            userId: userIdMap[thought.username]
        }));

        return Thought.deleteMany({});
    })
    .then(() => Thought.insertMany(updatedThoughts))
    .then(data => {
        console.log(data.length + " thoughts records inserted!");

        const thoughtPromises = data.map(thought => {
            return User.updateOne(
                { _id: thought.userId },
                { $push: { thoughts: thought._id } }
            );
        });

        return Promise.all(thoughtPromises);
    })
    .then(() => {
        console.log("Users updated with thoughts!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
