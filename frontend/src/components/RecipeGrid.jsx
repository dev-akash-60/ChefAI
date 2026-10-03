import { ArrowRight } from "lucide-react";
import RecipeCard from "./RecipeCard";

const recipes = [
    {
        title: "Creamy Garlic Pasta",
        category: "Italian",
        rating: "4.9",
        time: "25 min",
        difficulty: "Easy",
        image:
            "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=90",
    },
    {
        title: "Butter Chicken",
        category: "Indian",
        rating: "4.8",
        time: "40 min",
        difficulty: "Medium",
        image:
            "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1000&q=90",
    },
    {
        title: "Avocado Toast",
        category: "Breakfast",
        rating: "4.7",
        time: "10 min",
        difficulty: "Easy",
        image:
            "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=1000&q=90",
    },
];

function RecipeGrid() {
    return (
        <section className="section recipes-section" id="recipes">
            <div className="section-heading scroll-reveal">
                <div>
                    <span className="section-label">TRENDING NOW</span>
                    <h2>Recipes worth making</h2>
                </div>

                <button className="view-button">
                    Explore recipes
                    <ArrowRight size={16} />
                </button>
            </div>

            <div className="recipe-grid">
                {recipes.map((recipe) => (
                    <RecipeCard
                        key={recipe.title}
                        recipe={recipe}
                    />
                ))}
            </div>
        </section>
    );
}

export default RecipeGrid;