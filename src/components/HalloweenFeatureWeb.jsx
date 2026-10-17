
export default function HalloweenFeatureWeb() {
    return (
        <div className="halloween-feature-web" aria-hidden="true">
            <svg
                className="halloween-feature-web__drawing"
                viewBox="0 0 360 300"
                fill="none"
                style={{
                    transform: "rotate(180deg)",
                }}
            >
                <g
                    stroke="currentColor"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {/* Radios principales */}
                    <path d="M180 0 L180 292" />
                    <path d="M180 0 L130 286" />
                    <path d="M180 0 L230 286" />
                    <path d="M180 0 L82 267" />
                    <path d="M180 0 L278 267" />
                    <path d="M180 0 L43 236" />
                    <path d="M180 0 L317 236" />
                    <path d="M180 0 L18 195" />
                    <path d="M180 0 L342 195" />
                    <path d="M180 0 L10 150" />
                    <path d="M180 0 L350 150" />
                    <path d="M180 0 L20 105" />
                    <path d="M180 0 L340 105" />
                    <path d="M180 0 L52 62" />
                    <path d="M180 0 L308 62" />

                    {/* Arcos superiores */}
                    <path d="M158 30 Q180 38 202 30" />
                    <path d="M145 45 Q180 56 215 45" />
                    <path d="M130 61 Q157 74 180 67 Q203 74 230 61" />
                    <path d="M115 78 Q148 91 180 82 Q212 91 245 78" />
                    <path d="M99 95 Q139 110 180 99 Q221 110 261 95" />

                    {/* Arcos centrales */}
                    <path d="M83 113 Q131 130 180 116 Q229 130 277 113" />
                    <path d="M67 132 Q122 151 180 134 Q238 151 293 132" />
                    <path d="M52 151 Q116 173 180 153 Q244 173 308 151" />
                    <path d="M39 171 Q109 194 180 173 Q251 194 321 171" />
                    <path d="M29 191 Q102 215 180 193 Q258 215 331 191" />

                    {/* Arcos inferiores */}
                    <path d="M27 211 Q101 236 180 214 Q259 236 333 211" />
                    <path d="M35 231 Q105 253 180 234 Q255 253 325 231" />
                    <path d="M49 250 Q113 270 180 253 Q247 270 311 250" />
                    <path d="M70 267 Q126 284 180 269 Q234 284 290 267" />
                    <path d="M105 282 Q145 293 180 282 Q215 293 255 282" />

                    {/* Uniones delicadas */}
                    <path d="M130 61 Q126 66 130 71" />
                    <path d="M230 61 Q234 66 230 71" />
                    <path d="M99 95 Q95 101 100 106" />
                    <path d="M261 95 Q265 101 260 106" />
                    <path d="M67 132 Q63 138 68 144" />
                    <path d="M293 132 Q297 138 292 144" />
                    <path d="M39 171 Q35 177 41 183" />
                    <path d="M321 171 Q325 177 319 183" />
                    <path d="M35 231 Q31 237 38 242" />
                    <path d="M325 231 Q329 237 322 242" />
                </g>
            </svg>

            {/* Arañita discreta */}
            <span className="halloween-feature-web__spider">
                <svg viewBox="0 0 44 44" fill="none">
                    <g
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    >
                        <path d="M15 17 L8 12 L4 15 M13 22 L6 23 L3 28 M15 27 L9 33 L6 38" />
                        <path d="M29 17 L36 12 L40 15 M31 22 L38 23 L41 28 M29 27 L35 33 L38 38" />
                    </g>
                    <ellipse
                        cx="22"
                        cy="25"
                        rx="8"
                        ry="9"
                        fill="currentColor"
                    />
                    <circle cx="22" cy="13" r="5.5" fill="currentColor" />
                </svg>
            </span>
        </div>
    );
}
