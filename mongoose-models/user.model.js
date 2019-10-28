const Mongoose = require('mongoose');

const { Schema, model } = Mongoose;

const userSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },

    role: {
        type: String,
        required: true,
        default: 'user',
    },

    balance: {
        type: Number,
        required: true,
        default: 1000,
    },

    children: {
        confirmed: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        pending: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },

    favorites: [{
        name: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true,
        },
    }],

    password: {
        type: String,
        required: true,
    },

    activated: {
        type: Boolean,
        default: false,
    },

}, {
    toJSON: { virtuals: true },
});

userSchema.virtual('incomingTransactions', {
    ref: 'Transaction',
    localField: '_id',
    foreignField: 'recipient',
});

userSchema.virtual('outgoingTransactions', {
    ref: 'Transaction',
    localField: '_id',
    foreignField: 'sender',
});

const userModel = new model('User', userSchema);

module.exports = userModel;