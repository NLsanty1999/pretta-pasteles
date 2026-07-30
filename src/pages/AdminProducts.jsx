import { useState } from "react";

import Layout from "../Layout/Layout";
import products from "../data/products";

import ProductsList from "../components/AdminProducts/ProductsList";
import ProductForm from "../components/AdminProducts/ProductForm";

function AdminProducts() {

    const [showForm, setShowForm] = useState(false);

    return (

        <Layout>

            <div className="flex items-center justify-between mb-8">

                <h1 className="text-4xl font-bold">

                    Administrar Productos

                </h1>

                <button

                    onClick={() => setShowForm(true)}

                    className="bg-[#D08A9B] text-white px-5 py-3 rounded-2xl font-semibold hover:opacity-90"

                >

                    ➕ Nuevo producto

                </button>

            </div>

            {

                showForm && (

                    <ProductForm

                        onClose={() => setShowForm(false)}

                    />

                )

            }

            <ProductsList

                products={products}

            />

        </Layout>

    );

}

export default AdminProducts;