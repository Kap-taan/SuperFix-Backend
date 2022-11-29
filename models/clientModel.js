const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    carNo: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    variant: {
        type: String,
        required: true
    },
    services: {
        type: Array,
        "default": []
    }
});

// static signup client
clientSchema.statics.signup = async function (name, address, phone, email, password, carNo, model, company, variant) {

    // Validation
    if (!name || !address || !phone || !email || !password || !carNo || !model || !company || !variant) {
        throw Error('All Fields must be filled');
    }

    if (!validator.isEmail(email)) {
        throw Error('Invalid Email');
    }

    // If the client already exist
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error('Email already in use')
    }
    // Encrypting the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newClient = {
        name, address, phone, email, password: hash, carNo, model, variant, company
    }
    const client = await this.create(newClient);

    return client;

}

// static method for login
clientSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All Field must be filled');
    }
    const client = await this.findOne({ email });
    console.log(client)
    if (!client) {
        throw Error('Invalid Email');
    }
    const match = await bcrypt.compare(password, client.password);
    if (!match) {
        throw Error('Invalid Password');
    }

    return client;
}

// static method for getting info about the client
clientSchema.statics.getInfo = async function (carNo) {
    if (!carNo) {
        throw Error('Car No should be entered');
    }
    const client = await this.findOne({ carNo });
    if (!client) {
        throw Error('Invalid Car No');
    }

    return client;
}

module.exports = mongoose.model('Client', clientSchema);