// controllers/recipes.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');

router.get('/', async (req, res) => {
  try {
    const populatedRecipe = await Recipe.find({}).populate('owner')
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
  res.render('recipes/new.ejs')
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
    res.render('recipes/show.ejs', {
      recipe: myRecipe,
    })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

router.delete("/:recipeId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId).populate('owner')
    if (recipe.owner.equals(req.session.user._id)) {
      await recipe.deleteOne()
      res.redirect('/recipes')
    } else {
      res.send("You don;t have permission to do that")
    }
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
} )

router.get("/:recipeId/edit", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId)
    res.render('recipes/edit.ejs', {
      recipe: recipe,
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
