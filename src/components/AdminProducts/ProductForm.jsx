import { useState } from "react";
import { saveProduct, createSlug } from "../../firebase/products";

import SizesSection from "./SizesSection";
import PersonalizedSizesSection from "./PersonalizedSizesSection";
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

    const [categories, setCategories] = useState(
    editingProduct?.categories?.length
        ? editingProduct.categories.map(Number)
        : [
            Number(editingProduct?.category || 1)
        ]
);

const category = categories[0];

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


    /*
     * =============================
     * BENTO
     * =============================
     */

    const [bentoFormas, setBentoFormas] = useState(
        editingProduct?.bentoFormas?.length
            ? editingProduct.bentoFormas
            : [""]
    );

    const [bentoBizcochuelos, setBentoBizcochuelos] = useState(
        editingProduct?.bentoBizcochuelos?.length
            ? editingProduct.bentoBizcochuelos
            : [""]
    );


    const [saving, setSaving] = useState(false);


    /*
     * =============================
     * CATEGORÍAS
     * =============================
     *
     * 1 = Tortas clásicas
     * 2 = Tartas
     * 3 = Mesa dulce
     * 4 = Alfajores
     * 5 = Bento Cakes
     * 6 = Cookies
     * 7 = Tortas personalizadas
     */

    const isMesaDulce =
        category === 3;

    const isAlfajor =
        category === 4;

    const isBento =
        category === 5;

    const isCookies =
        category === 6;

    const isPersonalizada =
        category === 7 ||
        editingProduct?.type === "personalizada";


    /*
     * =============================
     * CAMBIO DE CATEGORÍA
     * =============================
     */

function toggleCategory(categoryId) {

    setCategories(current => {

        const exists =
            current.includes(categoryId);

        if (exists) {

            // No permitir que quede sin categoría
            if (current.length === 1) {
                return current;
            }

            return current.filter(
                id => id !== categoryId
            );

        }

        return [
            ...current,
            categoryId
        ];

    });

}


    /*
     * =============================
     * GUARDAR PRODUCTO
     * =============================
     */

    async function handleSave() {

        if (!name.trim()) {

            alert(
                "Ingresá un nombre para el producto"
            );

            return;

        }


        try {

            setSaving(true);


            /*
             * =============================
             * DETERMINAR TIPO
             * =============================
             */

            let productType =
                "tradicional";


            if (isPersonalizada) {

                productType =
                    "personalizada";

            }

            else if (isAlfajor) {

                productType =
                    "alfajor";

            }

            else if (isMesaDulce) {

                productType =
                    "mesaDulce";

            }

            else if (isBento) {

                productType =
                    "bento";

            }

            else if (isCookies) {

                productType =
                    "cookies";

            }


            /*
             * =============================
             * OPCIONES BENTO
             * =============================
             */

            const cleanBentoFormas =
                bentoFormas
                    .map(forma => forma.trim())
                    .filter(Boolean);


            const cleanBentoBizcochuelos =
                bentoBizcochuelos
                    .map(bizcochuelo =>
                        bizcochuelo.trim()
                    )
                    .filter(Boolean);


            /*
             * =============================
             * PRODUCTO
             * =============================
             */

            const product = {

                ...editingProduct,


                id:
                    editingProduct?.id ||
                    Date.now(),


                slug:
                    editingProduct?.slug ||
                    createSlug(name),


                name,


                description,


                category,

categories,


                type:
                    productType,


                /*
                 * =============================
                 * BENTO
                 * =============================
                 *
                 * Guardamos exactamente
                 * las opciones que cargaste.
                 */

                bentoFormas:
                    isBento
                        ? cleanBentoFormas
                        : [],


                bentoBizcochuelos:
                    isBento
                        ? cleanBentoBizcochuelos
                        : [],


                /*
                 * Alias para compatibilidad
                 * con el frontend.
                 */

                bentoForms:
                    isBento
                        ? cleanBentoFormas
                        : [],


                /*
                 * CANTIDAD
                 */

                quantity:
                    isMesaDulce
                        ? quantity
                        : null,


                /*
                 * IMAGEN
                 */

                image:
                    editingProduct?.image ||
                    "",


                /*
                 * PRECIOS
                 */

                prices,


                /*
                 * TAMAÑOS
                 *
                 * Bento usa 10 cm.
                 */

                sizes:
                    isMesaDulce
                        ? [String(quantity)]
                        : isBento
                            ? ["10"]
                            : sizes,


                /*
                 * SABORES
                 *
                 * Personalizada usa flavors.
                 */

                flavors:
                    isPersonalizada
                        ? flavors
                            .map(flavor =>
                                flavor.trim()
                            )
                            .filter(Boolean)
                        : isBento
                            ? cleanBentoBizcochuelos
                            : [],


                /*
                 * RELLENOS
                 */

                fillings:
                    isPersonalizada
                        ? fillings
                            .map(filling =>
                                filling.trim()
                            )
                            .filter(Boolean)
                        : [],


                /*
                 * COBERTURAS
                 */

                coverings:
                    isPersonalizada
                        ? coverings
                            .map(covering =>
                                covering.trim()
                            )
                            .filter(Boolean)
                        : [],


                /*
                 * EXTRAS
                 */

                extras:
                    extras
                        .filter(
                            extra =>
                                extra.name &&
                                extra.name.trim() !== ""
                        )
                        .map(extra => ({
                            name:
                                extra.name.trim(),

                            price:
                                Number(
                                    extra.price || 0
                                )
                        }))

            };


            console.log(
                "PRODUCTO QUE SE VA A GUARDAR:",
                product
            );


            await saveProduct(product);


            alert(
                editingProduct
                    ? "Producto actualizado correctamente ✅"
                    : "Producto creado correctamente ✅"
            );


            onClose();

        }

        catch (error) {

            console.error(
                "ERROR GUARDANDO PRODUCTO:",
                error
            );

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

        <div className="
            bg-white
            rounded-3xl
            shadow
            p-6
            mb-8
        ">


            <h2 className="
                text-3xl
                font-bold
                mb-6
            ">

                {
                    editingProduct
                        ? "Editar producto"
                        : "Nuevo producto"
                }

            </h2>


            <div className="space-y-5">


                {/* ============================= */}
                {/* NOMBRE */}
                {/* ============================= */}

                <div>

                    <label className="font-semibold">
                        Nombre
                    </label>

                    <input
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        className="
                            w-full
                            border
                            rounded-2xl
                            p-3
                            mt-2
                        "
                    />

                </div>


                {/* ============================= */}
                {/* DESCRIPCIÓN */}
                {/* ============================= */}

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
                        className="
                            w-full
                            border
                            rounded-2xl
                            p-3
                            mt-2
                        "
                    />

                </div>


                {/* ============================= */}
                {/* CATEGORÍA */}
                {/* ============================= */}

<div>

    <label className="font-semibold">
        Catálogos
    </label>

    <p className="text-sm text-gray-500 mt-1 mb-3">
        Podés seleccionar uno o varios catálogos.
    </p>

    <div className="grid grid-cols-1 gap-3">

        {[
            {
                id: 1,
                name: "Tortas clásicas"
            },
            {
                id: 2,
                name: "Tartas"
            },
            {
                id: 3,
                name: "Mesa dulce"
            },
            {
                id: 4,
                name: "Alfajores"
            },
            {
                id: 5,
                name: "Bento Cakes"
            },
            {
                id: 6,
                name: "Cookies"
            },
            {
                id: 7,
                name: "Tortas personalizadas"
            }
        ].map(categoryOption => (

            <label
                key={categoryOption.id}
                className="
                    flex
                    items-center
                    gap-3
                    border
                    rounded-2xl
                    p-4
                    cursor-pointer
                    hover:bg-pink-50
                "
            >

                <input
                    type="checkbox"
                    checked={categories.includes(
                        categoryOption.id
                    )}
                    onChange={() =>
                        toggleCategory(
                            categoryOption.id
                        )
                    }
                    className="
                        w-5
                        h-5
                    "
                />

                <span className="font-medium">
                    {categoryOption.name}
                </span>

            </label>

        ))}

    </div>

</div>


                {/* ============================= */}
                {/* MESA DULCE */}
                {/* ============================= */}

                {isMesaDulce && (

                    <div className="space-y-4">

                        <div>

                            <label className="font-semibold">
                                Cantidad
                            </label>

                            <select
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(
                                        Number(
                                            e.target.value
                                        )
                                    )
                                }
                                className="
                                    w-full
                                    border
                                    rounded-2xl
                                    p-3
                                    mt-2
                                "
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
                                value={
                                    prices[String(quantity)]
                                    || ""
                                }
                                onChange={(e) =>
                                    setPrices({

                                        ...prices,

                                        [String(quantity)]:
                                            Number(
                                                e.target.value
                                            )

                                    })
                                }
                                placeholder="Precio"
                                className="
                                    w-full
                                    border
                                    rounded-2xl
                                    p-3
                                    mt-2
                                "
                            />

                        </div>

                    </div>

                )}


                {/* ============================= */}
                {/* ALFAJORES / COOKIES */}
                {/* ============================= */}

                {(isAlfajor || isCookies) && (

                    <SizesSection
                        sizes={sizes}
                        setSizes={setSizes}
                        prices={prices}
                        setPrices={setPrices}
                        type={
                            isCookies
                                ? "cookies"
                                : "alfajor"
                        }
                    />

                )}


                {/* ============================= */}
                {/* BENTO CAKES */}
                {/* ============================= */}

                {isBento && (

                    <div className="space-y-6">


                        {/* ============================= */}
                        {/* FORMAS */}
                        {/* ============================= */}

                        <div>

                            <label className="font-semibold">
                                Formas
                            </label>

                            <div className="space-y-3 mt-3">

                                {bentoFormas.map(
                                    (forma, index) => (

                                        <div
                                            key={index}
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                            "
                                        >

                                            <input
                                                type="text"
                                                value={forma}
                                                onChange={(e) => {

                                                    const newFormas =
                                                        [
                                                            ...bentoFormas
                                                        ];

                                                    newFormas[index] =
                                                        e.target.value;

                                                    setBentoFormas(
                                                        newFormas
                                                    );

                                                }}
                                                placeholder="Ej.: Redonda"
                                                className="
                                                    flex-1
                                                    border
                                                    rounded-2xl
                                                    p-3
                                                "
                                            />


                                            {bentoFormas.length > 1 && (

                                                <button
                                                    type="button"
                                                    onClick={() => {

                                                        setBentoFormas(
                                                            bentoFormas.filter(
                                                                (_, i) =>
                                                                    i !== index
                                                            )
                                                        );

                                                    }}
                                                    className="
                                                        px-4
                                                        py-3
                                                        rounded-2xl
                                                        bg-red-100
                                                        text-red-600
                                                    "
                                                >

                                                    🗑

                                                </button>

                                            )}

                                        </div>

                                    )
                                )}

                            </div>


                            <button
                                type="button"
                                onClick={() =>
                                    setBentoFormas([
                                        ...bentoFormas,
                                        ""
                                    ])
                                }
                                className="
                                    mt-3
                                    text-[#D08A9B]
                                    font-semibold
                                "
                            >

                                ➕ Agregar otra forma

                            </button>

                        </div>


                        {/* ============================= */}
                        {/* BIZCOCHUELOS */}
                        {/* ============================= */}

                        <div>

                            <label className="font-semibold">
                                Bizcochuelos
                            </label>

                            <div className="space-y-3 mt-3">

                                {bentoBizcochuelos.map(
                                    (
                                        bizcochuelo,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                            "
                                        >

                                            <input
                                                type="text"
                                                value={
                                                    bizcochuelo
                                                }
                                                onChange={(e) => {

                                                    const newBizcochuelos =
                                                        [
                                                            ...bentoBizcochuelos
                                                        ];

                                                    newBizcochuelos[
                                                        index
                                                    ] =
                                                        e.target.value;

                                                    setBentoBizcochuelos(
                                                        newBizcochuelos
                                                    );

                                                }}
                                                placeholder="Ej.: Vainilla"
                                                className="
                                                    flex-1
                                                    border
                                                    rounded-2xl
                                                    p-3
                                                "
                                            />


                                            {bentoBizcochuelos.length > 1 && (

                                                <button
                                                    type="button"
                                                    onClick={() => {

                                                        setBentoBizcochuelos(
                                                            bentoBizcochuelos.filter(
                                                                (_, i) =>
                                                                    i !== index
                                                            )
                                                        );

                                                    }}
                                                    className="
                                                        px-4
                                                        py-3
                                                        rounded-2xl
                                                        bg-red-100
                                                        text-red-600
                                                    "
                                                >

                                                    🗑

                                                </button>

                                            )}

                                        </div>

                                    )
                                )}

                            </div>


                            <button
                                type="button"
                                onClick={() =>
                                    setBentoBizcochuelos([
                                        ...bentoBizcochuelos,
                                        ""
                                    ])
                                }
                                className="
                                    mt-3
                                    text-[#D08A9B]
                                    font-semibold
                                "
                            >

                                ➕ Agregar otro bizcochuelo

                            </button>

                        </div>


                        {/* ============================= */}
                        {/* TAMAÑO */}
                        {/* ============================= */}

                        <div>

                            <label className="font-semibold">
                                Tamaño
                            </label>

                            <div className="
                                w-full
                                border
                                rounded-2xl
                                p-3
                                mt-2
                                bg-gray-50
                                text-gray-600
                            ">

                                10 cm

                            </div>

                        </div>


                        {/* ============================= */}
                        {/* COBERTURA */}
                        {/* ============================= */}

                        <div>

                            <label className="font-semibold">
                                Cobertura
                            </label>

                            <div className="
                                w-full
                                border
                                rounded-2xl
                                p-3
                                mt-2
                                bg-gray-50
                                text-gray-600
                            ">

                                Buttercream

                            </div>

                        </div>


                        {/* ============================= */}
                        {/* PRECIO */}
                        {/* ============================= */}

                        <div>

                            <label className="font-semibold">
                                Precio base
                            </label>

                            <input
                                type="number"
                                min="0"
                                value={
                                    prices["10"] || ""
                                }
                                onChange={(e) =>
                                    setPrices({

                                        ...prices,

                                        "10":
                                            Number(
                                                e.target.value
                                            )

                                    })
                                }
                                placeholder="Precio"
                                className="
                                    w-full
                                    border
                                    rounded-2xl
                                    p-3
                                    mt-2
                                "
                            />

                        </div>

                    </div>

                )}


                {/* ============================= */}
                {/* PERSONALIZADA */}
                {/* ============================= */}

                {isPersonalizada && (
    <>

        <PersonalizedSizesSection
            sizes={sizes}
            setSizes={setSizes}
            prices={prices}
            setPrices={setPrices}
        />

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


                {/* ============================= */}
                {/* EXTRAS */}
                {/* ============================= */}

                <ExtrasSection
                    extras={extras}
                    setExtras={setExtras}
                />


                {/* ============================= */}
                {/* TAMAÑOS TRADICIONALES */}
                {/* ============================= */}

                {!isMesaDulce &&
                 !isAlfajor &&
                 !isCookies &&
                 !isPersonalizada &&
                 !isBento && (

                    <SizesSection
                        sizes={sizes}
                        setSizes={setSizes}
                        prices={prices}
                        setPrices={setPrices}
                        type="tradicional"
                    />

                )}


                {/* ============================= */}
                {/* BOTONES */}
                {/* ============================= */}

                <div className="
                    flex
                    gap-4
                    pt-4
                ">

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={saving}
                        className="
                            flex-1
                            rounded-2xl
                            border
                            py-3
                        "
                    >

                        Cancelar

                    </button>


                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving}
                        className="
                            flex-1
                            rounded-2xl
                            bg-[#D08A9B]
                            text-white
                            py-3
                        "
                    >

                        {saving
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