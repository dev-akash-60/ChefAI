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
            <a href="/" className="navbar-logo navbar-item">
                <div className="logo-icon">
                    <ChefHat size={19} />
                </div>

                <span>
                    Chef<span>AI</span>
                </span>
            </a>

            <div className="navbar-links">
                <a href="#discover" className="navbar-item active">
                    Discover
                </a>

                <a href="#recipes" className="navbar-item">
                    Recipes
                </a>

                <a href="#categories" className="navbar-item">
                    Categories
                </a>

                <a href="#ai-kitchen" className="navbar-item ai-link">
                    <Sparkles size={14} />
                    AI Kitchen
                </a>
            </div>

            <div className="navbar-actions">
                <button className="nav-icon navbar-item">
                    <Search size={18} />
                </button>

                <button
                    className="nav-icon navbar-item"
                    onClick={() => navigate("/favorites")}
                    aria-label="Favorites"
                >
                    <Heart size={18} />
                </button>

                <button className="sign-in navbar-item">
                    Sign In
                </button>

                <button className="mobile-menu">
                    <Menu size={21} />
                </button>
            </div>
        </nav>
    );
}

export default Navbar;