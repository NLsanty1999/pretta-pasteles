import { useState } from "react";
import {
    saveProduct,
    deleteProduct
} from "../../firebase/products";

function ProductEditor({
    product,
    onEdit
}) {

    const [prices, setPrices] = useState(
        product.prices || {}
    );

    const [saving, setSaving] = useState(false);

    const [available, setAvailable] = useState(
        product.available !== false
    );


    /*
     * GUARDAR
     */

    async function handleSave() {

        try {

            setSaving(true);

            await saveProduct({

                ...product,

                prices,

                available

            });

            alert(
                "Producto guardado correctamente ✅"
            );

        }

        catch (error) {

            console.error(error);

            alert(
                "Error al guardar"
            );

        }

        finally {

            setSaving(false);

        }

    }


    /*
     * CAMBIAR STOCK
     */

    async function handleToggleStock() {

        const newStatus = !available;

        try {

            setSaving(true);

            await saveProduct({

                ...product,

                prices,

                available:
                    newStatus

            });

            setAvailable(
                newStatus
            );

            alert(

                newStatus

                    ? "Producto habilitado ✅"

                    : "Producto marcado como fuera de stock 🔴"

            );

        }

        catch (error) {

            console.error(error);

            alert(
                "Error al cambiar el estado del producto"
            );

        }

        finally {

            setSaving(false);

        }

    }


    /*
     * ELIMINAR PRODUCTO
     */

    async function handleDelete() {

        const confirmed =
            window.confirm(

                `¿Seguro que querés eliminar "${product.name}"?\n\n` +
                "Esta acción no se puede deshacer."

            );

        if (!confirmed) {
            return;
        }


        try {

            setSaving(true);

            await deleteProduct(
                product.slug
            );

            alert(
                "Producto eliminado correctamente 🗑️"
            );

            /*
             * Recargamos la página para que
             * la lista se actualice inmediatamente.
             */

            window.location.reload();

        }

        catch (error) {

            console.error(error);

            alert(
                "Error al eliminar el producto"
            );

        }

        finally {

            setSaving(false);

        }

    }


    return (

        <div

            className={`

                bg-white
                rounded-3xl
                shadow
                p-6

                ${
                    !available
                        ? "border-2 border-red-300"
                        : ""
                }

            `}

        >

            {/* ========================= */}
            {/* CABECERA */}
            {/* ========================= */}

            <div className="flex items-start justify-between gap-4">

                <div>

                    <h2 className="text-2xl font-bold">

                        {product.name}

                    </h2>

                    <p className="text-gray-500 mb-6">

                        {product.description}

                    </p>

                </div>


                <span

                    className={`

                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-semibold
                        whitespace-nowrap

                        ${
                            available
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }

                    `}

                >

                    {

                        available

                            ? "Disponible"

                            : "Fuera de stock"

                    }

                </span>

            </div>


            {/* ========================= */}
            {/* PRECIOS */}
            {/* ========================= */}

            {

                (product.sizes || []).map(
                    size => (

                        <div

                            key={size}

                            className="
                                flex
                                items-center
                                justify-between
                                mb-3
                            "

                        >

                            <span>

                                {

                                    product.type === "alfajor"

                                        ? `${size} unidades`

                                        : product.type === "mesaDulce"

                                            ? `${size} unidades`

                                            : `${size} cm`

                                }

                            </span>


                            <input

                                type="number"

                                value={
                                    prices[size] ?? 0
                                }

                                onChange={(e) =>

                                    setPrices({

                                        ...prices,

                                        [size]:
                                            Number(
                                                e.target.value
                                            )

                                    })

                                }

                                className="
                                    border
                                    rounded-xl
                                    px-3
                                    py-2
                                    w-32
                                    text-right
                                "

                            />

                        </div>

                    )
                )

            }


            {/* ========================= */}
            {/* GUARDAR */}
            {/* ========================= */}

            <button

                onClick={handleSave}

                disabled={saving}

                className="
                    mt-6
                    w-full
                    rounded-2xl
                    bg-[#D08A9B]
                    text-white
                    py-3
                    font-semibold
                "

            >

                {

                    saving

                        ? "Guardando..."

                        : "Guardar"

                }

            </button>


            {/* ========================= */}
            {/* EDITAR */}
            {/* ========================= */}

            <button

                onClick={() =>
                    onEdit(product)
                }

                disabled={saving}

                className="
                    mt-3
                    w-full
                    rounded-2xl
                    border
                    py-3
                    font-semibold
                "

            >

                ✏ Editar producto

            </button>


            {/* ========================= */}
            {/* STOCK */}
            {/* ========================= */}

            <button

                onClick={
                    handleToggleStock
                }

                disabled={saving}

                className={`

                    mt-3
                    w-full
                    rounded-2xl
                    py-3
                    font-semibold
                    text-white

                    ${
                        available

                            ? "bg-red-500 hover:bg-red-600"

                            : "bg-green-600 hover:bg-green-700"
                    }

                `}

            >

                {

                    available

                        ? "🔴 Marcar fuera de stock"

                        : "🟢 Habilitar producto"

                }

            </button>


            {/* ========================= */}
            {/* ELIMINAR */}
            {/* ========================= */}

            <button

                onClick={
                    handleDelete
                }

                disabled={saving}

                className="
                    mt-3
                    w-full
                    rounded-2xl
                    py-3
                    font-semibold
                    text-red-600
                    border
                    border-red-200
                    bg-red-50
                    hover:bg-red-100
                    transition
                "

            >

                🗑️ Eliminar producto

            </button>

        </div>

    );

}

export default ProductEditor;