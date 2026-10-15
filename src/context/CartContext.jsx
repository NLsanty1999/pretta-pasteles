
import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    function addToCart(product) {
        const quantity = Math.max(1, Number(product.quantity) || 1);
        const incomingPrice = Number(product.price) || 0;

        // Los productos con basePrice ya envían el precio unitario final.
        // Los productos tradicionales pueden enviar el precio total
        // de la cantidad seleccionada.
        const unitPrice =
            product.basePrice !== undefined &&
            product.basePrice !== null
                ? incomingPrice
                : incomingPrice / quantity;

        const normalizedProduct = {
            ...product,
            quantity,
            price: unitPrice,
            ...(product.basePrice !== undefined &&
            product.basePrice !== null
                ? { basePrice: Number(product.basePrice) || 0 }
                : {}),
            extraDetails: Array.isArray(product.extraDetails)
                ? product.extraDetails
                : []
        };

        setCart((prev) => {
            const existingIndex = prev.findIndex((item) => {
                const sameProduct =
                    item.id === normalizedProduct.id &&
                    item.size === normalizedProduct.size &&
                    item.note === normalizedProduct.note;

                const samePrice =
                    Number(item.price || 0) ===
                        Number(normalizedProduct.price || 0) &&
                    Number(item.basePrice ?? -1) ===
                        Number(normalizedProduct.basePrice ?? -1);

                const sameExtras =
                    JSON.stringify(item.extraDetails || []) ===
                    JSON.stringify(normalizedProduct.extraDetails || []);

                const sameFilling =
                    item.filling === normalizedProduct.filling;

                const sameFlavor =
                    item.flavor === normalizedProduct.flavor;

                const samePriceKey =
                    item.priceKey === normalizedProduct.priceKey;

                return (
                    sameProduct &&
                    samePrice &&
                    sameExtras &&
                    sameFilling &&
                    sameFlavor &&
                    samePriceKey
                );
            });

            if (existingIndex !== -1) {
                return prev.map((item, index) =>
                    index === existingIndex
                        ? {
                              ...item,
                              quantity: item.quantity + quantity
                          }
                        : item
                );
            }

            return [...prev, normalizedProduct];
        });
    }

    function removeFromCart(index) {
        setCart((prev) => prev.filter((_, i) => i !== index));
    }

    function increaseQuantity(index) {
        setCart((prev) =>
            prev.map((item, i) =>
                i === index
                    ? {
                          ...item,
                          quantity: (Number(item.quantity) || 1) + 1
                      }
                    : item
            )
        );
    }

    function decreaseQuantity(index) {
        setCart((prev) => {
            const item = prev[index];

            if (!item) return prev;

            if (item.quantity > 1) {
                return prev.map((currentItem, i) =>
                    i === index
                        ? {
                              ...currentItem,
                              quantity: currentItem.quantity - 1
                          }
                        : currentItem
                );
            }

            return prev.filter((_, i) => i !== index);
        });
    }

    function clearCart() {
        setCart([]);
    }

    const totalItems = cart.reduce(
        (sum, item) => sum + (Number(item.quantity) || 1),
        0
    );

    const totalPrice = useMemo(() => {
        return cart.reduce(
            (sum, item) =>
                sum +
                (Number(item.price) || 0) *
                    (Number(item.quantity) || 1),
            0
        );
    }, [cart]);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                totalItems,
                totalPrice
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
