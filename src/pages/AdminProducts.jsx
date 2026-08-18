import { useRef, useState } from "react";

import Layout from "../Layout/Layout";
import useProducts from "../hooks/useProducts";

import ProductsList from "../components/AdminProducts/ProductsList";
import ProductForm from "../components/AdminProducts/ProductForm";

function AdminProducts() {

    const { products, loading } = useProducts();

    const [showForm, setShowForm] = useState(false);

    const [editingProduct, setEditingProduct] = useState(null);

    const formRef = useRef(null);


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

                <div className="flex items-center justify-between mb-8">

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
                {/* LISTA DE PRODUCTOS */}
                {/* =============================== */}

                <ProductsList

    products={products}

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


            </div>

        </Layout>

    );

}


export default AdminProducts;