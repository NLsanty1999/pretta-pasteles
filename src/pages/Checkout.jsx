import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../Layout/Layout";

import { useCart } from "../context/CartContext";

import { saveOrder } from "../firebase/orders";

import {
    doc,
    onSnapshot
} from "firebase/firestore";

import { db } from "../firebase/config";


function Checkout() {

    const navigate = useNavigate();


    const {
        cart,
        clearCart,
        totalPrice
    } = useCart();


    const [loading, setLoading] = useState(false);

    const [blockedDates, setBlockedDates] = useState([]);


    const [client, setClient] = useState({

        name: "",

        phone: ""

    });


    const [deliveryDate, setDeliveryDate] = useState("");


    useEffect(() => {

        const unsubscribe = onSnapshot(

            doc(
                db,
                "settings",
                "availability"
            ),

            (snapshot) => {

                if (snapshot.exists()) {

                    setBlockedDates(
                        snapshot.data().blockedDates || []
                    );

                }

                else {

                    setBlockedDates([]);

                }

            },

            (error) => {

                console.error(
                    "Error cargando disponibilidad:",
                    error
                );

            }

        );


        return unsubscribe;

    }, []);


    function getToday() {

        const today = new Date();

        const year = today.getFullYear();

        const month = String(
            today.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            today.getDate()
        ).padStart(2, "0");


        return `${year}-${month}-${day}`;

    }


    function handleChange(e) {

        setClient({

            ...client,

            [e.target.name]: e.target.value

        });

    }


    function handleDateChange(e) {

        const date = e.target.value;


        if (blockedDates.includes(date)) {

            alert(
                "La fecha seleccionada no está disponible."
            );

            return;

        }


        setDeliveryDate(date);

    }


    async function finishOrder() {

        if (!client.name || !client.phone) {

            return alert(
                "Completá nombre y teléfono."
            );

        }


        if (!deliveryDate) {

            return alert(
                "Seleccioná una fecha de entrega."
            );

        }


        if (blockedDates.includes(deliveryDate)) {

            return alert(
                "La fecha seleccionada ya no está disponible. Elegí otra fecha."
            );

        }


        setLoading(true);


        try {

            await saveOrder({

                client,

                items: cart,

                price: totalPrice,

                deliveryDate

            });


            clearCart();


            alert(
                "¡Pedido enviado correctamente!"
            );


            navigate("/");

        }

        catch (error) {

            console.error(error);

            alert(
                "No se pudo guardar el pedido."
            );

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


                <div>

                    <label className="font-semibold">

                        Fecha de entrega

                    </label>


                    <input

                        type="date"

                        value={deliveryDate}

                        min={getToday()}

                        onChange={handleDateChange}

                        className="w-full border rounded-xl p-4 mt-2"

                    />


                    <p className="text-sm text-gray-500 mt-2">

                        Las fechas marcadas como no disponibles no pueden seleccionarse.

                    </p>

                </div>


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