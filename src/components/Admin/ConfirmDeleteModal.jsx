function ConfirmDeleteModal({
    open,
    onCancel,
    onConfirm
}) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl p-6 w-[92%] max-w-sm">

                <h2 className="text-2xl font-bold">

                    Eliminar pedido

                </h2>

                <p className="mt-4 text-gray-600">

                    ¿Estás seguro de que querés eliminar este pedido?

                </p>

                <div className="flex gap-3 mt-8">

                    <button
                        onClick={onCancel}
                        className="
                            flex-1
                            border
                            rounded-xl
                            py-3
                        "
                    >

                        Cancelar

                    </button>

                    <button
                        onClick={onConfirm}
                        className="
                            flex-1
                            bg-red-500
                            hover:bg-red-600
                            transition
                            text-white
                            rounded-xl
                            py-3
                        "
                    >

                        Eliminar

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ConfirmDeleteModal;