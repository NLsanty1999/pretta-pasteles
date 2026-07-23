function ProductForm() {

    return (

        <div className="bg-white rounded-3xl p-8 shadow mt-8">

            <input
                placeholder="Nombre"
                className="w-full border rounded-xl p-4 mb-4"
            />

            <input
                placeholder="Categoría"
                className="w-full border rounded-xl p-4 mb-4"
            />

            <button
                className="
                    bg-[#D08A9B]
                    text-white
                    rounded-xl
                    px-6
                    py-3
                "
            >
                Guardar
            </button>

        </div>

    );

}

export default ProductForm;