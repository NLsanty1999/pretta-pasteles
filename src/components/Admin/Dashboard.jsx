import { useState } from "react";

import Products from "./Products/Products";
import ProductForm from "./Products/ProductForm";

function Dashboard() {

    const [showForm, setShowForm] = useState(false);

    return (

        <>

            <div className="grid grid-cols-3 gap-5 mb-10">

                <div className="bg-white rounded-3xl p-6 shadow">

                    <h3>Pedidos</h3>

                    <p className="text-4xl font-bold">
                        0
                    </p>

                </div>

                <div className="bg-white rounded-3xl p-6 shadow">

                    <h3>Productos</h3>

                    <p className="text-4xl font-bold">
                        2
                    </p>

                </div>

                <div className="bg-white rounded-3xl p-6 shadow">

                    <h3>Clientes</h3>

                    <p className="text-4xl font-bold">
                        0
                    </p>

                </div>

            </div>

            <button
                onClick={() => setShowForm(!showForm)}
                className="
                    mb-6
                    bg-[#D08A9B]
                    text-white
                    px-6
                    py-3
                    rounded-xl
                "
            >
                {showForm ? "Cerrar Formulario" : "Agregar Producto"}
            </button>

            {showForm && <ProductForm />}

            <Products />

        </>

    );

}

export default Dashboard;