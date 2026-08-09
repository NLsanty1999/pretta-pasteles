function FlavorsSection({ flavors, setFlavors }) {

    return (

        <div>

            <label className="font-semibold">

                Bizcochuelos

            </label>

            {

                flavors.map((flavor, index) => (

                    <input

                        key={index}

                        value={flavor}

                        onChange={(e) => {

                            const copy = [...flavors];

                            copy[index] = e.target.value;

                            setFlavors(copy);

                        }}

                        className="w-full border rounded-2xl p-3 mt-2"

                        placeholder="Ej.: Chocolate"

                    />

                ))

            }

            <button

                type="button"

                onClick={() =>

                    setFlavors([...flavors, ""])

                }

                className="text-pink-600 mt-3"

            >

                + Agregar sabor

            </button>

        </div>

    );

}

export default FlavorsSection;