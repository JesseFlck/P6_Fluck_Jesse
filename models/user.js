// Importation des modules

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Schema de l'utilisateur

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Utilisation du plugin Mongoose de vérification de l'email unique

userSchema.plugin(uniqueValidator);

// Export du schema

module.exports = mongoose.model('user', userSchema);
