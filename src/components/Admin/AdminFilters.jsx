function AdminFilters({

    search,

    onSearch,

    status,

    onStatus

}) {

    return (

        <div className="space-y-4">

            <input

                value={search}

                onChange={(e) => onSearch(e.target.value)}

                placeholder="Buscar pedido..."

                className="w-full rounded-xl border p-4"

            />

            <select

                value={status}

                onChange={(e) => onStatus(e.target.value)}

                className="w-full rounded-xl border p-4"

            >

                <option>

                    Todos

                </option>

                <option>

                    Pendiente

                </option>

                <option>

                    En preparación

                </option>

                <option>

                    Finalizado

                </option>

            </select>

        </div>

    );

}

export default AdminFilters;