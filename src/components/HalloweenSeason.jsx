
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import HalloweenDecor from "./HalloweenDecor";
import HalloweenBats from "./HalloweenBats";


import "../styles/halloween-catalog.css";
import "../styles/halloween-buttons.css";

export default function HalloweenSeason() {
    const { pathname } = useLocation();

    const hideHalloween =
        pathname === "/login" || pathname.startsWith("/admin");

   
useEffect(() => {
    if (hideHalloween) {
        document.body.classList.remove("halloween-active");
        return;
    }

    document.body.classList.add("halloween-active");

    return () => {
        document.body.classList.remove("halloween-active");
    };
}, [hideHalloween]);


    if (hideHalloween) return null;

    return (
        <>
    <HalloweenDecor />
    <HalloweenBats />
</>
    );
}
