import { useEffect, useMemo, useRef } from "react";
import {
    ArrowLeft,
    Check,
    Clock3,
    Heart,
    Play,
    Star,
    Users,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";

import Navbar from "../components/Navbar";
import recipes from "../data/recipes";
import "../styles/recipe-details.css";

function RecipeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const pageRef = useRef(null);

    const recipe = useMemo(() => {
        return recipes.find((item) => String(item.id) === String(id));
    }, [id]);

    useEffect(() => {
        if (!recipe) return;

        const ctx = gsap.context(() => {
            const timeline = gsap.timeline({
                defaults: {
                    ease: "power3.out",
                },
            });

            timeline
                .from(".recipe-details-back", {
                    y: -20,
                    opacity: 0,
                    duration: 0.5,
                })
                .from(
                    ".recipe-details-image",
                    {
                        x: -50,
                        opacity: 0,
                        scale: 0.96,
                        duration: 0.9,
                    },
                    "-=0.2"
                )
                .from(
                    ".recipe-details-info > *",
                    {
                        y: 30,
                        opacity: 0,
                        stagger: 0.08,
                        duration: 0.65,
                    },
                    "-=0.6"
                )
                .from(
                    ".ingredient-item",
                    {
                        x: -20,
                        opacity: 0,
                        stagger: 0.05,
                        duration: 0.4,
                    },
                    "-=0.25"
                );
        }, pageRef);

        return () => ctx.revert();
    }, [recipe]);

    if (!recipe) {
        return (
            <div className="recipe-not-found">
                <Navbar />

                <div className="recipe-not-found-content">
                    <div className="not-found-icon">
                        <span>🍽️</span>
                    </div>

                    <h1>Recipe not found</h1>

                    <p>
                        This recipe seems to have wandered out of the kitchen.
                    </p>

                    <button onClick={() => navigate("/recipes")}>
                        <ArrowLeft size={17} />
                        Back to recipes
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div ref={pageRef} className="recipe-details-page">
            <Navbar />

            <main>
                <section className="recipe-details-hero">
                    <button
                        className="recipe-details-back"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft size={17} />
                        Back to recipes
                    </button>

                    <div className="recipe-details-layout">
                        <div className="recipe-details-image">
                            <img src={recipe.image} alt={recipe.title} />

                            <div className="recipe-details-image-overlay" />

                            <span className="recipe-details-category">
                                {recipe.category}
                            </span>

                            <button
                                className="details-favorite"
                                aria-label="Add to favorites"
                            >
                                <Heart size={21} />
                            </button>

                            <button className="recipe-play-button">
                                <Play size={19} fill="currentColor" />
                            </button>
                        </div>

                        <div className="recipe-details-info">
                            <span className="details-label">
                                CHEFAI RECIPE
                            </span>

                            <h1>{recipe.title}</h1>

                            <p className="details-description">
                                {recipe.description}
                            </p>

                            <div className="details-rating">
                                <div className="stars">
                                    <Star size={17} fill="currentColor" />
                                    <strong>{recipe.rating}</strong>
                                </div>

                                <span>Excellent recipe</span>
                            </div>

                            <div className="details-stats">
                                <div className="details-stat">
                                    <Clock3 size={20} />
                                    <div>
                                        <span>Cooking time</span>
                                        <strong>{recipe.time}</strong>
                                    </div>
                                </div>

                                <div className="details-stat">
                                    <Users size={20} />
                                    <div>
                                        <span>Servings</span>
                                        <strong>2 people</strong>
                                    </div>
                                </div>

                                <div className="details-stat">
                                    <ChefHatIcon />
                                    <div>
                                        <span>Difficulty</span>
                                        <strong>{recipe.difficulty}</strong>
                                    </div>
                                </div>
                            </div>

                            <div className="details-actions">
                                <button className="start-cooking-button">
                                    Start Cooking
                                    <ArrowLeft
                                        size={17}
                                        className="start-arrow"
                                    />
                                </button>

                                <button className="save-recipe-button">
                                    <Heart size={18} />
                                    Save Recipe
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="recipe-information">
                    <div className="ingredients-section">
                        <div className="details-section-heading">
                            <span>01</span>
                            <div>
                                <small>WHAT YOU NEED</small>
                                <h2>Ingredients</h2>
                            </div>
                        </div>

                        <div className="ingredients-list">
                            {recipe.ingredients.map((ingredient, index) => (
                                <div className="ingredient-item" key={ingredient}>
                                    <span className="ingredient-number">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span>{ingredient}</span>

                                    <Check size={16} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="cooking-section">
                        <div className="details-section-heading">
                            <span>02</span>
                            <div>
                                <small>HOW TO MAKE IT</small>
                                <h2>Cooking method</h2>
                            </div>
                        </div>

                        <div className="cooking-steps">
                            <CookingStep
                                number="01"
                                title="Prepare your ingredients"
                                description="Gather all ingredients and prepare them according to the recipe requirements."
                            />

                            <CookingStep
                                number="02"
                                title="Start cooking"
                                description="Follow the cooking process carefully and combine the ingredients at the right time."
                            />

                            <CookingStep
                                number="03"
                                title="Serve & enjoy"
                                description="Finish your dish, plate it beautifully and enjoy your freshly prepared meal."
                            />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

function CookingStep({ number, title, description }) {
    return (
        <div className="cooking-step">
            <div className="step-number">{number}</div>

            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

function ChefHatIcon() {
    return (
        <div className="chef-hat-icon">
            🍳
        </div>
    );
}

export default RecipeDetails;