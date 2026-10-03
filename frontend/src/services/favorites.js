const FAVORITES_KEY = "chefai_favorites";

export function getFavorites() {
    try {
        const saved = localStorage.getItem(FAVORITES_KEY);

        if (!saved) {
            return [];
        }

        const parsed = JSON.parse(saved);

        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error("Error reading favorites:", error);
        return [];
    }
}

export function isFavorite(recipeId) {
    const favorites = getFavorites();

    return favorites.some(
        (recipe) => String(recipe.id) === String(recipeId)
    );
}

export function addFavorite(recipe) {
    const favorites = getFavorites();

    const exists = favorites.some(
        (item) => String(item.id) === String(recipe.id)
    );

    if (exists) {
        return favorites;
    }

    const updated = [...favorites, recipe];

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updated)
    );

    window.dispatchEvent(new Event("favoritesUpdated"));

    return updated;
}

export function removeFavorite(recipeId) {
    const favorites = getFavorites();

    const updated = favorites.filter(
        (recipe) => String(recipe.id) !== String(recipeId)
    );

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updated)
    );

    window.dispatchEvent(new Event("favoritesUpdated"));

    return updated;
}

export function toggleFavorite(recipe) {
    if (isFavorite(recipe.id)) {
        return removeFavorite(recipe.id);
    }

    return addFavorite(recipe);
}