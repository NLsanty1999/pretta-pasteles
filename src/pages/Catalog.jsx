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

            return (
                !category ||
                product.category === Number(category)
            );

        })

        .sort(
            (a, b) => a.id - b.id
        );


    return (

        <Layout>

            <div className="
    grid
    grid-cols-2
    gap-4
    pt-16
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