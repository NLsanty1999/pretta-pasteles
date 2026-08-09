import { useState } from "react";

import Layout from "../Layout/Layout";
import useProducts from "../hooks/useProducts";

import ProductsList from "../components/AdminProducts/ProductsList";
import ProductForm from "../components/AdminProducts/ProductForm";

function AdminProducts() {

    const { products, loading } = useProducts();

    const [showForm, setShowForm] = useState(false);

    const [editingProduct, setEditingProduct] = useState(null);

    if (loading) {

        return (

            <Layout>

                <h2 className="text-center text-2xl mt-10">

                    Cargando productos...

                </h2>

            </Layout>

        );

    }

    return (

        <Layout>

            <div className="flex items-center justify-between mb-8">

                <h1 className="text-4xl font-bold">

                    Administrar Productos

                </h1>

                <button

                    onClick={() => {

                        setEditingProduct(null);

                        setShowForm(true);

                    }}

                    className="bg-[#D08A9B] text-white px-5 py-3 rounded-2xl font-semibold"

                >

                    ➕ Nuevo producto

                </button>

            </div>

            {(showForm || editingProduct) && (

                <ProductForm

                    editingProduct={editingProduct}

                    onClose={() => {

                        setShowForm(false);

                        setEditingProduct(null);

                    }}

                />

            )}

            <ProductsList

                products={products}

                onEdit={setEditingProduct}

            />

        </Layout>

    );

}

export default AdminProducts;