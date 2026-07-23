export function updateOrderStatus(cart, index, status) {

    return cart.map((order, i) =>

        i === index
            ? { ...order, status }
            : order

    );

}

export function deleteOrder(cart, index) {

    return cart.filter((_, i) => i !== index);

}