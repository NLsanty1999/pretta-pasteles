import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../Layout/Layout";

import { useCart } from "../context/CartContext";

import { saveOrder } from "../firebase/orders";

function Checkout() {

    const navigate = useNavigate();

    const {

        cart,

        clearCart,

        totalPrice

    } = useCart();

    const [loading, setLoading] = useState(false);

    const [client, setClient] = useState({

        name: "",

        phone: "",

        address: ""

    });

    function handleChange(e) {

        setClient({

            ...client,

            [e.target.name]: e.target.value

        });

    }

    async function finishOrder() {

        if (!client.name || !client.phone)

            return alert("Completá nombre y teléfono.");

        setLoading(true);

        try {

            await saveOrder({

                client,

                items: cart,

                price: totalPrice

            });

            clearCart();

            alert("¡Pedido enviado correctamente!");

            navigate("/");

        }

        catch {

            alert("No se pudo guardar el pedido.");

        }

        setLoading(false);

    }

    return (

        <Layout>

            <h1 className="text-3xl font-bold mb-8">

                Finalizar Pedido

            </h1>

            <div className="space-y-5">

                <input

                    name="name"

                    placeholder="Nombre"

                    value={client.name}

                    onChange={handleChange}

                    className="w-full border rounded-xl p-4"

                />

                <input

                    name="phone"

                    placeholder="Teléfono"

                    value={client.phone}

                    onChange={handleChange}

                    className="w-full border rounded-xl p-4"

                />

                <input

                    name="address"

                    placeholder="Dirección (opcional)"

                    value={client.address}

                    onChange={handleChange}

                    className="w-full border rounded-xl p-4"

                />

                <div className="text-2xl font-bold">

                    Total: ${totalPrice.toLocaleString("es-AR")}

                </div>

                <button

                    disabled={loading}

                    onClick={finishOrder}

                    className="w-full rounded-full py-4 bg-[#D08A9B] text-white font-bold"

                >

                    {

                        loading

                            ? "Enviando..."

                            : "Confirmar Pedido"

                    }

                </button>

            </div>

        </Layout>

    );

}

export default Checkout;