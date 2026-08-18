function FlavorsSection({ flavors, setFlavors }) {

    function removeFlavor(index) {

        setFlavors(
            flavors.filter((_, i) => i !== index)
        );

    }

    return (

        <div>

            <label className="font-semibold">

                Bizcochuelos

            </label>

            {
                flavors.map((flavor, index) => (

                    <div
                        key={index}
                        className="flex gap-3 mt-2"
                    >

                        <input

                            value={flavor}

                            onChange={(e) => {

                                const copy = [...flavors];

                                copy[index] =
                                    e.target.value;

                                setFlavors(copy);

                            }}

                            className="flex-1 border rounded-2xl p-3"

                            placeholder="Ej.: Chocolate"

                        />

                        <button

                            type="button"

                            onClick={() =>
                                removeFlavor(index)
                            }

                            className="
                                w-12
                                rounded-2xl
                                bg-red-100
                                text-red-600
                                hover:bg-red-200
                                transition
                            "

                            title="Eliminar bizcochuelo"

                        >

                            🗑️

                        </button>

                    </div>

                ))
            }

            <button

                type="button"

                onClick={() =>
                    setFlavors([
                        ...flavors,
                        ""
                    ])
                }

                className="text-pink-600 mt-3"

            >

                + Agregar sabor

            </button>

        </div>

    );

}

export default FlavorsSection;