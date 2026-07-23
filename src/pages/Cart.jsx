import Layout from "../Layout/Layout";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {

    const navigate = useNavigate();

    const {
        cart,
        removeFromCart,
        totalPrice
    } = useCart();

    return (

        <Layout>

            <h1 className="text-3xl font-bold mb-8">
                Mi Pedido
            </h1>

            {cart.map((item, index) => (

                <div
                    key={index}
                    className="bg-white rounded-3xl shadow p-5 mb-5"
                >

                    <h2 className="text-2xl font-bold">
                        {item.name}
                    </h2>

                    <p><b>Tamaño:</b> {item.size}</p>

                    <p><b>Bizcochuelo:</b> {item.flavor}</p>

                    <p><b>Relleno:</b> {item.filling}</p>

                    <p><b>Cobertura:</b> {item.covering}</p>

                    <p><b>Extras:</b></p>

                    <ul className="list-disc ml-5">
                        {item.extras.map((extra) => (
                            <li key={extra}>{extra}</li>
                        ))}
                    </ul>

                    <p className="mt-3">
                        <b>Observaciones:</b>
                    </p>

                    <div className="bg-gray-100 rounded-xl p-3">
                        {item.note || "Sin observaciones"}
                    </div>

                    <button
                        onClick={() => removeFromCart(index)}
                        className="mt-5 text-red-500"
                    >
                        Eliminar
                    </button>

                </div>

            ))}

            {cart.length > 0 && (

                <>
                    <div className="text-center mt-6">

                        <p className="text-3xl font-bold">
                            Total: ${totalPrice.toLocaleString("es-AR")}
                        </p>

                    </div>

                    <button
                        onClick={() => navigate("/checkout")}
                        className="w-full rounded-full py-4 bg-[#D08A9B] text-white font-bold mt-6"
                    >
                        Continuar Pedido
                    </button>
                </>

            )}

        </Layout>

    );

}

export default Cart;