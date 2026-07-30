import { useParams } from "react-router-dom";

import Layout from "../Layout/Layout";

import ProductCard from "../components/ProductCard/ProductCard";

import tortas from "../data/products/tortas";
import tartas from "../data/products/tartas";
import alfajores from "../data/products/alfajores";
import mesaDulce from "../data/products/mesaDulce";

function CategoryProducts() {

    const { category } = useParams();

    let products = [];

    switch (category) {

        case "tortas":

            products = tortas.filter(

                product => product.type === "tradicional"

            );

            break;

        case "tartas":

            products = tartas;

            break;

        case "alfajores":

            products = alfajores;

            break;

        case "mesa-dulce":

            products = mesaDulce;

            break;

        default:

            products = [];

    }

    return (

        <Layout>

            <div className="space-y-6">

                {

                    products.map(product => (

                        <ProductCard

                            key={product.id}

                            product={product}

                        />

                    ))

                }

            </div>

        </Layout>

    );

}

export default CategoryProducts;