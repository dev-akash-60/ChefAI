const STORAGE_KEY = "recipe-app-meal-planner";

export const mealTypes = [
    {
        id: "breakfast",
        label: "Breakfast",
        icon: "☀️",
    },
    {
        id: "lunch",
        label: "Lunch",
        icon: "🥗",
    },
    {
        id: "dinner",
        label: "Dinner",
        icon: "🍽️",
    },
    {
        id: "snack",
        label: "Snack",
        icon: "🍰",
    },
];

export const getWeekDays = () => {
    const days = [];

    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);

        date.setDate(today.getDate() + i);

        days.push({
            id: date.toISOString().split("T")[0],
            date,
            dayName: date.toLocaleDateString("en-US", {
                weekday: "short",
            }),
            dayNumber: date.getDate(),
            month: date.toLocaleDateString("en-US", {
                month: "short",
            }),
        });
    }

    return days;
};

export const getPlanner = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        return saved ? JSON.parse(saved) : {};
    } catch (error) {
        console.error("Failed to load meal planner:", error);
        return {};
    }
};

export const savePlanner = (planner) => {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(planner)
    );
};

export const addMeal = (
    planner,
    dayId,
    mealType,
    recipe
) => {
    const updatedPlanner = {
        ...planner,
        [dayId]: {
            ...(planner[dayId] || {}),
            [mealType]: recipe,
        },
    };

    savePlanner(updatedPlanner);

    return updatedPlanner;
};

export const removeMeal = (
    planner,
    dayId,
    mealType
) => {
    const updatedPlanner = {
        ...planner,
    };

    if (updatedPlanner[dayId]) {
        const day = {
            ...updatedPlanner[dayId],
        };

        delete day[mealType];

        if (Object.keys(day).length === 0) {
            delete updatedPlanner[dayId];
        } else {
            updatedPlanner[dayId] = day;
        }
    }

    savePlanner(updatedPlanner);

    return updatedPlanner;
};

export const clearPlanner = () => {
    localStorage.removeItem(STORAGE_KEY);
};