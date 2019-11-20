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
        enum: ['user', 'admin'],
        immutable: true
    },

    isAdmin: {
        type: String,
        unique: true
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

    favorites: [{ type: Schema.Types.ObjectId, ref: "User" }],

    password: {
        type: String,
        required: true,
    },

    activated: {
        type: Boolean,
        default: false,
    },
    limit: {
        type: Number,
        default: 1000
    }
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

const checkIfAdmin = (user) => {
    user.isAdmin = user._id;
    if (user.role === "admin") {
        user.isAdmin = "-1";
    }
}

userSchema.pre('save', function () {
    checkIfAdmin(this);
});

userSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('Admin already exists'));
    } else {
        next();
    }
});

userSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    delete obj.isAdmin;
    return obj;
}

const userModel = new model('User', userSchema);




module.exports = userModel;