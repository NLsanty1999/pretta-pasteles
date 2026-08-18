function FillingsSection({ fillings, setFillings }) {

    function removeFilling(index) {

        setFillings(
            fillings.filter((_, i) => i !== index)
        );

    }

    return (

        <div>

            <label className="font-semibold">

                Rellenos

            </label>

            {
                fillings.map((filling, index) => (

                    <div
                        key={index}
                        className="flex gap-3 mt-2"
                    >

                        <input

                            value={filling}

                            onChange={(e) => {

                                const copy = [...fillings];

                                copy[index] =
                                    e.target.value;

                                setFillings(copy);

                            }}

                            className="flex-1 border rounded-2xl p-3"

                            placeholder="Ej.: Dulce de leche"

                        />

                        <button

                            type="button"

                            onClick={() =>
                                removeFilling(index)
                            }

                            className="
                                w-12
                                rounded-2xl
                                bg-red-100
                                text-red-600
                                hover:bg-red-200
                                transition
                            "

                            title="Eliminar relleno"

                        >

                            🗑️

                        </button>

                    </div>

                ))
            }

            <button

                type="button"

                onClick={() =>
                    setFillings([
                        ...fillings,
                        ""
                    ])
                }

                className="text-pink-600 mt-3"

            >

                + Agregar relleno

            </button>

        </div>

    );

}

export default FillingsSection;