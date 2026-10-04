import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
    Sparkles,
    Send,
    ChefHat,
    Bot,
    User,
    RotateCcw,
    WandSparkles,
    Utensils,
    Clock3,
    Leaf,
} from "lucide-react";

import Navbar from "../components/Navbar";
import "../styles/aiKitchen.css";

function AIKitchen() {
    const pageRef = useRef(null);
    const messagesRef = useRef(null);

    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [messages, setMessages] = useState([
        {
            role: "ai",
            text: "Hello! I'm ChefAI. Tell me what ingredients you have, what you're craving, or what you'd like to cook today.",
        },
    ]);

    const suggestions = [
        {
            icon: <Utensils size={17} />,
            text: "What can I cook with chicken and rice?",
        },
        {
            icon: <Leaf size={17} />,
            text: "Suggest a healthy dinner",
        },
        {
            icon: <Clock3 size={17} />,
            text: "Give me a 20-minute recipe",
        },
        {
            icon: <WandSparkles size={17} />,
            text: "Create something creative",
        },
    ];

    // Page animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".ai-kitchen-header", {
                opacity: 0,
                y: 35,
                duration: 0.9,
                ease: "power3.out",
            });

            gsap.from(".ai-kitchen-panel", {
                opacity: 0,
                y: 50,
                duration: 1,
                delay: 0.15,
                ease: "power3.out",
            });

            gsap.from(".ai-suggestion-card", {
                opacity: 0,
                y: 20,
                stagger: 0.08,
                duration: 0.6,
                delay: 0.35,
                ease: "power2.out",
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    // Automatically scroll to newest message
    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTo({
                top: messagesRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    // Suggestion click
    const handleSuggestion = (text) => {
        setInput(text);
    };

    // Send message to backend
    const handleSend = async () => {
        const message = input.trim();

        if (!message || isLoading) {
            return;
        }

        // Add user message
        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                text: message,
            },
        ]);

        setInput("");
        setIsLoading(true);

        // Add temporary thinking message
        setMessages((prev) => [
            ...prev,
            {
                role: "ai",
                text: "Thinking...",
                loading: true,
            },
        ]);

        try {
            const response = await fetch(
                "https://chefai-3npk.onrender.com",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "AI request failed."
                );
            }

            // Replace "Thinking..." with Gemini response
            setMessages((prev) => {
                const updated = [...prev];

                updated[updated.length - 1] = {
                    role: "ai",
                    text: data.reply,
                };

                return updated;
            });
        } catch (error) {
            console.error("AI Kitchen error:", error);

            // Replace "Thinking..." with error message
            setMessages((prev) => {
                const updated = [...prev];

                updated[updated.length - 1] = {
                    role: "ai",
                    text:
                        "I couldn't connect to the kitchen right now. Please make sure the ChefAI backend is running.",
                };

                return updated;
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Enter = send
    // Shift + Enter = new line
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Clear conversation
    const clearChat = () => {
        setMessages([
            {
                role: "ai",
                text: "Fresh kitchen, fresh ideas. What are we cooking today?",
            },
        ]);

        setInput("");
        setIsLoading(false);
    };

    return (
        <div ref={pageRef} className="ai-kitchen-page">
            <Navbar />

            <main className="ai-kitchen-main">

                {/* HEADER */}

                <section className="ai-kitchen-header">

                    <div className="ai-kitchen-badge">
                        <span className="ai-live-dot"></span>
                        GEMINI POWERED
                    </div>

                    <h1>
                        Your kitchen,
                        <br />
                        <em>with intelligence.</em>
                    </h1>

                    <p>
                        Ask ChefAI anything about cooking, recipes,
                        ingredients, substitutions, nutrition, or meal ideas.
                    </p>

                </section>

                {/* MAIN AI PANEL */}

                <section className="ai-kitchen-panel">

                    <div className="ai-panel-top">

                        <div className="ai-identity">

                            <div className="ai-avatar">
                                <ChefHat size={21} />
                            </div>

                            <div>
                                <strong>ChefAI</strong>

                                <span>
                                    <i></i>
                                    {isLoading ? "Thinking..." : "Online"}
                                </span>
                            </div>

                        </div>

                        <button
                            className="clear-chat"
                            onClick={clearChat}
                        >
                            <RotateCcw size={15} />
                            New Chat
                        </button>

                    </div>

                    {/* CHAT */}

                    <div
                        ref={messagesRef}
                        className="ai-chat"
                    >

                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`chat-message ${message.role === "user"
                                        ? "user-message"
                                        : "ai-message"
                                    }`}
                            >

                                <div className="message-avatar">

                                    {message.role === "user" ? (
                                        <User size={16} />
                                    ) : (
                                        <Bot size={17} />
                                    )}

                                </div>

                                <div className="message-content">

                                    <span className="message-name">
                                        {message.role === "user"
                                            ? "You"
                                            : "ChefAI"}
                                    </span>

                                    <p
                                        className={
                                            message.loading
                                                ? "ai-thinking"
                                                : ""
                                        }
                                    >
                                        {message.text}
                                    </p>

                                </div>

                            </div>
                        ))}

                    </div>

                    {/* INPUT */}

                    <div className="ai-input-area">

                        <textarea
                            value={input}
                            onChange={(e) =>
                                setInput(e.target.value)
                            }
                            onKeyDown={handleKeyDown}
                            placeholder={
                                isLoading
                                    ? "ChefAI is thinking..."
                                    : "Ask ChefAI what you want to cook..."
                            }
                            rows="1"
                            disabled={isLoading}
                        />

                        <button
                            className="ai-send-button"
                            onClick={handleSend}
                            disabled={
                                isLoading || !input.trim()
                            }
                            aria-label="Send message"
                        >
                            <Send size={18} />
                        </button>

                    </div>

                    <div className="ai-input-hint">
                        Press Enter to send
                    </div>

                </section>

                {/* SUGGESTIONS */}

                <section className="ai-suggestions">

                    <div className="suggestions-heading">
                        <Sparkles size={15} />
                        <span>Try asking ChefAI</span>
                    </div>

                    <div className="ai-suggestion-grid">

                        {suggestions.map((item, index) => (
                            <button
                                key={index}
                                className="ai-suggestion-card"
                                onClick={() =>
                                    handleSuggestion(item.text)
                                }
                                disabled={isLoading}
                            >

                                <span className="suggestion-icon">
                                    {item.icon}
                                </span>

                                <span>{item.text}</span>

                            </button>
                        ))}

                    </div>

                </section>

            </main>
        </div>
    );
}

export default AIKitchen;
