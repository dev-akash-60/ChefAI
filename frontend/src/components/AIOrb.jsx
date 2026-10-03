import "../styles/ai-orb.css";
import { ChefHat, Sparkles } from "lucide-react";

function AIOrb() {
    return (
        <div className="ai-orb-container">
            <div className="ai-orb">
                <div className="orb-ring orb-ring-one" />
                <div className="orb-ring orb-ring-two" />
                <div className="orb-ring orb-ring-three" />

                <div className="orb-core">
                    <ChefHat size={43} />
                    <Sparkles
                        size={17}
                        className="orb-sparkle"
                    />
                </div>
            </div>
        </div>
    );
}

export default AIOrb;