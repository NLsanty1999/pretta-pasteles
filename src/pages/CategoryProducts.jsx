import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../Layout/Layout";
import ProductCard from "../components/ProductCard/ProductCard";

import { getProducts } from "../firebase/products";

function CategoryProducts() {

    const { category } = useParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadProducts() {

            try {

                const data = await getProducts();

                let filteredProducts = [];

                switch (category) {

                    case "tortas":

                        filteredProducts = data.filter(
                            product =>
                                product.type === "tradicional"
                        );

                        break;

                    case "tartas":

                        filteredProducts = data.filter(
                            product =>
                                product.category === 2 ||
                                product.categories?.includes(2)
                        );

                        break;

                    case "alfajores":

                        filteredProducts = data.filter(
                            product =>
                                product.type === "alfajor" ||
                                product.category === 4 ||
                                product.categories?.includes(4)
                        );

                        break;

                    case "mesa-dulce":

                        filteredProducts = data.filter(
                            product =>
                                product.type === "mesaDulce" ||
                                product.category === 3 ||
                                product.categories?.includes(3)
                        );

                        break;

                    default:

                        filteredProducts = [];

                }

                setProducts(filteredProducts);

            } catch (error) {

                console.error(
                    "Error cargando productos:",
                    error
                );

                setProducts([]);

            } finally {

                setLoading(false);

            }

        }

        loadProducts();

    }, [category]);


    if (loading) {

        return (

            <Layout>

                <div className="flex justify-center py-10">

                    <p>Cargando productos...</p>

                </div>

            </Layout>

        );

    }


    return (

        <Layout>

            <div className="space-y-6">

                {products.map(product => (

                    <ProductCard
                        key={product.slug || product.id}
                        product={product}
                    />

                ))}

            </div>

        </Layout>

    );

}

export default CategoryProducts;