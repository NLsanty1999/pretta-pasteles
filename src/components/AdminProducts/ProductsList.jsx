import ProductEditor from "./ProductEditor";

function ProductsList({ products }) {

    return (

        <div className="space-y-6">

            {

                products.map(product => (

                    <ProductEditor

                        key={product.slug}

                        product={product}

                    />

                ))

            }

        </div>

    );

}

export default ProductsList;