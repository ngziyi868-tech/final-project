import db from "../lib/firebase/index.js";

//CREATE RECIPE

export const createRecipe = async (req, res) => {
  try {
    const recipe = {
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      createdAt: new Date(),
    };

    const doc = await db.collection("recipes").add(recipe);

    res.status(201).json({
      id: doc.id,
      ...recipe,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//GET ALL RECIPES

export const getRecipes = async (req, res) => {
  try {
    const snapshot = await db.collection("recipes").get();

    const recipes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(recipes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//UPDATE RECIPE

export const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    await db.collection("recipes").doc(id).update({
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      createdAt: new Date(),
    });

    res.status(200).json({
      message: "Recipe updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//DELETE RECIPE

export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    await db.collection("recipes").doc(id).delete();

    res.status(200).json({
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
