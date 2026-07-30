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
                        updated[existingIndex].quantity + product.quantity

                };

                return updated;

            }

            return [

                ...prev,

                {

                    ...product,

                    quantity: product.quantity || 1

                }

            ];

        });

    }

    function removeFromCart(index) {

        setCart(prev => prev.filter((_, i) => i !== index));

    }

    function increaseQuantity(index) {

        setCart(prev => {

            const copy = [...prev];

            copy[index].quantity += 1;

            return copy;

        });

    }

    function decreaseQuantity(index) {

        setCart(prev => {

            const copy = [...prev];

            if (copy[index].quantity > 1) {

                copy[index].quantity -= 1;

                return copy;

            }

            return copy.filter((_, i) => i !== index);

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

            (sum, item) => sum + item.price * item.quantity,

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