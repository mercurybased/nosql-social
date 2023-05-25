const { Schema, Types, model } = require('mongoose');
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


thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });

const Thoughts = model('thoughts', thoughtSchema)

module.exports = Thoughts