import { useParams } from "react-router-dom";

import Layout from "../Layout/Layout";
import ProductCard from "../components/ProductCard/ProductCard";

import useProducts from "../hooks/useProducts";

function Catalog() {

    const { category } = useParams();

    const { products, loading } = useProducts();


    if (loading) {

        return (

            <Layout>

                <h2 className="text-center text-2xl mt-10">

                    Cargando productos...

                </h2>

            </Layout>

        );

    }


const filteredProducts = products

    .filter((product) => {

        /*
         * Categorías del producto
         *
         * Si tiene categories[],
         * usamos esas categorías.
         *
         * Si es un producto viejo que todavía
         * no tiene categories[], usamos category.
         */

        const productCategories =
            product.categories?.length
                ? product.categories.map(Number)
                : [Number(product.category)];


        /*
         * Si no estamos dentro de un catálogo,
         * mostramos todos.
         */

        if (!category) {
            return true;
        }


        /*
         * Mostramos el producto si pertenece
         * al catálogo seleccionado.
         */

        return productCategories.includes(
            Number(category)
        );

    })

    .sort((a, b) =>
    a.name.localeCompare(
        b.name,
        "es",
        {
            sensitivity: "base"
        }
    )
);
    return (

        <Layout>

            <div className="
                grid
                grid-cols-2
                gap-4
                pt-16
                px-3
            ">

                {

                    filteredProducts.map(product => (

                        <ProductCard

                            key={product.slug}

                            product={product}

                        />

                    ))

                }

            </div>

        </Layout>

    );

}

export default Catalog;