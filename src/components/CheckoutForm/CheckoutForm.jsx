function CheckoutForm() {
    return (

        <div className="space-y-5">

            <input
                className="w-full border rounded-xl p-4"
                placeholder="Nombre y apellido"
            />

            <input
                className="w-full border rounded-xl p-4"
                placeholder="WhatsApp"
            />

            <input
                type="date"
                className="w-full border rounded-xl p-4"
            />

            <input
                type="time"
                className="w-full border rounded-xl p-4"
            />

            <select className="w-full border rounded-xl p-4">

                <option>Retira en el local</option>

                <option>Envío a domicilio</option>

            </select>

            <textarea
                rows="4"
                className="w-full border rounded-xl p-4"
                placeholder="Observaciones..."
            />

        </div>

    );
}

export default CheckoutForm;