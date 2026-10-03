import "../styles/categories.css";
import {ArrowRight, CakeSlice, Coffee, Leaf, Soup, Utensils, Zap,} from "lucide-react";

const categories = [
    {
        name: "Breakfast",
        icon: Coffee,
    },
    {
        name: "Lunch",
        icon: Soup,
    },
    {
        name: "Dinner",
        icon: Utensils,
    },
    {
        name: "Dessert",
        icon: CakeSlice,
    },
    {
        name: "Healthy",
        icon: Leaf,
    },
    {
        name: "Quick Meals",
        icon: Zap,
    },
];

function CategorySlider() {
    return (
        <section
            className="section categories-section scroll-reveal"
            id="categories"
        >
            <div className="section-heading">
                <div>
                    <span className="section-label">EXPLORE</span>
                    <h2>What are you craving?</h2>
                </div>

                <button className="view-button">
                    View all
                    <ArrowRight size={16} />
                </button>
            </div>

            <div className="category-grid">
                {categories.map((category) => {
                    const Icon = category.icon;

                    return (
                        <div className="category-card" key={category.name}>
                            <div className="category-icon">
                                <Icon size={26} />
                            </div>

                            <div className="category-bottom">
                                <span>{category.name}</span>
                                <ArrowRight size={16} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default CategorySlider;