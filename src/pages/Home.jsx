import Layout from "../Layout/Layout";
import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories";
import ProductCard from "../components/ProductCard/ProductCard";

import products from "../data/products";

function Home() {
    return (
        <Layout>

            <Hero />

            <section className="mt-12">

                <h2 className="text-3xl font-bold text-[#5A3B31] mb-5">
                    Categorías
                </h2>

                <Categories />

            </section>

            <section className="mt-12">

                <h2 className="text-3xl font-bold text-[#5A3B31] mb-5">
                    Productos Destacados
                </h2>

                <div className="space-y-6">

    {products.slice(0, 1).map((product) => (

        <ProductCard
            key={product.id}
            product={product}
        />

    ))}

</div>
            </section>

        </Layout>
    );
}

export default Home;