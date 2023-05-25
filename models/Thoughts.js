const { Schema, model } = require('mongoose');
const Reactions = require("./Reactions");

const thoughtSchema = new Schema (
    {
        thoughtText:{
            type:String,
            required:true,
            min_length: 1,
            max_length:280
        },
        createdAt:{
            type:Date,
            default:Date.now(),
            get: (timestamp) => new Date(timestamp).toISOString()
        },
        username: {
            type:String,
            required:true,
        },
        reactions: [Reactions],
    }, 
    {
        toJSON: {
            virtuals:true
        },
    }
)



module.exports = thoughtSchema;
// * `createdAt`
// * Date
// * Set default value to the current timestamp
// * Use a getter method to format the timestamp on query

// * `username` (The user that created this thought)
// * String
// * Required

// * `reactions` (These are like replies)
// * Array of nested documents created with the `reactionSchema`

// **Schema Settings**:

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
