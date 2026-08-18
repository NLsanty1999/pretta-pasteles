function CoveringsSection({ coverings, setCoverings }) {

    function removeCovering(index) {

        setCoverings(
            coverings.filter((_, i) => i !== index)
        );

    }

    return (

        <div>

            <label className="font-semibold">

                Coberturas

            </label>

            {
                coverings.map((covering, index) => (

                    <div
                        key={index}
                        className="flex gap-3 mt-2"
                    >

                        <input

                            value={covering}

                            onChange={(e) => {

                                const copy = [...coverings];

                                copy[index] =
                                    e.target.value;

                                setCoverings(copy);

                            }}

                            className="flex-1 border rounded-2xl p-3"

                            placeholder="Ej.: Buttercream"

                        />

                        <button

                            type="button"

                            onClick={() =>
                                removeCovering(index)
                            }

                            className="
                                w-12
                                rounded-2xl
                                bg-red-100
                                text-red-600
                                hover:bg-red-200
                                transition
                            "

                            title="Eliminar cobertura"

                        >

                            🗑️

                        </button>

                    </div>

                ))
            }

            <button

                type="button"

                onClick={() =>
                    setCoverings([
                        ...coverings,
                        ""
                    ])
                }

                className="text-pink-600 mt-3"

            >

                + Agregar cobertura

            </button>

        </div>

    );

}

export default CoveringsSection;