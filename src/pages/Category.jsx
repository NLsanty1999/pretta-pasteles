import { useNavigate, useParams } from "react-router-dom";

import Layout from "../Layout/Layout";

function Category() {

    const { category } = useParams();

    const navigate = useNavigate();

    if (category === "tortas") {

        return (

            <Layout>

                <h1 className="text-4xl font-bold mb-8">

                    Tortas

                </h1>

                <div className="space-y-5">

                    <button

                        onClick={() => navigate("/catalogo?tipo=personalizadas")}

                        className="w-full bg-white rounded-3xl shadow p-8 text-left hover:shadow-lg transition"

                    >

                        <div className="text-5xl">

                            🎨

                        </div>

                        <h2 className="text-2xl font-bold mt-4">

                            Tortas Personalizadas

                        </h2>

                        <p className="text-gray-500 mt-2">

                            Diseñá tu torta paso a paso.

                        </p>

                    </button>

                    <button

                        onClick={() => navigate("/categoria/tortas/productos")}

                        className="w-full bg-white rounded-3xl shadow p-8 text-left hover:shadow-lg transition"

                    >

                        <div className="text-5xl">

                            🍰

                        </div>

                        <h2 className="text-2xl font-bold mt-4">

                            Tortas Tradicionales

                        </h2>

                        <p className="text-gray-500 mt-2">

                            Balcarce, Selva Negra, Matilda, Rogel y más.

                        </p>

                    </button>

                </div>

            </Layout>

        );

    }

    return (

        <Layout>

            <h1 className="text-4xl font-bold">

                {category}

            </h1>

        </Layout>

    );

}

export default Category;