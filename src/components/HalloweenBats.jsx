
import { useLocation } from "react-router-dom";
import "../styles/halloween-bats.css";


const bats = [
    { position: "bat-2", delay: "-2s", size: 20 },
    { position: "bat-6", delay: "-5s", size: 18 },
    { position: "bat-12", delay: "-2.2s", size: 16 },
];


function Bat({ size }) {
    return (
        <svg
            width={size}
            height={size * 0.62}
            viewBox="0 0 64 40"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M32 12 L26 5 L25 16 C18 9 9 8 2 2 L6 18 L0 14 C5 29 15 34 25 28 L32 36 L39 28 C49 34 59 29 64 14 L58 18 L62 2 C55 8 46 9 39 16 L38 5 Z" />
        </svg>
    );
}

export default function HalloweenBats() {
    const { pathname } = useLocation();

    if (pathname === "/login" || pathname.startsWith("/admin")) {
        return null;
    }

    return (
        <div className="halloween-bats" aria-hidden="true">
            {bats.map((bat) => (
                <span
                    key={bat.position}
                    className={`halloween-bats__bat ${bat.position}`}
                    style={{
                        animationDelay: bat.delay,
                        "--bat-size": `${bat.size}px`,
                    }}
                >
                    <Bat size={bat.size} />
                </span>
            ))}
        </div>
    );
}
