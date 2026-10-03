recipe-ai/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── RecipeCard.jsx
│   │   │   ├── RecipeGrid.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── CategorySlider.jsx
│   │   │   ├── AIOrb.jsx
│   │   │   ├── AIChat.jsx
│   │   │   ├── PantryItem.jsx
│   │   │   ├── MealSlot.jsx
│   │   │   └── ShoppingItem.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Explore.jsx
│   │   │   ├── RecipeDetails.jsx
│   │   │   ├── AIKitchen.jsx
│   │   │   ├── Favorites.jsx
│   │   │   ├── Pantry.jsx
│   │   │   ├── MealPlanner.jsx
│   │   │   ├── ShoppingList.jsx
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── animations/
│   │   │   ├── pageAnimations.js
│   │   │   ├── cardAnimations.js
│   │   │   └── scrollAnimations.js
│   │   │
│   │   ├── context/
│   │   │   ├── FavoritesContext.jsx
│   │   │   ├── PantryContext.jsx
│   │   │   └── MealPlanContext.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── recipeAPI.js
│   │   │   └── aiAPI.js
│   │   │
│   │   ├── data/
│   │   │   └── recipes.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   │   ├── aiController.js
│   │   └── recipeController.js
│   │
│   ├── routes/
│   │   ├── aiRoutes.js
│   │   └── recipeRoutes.js
│   │
│   ├── services/
│   │   └── geminiService.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Recipe.js
│   │   └── MealPlan.js
│   │
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md