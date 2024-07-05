const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        requiered: true,
    }, 
    instructions: {
        type: String,
    }, 
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }, 
    ingredients: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Ingredients'
        }
    ]
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe