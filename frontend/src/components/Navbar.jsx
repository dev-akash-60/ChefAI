import "../styles/navbar.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import {
    ChefHat,
    Heart,
    Search,
    Sparkles,
    Menu,
    CalendarDays,
} from "lucide-react";

function Navbar() {
    const navigate = useNavigate();
    const navbarRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                gsap.to(navbarRef.current, {
                    backgroundColor: "rgba(10, 10, 9, 0.82)",
                    backdropFilter: "blur(20px)",
                    borderColor: "rgba(255,255,255,0.08)",
                    duration: 0.3,
                });
            } else {
                gsap.to(navbarRef.current, {
                    backgroundColor: "transparent",
                    backdropFilter: "blur(0px)",
                    borderColor: "transparent",
                    duration: 0.3,
                });
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav ref={navbarRef} className="navbar">

            {/* LOGO */}
            <button
                className="navbar-logo navbar-item nav-link-button"
                onClick={() => navigate("/")}
            >
                <div className="logo-icon">
                    <ChefHat size={19} />
                </div>

                <span>
                    Chef<span>AI</span>
                </span>
            </button>


            {/* NAVIGATION */}
            <div className="navbar-links">

                {/* Discover */}
                <button
                    className="navbar-item nav-link-button"
                    onClick={() => navigate("/")}
                >
                    Discover
                </button>


                {/* Recipes */}
                <button
                    className="navbar-item nav-link-button"
                    onClick={() => navigate("/recipes")}
                >
                    Recipes
                </button>


                {/* Pantry */}
                <button
                    className="navbar-item nav-link-button"
                    onClick={() => navigate("/pantry")}
                >
                    Pantry
                </button>


                {/* Meal Planner */}
                <button
                    className="navbar-item nav-link-button meal-planner-link"
                    onClick={() => navigate("/meal-planner")}
                >
                    <CalendarDays size={14} />
                    Meal Planner
                </button>


                <button
                    className="navbar-item nav-link-button ai-link"
                    onClick={() => navigate("/ai-kitchen")}
                >
                    <Sparkles size={14} />
                    AI Kitchen
                </button>

            </div>


            {/* ACTIONS */}
            <div className="navbar-actions">

                {/* Search */}
                <button
                    className="nav-icon navbar-item"
                    onClick={() => navigate("/recipes")}
                    aria-label="Search recipes"
                >
                    <Search size={18} />
                </button>


                {/* Favorites */}
                <button
                    className="nav-icon navbar-item"
                    onClick={() => navigate("/favorites")}
                    aria-label="Favorites"
                >
                    <Heart size={18} />
                </button>


                {/* Sign In */}
                <button className="sign-in navbar-item">
                    Sign In
                </button>


                {/* Mobile Menu */}
                <button
                    className="mobile-menu"
                    aria-label="Open menu"
                >
                    <Menu size={21} />
                </button>

            </div>

        </nav>
    );
}

export default Navbar;

