// controllers/ingredients.js

const express = require('express');
const router = express.Router();

const Ingredient = require('../models/ingredient.js');
const Recipe = require('../models/recipe.js');

router.post('/', async(req, res) => {
    try {
        await Ingredient.create(req.body)
        res.redirect('/recipes/new')
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.post('/edit', async(req, res) => {
    try {
        await Ingredient.create(req.body)
        res.redirect(`/recipes`)
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.delete("/edit", async (req, res) => {
    try {
        await Ingredient.findByIdAndDelete(req.body.ingredients)
        const recipes = Recipe.find({})
        const thisRecipe = (await recipes).forEach((recipe) => {
            return
        })
        res.redirect('/recipes/')
    } catch (err) {
      console.log(err)
      res.redirect('/')
    }
  } )




module.exports = router;
