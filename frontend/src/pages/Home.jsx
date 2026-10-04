import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySlider from "../components/CategorySlider";
import RecipeGrid from "../components/RecipeGrid";
import AIOrb from "../components/AIOrb";
import "../styles/home.css";

gsap.registerPlugin(ScrollTrigger);

function Home() {
    const pageRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const timeline = gsap.timeline({
                defaults: {
                    ease: "power4.out",
                },
            });

            timeline
                
                .from(
                    ".hero-eyebrow",
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.6,
                    },
                    "-=0.3"
                )
                .from(
                    ".hero-title-line",
                    {
                        yPercent: 110,
                        opacity: 0,
                        stagger: 0.12,
                        duration: 1,
                    },
                    "-=0.2"
                )
                .from(
                    ".hero-description",
                    {
                        y: 25,
                        opacity: 0,
                        duration: 0.7,
                    },
                    "-=0.5"
                )
                .from(
                    ".hero-search",
                    {
                        y: 25,
                        scale: 0.95,
                        opacity: 0,
                        duration: 0.8,
                    },
                    "-=0.45"
                )
                .from(
                    ".hero-buttons",
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.6,
                    },
                    "-=0.5"
                )
                .from(
                    ".hero-visual",
                    {
                        scale: 0.82,
                        opacity: 0,
                        rotate: 4,
                        duration: 1.2,
                    },
                    "-=0.8"
                )
                .from(
                    ".floating-ingredient",
                    {
                        scale: 0,
                        opacity: 0,
                        stagger: 0.1,
                        duration: 0.5,
                    },
                    "-=0.8"
                );

            gsap.utils.toArray(".scroll-reveal").forEach((element) => {
                gsap.from(element, {
                    y: 70,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 82%",
                    },
                });
            });

            gsap.to(".hero-glow", {
                scale: 1.15,
                opacity: 0.7,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(".floating-ingredient", {
                y: -15,
                rotate: 5,
                duration: 2.8,
                repeat: -1,
                yoyo: true,
                stagger: 0.35,
                ease: "sine.inOut",
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef} className="app">
            <Navbar />

            <main>
                <Hero />

                <CategorySlider />

                <RecipeGrid />

                <section className="ai-section scroll-reveal" id="ai-kitchen">
                    <div className="ai-section-content">
                        <div className="section-label">
                            <span className="label-dot" />
                            AI KITCHEN
                        </div>

                        <h2>
                            Your ingredients.
                            <br />
                            <span>Our intelligence.</span>
                        </h2>

                        <p>
                            Tell ChefAI what you have in your kitchen and let Gemini
                            transform your ingredients into personalized recipes,
                            substitutions and cooking ideas.
                        </p>

                        <button className="ai-cta">
                            <span>✨</span>
                            Enter AI Kitchen
                            <span>→</span>
                        </button>
                    </div>

                    <AIOrb />
                </section>
            </main>

            <footer className="footer">
                <div className="footer-brand">
                    <div className="footer-logo">🍳</div>
                    <span>
                        Chef<span>AI</span>
                    </span>
                </div>

                <p>Cook smarter. Eat better.</p>

                <div className="footer-links">
                    <a href="#discover">Discover</a>
                    <a href="#recipes">Recipes</a>
                    <a href="#ai-kitchen">AI Kitchen</a>
                </div>
            </footer>
        </div>
    );
}

export default Home;