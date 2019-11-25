const {Schema, model } = require('mongoose');

const transactionSchema =  new Schema({

    amount: {
        type: Number,
        required: true,
        min: 1,
    },

    date: {
        type: Date,
        default: Date.now(),
    },

    recipient: {
        type:  Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    message: {
        type: String,
        maxlength: 50,
    },

});

const transactionModel = new model('Transaction', transactionSchema);

module.exports = transactionModel;