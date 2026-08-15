import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

function useFeatured() {
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "products"),
            (snapshot) => {
                const data = snapshot.docs
                    .map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    .filter((product) => product.featured === true);

                setFeatured(data);
                setLoading(false);
            },
            (error) => {
                console.error(
                    "Error cargando productos destacados:",
                    error
                );

                setFeatured([]);
                setLoading(false);
            }
        );

        return unsubscribe;
    }, []);

    return {
        featured,
        loading,
    };
}

export default useFeatured;