
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

    /*
     * =============================
     * PRECIOS POR PESO
     * =============================
     *
     * Se utilizan exclusivamente
     * para Bombón y Nueces.
     *
     * Las claves internas utilizan "g":
     * 250g
     * 500g
     * 750g
     * 1kg
     *
     * Pero al usuario se le muestra:
     * 250 gr
     * 500 gr
     * 750 gr
     * 1 kg
     */

    const existingWeightPrices =
        editingProduct?.weightPrices || {};

    const [weightPrices, setWeightPrices] = useState({
        "250g":
            existingWeightPrices["250g"] ??
            existingWeightPrices["250gr"] ??
            "",

        "500g":
            existingWeightPrices["500g"] ??
            existingWeightPrices["500gr"] ??
            "",

        "750g":
            existingWeightPrices["750g"] ??
            existingWeightPrices["750gr"] ??
            "",

        "1kg":
            existingWeightPrices["1kg"] ??
            ""
    });

    /*
     * =============================
     * PRECIOS CAMBIO DE RELLENO
     * =============================
     */

    const [fillingPrices, setFillingPrices] = useState(
        editingProduct?.fillingPrices || {
            "16": 9000,
            "20": 13000,
            "24": 0
        }
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
     * PRODUCTOS POR PESO
     * =============================
     *
     * Solamente:
     * - Bombón
     * - Nueces
     *
     * "Nuez" NO entra.
     */

    function normalizeProductName(value) {
        return String(value || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim()
            .toLowerCase();
    }

    const normalizedName =
        normalizeProductName(name);

const isWeightProduct =
    normalizedName.includes("bombon") ||
    normalizedName.includes("nueces");
    
    console.log(
        "NOMBRE PRODUCTO:",
        name
    );

    console.log(
        "NOMBRE NORMALIZADO:",
        normalizedName
    );

    console.log(
        "ES PRODUCTO POR PESO:",
        isWeightProduct
    );

    /*
     * Las claves internas usan "g",
     * pero las etiquetas visibles usan "gr".
     */

    const weightOptions = [
        {
            key: "250g",
            label: "250 gr"
        },
        {
            key: "500g",
            label: "500 gr"
        },
        {
            key: "750g",
            label: "750 gr"
        },
        {
            key: "1kg",
            label: "1 kg"
        }
    ];

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
     * TEXTO MESA DULCE
     * =============================
     */

    function getMesaDulceLabel(value) {

        const numericValue = Number(value);

        if (numericValue === 1) {
            return "1 kg";
        }

        if (numericValue === 12) {
            return "12 unidades";
        }

        if (numericValue === 35) {
            return "35 unidades";
        }

        return `${numericValue} unidades`;
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

            } else if (isAlfajor) {

                productType =
                    "alfajor";

            } else if (isMesaDulce) {

                productType =
                    "mesaDulce";

            } else if (isBento) {

                productType =
                    "bento";

            } else if (isCookies) {

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
             * PRECIOS
             * =============================
             */

            const cleanPrices = {
                ...prices
            };

            /*
             * Mesa dulce:
             * eliminamos el precio antiguo
             * "mesaDulce" si existiera.
             */

            if (isMesaDulce) {
                delete cleanPrices.mesaDulce;
            }

            /*
             * =============================
             * PRECIOS POR PESO
             * =============================
             *
             * Guardamos SIEMPRE las claves:
             *
             * 250g
             * 500g
             * 750g
             * 1kg
             *
             * Aunque visualmente se muestre:
             *
             * 250 gr
             * 500 gr
             * 750 gr
             * 1 kg
             */

            const cleanWeightPrices =
                isWeightProduct
                    ? {
                        "250g": Number(
                            weightPrices["250g"] || 0
                        ),

                        "500g": Number(
                            weightPrices["500g"] || 0
                        ),

                        "750g": Number(
                            weightPrices["750g"] || 0
                        ),

                        "1kg": Number(
                            weightPrices["1kg"] || 0
                        )
                    }
                    : editingProduct?.weightPrices || {};

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
                 */

                bentoFormas:
                    isBento
                        ? cleanBentoFormas
                        : [],

                bentoBizcochuelos:
                    isBento
                        ? cleanBentoBizcochuelos
                        : [],

                bentoForms:
                    isBento
                        ? cleanBentoFormas
                        : [],

                /*
                 * =============================
                 * MESA DULCE
                 * =============================
                 */

                quantity:
                    isMesaDulce
                        ? quantity
                        : null,

                image:
                    editingProduct?.image ||
                    "",

                /*
                 * =============================
                 * PRECIOS NORMALES
                 * =============================
                 */

                prices:
                    cleanPrices,

                /*
                 * =============================
                 * PRECIOS POR PESO
                 * =============================
                 */

                weightPrices:
                    cleanWeightPrices,

                /*
                 * =============================
                 * PRECIOS CAMBIO DE RELLENO
                 * =============================
                 */

                fillingPrices:
                    isPersonalizada
                        ? {
                            "16":
                                Number(
                                    fillingPrices["16"] || 0
                                ),

                            "20":
                                Number(
                                    fillingPrices["20"] || 0
                                ),

                            "24":
                                Number(
                                    fillingPrices["24"] || 0
                                )
                        }
                        : editingProduct?.fillingPrices || {},

                /*
                 * =============================
                 * TAMAÑOS
                 * =============================
                 */

                sizes:
                    isMesaDulce
                        ? [String(quantity)]
                        : isBento
                            ? ["10"]
                            : isWeightProduct
                                ? []
                                : sizes,

                /*
                 * =============================
                 * SABORES
                 * =============================
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
                 * =============================
                 * RELLENOS
                 * =============================
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
                 * =============================
                 * COBERTURAS
                 * =============================
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
                 * =============================
                 * EXTRAS
                 * =============================
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

        } catch (error) {

            console.error(
                "ERROR GUARDANDO PRODUCTO:",
                error
            );

            alert(
                editingProduct
                    ? "Error al actualizar el producto"
                    : "Error al crear el producto"
            );

        } finally {

            setSaving(false);
        }
    }

    return (

        <div
            className="
                bg-white
                rounded-3xl
                shadow
                p-6
                mb-8
            "
        >

            <h2
                className="
                    text-3xl
                    font-bold
                    mb-6
                "
            >
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
                                Presentación
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

                                <option value={1}>
                                    1 kg
                                </option>

                            </select>

                        </div>

                        <div>

                            <label className="font-semibold">
                                Precio
                            </label>

                            <input
                                type="number"
                                min="0"
                                value={
                                    prices[String(quantity)] ?? ""
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
                {/* BOMBÓN / NUECES */}
                {/* ============================= */}

                {isWeightProduct && (

                    <div
                        className="
                            border
                            rounded-3xl
                            p-5
                            bg-pink-50/40
                        "
                    >

                        <div className="mb-5">

                            <label className="font-semibold text-lg">
                                Precios por peso
                            </label>

                            <p className="text-sm text-gray-500 mt-1">
                                Configurá el precio de cada presentación.
                            </p>

                        </div>

                        <div className="grid grid-cols-1 gap-4">

                            {weightOptions.map(option => (

                                <div
                                    key={option.key}
                                    className="
                                        flex
                                        items-center
                                        gap-4
                                    "
                                >

                                    <div
                                        className="
                                            w-24
                                            font-semibold
                                            text-gray-700
                                        "
                                    >
                                        {option.label}
                                    </div>

                                    <div className="flex-1 relative">

                                        <span
                                            className="
                                                absolute
                                                left-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-gray-500
                                            "
                                        >
                                            $
                                        </span>

                                        <input
                                            type="number"
                                            min="0"
                                            value={
                                                weightPrices[option.key] ?? ""
                                            }
                                            onChange={(e) =>
                                                setWeightPrices({
                                                    ...weightPrices,
                                                    [option.key]:
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
                                                pl-9
                                                bg-white
                                            "
                                        />

                                    </div>

                                </div>

                            ))}

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

                        {/* FORMAS */}

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

                                                    const newFormas = [
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

                        {/* BIZCOCHUELOS */}

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

                                                    const newBizcochuelos = [
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

                        {/* TAMAÑO */}

                        <div>

                            <label className="font-semibold">
                                Tamaño
                            </label>

                            <div
                                className="
                                    w-full
                                    border
                                    rounded-2xl
                                    p-3
                                    mt-2
                                    bg-gray-50
                                    text-gray-600
                                "
                            >
                                10 cm
                            </div>

                        </div>

                        {/* COBERTURA */}

                        <div>

                            <label className="font-semibold">
                                Cobertura
                            </label>

                            <div
                                className="
                                    w-full
                                    border
                                    rounded-2xl
                                    p-3
                                    mt-2
                                    bg-gray-50
                                    text-gray-600
                                "
                            >
                                Buttercream
                            </div>

                        </div>

                        {/* PRECIO */}

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

                        {/* PRECIOS CAMBIO DE RELLENO */}

                        <div className="space-y-4">

                            <div>

                                <label className="font-semibold">
                                    Precio por cambio de relleno
                                </label>

                                <p className="text-sm text-gray-500 mt-1">
                                    El precio depende del diámetro
                                    de la torta y se aplica
                                    automáticamente a todos los
                                    pesos disponibles para ese tamaño.
                                </p>

                            </div>

                            {/* 16 CM */}

                            <div>

                                <label className="font-medium">
                                    16 cm
                                </label>

                                <div className="flex items-center gap-3 mt-2">

                                    <span className="text-gray-500">
                                        $
                                    </span>

                                    <input
                                        type="number"
                                        min="0"
                                        value={
                                            fillingPrices["16"] ?? ""
                                        }
                                        onChange={(e) =>
                                            setFillingPrices({
                                                ...fillingPrices,
                                                "16":
                                                    Number(
                                                        e.target.value
                                                    )
                                            })
                                        }
                                        placeholder="9000"
                                        className="
                                            flex-1
                                            border
                                            rounded-2xl
                                            p-3
                                        "
                                    />

                                </div>

                            </div>

                            {/* 20 CM */}

                            <div>

                                <label className="font-medium">
                                    20 cm
                                </label>

                                <div className="flex items-center gap-3 mt-2">

                                    <span className="text-gray-500">
                                        $
                                    </span>

                                    <input
                                        type="number"
                                        min="0"
                                        value={
                                            fillingPrices["20"] ?? ""
                                        }
                                        onChange={(e) =>
                                            setFillingPrices({
                                                ...fillingPrices,
                                                "20":
                                                    Number(
                                                        e.target.value
                                                    )
                                            })
                                        }
                                        placeholder="13000"
                                        className="
                                            flex-1
                                            border
                                            rounded-2xl
                                            p-3
                                        "
                                    />

                                </div>

                            </div>

                            {/* 24 CM */}

                            <div>

                                <label className="font-medium">
                                    24 cm
                                </label>

                                <div className="flex items-center gap-3 mt-2">

                                    <span className="text-gray-500">
                                        $
                                    </span>

                                    <input
                                        type="number"
                                        min="0"
                                        value={
                                            fillingPrices["24"] ?? ""
                                        }
                                        onChange={(e) =>
                                            setFillingPrices({
                                                ...fillingPrices,
                                                "24":
                                                    Number(
                                                        e.target.value
                                                    )
                                            })
                                        }
                                        placeholder="Precio"
                                        className="
                                            flex-1
                                            border
                                            rounded-2xl
                                            p-3
                                        "
                                    />

                                </div>

                            </div>

                        </div>

                        {/* TAMAÑOS PERSONALIZADOS */}

                        <PersonalizedSizesSection
                            sizes={sizes}
                            setSizes={setSizes}
                            prices={prices}
                            setPrices={setPrices}
                        />

                        {/* SABORES */}

                        <FlavorsSection
                            flavors={flavors}
                            setFlavors={setFlavors}
                        />

                        {/* RELLENOS */}

                        <FillingsSection
                            fillings={fillings}
                            setFillings={setFillings}
                        />

                        {/* COBERTURAS */}

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
                    !isBento &&
                    !isWeightProduct && (

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

                <div
                    className="
                        flex
                        gap-4
                        pt-4
                    "
                >

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

