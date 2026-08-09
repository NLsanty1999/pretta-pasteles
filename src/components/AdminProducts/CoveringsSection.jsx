function CoveringsSection({ coverings, setCoverings }) {

    return (

        <div>

            <label className="font-semibold">

                Coberturas

            </label>

            {

                coverings.map((covering, index) => (

                    <input

                        key={index}

                        value={covering}

                        onChange={(e) => {

                            const copy = [...coverings];

                            copy[index] = e.target.value;

                            setCoverings(copy);

                        }}

                        className="w-full border rounded-2xl p-3 mt-2"

                        placeholder="Ej.: Buttercream"

                    />

                ))

            }

            <button

                type="button"

                onClick={() =>

                    setCoverings([...coverings, ""])

                }

                className="text-pink-600 mt-3"

            >

                + Agregar cobertura

            </button>

        </div>

    );

}

export default CoveringsSection;