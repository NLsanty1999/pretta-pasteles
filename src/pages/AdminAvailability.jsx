import { useEffect, useState } from "react";

import Layout from "../Layout/Layout";

import {
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";

import { db } from "../firebase/config";


function AdminAvailability() {

    const today = new Date();


    const [month, setMonth] = useState(
        today.getMonth()
    );

    const [year, setYear] = useState(
        today.getFullYear()
    );


    const [blockedDates, setBlockedDates] = useState([]);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);


    function getTodayString() {

        const year = today.getFullYear();

        const month = String(
            today.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            today.getDate()
        ).padStart(2, "0");


        return `${year}-${month}-${day}`;

    }


    useEffect(() => {

        async function loadBlockedDates() {

            try {

                const ref = doc(
                    db,
                    "settings",
                    "availability"
                );


                const snapshot = await getDoc(ref);


                if (snapshot.exists()) {

                    const dates =
                        snapshot.data().blockedDates || [];


                    // Eliminar automáticamente
                    // fechas que ya pasaron
                    const todayString =
                        getTodayString();


                    const validDates =
                        dates.filter(
                            date => date >= todayString
                        );


                    setBlockedDates(
                        validDates
                    );

                }

            }

            catch (error) {

                console.error(error);

                alert(
                    "No se pudieron cargar las fechas bloqueadas."
                );

            }

            finally {

                setLoading(false);

            }

        }


        loadBlockedDates();

    }, []);


    function formatDate(
        year,
        month,
        day
    ) {

        return `${year}-${String(
            month + 1
        ).padStart(2, "0")}-${String(
            day
        ).padStart(2, "0")}`;

    }


    function toggleDate(date) {

        const todayString =
            getTodayString();


        // No permitir bloquear
        // fechas anteriores a hoy
        if (date < todayString) {

            return;

        }


        if (
            blockedDates.includes(date)
        ) {

            setBlockedDates(

                blockedDates.filter(
                    item => item !== date
                )

            );

        }

        else {

            setBlockedDates([

                ...blockedDates,

                date

            ]);

        }

    }


    async function saveDates() {

        try {

            setSaving(true);


            const todayString =
                getTodayString();


            const validDates =
                blockedDates.filter(
                    date => date >= todayString
                );


            await setDoc(

                doc(
                    db,
                    "settings",
                    "availability"
                ),

                {

                    blockedDates:
                        validDates

                },

                {

                    merge: true

                }

            );


            setBlockedDates(
                validDates
            );


            alert(
                "Disponibilidad actualizada correctamente ✅"
            );

        }

        catch (error) {

            console.error(error);

            alert(
                "No se pudieron guardar las fechas."
            );

        }

        finally {

            setSaving(false);

        }

    }


    function previousMonth() {

        // No permitir navegar
        // antes del mes actual

        if (
            year === today.getFullYear() &&
            month === today.getMonth()
        ) {

            return;

        }


        if (month === 0) {

            setMonth(11);

            setYear(
                year - 1
            );

        }

        else {

            setMonth(
                month - 1
            );

        }

    }


    function nextMonth() {

        if (month === 11) {

            setMonth(0);

            setYear(
                year + 1
            );

        }

        else {

            setMonth(
                month + 1
            );

        }

    }


    const firstDay = new Date(
        year,
        month,
        1
    ).getDay();


    const daysInMonth = new Date(
        year,
        month + 1,
        0
    ).getDate();


    const adjustedFirstDay =
        firstDay === 0
            ? 6
            : firstDay - 1;


    const monthName =
        new Date(
            year,
            month,
            1
        ).toLocaleDateString(

            "es-AR",

            {
                month: "long",
                year: "numeric"
            }

        );


    if (loading) {

        return (

            <Layout>

                <h2 className="text-center text-2xl mt-10">

                    Cargando calendario...

                </h2>

            </Layout>

        );

    }


    const todayString =
        getTodayString();


    return (

        <Layout>

            <div className="max-w-4xl mx-auto">


                <div className="flex items-center justify-between mb-8">

                    <h1 className="text-4xl font-bold">

                        📅 Disponibilidad

                    </h1>


                    <button

                        onClick={saveDates}

                        disabled={saving}

                        className="bg-[#D08A9B] text-white px-5 py-3 rounded-2xl font-semibold"

                    >

                        {

                            saving

                                ? "Guardando..."

                                : "Guardar cambios"

                        }

                    </button>

                </div>


                <div className="bg-white rounded-3xl shadow p-6">


                    <div className="flex items-center justify-between mb-6">


                        <button

                            onClick={previousMonth}

                            className="w-12 h-12 rounded-full border"

                        >

                            ←

                        </button>


                        <h2 className="text-2xl font-bold capitalize">

                            {monthName}

                        </h2>


                        <button

                            onClick={nextMonth}

                            className="w-12 h-12 rounded-full border"

                        >

                            →

                        </button>


                    </div>


                    <div className="grid grid-cols-7 gap-2 mb-2">


                        {

                            [

                                "Lun",
                                "Mar",
                                "Mié",
                                "Jue",
                                "Vie",
                                "Sáb",
                                "Dom"

                            ].map(day => (

                                <div

                                    key={day}

                                    className="text-center font-semibold text-gray-500 py-2"

                                >

                                    {day}

                                </div>

                            ))

                        }


                    </div>


                    <div className="grid grid-cols-7 gap-2">


                        {

                            Array.from({

                                length:
                                    adjustedFirstDay

                            }).map(
                                (_, index) => (

                                    <div
                                        key={`empty-${index}`}
                                    />

                                )
                            )

                        }


                        {

                            Array.from({

                                length:
                                    daysInMonth

                            }).map(
                                (_, index) => {


                                    const day =
                                        index + 1;


                                    const date =
                                        formatDate(
                                            year,
                                            month,
                                            day
                                        );


                                    const blocked =
                                        blockedDates.includes(
                                            date
                                        );


                                    const past =
                                        date <
                                        todayString;


                                    return (

                                        <button

                                            key={date}

                                            disabled={past}

                                            onClick={() =>
                                                toggleDate(
                                                    date
                                                )
                                            }

                                            className={`

                                                min-h-20

                                                rounded-2xl

                                                border

                                                font-semibold

                                                transition

                                                ${past

                                                    ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"

                                                    : blocked

                                                        ? "bg-red-100 border-red-300 text-red-700"

                                                        : "bg-green-50 border-green-200 text-green-700 hover:bg-green-100"

                                                }

                                            `}

                                        >

                                            <div className="text-lg">

                                                {day}

                                            </div>


                                            <div className="text-xs mt-1">

                                                {

                                                    past

                                                        ? "Pasado"

                                                        : blocked

                                                            ? "CERRADO"

                                                            : "Disponible"

                                                }

                                            </div>


                                        </button>

                                    );

                                }

                            )

                        }


                    </div>


                    <div className="flex gap-6 mt-8 justify-center">


                        <div className="flex items-center gap-2">

                            <span className="w-4 h-4 rounded bg-green-200" />

                            Disponible

                        </div>


                        <div className="flex items-center gap-2">

                            <span className="w-4 h-4 rounded bg-red-200" />

                            Bloqueado

                        </div>


                        <div className="flex items-center gap-2">

                            <span className="w-4 h-4 rounded bg-gray-200" />

                            Pasado

                        </div>


                    </div>


                </div>


            </div>

        </Layout>

    );

}


export default AdminAvailability;