const { Schema, model } = require('mongoose');

function dateFormat(createdAtVal) {
    return createdAtVal.toDateString(); 
}

// Create the ReactionSchema
const ReactionsSchema = new Schema({
    // Set custom id to avoid confusion with parent comment's _id field
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        validate: [({ length }) => length <= 280, 'Reaction must be less than 280 characters.']
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Use a getter method to format the timestamp on query
        get: (createdAtVal) => dateFormat(createdAtVal)
    }
},
{
    toJSON: {
        getters: true
    }
}
);

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        validate: [({ length }) => length <= 280, 'Thought must be less than 280 characters.']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // Use a getter method to format the timestamp on query
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    // Use ReactionsSchema to validate data for a reply
    reactions: [ReactionsSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// Export the Thought model
module.exports = Thought;
