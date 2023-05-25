const { Schema, Types, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [{
            type:Schema.Types.ObjectId,
            ref:'Thoughts'
        }
    ],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
},
        {
            toJSON: {
                virtuals:true
            },
            id:false,
        }

    
)

//retrieves length of users friend array
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });


model.exports = User