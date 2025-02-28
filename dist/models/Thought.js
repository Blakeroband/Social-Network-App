import { Schema, model, Types } from 'mongoose';
// reactionSchema includes reactionId, reactionBody, username, and createdAt
// used for reactions to thoughts
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        max: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: {
        getters: true
    },
    id: false
});
// create a new schema for a thought
// new thought includes thoughtText, username, and createdAt
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length || 0;
});
const Thought = model('Thought', thoughtSchema);
export default Thought;
