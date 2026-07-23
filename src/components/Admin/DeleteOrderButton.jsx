import { Trash2 } from "lucide-react";

function DeleteOrderButton({ onDelete }) {

    return (

        <button
            onClick={onDelete}
            className="
                w-full
                mt-4
                bg-red-500
                hover:bg-red-600
                transition
                text-white
                rounded-xl
                py-3
                flex
                items-center
                justify-center
                gap-2
            "
        >

            <Trash2 size={18} />

            Eliminar pedido

        </button>

    );

}

export default DeleteOrderButton;