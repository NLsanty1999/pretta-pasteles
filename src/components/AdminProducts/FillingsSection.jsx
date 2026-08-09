function FillingsSection({ fillings, setFillings }) {

    return (

        <div>

            <label className="font-semibold">

                Rellenos

            </label>

            {

                fillings.map((filling, index) => (

                    <input

                        key={index}

                        value={filling}

                        onChange={(e) => {

                            const copy = [...fillings];

                            copy[index] = e.target.value;

                            setFillings(copy);

                        }}

                        className="w-full border rounded-2xl p-3 mt-2"

                        placeholder="Ej.: Dulce de leche"

                    />

                ))

            }

            <button

                type="button"

                onClick={() =>

                    setFillings([...fillings, ""])

                }

                className="text-pink-600 mt-3"

            >

                + Agregar relleno

            </button>

        </div>

    );

}

export default FillingsSection;