const db = require("../services/db");

const recipeSchema = new db.Schema({
  title: {
    type: String,
  },
  image: {
    type: String,
  },
  time: {
    type: Number,
  },
  portion: {
    type: Number,
  },
  typeRecipe: {
    type: String,
  },
  listOfIngredients: {
    type: Array,
  },
  description: {
    type: Array,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const recipe = db.model("recipe", recipeSchema);

module.exports = recipe;
