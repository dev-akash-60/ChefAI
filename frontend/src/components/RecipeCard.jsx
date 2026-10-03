import { Clock3, Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    isFavorite,
    toggleFavorite,
} from "../services/favorites";

import "../styles/recipe-card.css";

function RecipeCard({ recipe }) {
    const navigate = useNavigate();

    const [favorite, setFavorite] = useState(false);

    // Check favorite status when component loads
    useEffect(() => {
        setFavorite(isFavorite(recipe.id));
    }, [recipe.id]);

    // Keep card synced when favorites change elsewhere
    useEffect(() => {
        const handleFavoritesUpdated = () => {
            setFavorite(isFavorite(recipe.id));
        };

        window.addEventListener(
            "favoritesUpdated",
            handleFavoritesUpdated
        );

        return () => {
            window.removeEventListener(
                "favoritesUpdated",
                handleFavoritesUpdated
            );
        };
    }, [recipe.id]);

    const handleCardClick = () => {
        navigate(`/recipe/${recipe.id}`);
    };

    const handleFavoriteClick = (event) => {
        // VERY IMPORTANT:
        // Prevent the card click from opening recipe details
        event.preventDefault();
        event.stopPropagation();

        const newFavoriteState = !favorite;

        // Update UI immediately
        setFavorite(newFavoriteState);

        // Update localStorage
        toggleFavorite(recipe);
    };

    return (
        <article
            className="recipe-card"
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
                if (event.key === "Enter") {
                    handleCardClick();
                }
            }}
        >
            <div className="recipe-image">
                <img
                    src={recipe.image}
                    alt={recipe.title}
                />

                <div className="recipe-gradient" />

                {/* FAVORITE BUTTON */}
                <button
                    type="button"
                    className={`favorite-button ${favorite ? "favorite-active" : ""
                        }`}
                    onClick={handleFavoriteClick}
                    aria-label={
                        favorite
                            ? `Remove ${recipe.title} from favorites`
                            : `Add ${recipe.title} to favorites`
                    }
                >
                    <Heart
                        size={19}
                        strokeWidth={2}
                        fill={favorite ? "currentColor" : "none"}
                    />
                </button>

                <span className="recipe-tag">
                    {recipe.category}
                </span>
            </div>

            <div className="recipe-details">
                <h3>{recipe.title}</h3>

                <div className="recipe-meta">
                    <span>
                        <Star
                            size={14}
                            fill="currentColor"
                        />

                        {recipe.rating}
                    </span>

                    <span>
                        <Clock3 size={14} />

                        {recipe.time}
                    </span>

                    <span>
                        {recipe.difficulty}
                    </span>
                </div>
            </div>
        </article>
    );
}

export default RecipeCard;