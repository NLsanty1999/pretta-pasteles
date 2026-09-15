
import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState([]);

    function addToCart(product) {

        setCart(prev => {

            const existingIndex = prev.findIndex(item =>
                item.id === product.id &&
                item.size === product.size &&
                item.note === product.note
            );

            if (existingIndex !== -1) {

                const updated = [...prev];

                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity:
                        updated[existingIndex].quantity + (product.quantity || 1)
                };

                return updated;
            }

            // TraditionalProduct envía "price" como el total
            // de la cantidad seleccionada.
            // En el carrito necesitamos guardar el precio UNITARIO.
            const quantity = product.quantity || 1;

            const unitPrice =
                quantity > 0
                    ? Number(product.price || 0) / quantity
                    : Number(product.price || 0);

            return [
                ...prev,
                {
                    ...product,
                    quantity,
                    price: unitPrice
                }
            ];
        });
    }

    function removeFromCart(index) {

        setCart(prev => prev.filter((_, i) => i !== index));

    }

    function increaseQuantity(index) {

        setCart(prev => {

            return prev.map((item, i) =>
                i === index
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            );

        });
    }

    function decreaseQuantity(index) {

        setCart(prev => {

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
        (sum, item) => sum + item.quantity,
        0
    );

    const totalPrice = useMemo(() => {

        return cart.reduce(
            (sum, item) => sum + Number(item.price || 0) * item.quantity,
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

