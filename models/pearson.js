const e = require('express');
const { add } = require('lodash');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const personSchema = new mongoose.Schema({
 name: {
    type: String,
    required: true
 },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: Number
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true  
    }

});

personSchema.pre('save', async function (next) {
    const person = this;

    if(!person.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(person.password,salt);

        person.password = hashedPassword;

        next()
    } catch (error) {
        return next(error)
    }
})

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
