import { useState } from "react";
import { saveProduct, createSlug } from "../../firebase/products";

function ProductForm({ onClose }) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(1);
    const [type, setType] = useState("tradicional");
    const [sizes, setSizes] = useState([]);

    const [prices, setPrices] = useState({});

async function handleSave() {

    const product = {

        id: Date.now(),

        slug: createSlug(name),

        name,

        description,

        category,

        type,

        image: "",

        prices,

        sizes,

        flavors: [],

        fillings: [],

        coverings: [],

        extras: []

    };

    try {

        await saveProduct(product);

        alert("Producto creado correctamente ✅");

        onClose();

    }

    catch (error) {

        console.error(error);

        alert("Error al crear el producto");

    }

}

    return (

        <div className="bg-white rounded-3xl shadow p-6 mb-8">

            <h2 className="text-3xl font-bold mb-6">

                Nuevo producto

            </h2>

            <div className="space-y-5">

                <div>

                    <label className="font-semibold">

                        Nombre

                    </label>

                    <input

                        value={name}

                        onChange={(e) => setName(e.target.value)}

                        className="w-full border rounded-2xl p-3 mt-2"

                    />

                </div>

                <div>

                    <label className="font-semibold">

                        Descripción

                    </label>

                    <textarea

                        value={description}

                        onChange={(e) => setDescription(e.target.value)}

                        rows={4}

                        className="w-full border rounded-2xl p-3 mt-2"

                    />

                </div>

                <div>

                    <label className="font-semibold">

                        Categoría

                    </label>

                    <select

                        value={category}

                        onChange={(e) => setCategory(Number(e.target.value))}

                        className="w-full border rounded-2xl p-3 mt-2"

                    >

                        <option value={1}>Tortas</option>
                        <option value={2}>Tartas</option>
                        <option value={3}>Mesa Dulce</option>
                        <option value={4}>Alfajores</option>

                    </select>

                </div>

                <div>

                    <label className="font-semibold">

                        Tipo

                    </label>

                    <select

                        value={type}

                        onChange={(e) => setType(e.target.value)}

                        className="w-full border rounded-2xl p-3 mt-2"

                    >

                        <option value="tradicional">

                            Tradicional

                        </option>

                        <option value="personalizada">

                            Personalizada

                        </option>

                    </select>
<div>

    <label className="font-semibold">

        Tamaños

    </label>

    {

        ["16", "20", "24"].map(size => (

            <div

                key={size}

                className="flex items-center gap-4 mt-3"

            >

                <input

                    type="checkbox"

                    checked={sizes.includes(size)}

                    onChange={(e) => {

                        if (e.target.checked) {

                            setSizes([...sizes, size]);

                        } else {

                            setSizes(

                                sizes.filter(s => s !== size)

                            );

                        }

                    }}

                />

                <span className="w-16">

                    {size} cm

                </span>

                {

                    sizes.includes(size) && (

                        <input

                            type="number"

                            placeholder="Precio"

                            value={prices[size] || ""}

                            onChange={(e) =>

                                setPrices({

                                    ...prices,

                                    [size]: Number(e.target.value)

                                })

                            }

                            className="border rounded-xl p-2 w-40"

                        />

                    )

                }

            </div>

        ))

    }

</div>

                </div>

                <div className="flex gap-4 pt-4">

                    <button

                        onClick={onClose}

                        className="flex-1 rounded-2xl border py-3"

                    >

                        Cancelar

                    </button>

                    <button

                        onClick={handleSave}

                        className="flex-1 rounded-2xl bg-[#D08A9B] text-white py-3"

                    >

                        Guardar producto

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ProductForm;