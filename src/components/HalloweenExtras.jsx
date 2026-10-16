
import "../styles/halloween-extras.css";

function Pumpkin({ className = "" }) {
    return (
        <svg
            className={className}
            viewBox="0 0 64 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Tallo */}
            <path
                d="M31 15 C29 10 31 6 36 4 C35 8 36 11 34 15"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
            />

            {/* Hoja */}
            <path
                d="M35 11 C40 5 47 8 47 8 C44 14 40 15 35 13"
                fill="currentColor"
                opacity="0.8"
            />

            {/* Cuerpo de la calabaza */}
            <path
                d="M32 17
                   C24 11 15 17 12 26
                   C7 40 17 53 26 53
                   C29 53 31 51 32 50
                   C34 52 37 53 40 53
                   C50 52 58 40 53 27
                   C50 17 41 12 32 17Z"
                fill="currentColor"
                fillOpacity="0.18"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinejoin="round"
            />

            {/* Relieves de la calabaza */}
            <path
                d="M32 18 C26 25 26 42 32 50
                   M32 18 C38 25 38 42 32 50
                   M19 22 C15 32 18 44 25 50
                   M45 22 C49 32 46 44 39 50"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0.8"
            />
        </svg>
    );
}

function HalloweenExtras() {
    return (
        <div className="halloween-extras" aria-hidden="true">
            {/* Lunitas existentes */}
            <span className="halloween-extra moon moon-one">☾</span>
            <span className="halloween-extra moon moon-two">☽</span>
            <span className="halloween-extra moon moon-three">☾</span>

            {/* Calabazas dibujadas */}
            <Pumpkin className="halloween-extra pumpkin pumpkin-one" />
            <Pumpkin className="halloween-extra pumpkin pumpkin-two" />
            <Pumpkin className="halloween-extra pumpkin pumpkin-three" />
            <Pumpkin className="halloween-extra pumpkin pumpkin-four" />
        </div>
    );
}

export default HalloweenExtras;
