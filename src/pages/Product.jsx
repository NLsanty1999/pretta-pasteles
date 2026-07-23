import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../Layout/Layout";

import products from "../data/products";

import { useCart } from "../context/CartContext";

function Product() {

    const { id } = useParams();

    const { addToCart } = useCart();

    const product = products.find(

        p => p.id === Number(id)

    );

    if (!product) {

        return (

            <Layout>

                <div className="text-center py-20">

                    <h2 className="text-3xl font-bold">

                        Producto no encontrado

                    </h2>

                </div>

            </Layout>

        );

    }

    const [size, setSize] = useState(

        product.sizes[0]

    );

    const [flavor, setFlavor] = useState(

        product.flavors[0]

    );

    const [filling, setFilling] = useState(

        product.fillings[0]

    );

    const [covering, setCovering] = useState(

        product.coverings[0]

    );

    const [extras, setExtras] = useState([]);

    const [note, setNote] = useState("");

    function toggleExtra(name) {

        if (extras.includes(name)) {

            setExtras(

                extras.filter(

                    extra => extra !== name

                )

            );

        }

        else {

            setExtras([

                ...extras,

                name

            ]);

        }

    }

    const extrasPrice = useMemo(() => {

        return extras.reduce(

            (total, name) => {

                const extra = product.extras.find(

                    e => e.name === name

                );

                return total + (

                    extra

                        ? extra.price

                        : 0

                );

            },

            0

        );

    }, [extras, product]);

    const totalPrice = useMemo(() => {

        return Number(

            product.prices[size]

        ) + extrasPrice;

    }, [

        size,

        extrasPrice,

        product

    ]);

    function handleAdd() {

        addToCart({

            id: crypto.randomUUID(),

            productId: product.id,

            name: product.name,

            size,

            flavor,

            filling,

            covering,

            extras,

            note,

            price: totalPrice

        });

        alert(

            "Producto agregado al pedido."

        );

    }

    return (

        <Layout>

            <div className="bg-pink-100 rounded-3xl h-56 flex items-center justify-center">

                <span className="text-8xl">

                    🎂

                </span>

            </div>

            <h1 className="text-4xl font-bold mt-8">

                {product.name}

            </h1>

            <p className="text-gray-600 mt-3">

                {product.description}

            </p>

            <div className="mt-10 space-y-6">

                <div>

                    <label className="font-semibold block mb-2">
                        Tamaño
                    </label>

                    <select
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className="w-full rounded-xl border p-4"
                    >

                        {product.sizes.map((option) => (

                            <option
                                key={option}
                                value={option}
                            >
                                {option} cm
                            </option>

                        ))}

                    </select>

                </div>

                <div>

                    <label className="font-semibold block mb-2">
                        Bizcochuelo
                    </label>

                    <select
                        value={flavor}
                        onChange={(e) => setFlavor(e.target.value)}
                        className="w-full rounded-xl border p-4"
                    >

                        {product.flavors.map((option) => (

                            <option
                                key={option}
                                value={option}
                            >
                                {option}
                            </option>

                        ))}

                    </select>

                </div>

                <div>

                    <label className="font-semibold block mb-2">
                        Relleno
                    </label>

                    <select
                        value={filling}
                        onChange={(e) => setFilling(e.target.value)}
                        className="w-full rounded-xl border p-4"
                    >

                        {product.fillings.map((option) => (

                            <option
                                key={option}
                                value={option}
                            >
                                {option}
                            </option>

                        ))}

                    </select>

                </div>

                <div>

                    <label className="font-semibold block mb-2">
                        Cobertura
                    </label>

                    <select
                        value={covering}
                        onChange={(e) => setCovering(e.target.value)}
                        className="w-full rounded-xl border p-4"
                    >

                        {product.coverings.map((option) => (

                            <option
                                key={option}
                                value={option}
                            >
                                {option}
                            </option>

                        ))}

                    </select>

                </div>

                <div>

                    <label className="font-semibold block mb-4">
                        Extras
                    </label>

                    <div className="grid grid-cols-2 gap-3">

                        {product.extras.map((extra) => (

                            <button
                                key={extra.name}
                                type="button"
                                onClick={() => toggleExtra(extra.name)}
                                className={`rounded-2xl border p-4 transition ${
                                    extras.includes(extra.name)
                                        ? "bg-[#D08A9B] text-white border-[#D08A9B]"
                                        : "bg-white hover:bg-pink-50"
                                }`}
                            >

                                <div className="font-semibold">

                                    {extra.name}

                                </div>

                                <div className="text-sm mt-1">

                                    +${extra.price.toLocaleString("es-AR")}

                                </div>

                            </button>

                        ))}

                    </div>

                </div>

                <div>

                    <label className="font-semibold block mb-2">
                        Observaciones
                    </label>

                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Ej.: Sin azúcar, nombre para la torta, colores, etc."
                        className="w-full h-32 rounded-2xl border p-4 resize-none"
                    />

                </div>

                <div className="bg-white rounded-3xl shadow p-6">

                    <div className="flex justify-between items-center">

                        <span className="text-xl font-semibold">
                            Total
                        </span>

                        <span className="text-3xl font-bold text-[#D08A9B]">

                            ${totalPrice.toLocaleString("es-AR")}

                        </span>

                    </div>

                </div>

                <button

                    onClick={handleAdd}

                    className="
                        w-full
                        rounded-full
                        py-4
                        bg-[#D08A9B]
                        text-white
                        text-lg
                        font-bold
                        hover:bg-[#c77c8f]
                        transition
                    "

                >

                    Agregar al pedido

                </button>

            </div>

        </Layout>

    );

}

export default Product;