
import { useRef, useState } from "react";

import Layout from "../Layout/Layout";

import useProducts from "../hooks/useProducts";

import ProductsList from "../components/AdminProducts/ProductsList";

import ProductForm from "../components/AdminProducts/ProductForm";

function AdminProducts() {

    const { products, loading } = useProducts();

    const [showForm, setShowForm] = useState(false);

    const [editingProduct, setEditingProduct] = useState(null);

    const [search, setSearch] = useState("");

    const formRef = useRef(null);


    /*
     * ===============================
     * BUSCAR PRODUCTOS
     * ===============================
     */

    const filteredProducts = products.filter(product => {

        const productName =
            String(product.name || "").toLowerCase();

        const searchText =
            search.trim().toLowerCase();

        return productName.includes(searchText);

    });


    if (loading) {

        return (

            <Layout>

                <div className="pt-10">

                    <h2 className="text-center text-2xl">

                        Cargando productos...

                    </h2>

                </div>

            </Layout>

        );

    }


    return (

        <Layout>

            <div className="pt-15">


                {/* =============================== */}
                {/* TÍTULO + NUEVO PRODUCTO */}
                {/* =============================== */}

                <div className="
                    flex
                    items-center
                    justify-between
                    mb-8
                ">

                    <h1 className="text-4xl font-bold">

                        Administrar Productos

                    </h1>


                    <button
                        onClick={() => {

                            setEditingProduct(null);

                            setShowForm(true);

                        }}
                        className="
                            bg-[#D08A9B]
                            text-white
                            px-5
                            py-3
                            rounded-2xl
                            font-semibold
                        "
                    >

                        ➕ Nuevo producto

                    </button>

                </div>


                {/* =============================== */}
                {/* BUSCADOR */}
                {/* =============================== */}

                <div className="mb-8">

                    <label className="
                        block
                        font-semibold
                        mb-2
                    ">

                        Buscar producto

                    </label>


                    <div className="relative">

                        <span className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-gray-400
                            text-lg
                        ">

                            🔍

                        </span>


                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Buscar por nombre..."
                            className="
                                w-full
                                border
                                rounded-2xl
                                p-4
                                pl-12
                                bg-white
                                outline-none
                                focus:ring-2
                                focus:ring-[#D08A9B]
                            "
                        />


                        {search && (

                            <button
                                type="button"
                                onClick={() =>
                                    setSearch("")
                                }
                                className="
                                    absolute
                                    right-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-400
                                    hover:text-gray-700
                                    text-lg
                                "
                            >

                                ✕

                            </button>

                        )}

                    </div>

                </div>


                {/* =============================== */}
                {/* FORMULARIO */}
                {/* =============================== */}

                {(showForm || editingProduct) && (

                    <div ref={formRef}>

                        <ProductForm

                            editingProduct={editingProduct}

                            onClose={() => {

                                setShowForm(false);

                                setEditingProduct(null);

                            }}

                        />

                    </div>

                )}


                {/* =============================== */}
                {/* RESULTADOS */}
                {/* =============================== */}

                {filteredProducts.length > 0 ? (

                    <ProductsList

                        products={filteredProducts}

                        onEdit={(product) => {

                            setEditingProduct(product);

                            setShowForm(false);


                            setTimeout(() => {

                                formRef.current?.scrollIntoView({

                                    behavior: "smooth",

                                    block: "start"

                                });

                            }, 100);

                        }}

                    />

                ) : (

                    <div className="
                        bg-white
                        rounded-3xl
                        shadow
                        p-10
                        text-center
                    ">

                        <div className="text-5xl mb-4">

                            🔍

                        </div>


                        <h2 className="
                            text-xl
                            font-semibold
                            text-gray-700
                        ">

                            No encontramos productos

                        </h2>


                        <p className="
                            text-gray-500
                            mt-2
                        ">

                            Probá buscando con otro nombre.

                        </p>

                    </div>

                )}

            </div>

        </Layout>

    );

}


export default AdminProducts;

