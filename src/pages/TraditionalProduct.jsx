import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../Layout/Layout";
import useProducts from "../hooks/useProducts";
import { useCart } from "../context/CartContext";   

function TraditionalProduct() {

    const { slug } = useParams();

    const { addToCart } = useCart();

    const { products, loading } = useProducts();

    const product = products.find(
        p => p.slug === slug
    );

    const [size, setSize] = useState("");

    const [quantity, setQuantity] = useState(1);

    const [note, setNote] = useState("");

    useEffect(() => {

        if (product?.sizes?.length) {

            setSize(product.sizes[0]);

        }

    }, [product]);

    const price = useMemo(() => {

        if (!product || !size) return 0;

        return product.prices?.[size] ?? 0;

    }, [product, size]);

    if (loading) {

        return (

            <Layout>

                <h2 className="text-center text-2xl mt-10">

                    Cargando producto...

                </h2>

            </Layout>

        );

    }

    if (!product) {

        return (

            <Layout>

                Producto no encontrado

            </Layout>

        );

    }
    function handleAdd() {

        addToCart({

            id: product.id,

            name: product.name,

            size,

            quantity,

            note,

            price

        });

    }

    return (

        <Layout>

            <div className="max-w-xl mx-auto">

                <div className="h-72 rounded-3xl bg-[#F8F3F0] flex items-center justify-center">

                    <span className="text-8xl">

                        🎂

                    </span>

                </div>

                <h1 className="text-4xl font-bold mt-8">

                    {product.name}

                </h1>

                <p className="text-gray-500 mt-3">

                    {product.description}

                </p>

                <h2 className="font-bold text-xl mt-8 mb-3">

                    Tamaño

                </h2>

                <div className="flex gap-3">

                    {

                        product.sizes.map(s => (

                            <button

                                key={s}

                                onClick={() => setSize(s)}

                                className={`

                                    px-5
                                    py-3
                                    rounded-full
                                    border
                                    transition

                                    ${size === s

                                        ? "bg-[#D08A9B] text-white border-[#D08A9B]"

                                        : "bg-white"

                                    }

                                `}

                            >

                                {s} cm

                            </button>

                        ))

                    }

                </div>

                <h2 className="font-bold text-xl mt-8 mb-3">

                    Cantidad

                </h2>

                <div className="flex items-center gap-5">

                    <button

                        onClick={() =>
                            quantity > 1 &&
                            setQuantity(quantity - 1)
                        }

                        className="w-12 h-12 rounded-full bg-pink-100"

                    >

                        -

                    </button>

                    <span className="text-2xl font-bold">

                        {quantity}

                    </span>

                    <button

                        onClick={() =>
                            setQuantity(quantity + 1)
                        }

                        className="w-12 h-12 rounded-full bg-pink-100"

                    >

                        +

                    </button>

                </div>

                <h2 className="font-bold text-xl mt-8 mb-3">

                    Observaciones

                </h2>

                <textarea

                    value={note}

                    onChange={(e) =>
                        setNote(e.target.value)
                    }

                    rows={4}

                    className="w-full border rounded-2xl p-4"

                    placeholder="Ej.: Sin nueces, escribir dedicatoria..."

                />

                <div className="mt-8">

                    <p className="text-3xl font-bold text-[#D08A9B]">

                        ${price.toLocaleString("es-AR")}

                    </p>

                </div>

                <button

                    onClick={handleAdd}

                    className="w-full mt-8 rounded-full bg-[#D08A9B] text-white py-4 font-bold"

                >

                    Agregar al pedido

                </button>

            </div>

        </Layout>

    );

}

export default TraditionalProduct;