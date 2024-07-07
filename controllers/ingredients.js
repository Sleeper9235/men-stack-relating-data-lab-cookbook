// controllers/ingredients.js

const express = require('express');
const router = express.Router();

const Ingredient = require('../models/ingredient.js');

router.get('/', async (req, res) => {
    try {
        const ingredients = await Ingredient.find({})
        let uniqueIngredients = []
        let ingredientScan = {}
        ingredients.forEach((ingredient) => {
            if (!ingredientScan[ingredient.name]) {
              uniqueIngredients.push(ingredient._id)
              ingredientScan[ingredient.name] = true
            }
        })
        const allIngredients = await Ingredient.find({_id: uniqueIngredients})
        res.render('ingredients/index.ejs', {
            ingredients: allIngredients,
        })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.post('/', async(req, res) => {
    try {
        await Ingredient.create(req.body)
        res.redirect('/ingredients')
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
        res.redirect('/ingredients')
    } catch (err) {
      console.log(err)
      res.redirect('/')
    }
  } )




module.exports = router;
