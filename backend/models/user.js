let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: { type: String, required: [true] },
    email: { type: String, required: [true] },
    password: { type: String, minLength: 5, maxLength: 100, required: [true] },
    admin: {type: String, enum: ['Yes', 'No'], required: [true, 'No']}
});

module.exports = mongoose.model('User', UserSchema);