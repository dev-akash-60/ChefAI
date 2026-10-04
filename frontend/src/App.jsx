import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites";
import Pantry from "./pages/Pantry";
import MealPlanner from "./pages/MealPlanner";
import AIKitchen from "./pages/AIKitchen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/recipes" element={<Recipes />} />

        <Route
          path="/recipe/:id"
          element={<RecipeDetails />}
        />

        <Route
          path="/favorites"
          element={<Favorites />}
        />

        <Route
          path="/pantry"
          element={<Pantry />}
        />
        
        <Route
          path="/meal-planner"
          element={<MealPlanner />}
        />
        <Route path="/ai-kitchen" element={<AIKitchen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;