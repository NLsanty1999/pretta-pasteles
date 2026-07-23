function FilterStatus({ value, onChange }) {

    return (

        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="
                w-full
                bg-white
                rounded-2xl
                shadow
                p-3
                outline-none
            "
        >

            <option value="Todos">
                Todos los estados
            </option>

            <option value="Pendiente">
                Pendiente
            </option>

            <option value="Preparando">
                Preparando
            </option>

            <option value="Listo">
                Listo
            </option>

            <option value="Entregado">
                Entregado
            </option>

        </select>

    );

}

export default FilterStatus;