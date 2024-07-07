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
  res.render('recipes/new.ejs', {
    ingredients: ingredients,
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
    const allIngredientIds = myRecipe.ingredients
    const ingredientId = allIngredientIds.forEach((ingredient) => {
      return ingredient._id
    })
    const ingredients = await Ingredient.find({ingredientId})
    res.render('recipes/show.ejs', {
      recipe: myRecipe,
      ingredients: ingredients,
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
    const recipe = await Recipe.findById(req.params.recipeId)
    res.render('recipes/edit.ejs', {
      recipe: recipe,
      ingredients: ingredients,
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
