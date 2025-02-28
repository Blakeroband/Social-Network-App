import { Schema, model } from 'mongoose';
// create a new schema for a user
// new user includes username, email, thoughts, and friends
// thoughts and friends are 
const userSchema = new Schema({
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
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    // thoughts is an array of data
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    // friends is an array of data
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
const User = model('User', userSchema);
export default User;
