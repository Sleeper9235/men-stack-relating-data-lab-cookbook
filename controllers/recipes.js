// controllers/recipes.js

const express = require('express');
const router = express.Router();

const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');

router.get('/', async (req, res) => {
  try {
    const myRecipes = await Recipe.find({ owner: req.session.user._id}).populate('owner')
    res.render('recipes/index.ejs', {
      recipes: myRecipes,
    })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
  });

router.get('/new', async (req, res) => {
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
  res.render('recipes/new.ejs', {
      ingredients: allIngredients,
  })
})

router.post('/', async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    newRecipe.owner = req.session.user._id
    await newRecipe.save();
    res.redirect('/recipes')
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

router.get("/:recipeId", async (req, res) => {
  try {
    const myRecipe = await Recipe.findById(req.params.recipeId).populate('owner')
    const ingredients = myRecipe.ingredients
    const allIngredients = await Ingredient.find({_id: ingredients})
    res.render('recipes/show.ejs', {
      recipe: myRecipe,
      ingredients: allIngredients,
    })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

router.delete("/:recipeId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId).populate('owner')
    await recipe.deleteOne()
    res.redirect('/recipes')
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
} )

router.get("/:recipeId/edit", async (req, res) => {
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
    const recipe = await Recipe.findById(req.params.recipeId)
    res.render('recipes/edit.ejs', {
      recipe: recipe,
      ingredients: allIngredients,
    })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

router.put("/:recipeId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId)
    await recipe.updateOne(req.body)
    res.redirect('/recipes')
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})
module.exports = router;
