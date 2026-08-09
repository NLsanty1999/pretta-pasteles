function ExtrasSection({ extras, setExtras }) {

    return (

        <div>

            <label className="font-semibold">

                Extras

            </label>

            {

                extras.map((extra, index) => (

                    <div
                        key={index}
                        className="flex gap-3 mt-3"
                    >

                        <input

                            value={extra.name}

                            onChange={(e) => {

                                const copy = [...extras];

                                copy[index].name = e.target.value;

                                setExtras(copy);

                            }}

                            placeholder="Nombre"

                            className="flex-1 border rounded-2xl p-3"

                        />

                        <input

                            type="number"

                            value={extra.price}

                            onChange={(e) => {

                                const copy = [...extras];

                                copy[index].price =
                                    Number(e.target.value);

                                setExtras(copy);

                            }}

                            placeholder="Precio"

                            className="w-32 border rounded-2xl p-3"

                        />

                    </div>

                ))

            }

            <button

                type="button"

                onClick={() =>
                    setExtras([
                        ...extras,
                        {
                            name: "",
                            price: 0
                        }
                    ])
                }

                className="text-pink-600 mt-3"

            >

                + Agregar extra

            </button>

        </div>

    );

}

export default ExtrasSection;