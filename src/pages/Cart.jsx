import Layout from "../Layout/Layout";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {

    const navigate = useNavigate();

    const {

        cart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        totalPrice

    } = useCart();

    return (

        <Layout>

            <h1
    className="
        text-center
        text-3xl
        font-light
        text-[#5A3B31]
        pt-15
        mb-8
    "
>
    Mi Pedido
</h1>

            {

                cart.map((item, index) => (

                    <div

                        key={index}

                        className="bg-white rounded-3xl shadow p-5 mb-5"

                    >

                        <div className="flex justify-between items-start">

                            <div>

                                <h2 className="text-2xl font-bold">

                                    {item.name}

                                </h2>

                                <p className="text-gray-500">

                                    ${item.price.toLocaleString("es-AR")} c/u

                                </p>

                            </div>

                            <button

                                onClick={() => removeFromCart(index)}

                                className="text-red-500"

                            >

                                🗑

                            </button>

                        </div>

                        {item.size && (

                            <p>

                                <b>Tamaño:</b> {item.size}

                            </p>

                        )}

                        {item.flavor && (

                            <p>

                                <b>Bizcochuelo:</b> {item.flavor}

                            </p>

                        )}

                        {item.filling && (

                            <p>

                                <b>Relleno:</b> {item.filling}

                            </p>

                        )}

                        {item.covering && (

                            <p>

                                <b>Cobertura:</b> {item.covering}

                            </p>

                        )}

                        {item.deliveryDate && (

                            <p>

                                <b>Entrega:</b>{" "}

                                {new Date(item.deliveryDate).toLocaleDateString("es-AR")}

                            </p>

                        )}

                        {item.deliveryHour && (

                            <p>

                                <b>Horario:</b> {item.deliveryHour}

                            </p>

                        )}

                        {

                            item.extras?.length > 0 && (

                                <>

                                    <p className="mt-3">

                                        <b>Extras</b>

                                    </p>

                                    <ul className="list-disc ml-5">

                                        {

                                            item.extras.map(extra => (

                                                <li key={extra}>

                                                    {extra}

                                                </li>

                                            ))

                                        }

                                    </ul>

                                </>

                            )

                        }

                        <div className="flex items-center justify-between mt-5">

                            <div className="flex items-center gap-3">

                                <button

                                    onClick={() => decreaseQuantity(index)}

                                    className="w-8 h-8 rounded-full bg-gray-200"

                                >

                                    -

                                </button>

                                <span className="text-xl font-bold">

                                    {item.quantity}

                                </span>

                                <button

                                    onClick={() => increaseQuantity(index)}

                                    className="w-8 h-8 rounded-full bg-[#D08A9B] text-white"

                                >

                                    +

                                </button>

                            </div>

                            <p className="text-2xl font-bold">

                                $

                                {(item.price * item.quantity).toLocaleString("es-AR")}

                            </p>

                        </div>

                    </div>

                ))

            }

            {

                cart.length > 0 && (

                    <>

                        <div className="text-center mt-8">

                            <p className="text-3xl font-bold">

                                Total

                            </p>

                            <p className="text-4xl font-bold text-[#D08A9B]">

                                ${totalPrice.toLocaleString("es-AR")}

                            </p>

                        </div>

                        <button

                            onClick={() => navigate("/checkout")}

                            className="w-full rounded-full py-4 bg-[#D08A9B] text-white font-bold mt-6"

                        >

                            Continuar Pedido

                        </button>

                    </>

                )

            }

        </Layout>

    );

}

export default Cart;