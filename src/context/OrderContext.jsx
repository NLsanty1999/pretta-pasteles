import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {

    const [orders, setOrders] = useState([]);

    function addOrder(order) {
        setOrders((prev) => [...prev, order]);
    }

    return (
        <OrderContext.Provider
            value={{
                orders,
                addOrder,
            }}
        >
            {children}
        </OrderContext.Provider>
    );

}

export function useOrders() {
    return useContext(OrderContext);
}