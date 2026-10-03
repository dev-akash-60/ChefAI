import { useEffect, useRef, useState } from "react";
import {
    ArrowLeft,
    Heart,
    Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import { getFavorites } from "../services/favorites";

import "../styles/favorites.css";

function Favorites() {
    const navigate = useNavigate();

    const pageRef = useRef(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const loadFavorites = () => {
            setFavorites(getFavorites());
        };

        loadFavorites();

        window.addEventListener(
            "favoritesUpdated",
            loadFavorites
        );

        return () => {
            window.removeEventListener(
                "favoritesUpdated",
                loadFavorites
            );
        };
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".favorites-hero-content > *", {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.7,
                ease: "power3.out",
            });

            gsap.from(".favorite-result-card", {
                y: 35,
                opacity: 0,
                scale: 0.97,
                stagger: 0.08,
                duration: 0.6,
                ease: "power3.out",
            });
        }, pageRef);

        return () => ctx.revert();
    }, [favorites]);

    return (
        <div
            ref={pageRef}
            className="favorites-page"
        >
            <Navbar />

            <main>
                <section className="favorites-hero">
                    <div className="favorites-glow favorites-glow-one" />
                    <div className="favorites-glow favorites-glow-two" />

                    <button
                        className="favorites-back"
                        onClick={() => navigate("/recipes")}
                    >
                        <ArrowLeft size={17} />
                        Back to recipes
                    </button>

                    <div className="favorites-hero-content">
                        <div className="favorites-eyebrow">
                            <span />
                            YOUR COLLECTION
                            <Heart size={14} fill="currentColor" />
                        </div>

                        <h1>
                            Recipes you
                            <br />
                            <em>love.</em>
                        </h1>

                        <p>
                            Keep your favorite recipes in one place and
                            come back whenever inspiration strikes.
                        </p>
                    </div>
                </section>

                <section className="favorites-content">
                    <div className="favorites-heading">
                        <div>
                            <span className="favorites-label">
                                SAVED RECIPES
                            </span>

                            <h2>
                                {favorites.length > 0
                                    ? "Your favorites"
                                    : "Your collection is empty"}
                            </h2>

                            <p>
                                {favorites.length}{" "}
                                {favorites.length === 1
                                    ? "recipe"
                                    : "recipes"}{" "}
                                saved
                            </p>
                        </div>

                        {favorites.length > 0 && (
                            <div className="favorites-count">
                                <Heart size={16} fill="currentColor" />
                                {favorites.length}
                            </div>
                        )}
                    </div>

                    {favorites.length > 0 ? (
                        <div className="favorites-grid">
                            {favorites.map((recipe) => (
                                <div
                                    className="favorite-result-card"
                                    key={recipe.id}
                                >
                                    <RecipeCard recipe={recipe} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-favorites">
                            <div className="empty-favorites-icon">
                                <Heart size={30} />
                            </div>

                            <div className="empty-sparkle">
                                <Sparkles size={16} />
                            </div>

                            <h3>No favorites yet</h3>

                            <p>
                                Explore ChefAI and save recipes you want
                                to cook later.
                            </p>

                            <button
                                onClick={() => navigate("/recipes")}
                            >
                                Explore Recipes
                                <ArrowLeft
                                    size={17}
                                    className="explore-arrow"
                                />
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default Favorites;