export default function OrderSearch(orders, text) {

    if (!text.trim()) return orders;

    return orders.filter(order => {

        const clientName = order.client?.name || "";

        return clientName
            .toLowerCase()
            .includes(text.toLowerCase());

    });

}