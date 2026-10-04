import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChefHat,
  Clock3,
  Plus,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import recipes from "../data/recipes";

import "../styles/pantry.css";

const PANTRY_KEY = "chefai_pantry";

const ingredientDatabase = [
  {
    name: "Tomato",
    category: "Vegetables",
    icon: "🍅",
  },
  {
    name: "Onion",
    category: "Vegetables",
    icon: "🧅",
  },
  {
    name: "Potato",
    category: "Vegetables",
    icon: "🥔",
  },
  {
    name: "Carrot",
    category: "Vegetables",
    icon: "🥕",
  },
  {
    name: "Spinach",
    category: "Vegetables",
    icon: "🥬",
  },
  {
    name: "Broccoli",
    category: "Vegetables",
    icon: "🥦",
  },
  {
    name: "Garlic",
    category: "Vegetables",
    icon: "🧄",
  },
  {
    name: "Avocado",
    category: "Fruits",
    icon: "🥑",
  },
  {
    name: "Apple",
    category: "Fruits",
    icon: "🍎",
  },
  {
    name: "Banana",
    category: "Fruits",
    icon: "🍌",
  },
  {
    name: "Lemon",
    category: "Fruits",
    icon: "🍋",
  },
  {
    name: "Chicken",
    category: "Proteins",
    icon: "🍗",
  },
  {
    name: "Eggs",
    category: "Proteins",
    icon: "🥚",
  },
  {
    name: "Paneer",
    category: "Proteins",
    icon: "🧀",
  },
  {
    name: "Tofu",
    category: "Proteins",
    icon: "🍱",
  },
  {
    name: "Milk",
    category: "Dairy",
    icon: "🥛",
  },
  {
    name: "Butter",
    category: "Dairy",
    icon: "🧈",
  },
  {
    name: "Cream",
    category: "Dairy",
    icon: "🥛",
  },
  {
    name: "Cheese",
    category: "Dairy",
    icon: "🧀",
  },
  {
    name: "Parmesan",
    category: "Dairy",
    icon: "🧀",
  },
  {
    name: "Rice",
    category: "Staples",
    icon: "🍚",
  },
  {
    name: "Pasta",
    category: "Staples",
    icon: "🍝",
  },
  {
    name: "Bread",
    category: "Staples",
    icon: "🍞",
  },
  {
    name: "Flour",
    category: "Staples",
    icon: "🌾",
  },
  {
    name: "Pizza Dough",
    category: "Staples",
    icon: "🍕",
  },
  {
    name: "Cocoa Powder",
    category: "Staples",
    icon: "🍫",
  },
  {
    name: "Salt",
    category: "Spices",
    icon: "🧂",
  },
  {
    name: "Black Pepper",
    category: "Spices",
    icon: "🌶️",
  },
  {
    name: "Chili Flakes",
    category: "Spices",
    icon: "🌶️",
  },
  {
    name: "Garam Masala",
    category: "Spices",
    icon: "🌿",
  },
  {
    name: "Olive Oil",
    category: "Spices",
    icon: "🫒",
  },
  {
    name: "Sugar",
    category: "Staples",
    icon: "🍚",
  },
  {
    name: "Chocolate",
    category: "Dessert",
    icon: "🍫",
  },
];

const categories = [
  "All",
  "Vegetables",
  "Fruits",
  "Proteins",
  "Dairy",
  "Staples",
  "Spices",
  "Dessert",
];

function getStoredPantry() {
  try {
    const saved = localStorage.getItem(PANTRY_KEY);

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Unable to load pantry:", error);
    return [];
  }
}

function Pantry() {
  const navigate = useNavigate();

  const pageRef = useRef(null);
  const ingredientGridRef = useRef(null);
  const recipeGridRef = useRef(null);

  const [pantry, setPantry] = useState(getStoredPantry);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    localStorage.setItem(
      PANTRY_KEY,
      JSON.stringify(pantry)
    );
  }, [pantry]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pantry-hero-content > *", {
        y: 35,
        opacity: 0,
        stagger: 0.1,
        duration: 0.75,
        ease: "power3.out",
      });

      gsap.from(".pantry-search-box", {
        y: 25,
        opacity: 0,
        duration: 0.7,
        delay: 0.35,
        ease: "power3.out",
      });

      gsap.from(".pantry-stat", {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.55,
        delay: 0.45,
        ease: "power3.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pantry-ingredient-card",
        {
          y: 20,
          opacity: 0,
          scale: 0.96,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.04,
          duration: 0.4,
          ease: "power3.out",
        }
      );
    }, ingredientGridRef);

    return () => ctx.revert();
  }, [pantry, search, activeCategory]);

  const filteredIngredients = useMemo(() => {
    const query = search.trim().toLowerCase();

    return ingredientDatabase.filter((ingredient) => {
      const matchesSearch =
        !query ||
        ingredient.name.toLowerCase().includes(query);

      const matchesCategory =
        activeCategory === "All" ||
        ingredient.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const availableIngredientNames = useMemo(() => {
    return pantry.map((item) =>
      item.name.toLowerCase()
    );
  }, [pantry]);

  const matchedRecipes = useMemo(() => {
    return recipes
      .map((recipe) => {
        const recipeIngredients = recipe.ingredients.map(
          (ingredient) => ingredient.toLowerCase()
        );

        const matchedIngredients =
          recipeIngredients.filter((ingredient) =>
            availableIngredientNames.some(
              (available) =>
                ingredient.includes(available) ||
                available.includes(ingredient)
            )
          );

        const matchPercentage =
          recipeIngredients.length > 0
            ? Math.round(
                (matchedIngredients.length /
                  recipeIngredients.length) *
                  100
              )
            : 0;

        return {
          ...recipe,
          matchPercentage,
          matchedIngredients,
        };
      })
      .filter((recipe) => recipe.matchPercentage > 0)
      .sort(
        (a, b) =>
          b.matchPercentage - a.matchPercentage
      );
  }, [availableIngredientNames]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pantry-recipe-result",
        {
          y: 30,
          opacity: 0,
          scale: 0.97,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.55,
          ease: "power3.out",
        }
      );
    }, recipeGridRef);

    return () => ctx.revert();
  }, [matchedRecipes]);

  const isInPantry = (ingredientName) => {
    return pantry.some(
      (item) =>
        item.name.toLowerCase() ===
        ingredientName.toLowerCase()
    );
  };

  const addIngredient = (ingredient) => {
    if (isInPantry(ingredient.name)) {
      return;
    }

    setPantry((current) => [
      ...current,
      ingredient,
    ]);
  };

  const removeIngredient = (ingredientName) => {
    setPantry((current) =>
      current.filter(
        (item) =>
          item.name.toLowerCase() !==
          ingredientName.toLowerCase()
      )
    );
  };

  const clearPantry = () => {
    setPantry([]);
  };

  return (
    <div
      ref={pageRef}
      className="pantry-page"
    >
      <Navbar />

      <main>
        {/* HERO */}

        <section className="pantry-hero">
          <div className="pantry-glow pantry-glow-one" />
          <div className="pantry-glow pantry-glow-two" />
          <div className="pantry-grid-overlay" />

          <button
            className="pantry-back"
            onClick={() => navigate("/")}
          >
            <ArrowRight
              size={16}
              className="back-arrow"
            />
            Back to home
          </button>

          <div className="pantry-hero-content">
            <div className="pantry-eyebrow">
              <span />
              SMART PANTRY
              <Sparkles size={14} />
            </div>

            <h1>
              Everything you have.
              <br />
              <em>Nothing you forget.</em>
            </h1>

            <p>
              Keep track of what's in your kitchen and
              discover recipes you can actually make
              with what you already have.
            </p>
          </div>

          <div className="pantry-search-box">
            <Search size={20} />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search ingredients to add..."
            />

            {search && (
              <button
                type="button"
                className="pantry-search-clear"
                onClick={() => setSearch("")}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="pantry-stats">
            <div className="pantry-stat">
              <ChefHat size={17} />
              <div>
                <strong>{pantry.length}</strong>
                <span>Ingredients</span>
              </div>
            </div>

            <div className="pantry-stat-divider" />

            <div className="pantry-stat">
              <Sparkles size={17} />
              <div>
                <strong>
                  {matchedRecipes.length}
                </strong>
                <span>Recipe matches</span>
              </div>
            </div>
          </div>
        </section>

        {/* INGREDIENT LIBRARY */}

        <section className="pantry-library">
          <div className="pantry-section-header">
            <div>
              <span className="pantry-section-label">
                INGREDIENT LIBRARY
              </span>

              <h2>
                Stock your
                <em> kitchen.</em>
              </h2>

              <p>
                Add ingredients you currently have
                available.
              </p>
            </div>

            {pantry.length > 0 && (
              <button
                className="clear-pantry-button"
                onClick={clearPantry}
              >
                Clear pantry
                <X size={15} />
              </button>
            )}
          </div>

          <div className="pantry-categories">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  activeCategory === category
                    ? "pantry-category active"
                    : "pantry-category"
                }
                onClick={() =>
                  setActiveCategory(category)
                }
              >
                {category}
              </button>
            ))}
          </div>

          <div
            ref={ingredientGridRef}
            className="pantry-ingredient-grid"
          >
            {filteredIngredients.map(
              (ingredient) => {
                const added = isInPantry(
                  ingredient.name
                );

                return (
                  <button
                    key={ingredient.name}
                    className={`pantry - ingredient - card ${
    added
        ? "ingredient-added"
        : ""
} `}
                    onClick={() =>
                      added
                        ? removeIngredient(
                            ingredient.name
                          )
                        : addIngredient(ingredient)
                    }
                  >
                    <span className="ingredient-emoji">
                      {ingredient.icon}
                    </span>

                    <span className="ingredient-info">
                      <strong>
                        {ingredient.name}
                      </strong>

                      <small>
                        {ingredient.category}
                      </small>
                    </span>

                    <span className="ingredient-action">
                      {added ? (
                        <Check size={16} />
                      ) : (
                        <Plus size={16} />
                      )}
                    </span>
                  </button>
                );
              }
            )}
          </div>

          {filteredIngredients.length === 0 && (
            <div className="pantry-no-results">
              <Search size={25} />
              <h3>No ingredients found</h3>
              <p>
                Try searching for something else.
              </p>
            </div>
          )}
        </section>

        {/* CURRENT PANTRY */}

        <section className="current-pantry-section">
          <div className="current-pantry-heading">
            <div>
              <span className="pantry-section-label">
                YOUR PANTRY
              </span>

              <h2>
                What's in your
                <em> kitchen?</em>
              </h2>
            </div>

            <span className="pantry-item-count">
              {pantry.length}{" "}
              {pantry.length === 1
                ? "item"
                : "items"}
            </span>
          </div>

          {pantry.length > 0 ? (
            <div className="current-pantry-grid">
              {pantry.map((ingredient) => (
                <div
                  className="current-pantry-item"
                  key={ingredient.name}
                >
                  <span className="current-item-icon">
                    {ingredient.icon}
                  </span>

                  <div>
                    <strong>
                      {ingredient.name}
                    </strong>

                    <small>
                      {ingredient.category}
                    </small>
                  </div>

                  <button
                    onClick={() =>
                      removeIngredient(
                        ingredient.name
                      )
                    }
                    aria-label={`Remove ${ ingredient.name } `}
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-pantry">
              <div className="empty-pantry-icon">
                🥕
              </div>

              <h3>
                Your pantry is waiting.
              </h3>

              <p>
                Add ingredients above and ChefAI will
                start finding recipes you can make.
              </p>

              <button
                onClick={() =>
                  window.scrollTo({
                    top: 450,
                    behavior: "smooth",
                  })
                }
              >
                Add ingredients
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </section>

        {/* RECIPE MATCHES */}

        <section className="pantry-recipes-section">
          <div className="pantry-recipe-heading">
            <div>
              <span className="pantry-section-label">
                CHEFAI MATCH
              </span>

              <h2>
                Recipes you can
                <em> make.</em>
              </h2>

              <p>
                Based on the ingredients currently in
                your pantry.
              </p>
            </div>

            {matchedRecipes.length > 0 && (
              <div className="recipe-match-summary">
                <Sparkles size={15} />
                Smart ingredient matching
              </div>
            )}
          </div>

          {matchedRecipes.length > 0 ? (
            <div
              ref={recipeGridRef}
              className="pantry-recipe-grid"
            >
              {matchedRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="pantry-recipe-result"
                >
                  <div className="match-badge">
                    <Sparkles size={13} />
                    {recipe.matchPercentage}% match
                  </div>

                  <RecipeCard recipe={recipe} />

                  <div className="recipe-match-info">
                    <div>
                      <Check size={14} />
                      {recipe.matchedIngredients.length}{" "}
                      ingredient
                      {recipe.matchedIngredients.length !==
                      1
                        ? "s"
                        : ""}{" "}
                      available
                    </div>

                    <span>
                      <Clock3 size={13} />
                      {recipe.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-recipe-matches">
              <div className="no-match-icon">
                <ChefHat size={28} />
              </div>

              <h3>
                Let's fill the pantry first.
              </h3>

              <p>
                Add a few ingredients and ChefAI will
                find recipes that match what you have.
              </p>

              <button
                onClick={() =>
                  window.scrollTo({
                    top: 450,
                    behavior: "smooth",
                  })
                }
              >
                Find ingredients
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Pantry;

