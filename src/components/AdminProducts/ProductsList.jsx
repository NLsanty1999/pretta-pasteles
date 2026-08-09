import ProductEditor from "./ProductEditor";

function ProductsList({

    products,

    onEdit

}) {

    return (

        <div className="space-y-6">

            {

                products.map(product => (

                    <ProductEditor

                        key={product.slug}

                        product={product}

                        onEdit={onEdit}

                    />

                ))

            }

        </div>

    );

}

export default ProductsList;