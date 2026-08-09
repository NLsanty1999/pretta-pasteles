import { useState } from "react";
import { saveProduct, createSlug } from "../../firebase/products";

import SizesSection from "./SizesSection";
import ExtrasSection from "./ExtrasSection";
import FlavorsSection from "./FlavorsSection";
import FillingsSection from "./FillingsSection";
import CoveringsSection from "./CoveringsSection";

function ProductForm({
    onClose,
    editingProduct = null
}) {

    const [name, setName] = useState(
        editingProduct?.name || ""
    );

    const [description, setDescription] = useState(
        editingProduct?.description || ""
    );

    const [category, setCategory] = useState(
        editingProduct?.category || 1
    );

    const [type, setType] = useState(
        editingProduct?.type || "tradicional"
    );

    const [sizes, setSizes] = useState(
        editingProduct?.sizes || []
    );

    const [prices, setPrices] = useState(
        editingProduct?.prices || {}
    );

    const [flavors, setFlavors] = useState(
        editingProduct?.flavors?.length
            ? editingProduct.flavors
            : [""]
    );

    const [fillings, setFillings] = useState(
        editingProduct?.fillings?.length
            ? editingProduct.fillings
            : [""]
    );

    const [coverings, setCoverings] = useState(
        editingProduct?.coverings?.length
            ? editingProduct.coverings
            : [""]
    );

    const [extras, setExtras] = useState(
        editingProduct?.extras?.length
            ? editingProduct.extras
            : [
                {
                    name: "",
                    price: 0
                }
            ]
    );

    const [quantity, setQuantity] = useState(
        editingProduct?.quantity || 35
    );

    const [saving, setSaving] = useState(false);


    function handleTypeChange(e) {

        const newType = e.target.value;

        setType(newType);

        // Solo las tortas personalizadas
        // utilizan sabores, rellenos y coberturas.

        if (newType !== "personalizada") {

            setFlavors([""]);

            setFillings([""]);

            setCoverings([""]);

        }

    }


    async function handleSave() {

        if (!name.trim()) {

            alert("Ingresá un nombre para el producto");

            return;

        }

        try {

            setSaving(true);

            const product = {

                ...editingProduct,

                id: editingProduct?.id || Date.now(),

                slug:
                    editingProduct?.slug ||
                    createSlug(name),

                name,

                description,

                category,

                type,

                quantity:
                    type === "mesaDulce"
                        ? quantity
                        : null,

                image:
                    editingProduct?.image || "",

                prices,

                sizes,

                flavors:
                    type === "personalizada"
                        ? flavors.filter(
                            flavor =>
                                flavor.trim() !== ""
                        )
                        : [],

                fillings:
                    type === "personalizada"
                        ? fillings.filter(
                            filling =>
                                filling.trim() !== ""
                        )
                        : [],

                coverings:
                    type === "personalizada"
                        ? coverings.filter(
                            covering =>
                                covering.trim() !== ""
                        )
                        : [],

                extras: extras.filter(
                    extra =>
                        extra.name.trim() !== ""
                )

            };

            await saveProduct(product);

            alert(
                editingProduct
                    ? "Producto actualizado correctamente ✅"
                    : "Producto creado correctamente ✅"
            );

            onClose();

        }

        catch (error) {

            console.error(error);

            alert(
                editingProduct
                    ? "Error al actualizar el producto"
                    : "Error al crear el producto"
            );

        }

        finally {

            setSaving(false);

        }

    }


    return (

        <div className="bg-white rounded-3xl shadow p-6 mb-8">

            <h2 className="text-3xl font-bold mb-6">

                {
                    editingProduct
                        ? "Editar producto"
                        : "Nuevo producto"
                }

            </h2>


            <div className="space-y-5">


                {/* NOMBRE */}

                <div>

                    <label className="font-semibold">

                        Nombre

                    </label>

                    <input

                        value={name}

                        onChange={(e) =>
                            setName(e.target.value)
                        }

                        className="w-full border rounded-2xl p-3 mt-2"

                    />

                </div>


                {/* DESCRIPCIÓN */}

                <div>

                    <label className="font-semibold">

                        Descripción

                    </label>

                    <textarea

                        value={description}

                        onChange={(e) =>
                            setDescription(e.target.value)
                        }

                        rows={4}

                        className="w-full border rounded-2xl p-3 mt-2"

                    />

                </div>


                {/* CATEGORÍA */}

                <div>

                    <label className="font-semibold">

                        Categoría

                    </label>

                    <select

                        value={category}

                        onChange={(e) =>
                            setCategory(Number(e.target.value))
                        }

                        className="w-full border rounded-2xl p-3 mt-2"

                    >

                        <option value={1}>
                            Tortas
                        </option>

                        <option value={2}>
                            Tartas
                        </option>

                        <option value={3}>
                            Mesa Dulce
                        </option>

                        <option value={4}>
                            Alfajores
                        </option>

                    </select>

                </div>


                {/* TIPO */}

                <div>

                    <label className="font-semibold">

                        Tipo

                    </label>

                    <select

                        value={type}

                        onChange={handleTypeChange}

                        className="w-full border rounded-2xl p-3 mt-2"

                    >

                        <option value="tradicional">

                            Tradicional

                        </option>

                        <option value="personalizada">

                            Personalizada

                        </option>

                        <option value="alfajor">

                            Alfajor

                        </option>

                        <option value="mesaDulce">

                            Mesa Dulce

                        </option>

                    </select>

                </div>

                {type === "mesaDulce" && (

    <div className="space-y-4">

        <div>

            <label className="font-semibold">
                Cantidad
            </label>

            <select
                value={quantity}
                onChange={(e) =>
                    setQuantity(Number(e.target.value))
                }
                className="w-full border rounded-2xl p-3 mt-2"
            >

                <option value={12}>
                    12 unidades
                </option>

                <option value={35}>
                    35 unidades
                </option>

            </select>

        </div>

        <div>

            <label className="font-semibold">
                Precio
            </label>

            <input
                type="number"
                value={prices.mesaDulce || ""}
                onChange={(e) =>
                    setPrices({
                        ...prices,
                        mesaDulce: Number(e.target.value)
                    })
                }
                placeholder="Precio"
                className="w-full border rounded-2xl p-3 mt-2"
            />

        </div>

    </div>

)}


                {/* OPCIONES DE TORTA PERSONALIZADA */}

                {type === "personalizada" && (

                    <>

                        <FlavorsSection

                            flavors={flavors}

                            setFlavors={setFlavors}

                        />

                        <FillingsSection

                            fillings={fillings}

                            setFillings={setFillings}

                        />

                        <CoveringsSection

                            coverings={coverings}

                            setCoverings={setCoverings}

                        />

                    </>

                )}


                {/* EXTRAS */}

                <ExtrasSection

                    extras={extras}

                    setExtras={setExtras}

                />


                {/* TAMAÑOS Y PRECIOS */}

                {type !== "mesaDulce" && (

    <SizesSection
        sizes={sizes}
        setSizes={setSizes}
        prices={prices}
        setPrices={setPrices}
        type={type}
    />

)}


                {/* BOTONES */}

                <div className="flex gap-4 pt-4">

                    <button

                        onClick={onClose}

                        disabled={saving}

                        className="flex-1 rounded-2xl border py-3"

                    >

                        Cancelar

                    </button>


                    <button

                        onClick={handleSave}

                        disabled={saving}

                        className="flex-1 rounded-2xl bg-[#D08A9B] text-white py-3"

                    >

                        {

                            saving

                                ? "Guardando..."

                                : editingProduct

                                    ? "Actualizar producto"

                                    : "Guardar producto"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ProductForm;