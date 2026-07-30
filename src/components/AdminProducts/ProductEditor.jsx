import { useState } from "react";
import { saveProduct } from "../../firebase/products";

function ProductEditor({ product }) {

    const [prices, setPrices] = useState(product.prices || {});
    const [saving, setSaving] = useState(false);

    async function handleSave() {

        try {

            setSaving(true);

            await saveProduct({

                ...product,

                prices

            });

            alert("Producto guardado correctamente ✅");

        } catch (error) {

            console.error(error);

            alert("Error al guardar");

        } finally {

            setSaving(false);

        }

    }

    return (

        <div className="bg-white rounded-3xl shadow p-6">

            <h2 className="text-2xl font-bold">

                {product.name}

            </h2>

            <p className="text-gray-500 mb-6">

                {product.description}

            </p>

            {

                (product.sizes || []).map(size => (

                    <div

                        key={size}

                        className="flex items-center justify-between mb-3"

                    >

                        <span>

                            {size} cm

                        </span>

                        <input

                            type="number"

                            value={prices[size] ?? 0}

                            onChange={(e) =>

                                setPrices({

                                    ...prices,

                                    [size]: Number(e.target.value)

                                })

                            }

                            className="border rounded-xl px-3 py-2 w-32 text-right"

                        />

                    </div>

                ))

            }

            <button

                onClick={handleSave}

                disabled={saving}

                className="mt-6 w-full rounded-2xl bg-[#D08A9B] text-white py-3 font-semibold"

            >

                {

                    saving

                        ? "Guardando..."

                        : "Guardar"

                }

            </button>

        </div>

    );

}

export default ProductEditor;