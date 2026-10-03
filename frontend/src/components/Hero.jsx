import { useState } from "react";
import { ArrowRight, Clock3, Play, Search, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/hero.css";

function Hero() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const handleSearch = (event) => {
        event.preventDefault();

        const query = search.trim();

        if (!query) {
            navigate("/recipes");
            return;
        }

        navigate(`/recipes?search=${encodeURIComponent(query)}`);
    };

    return (
        <section className="hero" id="discover">
            <div className="hero-glow hero-glow-one" />
            <div className="hero-glow hero-glow-two" />

            <div className="hero-content">
                <div className="hero-copy">
                    <div className="hero-eyebrow">
                        <span className="eyebrow-dot" />
                        AI-POWERED RECIPE DISCOVERY
                        <span>✦</span>
                    </div>

                    <h1 className="hero-title">
                        <span className="hero-title-line">
                            Cook <em>smarter.</em>
                        </span>

                        <span className="hero-title-line">
                            Eat <strong>better.</strong>
                        </span>
                    </h1>

                    <p className="hero-description">
                        Discover recipes you'll actually love, organize your ingredients,
                        plan your meals and let AI help you create something delicious.
                    </p>

                    <form className="hero-search" onSubmit={handleSearch}>
                        <Search size={20} />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search recipes, ingredients..."
                        />

                        <button type="submit">
                            <ArrowRight size={19} />
                        </button>
                    </form>

                    <div className="hero-buttons">
                        <button
                            className="primary-cta"
                            onClick={() => navigate("/recipes")}
                        >
                            Explore Recipes
                            <ArrowRight size={17} />
                        </button>

                        <button className="secondary-cta">
                            <span className="play-button">
                                <Play size={12} fill="currentColor" />
                            </span>
                            See how it works
                        </button>
                    </div>

                    <div className="hero-stats">
                        <div>
                            <strong>10K+</strong>
                            <span>Recipes</span>
                        </div>

                        <i />

                        <div>
                            <strong>4.9</strong>
                            <span>Rating</span>
                        </div>

                        <i />

                        <div>
                            <strong>24/7</strong>
                            <span>AI Kitchen</span>
                        </div>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="hero-ring ring-large" />
                    <div className="hero-ring ring-small" />

                    <div className="floating-ingredient ingredient-one">🍅</div>
                    <div className="floating-ingredient ingredient-two">🍋</div>
                    <div className="floating-ingredient ingredient-three">🌿</div>
                    <div className="floating-ingredient ingredient-four">🥑</div>

                    <div className="hero-food">
                        <img
                            src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1000&q=90"
                            alt="Fresh healthy food"
                        />

                        <div className="food-gradient" />

                        <div className="food-rating">
                            <div className="rating-star">
                                <Star size={15} fill="currentColor" />
                            </div>

                            <div>
                                <strong>4.9</strong>
                                <small>2.4k reviews</small>
                            </div>
                        </div>

                        <div className="food-time">
                            <Clock3 size={15} />
                            20 min
                        </div>
                    </div>
                </div>
            </div>

            <div className="scroll-hint">
                <span>SCROLL TO EXPLORE</span>
                <div />
            </div>
        </section>
    );
}

export default Hero;