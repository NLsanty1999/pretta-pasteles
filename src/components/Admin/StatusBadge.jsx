function StatusBadge({ status }) {

    const styles = {
        Pendiente: "bg-yellow-100 text-yellow-700",
        Preparando: "bg-blue-100 text-blue-700",
        Listo: "bg-green-100 text-green-700",
        Entregado: "bg-gray-200 text-gray-700",
    };

    return (

        <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status] || styles.Pendiente}`}
        >
            {status}
        </span>

    );

}

export default StatusBadge;