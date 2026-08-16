import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import Layout from "../Layout/Layout";
import SearchBar from "../components/SearchBar/SearchBar";
import ProductCard from "../components/ProductCard/ProductCard";

import useProducts from "../hooks/useProducts";

function Catalog() {

    const { category } = useParams();

    const [searchParams] = useSearchParams();

    const tipo = searchParams.get("tipo");

    const { products, loading } = useProducts();

    const [search, setSearch] = useState("");


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

            const matchName = product.name
                ?.toLowerCase()
                .includes(search.toLowerCase());


            const matchCategory =
                !category ||
                product.category === Number(category);


            const matchType =
                tipo === "personalizadas"
                    ? product.type === "personalizada"
                    : true;


            return (
                matchName &&
                matchCategory &&
                matchType
            );

        })

        .sort(
            (a, b) => a.id - b.id
        );


    return (

        <Layout>

            <h1 className="
                text-4xl
                font-bold
                text-[#5A3B31]
                mb-8
            ">

                {tipo === "personalizadas"
                    ? "Tortas Personalizadas"
                    : "Catálogo"
                }

            </h1>


            <SearchBar

                search={search}

                setSearch={setSearch}

            />


            <div className="
                grid
                grid-cols-2
                gap-4
                mt-8
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