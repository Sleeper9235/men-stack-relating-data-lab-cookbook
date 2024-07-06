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
module.exports = router;
