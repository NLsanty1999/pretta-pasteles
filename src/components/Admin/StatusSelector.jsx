function StatusSelector({ status, onChange }) {

    return (

        <select
            value={status}
            onChange={(e) => onChange(e.target.value)}
            className="
                w-full
                mt-5
                border
                rounded-xl
                p-3
                outline-none
                bg-white
            "
        >

            <option>Pendiente</option>

            <option>Preparando</option>

            <option>Listo</option>

            <option>Entregado</option>

        </select>

    );

}

export default StatusSelector;