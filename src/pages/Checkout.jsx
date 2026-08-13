import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useCart } from "../context/CartContext";
import { saveOrder } from "../firebase/orders";


import {
    doc,
    onSnapshot
} from "firebase/firestore";

import { db } from "../firebase/config";

import agenda from "../data/agenda";

function Checkout() {

    const {
        cart,
        clearCart,
        totalPrice
    } = useCart();

    const [loading, setLoading] = useState(false);

    const [blockedDates, setBlockedDates] = useState([]);

    const [client, setClient] = useState({
        name: "",
        phone: "",

    });

    const [deliveryDate, setDeliveryDate] = useState("");
    

    const [deliveryHour, setDeliveryHour] = useState(
    agenda.workingHours[0]
);

    const [calendarOpen, setCalendarOpen] = useState(false);

    const today = new Date();

    const [calendarMonth, setCalendarMonth] = useState(
        today.getMonth()
    );

    const [calendarYear, setCalendarYear] = useState(
        today.getFullYear()
    );


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

    const availableHours = agenda.workingHours;


    function formatDate(year, month, day) {

        return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    }


    function getToday() {
    const date = new Date();
    return formatDate(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );
}

// Fecha mínima = hoy + 2 días
function getMinDate() {
    const date = new Date();
    date.setDate(date.getDate() + 2); // +2 días de anticipación
    return formatDate(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );
}

function isPast(date) {
    // Bloquea todo lo que sea anterior a (hoy + 2 días)
    return date < getMinDate();
}


    function isBlocked(date) {

        return blockedDates.includes(date);

    }


    function handleChange(e) {

        setClient({

            ...client,

            [e.target.name]: e.target.value

        });

    }


    function selectDate(date) {

        if (isPast(date)) {

            return;

        }

        if (isBlocked(date)) {

            return;

        }

        setDeliveryDate(date);

        setCalendarOpen(false);

    }


    function previousMonth() {

        if (calendarMonth === 0) {

            setCalendarMonth(11);

            setCalendarYear(
                calendarYear - 1
            );

        }

        else {

            setCalendarMonth(
                calendarMonth - 1
            );

        }

    }


    function nextMonth() {

        if (calendarMonth === 11) {

            setCalendarMonth(0);

            setCalendarYear(
                calendarYear + 1
            );

        }

        else {

            setCalendarMonth(
                calendarMonth + 1
            );

        }

    }


    const firstDay = new Date(
        calendarYear,
        calendarMonth,
        1
    ).getDay();


    const daysInMonth = new Date(
        calendarYear,
        calendarMonth + 1,
        0
    ).getDate();


    const adjustedFirstDay =
        firstDay === 0
            ? 6
            : firstDay - 1;


    const monthName = new Date(
        calendarYear,
        calendarMonth,
        1
    ).toLocaleDateString(
        "es-AR",
        {
            month: "long",
            year: "numeric"
        }
    );


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

        if (!deliveryHour) {

    return alert(
        "Seleccioná un horario de entrega."
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

                deliveryDate,

                deliveryHour

            });

            clearCart();


            alert(
                "¡Pedido enviado correctamente!"
            );


            window.location.href = "/";

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


                    <button

                        type="button"

                        onClick={() =>
                            setCalendarOpen(!calendarOpen)
                        }

                        className="w-full border rounded-xl p-4 mt-2 text-left bg-white"

                    >

                        {

                            deliveryDate

                                ? new Date(
                                    deliveryDate + "T00:00:00"
                                ).toLocaleDateString(
                                    "es-AR"
                                )

                                : "Seleccionar fecha"

                        }

                    </button>


                    {

                        calendarOpen && (

                            <div className="bg-white border rounded-3xl shadow-xl p-5 mt-3">


                                <div className="flex items-center justify-between mb-5">


                                    <button

                                        type="button"

                                        onClick={previousMonth}

                                        className="w-10 h-10 rounded-full border"

                                    >

                                        ←

                                    </button>


                                    <h2 className="font-bold text-lg capitalize">

                                        {monthName}

                                    </h2>


                                    <button

                                        type="button"

                                        onClick={nextMonth}

                                        className="w-10 h-10 rounded-full border"

                                    >

                                        →

                                    </button>


                                </div>


                                <div className="grid grid-cols-7 gap-1 mb-2">

                                    {

                                        [

                                            "L",
                                            "M",
                                            "X",
                                            "J",
                                            "V",
                                            "S",
                                            "D"

                                        ].map(day => (

                                            <div

                                                key={day}

                                                className="text-center text-xs font-bold text-gray-500 py-2"

                                            >

                                                {day}

                                            </div>

                                        ))

                                    }

                                </div>


                                <div className="grid grid-cols-7 gap-1">

                                    {

                                        Array.from({

                                            length: adjustedFirstDay

                                        }).map((_, index) => (

                                            <div

                                                key={`empty-${index}`}

                                            />

                                        ))

                                    }


                                    {

                                        Array.from({

                                            length: daysInMonth

                                        }).map((_, index) => {

                                            const day =
                                                index + 1;

                                            const date =
                                                formatDate(
                                                    calendarYear,
                                                    calendarMonth,
                                                    day
                                                );

                                            const blocked =
                                                isBlocked(date);

                                            const past =
                                                isPast(date);

                                            const selected =
                                                deliveryDate === date;


                                            return (

                                                <button

                                                    type="button"

                                                    key={date}

                                                    disabled={
                                                        blocked ||
                                                        past
                                                    }

                                                    onClick={() =>
                                                        selectDate(date)
                                                    }

                                                    className={`

                                                        min-h-12

                                                        rounded-xl

                                                        text-sm

                                                        font-semibold

                                                        transition

                                                        ${selected

                                                            ? "bg-[#D08A9B] text-white"

                                                            : blocked

                                                                ? "bg-red-100 text-red-600 border border-red-200 cursor-not-allowed"

                                                                : past

                                                                    ? "bg-gray-100 text-gray-300 cursor-not-allowed"

                                                                    : "bg-green-50 text-green-700 hover:bg-green-100"

                                                        }

                                                    `}

                                                >

                                                    {day}

                                                </button>

                                            );

                                        })

                                    }

                                </div>


                                <div className="flex justify-center gap-5 mt-5 text-xs">

                                    <div className="flex items-center gap-1">

                                        <span className="w-3 h-3 rounded bg-green-200" />

                                        Disponible

                                    </div>


                                    <div className="flex items-center gap-1">

                                        <span className="w-3 h-3 rounded bg-red-200" />

                                        Cerrado

                                    </div>

                                </div>


                            </div>

                        )

                    }


                    <p className="text-sm text-gray-500 mt-2">

                        Las fechas en rojo no están disponibles.

                    </p>

                </div>

                <div>

    <label className="font-semibold">

        Horario de entrega

    </label>

    <select

        value={deliveryHour}

        onChange={(e) =>
            setDeliveryHour(e.target.value)
        }

        className="w-full border rounded-xl p-4 mt-2 bg-white"

    >

        <option value="">

            Seleccionar horario

        </option>

        {availableHours.map(hour => (

            <option
                key={hour}
                value={hour}
            >

                {hour}

            </option>

        ))}

    </select>

    

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