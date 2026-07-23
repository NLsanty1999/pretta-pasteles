import StatusButton from "./StatusButton";

function OrderStatusButtons({ onChange }) {

    return (

        <div className="grid grid-cols-2 gap-3 mt-5">

            <StatusButton
                color="#FACC15"
                onClick={() => onChange("Pendiente")}
            >
                Pendiente
            </StatusButton>

            <StatusButton
                color="#60A5FA"
                onClick={() => onChange("Preparando")}
            >
                Preparando
            </StatusButton>

            <StatusButton
                color="#4ADE80"
                onClick={() => onChange("Listo")}
            >
                Listo
            </StatusButton>

            <StatusButton
                color="#9CA3AF"
                onClick={() => onChange("Entregado")}
            >
                Entregado
            </StatusButton>

        </div>

    );

}

export default OrderStatusButtons;