import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import gsap from "gsap";

import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import recipes from "../data/recipes.js";
import "../styles/recipes.css";

const categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Healthy",
    "Italian",
    "Indian",
    "Dessert",
];

function Recipes() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const initialSearch = searchParams.get("search") || "";

    const [search, setSearch] = useState(initialSearch);
    const [activeCategory, setActiveCategory] = useState("All");

    const pageRef = useRef(null);
    const cardsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".recipes-hero-content > *", {
                y: 35,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out",
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    const filteredRecipes = useMemo(() => {
        const query = search.trim().toLowerCase();

        return recipes.filter((recipe) => {
            const matchesSearch =
                !query ||
                recipe.title.toLowerCase().includes(query) ||
                recipe.category.toLowerCase().includes(query) ||
                recipe.description.toLowerCase().includes(query) ||
                recipe.ingredients.some((ingredient) =>
                    ingredient.toLowerCase().includes(query)
                );

            const matchesCategory =
                activeCategory === "All" ||
                recipe.category.toLowerCase() === activeCategory.toLowerCase();

            return matchesSearch && matchesCategory;
        });
    }, [search, activeCategory]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!cardsRef.current) return;

            gsap.fromTo(
                ".recipe-result-card",
                {
                    y: 35,
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
        }, cardsRef);

        return () => ctx.revert();
    }, [filteredRecipes]);

    const handleSearch = (event) => {
        event.preventDefault();

        const trimmedSearch = search.trim();

        if (trimmedSearch) {
            setSearchParams({ search: trimmedSearch });
        } else {
            setSearchParams({});
        }
    };

    const clearSearch = () => {
        setSearch("");
        setSearchParams({});
    };

    return (
        <div ref={pageRef} className="recipes-page">
            <Navbar />

            <main>
                <section className="recipes-hero">
                    <div className="recipes-hero-glow recipes-glow-one" />
                    <div className="recipes-hero-glow recipes-glow-two" />

                    <button
                        className="recipes-back-button"
                        onClick={() => navigate("/")}
                    >
                        <ArrowLeft size={17} />
                        Back to home
                    </button>

                    <div className="recipes-hero-content">
                        <div className="recipes-eyebrow">
                            <span />
                            CHEFAI DISCOVERY
                            <Sparkles size={14} />
                        </div>

                        <h1>
                            Discover something
                            <br />
                            <em>delicious.</em>
                        </h1>

                        <p>
                            Search recipes, ingredients and cuisines. Find your next
                            favorite meal without sacrificing half your lifespan to
                            scrolling.
                        </p>

                        <form className="recipes-search" onSubmit={handleSearch}>
                            <Search size={21} />

                            <input
                                type="text"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search recipes, ingredients..."
                            />

                            {search && (
                                <button
                                    type="button"
                                    className="clear-search"
                                    onClick={clearSearch}
                                    aria-label="Clear search"
                                >
                                    <X size={17} />
                                </button>
                            )}

                            <button type="submit" className="recipes-search-button">
                                Search
                            </button>
                        </form>
                    </div>
                </section>

                <section className="recipes-content">
                    <div className="recipes-toolbar">
                        <div>
                            <span className="recipes-section-label">EXPLORE</span>

                            <h2>
                                {search
                                    ? `Results for "${search}"`
                                    : "Recipes worth making"}
                            </h2>

                            <p>
                                {filteredRecipes.length}{" "}
                                {filteredRecipes.length === 1 ? "recipe" : "recipes"} found
                            </p>
                        </div>

                        <button className="filter-button">
                            <SlidersHorizontal size={17} />
                            Filters
                        </button>
                    </div>

                    <div className="category-filters">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={
                                    activeCategory === category
                                        ? "category-filter active"
                                        : "category-filter"
                                }
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {filteredRecipes.length > 0 ? (
                        <div ref={cardsRef} className="recipe-results-grid">
                            {filteredRecipes.map((recipe) => (
                                <div className="recipe-result-card" key={recipe.id}>
                                    <RecipeCard recipe={recipe} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-recipes">
                            <div className="empty-icon">
                                <Search size={30} />
                            </div>

                            <h3>No recipes found</h3>

                            <p>
                                Try another recipe name, ingredient or cuisine.
                            </p>

                            <button onClick={clearSearch}>
                                Show all recipes
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default Recipes;