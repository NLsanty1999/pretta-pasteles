export default function OrderFilter(orders, status) {

    if (status === "Todos") return orders;

    return orders.filter(

        order => (order.status || "Pendiente") === status

    );

}