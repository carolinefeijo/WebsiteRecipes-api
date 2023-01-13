const express = require("express");
const router = express.Router();

const Recipe = require("../models/RecipeModel");

// CREATE- CRIANDO RECEITA
router.post("/", async (req, res) => {
  const {
    title,
    image,
    typeRecipe,
    time,
    portion,
    listOfIngredients,
    description,
  } = req.body;

  if (!title) {
    res.status(422).json({ error: "O title é obrigatorio" });
    return;
  }

  const createRecipe = {
    title,
    image,
    typeRecipe,
    time,
    portion,
    listOfIngredients,
    description,
  };
  try {
    await Recipe.create(createRecipe);
    res.status(201).json({ message: "Receita criada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// READ- LISTA DE TODAS RECEITAS
router.get("/", async (req, res) => {
  const { page, limit } = req.query;

  try {
    const recipes = await Recipe.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// PEGANDO RECEITA PELO ID
router.get("/findById/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const recipeId = await Recipe.findOne({ _id: id });
    if (!recipeId) {
      res.status(422).json({ message: "A receita não foi encontrada" });
      return;
    }
    res.status(200).json(recipeId);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// ATUALIZANDO RECEITA
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const {
    title,
    image,
    typeRecipe,
    time,
    portion,
    listOfIngredients,
    description,
  } = req.body;

  const infoRecipes = {
    title,
    image,
    typeRecipe,
    time,
    portion,
    listOfIngredients,
    description,
  };
  try {
    const updatedRecipes = await Recipe.updateOne({ _id: id }, infoRecipes);

    if (updatedRecipes.matchedCount === 0) {
      res.status(422).json({ message: "Nenhuma informação foi atualizada" });
      return;
    }

    res.status(200).json(infoRecipes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// DELETAR RECEITA
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const recipeId = await Recipe.findOne({ _id: id });

  if (!recipeId) {
    res.status(422).json({ message: "Receita não encontrada!" });
    return;
  }

  try {
    const deleteRecipes = await Recipe.deleteOne({
      message: " Receita removida com sucesso ",
    });
    res.status(200).json({ message: "Receita removida com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// ROTA QUE FILTRA E FAZ PAGINAÇÃO
router.get("/findByTypeRecipe/:type", async (req, res) => {
  const { type } = req.params;

  try {
    const recipes = await Recipe.find({ typeRecipe: type });
    if (recipes == "") {
      res.status(401).json({ message: "no recipe found with parameter sent" });
      return;
    }
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = (app) => app.use("/recipe", router);
