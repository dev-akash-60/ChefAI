import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import {
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Plus,
    Clock3,
    Utensils,
    ShoppingCart,
    Sparkles,
    X,
} from "lucide-react";

import Navbar from "../components/Navbar";
import "../styles/mealPlanner.css";

const meals = [
    {
        id: 1,
        day: "Monday",
        date: "5",
        type: "Breakfast",
        title: "Avocado Toast",
        time: "10 min",
        image:
            "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=900&q=85",
    },
    {
        id: 2,
        day: "Monday",
        date: "5",
        type: "Lunch",
        title: "Creamy Pasta",
        time: "25 min",
        image:
            "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=85",
    },
    {
        id: 3,
        day: "Tuesday",
        date: "6",
        type: "Dinner",
        title: "Grilled Salmon",
        time: "30 min",
        image:
            "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=85",
    },
    {
        id: 4,
        day: "Wednesday",
        date: "7",
        type: "Breakfast",
        title: "Berry Pancakes",
        time: "20 min",
        image:
            "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=85",
    },
    {
        id: 5,
        day: "Thursday",
        date: "8",
        type: "Lunch",
        title: "Healthy Buddha Bowl",
        time: "20 min",
        image:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
    },
    {
        id: 6,
        day: "Friday",
        date: "9",
        type: "Dinner",
        title: "Chicken Teriyaki",
        time: "35 min",
        image:
            "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
    },
];

const weekDays = [
    { day: "Monday", date: "5" },
    { day: "Tuesday", date: "6" },
    { day: "Wednesday", date: "7" },
    { day: "Thursday", date: "8" },
    { day: "Friday", date: "9" },
    { day: "Saturday", date: "10" },
    { day: "Sunday", date: "11" },
];

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

function MealPlanner() {
    const navigate = useNavigate();

    const [plannedMeals, setPlannedMeals] = useState(meals);
    const [selectedDay, setSelectedDay] = useState("Monday");
    const [showModal, setShowModal] = useState(false);
    const [selectedType, setSelectedType] = useState("Breakfast");

    useEffect(() => {
        gsap.fromTo(
            ".planner-hero-content > *",
            {
                opacity: 0,
                y: 35,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: "power3.out",
            }
        );

        gsap.fromTo(
            ".planner-day",
            {
                opacity: 0,
                y: 25,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.07,
                delay: 0.35,
                ease: "power3.out",
            }
        );
    }, []);

    const getMeal = (day, type) => {
        return plannedMeals.find(
            (meal) => meal.day === day && meal.type === type
        );
    };

    const addMeal = (type) => {
        setSelectedType(type);
        setShowModal(true);
    };

    const chooseMeal = (recipe) => {
        const newMeal = {
            ...recipe,
            id: Date.now(),
            day: selectedDay,
            type: selectedType,
        };

        setPlannedMeals((prev) => [
            ...prev.filter(
                (meal) =>
                    !(
                        meal.day === selectedDay &&
                        meal.type === selectedType
                    )
            ),
            newMeal,
        ]);

        setShowModal(false);
    };

    const removeMeal = (day, type) => {
        setPlannedMeals((prev) =>
            prev.filter(
                (meal) => !(meal.day === day && meal.type === type)
            )
        );
    };

    return (
        <div className="planner-page">
            <Navbar />

            {/* Background */}
            <div className="planner-glow planner-glow-one"></div>
            <div className="planner-glow planner-glow-two"></div>

            {/* HERO */}
            <section className="planner-hero">
                <div className="planner-hero-content">

                    <div className="planner-eyebrow">
                        <span></span>
                        SMART MEAL PLANNING
                    </div>

                    <h1>
                        Plan your week.
                        <br />
                        <em>Eat better.</em>
                    </h1>

                    <p>
                        Organize your meals, discover new recipes and keep
                        your entire week deliciously under control.
                    </p>

                    <div className="planner-actions">
                        <button
                            className="planner-primary"
                            onClick={() => addMeal("Breakfast")}
                        >
                            <Plus size={17} />
                            Add Meal
                        </button>

                        <button
                            className="planner-secondary"
                            onClick={() => navigate("/recipes")}
                        >
                            <Utensils size={16} />
                            Browse Recipes
                        </button>

                        <button
                            className="shopping-button"
                            onClick={() => navigate("/shopping-list")}
                        >
                            <ShoppingCart size={17} />
                            Shopping List
                        </button>
                    </div>

                </div>
            </section>

            {/* WEEK HEADER */}
            <section className="planner-container">

                <div className="planner-topbar">

                    <div>
                        <span className="planner-label">
                            YOUR WEEK
                        </span>

                        <h2>
                            October 5 — October 11
                        </h2>
                    </div>

                    <div className="week-controls">
                        <button>
                            <ChevronLeft size={18} />
                        </button>

                        <button className="today-button">
                            This Week
                        </button>

                        <button>
                            <ChevronRight size={18} />
                        </button>
                    </div>

                </div>


                {/* DAY SELECTOR */}
                <div className="day-selector">

                    {weekDays.map((item) => (
                        <button
                            key={item.day}
                            className={`day - tab ${
    selectedDay === item.day
        ? "active"
        : ""
} `}
                            onClick={() =>
                                setSelectedDay(item.day)
                            }
                        >
                            <span>{item.day.slice(0, 3)}</span>
                            <strong>{item.date}</strong>
                        </button>
                    ))}

                </div>


                {/* DESKTOP MEAL GRID */}
                <div className="meal-planner-grid">

                    {weekDays.map((day) => (
                        <div
                            className={`planner - day ${
    selectedDay === day.day
        ? "selected"
        : ""
} `}
                            key={day.day}
                        >

                            <div className="planner-day-header">
                                <div>
                                    <span>
                                        {day.day}
                                    </span>

                                    <strong>
                                        {day.date}
                                    </strong>
                                </div>

                                <CalendarDays size={17} />
                            </div>


                            <div className="meal-slots">

                                {mealTypes.map((type) => {
                                    const meal = getMeal(
                                        day.day,
                                        type
                                    );

                                    return (
                                        <div
                                            className="meal-slot"
                                            key={type}
                                        >

                                            <div className="meal-type">
                                                {type}
                                            </div>

                                            {meal ? (
                                                <div className="planned-meal">

                                                    <img
                                                        src={meal.image}
                                                        alt={meal.title}
                                                    />

                                                    <div className="meal-info">
                                                        <strong>
                                                            {meal.title}
                                                        </strong>

                                                        <span>
                                                            <Clock3
                                                                size={12}
                                                            />
                                                            {meal.time}
                                                        </span>
                                                    </div>

                                                    <button
                                                        className="remove-meal"
                                                        onClick={() =>
                                                            removeMeal(
                                                                day.day,
                                                                type
                                                            )
                                                        }
                                                    >
                                                        <X size={13} />
                                                    </button>

                                                </div>
                                            ) : (
                                                <button
                                                    className="empty-meal"
                                                    onClick={() => {
                                                        setSelectedDay(
                                                            day.day
                                                        );
                                                        addMeal(type);
                                                    }}
                                                >
                                                    <Plus size={15} />
                                                    Add meal
                                                </button>
                                            )}

                                        </div>
                                    );
                                })}

                            </div>

                        </div>
                    ))}

                </div>


                {/* MOBILE SELECTED DAY */}
                <div className="mobile-day-plan">

                    <div className="mobile-plan-heading">
                        <div>
                            <span>
                                {selectedDay}
                            </span>

                            <h3>
                                Your meals
                            </h3>
                        </div>

                        <Sparkles size={20} />
                    </div>

                    {mealTypes.map((type) => {
                        const meal = getMeal(
                            selectedDay,
                            type
                        );

                        return (
                            <div
                                className="mobile-meal-row"
                                key={type}
                            >
                                <span>{type}</span>

                                {meal ? (
                                    <div className="mobile-planned-meal">

                                        <img
                                            src={meal.image}
                                            alt={meal.title}
                                        />

                                        <strong>
                                            {meal.title}
                                        </strong>

                                        <button
                                            onClick={() =>
                                                removeMeal(
                                                    selectedDay,
                                                    type
                                                )
                                            }
                                        >
                                            <X size={15} />
                                        </button>

                                    </div>
                                ) : (
                                    <button
                                        className="mobile-add"
                                        onClick={() =>
                                            addMeal(type)
                                        }
                                    >
                                        <Plus size={15} />
                                        Add
                                    </button>
                                )}
                            </div>
                        );
                    })}

                </div>

            </section>


            {/* SUMMARY */}
            <section className="planner-summary">

                <div className="summary-card">
                    <span>PLANNED MEALS</span>
                    <strong>{plannedMeals.length}</strong>
                </div>

                <div className="summary-card">
                    <span>RECIPES</span>
                    <strong>
                        {new Set(
                            plannedMeals.map(
                                (meal) => meal.title
                            )
                        ).size}
                    </strong>
                </div>

                <div className="summary-card">
                    <span>MEAL DAYS</span>
                    <strong>
                        {
                            new Set(
                                plannedMeals.map(
                                    (meal) => meal.day
                                )
                            ).size
                        }
                    </strong>
                </div>

                <div className="summary-card summary-highlight">
                    <CalendarDays size={20} />
                    <div>
                        <strong>
                            Your week is taking shape
                        </strong>
                        <span>
                            Keep adding meals to complete your plan.
                        </span>
                    </div>
                </div>

            </section>


            {/* ADD MEAL MODAL */}
            {showModal && (
                <div
                    className="meal-modal-overlay"
                    onClick={() => setShowModal(false)}
                >

                    <div
                        className="meal-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            className="modal-close"
                            onClick={() =>
                                setShowModal(false)
                            }
                        >
                            <X size={19} />
                        </button>

                        <span className="planner-label">
                            ADD TO {selectedDay.toUpperCase()}
                        </span>

                        <h2>
                            Choose a recipe
                        </h2>

                        <p>
                            Select a recipe for your{" "}
                            <strong>
                                {selectedType}
                            </strong>.
                        </p>

                        <div className="recipe-selection">

                            {[
                                ...meals,
                                {
                                    id: 99,
                                    title: "Spicy Ramen",
                                    time: "25 min",
                                    image:
                                        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=85",
                                },
                                {
                                    id: 100,
                                    title: "Chicken Salad",
                                    time: "15 min",
                                    image:
                                        "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=85",
                                },
                            ]
                                .slice(0, 6)
                                .map((recipe) => (
                                    <button
                                        className="recipe-choice"
                                        key={recipe.id}
                                        onClick={() =>
                                            chooseMeal(
                                                recipe
                                            )
                                        }
                                    >
                                        <img
                                            src={
                                                recipe.image
                                            }
                                            alt={
                                                recipe.title
                                            }
                                        />

                                        <div>
                                            <strong>
                                                {
                                                    recipe.title
                                                }
                                            </strong>

                                            <span>
                                                <Clock3
                                                    size={12}
                                                />
                                                {
                                                    recipe.time
                                                }
                                            </span>
                                        </div>

                                        <Plus size={16} />
                                    </button>
                                ))}

                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default MealPlanner;

