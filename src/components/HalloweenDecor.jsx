
import { useLocation } from "react-router-dom";
import "../styles/halloween.css";

function SpiderWeb({ className = "" }) {
    return (
        <svg
            className={`halloween-web ${className}`}
            viewBox="0 0 180 180"
            fill="none"
            aria-hidden="true"
        >
            <g
                stroke="currentColor"
                strokeWidth="1.15"
                strokeLinecap="round"
                opacity="0.78"
            >
                <path d="M0 0 L180 180 M0 0 L180 120 M0 0 L180 60 M0 0 L120 180 M0 0 L60 180 M0 0 L0 180 M0 0 L180 0" />
                <path d="M0 28 Q76 18 28 0 M0 58 Q105 42 58 0 M0 88 Q133 68 88 0 M0 118 Q160 91 118 0 M0 148 Q178 119 148 0" />
                <path d="M28 0 Q18 76 0 28 M58 0 Q42 105 0 58 M88 0 Q68 133 0 88 M118 0 Q91 160 0 118 M148 0 Q119 178 0 148" />
            </g>
        </svg>
    );
}

function HangingSpider({ className = "" }) {
    return (
        <div
            className={`halloween-spider ${className}`}
            aria-hidden="true"
        >
            <span className="spider-thread" />
            <svg viewBox="0 0 42 48" fill="none">
                <g
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                >
                    <path d="M15 20 L7 15 L3 19 M13 24 L5 25 L2 31 M15 28 L8 35 L5 41" />
                    <path d="M27 20 L35 15 L39 19 M29 24 L37 25 L40 31 M27 28 L34 35 L37 41" />
                </g>
                <ellipse cx="21" cy="26" rx="10" ry="11" fill="currentColor" />
                <circle cx="21" cy="13" r="7" fill="currentColor" />
                <circle cx="18.5" cy="12" r="1.4" fill="#f7dce4" />
                <circle cx="23.5" cy="12" r="1.4" fill="#f7dce4" />
            </svg>
        </div>
    );
}

export default function HalloweenDecor() {
    const { pathname } = useLocation();

    const hideOnThesePages =
        pathname === "/login" || pathname.startsWith("/admin");

    if (hideOnThesePages) return null;

    return (
        <div className="halloween-decor" aria-hidden="true">
    <SpiderWeb className="web-left" />
    <SpiderWeb className="web-right" />
    


            <HangingSpider className="spider-left" />
            <HangingSpider className="spider-right" />

            <span className="halloween-star star-one">✦</span>
            <span className="halloween-star star-two">✧</span>
            <span className="halloween-star star-three">✦</span>
        </div>
    );
}
