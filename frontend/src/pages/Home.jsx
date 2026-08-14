
import { useEffect, useState } from "react";
import { useAuth } from "../store/useAuth";
import "../App.css";

function Home() {
  const { user, logout } = useAuth();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadRecipes() {
      try {
        setLoading(true);
        setError("");

        const token = await user.getIdToken();

        const response = await fetch("http://localhost:5000/api/recipes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const data = await response.json();

        if (!ignore) {
          setRecipes(data);
        }
      } catch (error) {
        console.error(error);

        if (!ignore) {
          setError("Could not load recipes.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    if (user) {
      loadRecipes();
    }

    return () => {
      ignore = true;
    };
  }, [user]);

  async function handleSaveRecipe(event) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!title.trim() || !ingredients.trim() || !instructions.trim()) {
      setError("Please fill in all recipe fields.");
      return;
    }

    try {
      setSaving(true);

      const token = await user.getIdToken();

      const url = editingId
        ? `http://localhost:5000/api/recipes/${editingId}`
        : "http://localhost:5000/api/recipes";

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          ingredients: ingredients.trim(),
          instructions: instructions.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save recipe");
      }

      if (editingId) {
        setRecipes((currentRecipes) =>
          currentRecipes.map((recipe) =>
            recipe.id === editingId
              ? {
                  ...recipe,
                  title: title.trim(),
                  ingredients: ingredients.trim(),
                  instructions: instructions.trim(),
                }
              : recipe
          )
        );

        setMessage("Recipe updated successfully!");
      } else {
        setRecipes((currentRecipes) => [...currentRecipes, data]);
        setMessage("Recipe created successfully!");
      }

      clearForm();
    } catch (error) {
      console.error(error);
      setError(error.message || "Could not save recipe.");
    } finally {
      setSaving(false);
    }
  }

  function startEditing(recipe) {
    setEditingId(recipe.id);
    setTitle(recipe.title);
    setIngredients(recipe.ingredients);
    setInstructions(recipe.instructions);
    setError("");
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function clearForm() {
    setEditingId(null);
    setTitle("");
    setIngredients("");
    setInstructions("");
  }

  async function handleDeleteRecipe(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");

      const token = await user.getIdToken();

      const response = await fetch(
        `http://localhost:5000/api/recipes/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete recipe");
      }

      setRecipes((currentRecipes) =>
        currentRecipes.filter((recipe) => recipe.id !== id)
      );

      setMessage("Recipe deleted successfully!");

      if (editingId === id) {
        clearForm();
      }
    } catch (error) {
      console.error(error);
      setError(error.message || "Could not delete recipe.");
    }
  }

  async function handleLogout() {
    await logout();
  }

  return (
    <div className="app">
      <nav className="navbar">
        <h1>🍴 Recipe Tracker</h1>

        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </nav>

      <main className="container">
        <header className="page-header">
          <h1>My Recipes</h1>
          <p>
            Welcome back, <strong>{user?.email}</strong>. Keep all your favorite
            recipes in one place.
          </p>
        </header>

        {message && <div className="message">{message}</div>}

        {error && <div className="error-message">{error}</div>}

        <section className="card">
          <h2>{editingId ? "Edit Recipe" : "Add a Recipe"}</h2>

          <form onSubmit={handleSaveRecipe}>
            <div className="form-group">
              <label htmlFor="title">Recipe Name</label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Example: Homemade Pasta"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ingredients">Ingredients</label>

              <textarea
                id="ingredients"
                value={ingredients}
                onChange={(event) => setIngredients(event.target.value)}
                placeholder="List the ingredients you need..."
                rows="5"
              />
            </div>

            <div className="form-group">
              <label htmlFor="instructions">Instructions</label>

              <textarea
                id="instructions"
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
                placeholder="Describe how to prepare the recipe..."
                rows="5"
              />
            </div>

            <div className="button-row">
              <button
                className="primary-button"
                type="submit"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Recipe"
                    : "Add Recipe"}
              </button>

              {editingId && (
                <button
                  className="secondary-button"
                  type="button"
                  onClick={clearForm}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </section>

        <section>
          <div className="page-header">
            <h2>Saved Recipes</h2>
            <p>
              {recipes.length === 1
                ? "You have 1 recipe saved."
                : `You have ${recipes.length} recipes saved.`}
            </p>
          </div>

          {loading && (
            <div className="empty-state">
              <p>Loading recipes...</p>
            </div>
          )}

          {!loading && !error && recipes.length === 0 && (
            <div className="empty-state">
              <p>No recipes yet.</p>
              <p>Add your first recipe above to get started!</p>
            </div>
          )}

          {!loading && recipes.length > 0 && (
            <div className="recipe-list">
              {recipes.map((recipe) => (
                <article className="recipe-card" key={recipe.id}>
                  <h3>{recipe.title}</h3>

                  <p>
                    <strong>Ingredients</strong>
                    <br />
                    {recipe.ingredients}
                  </p>

                  <p>
                    <strong>Instructions</strong>
                    <br />
                    {recipe.instructions}
                  </p>

                  <div className="button-row">
                    <button
                      className="secondary-button"
                      onClick={() => startEditing(recipe)}
                    >
                      Edit
                    </button>

                    <button
                      className="danger-button"
                      onClick={() => handleDeleteRecipe(recipe.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;
