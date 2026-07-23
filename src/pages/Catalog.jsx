import { useState } from "react";

import Layout from "../Layout/Layout";
import SearchBar from "../components/SearchBar/SearchBar";
import CategoryFilter from "../components/CategoryFilter/CategoryFilter";
import ProductCard from "../components/ProductCard/ProductCard";

import products from "../data/products";

function Catalog() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(0);

    const filteredProducts = products.filter((product) => {
        const matchName = product.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchCategory =
            selectedCategory === 0 ||
            product.category === selectedCategory;

        return matchName && matchCategory;
    });

    return (
        <Layout>

            <h1 className="text-4xl font-bold text-[#5A3B31] mb-8">
                Catálogo
            </h1>

            <SearchBar
                search={search}
                setSearch={setSearch}
            />

            <div className="mt-6">
                <CategoryFilter
                    selected={selectedCategory}
                    setSelected={setSelectedCategory}
                />
            </div>

            <div className="space-y-6 mt-8">

                {filteredProducts.map((product) => (

                    <ProductCard
                        key={product.id}
                        product={product}
                    />

                ))}

            </div>

        </Layout>
    );
}

export default Catalog;