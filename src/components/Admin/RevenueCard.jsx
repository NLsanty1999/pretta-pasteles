function RevenueCard({ value }) {

    return (

        <div className="bg-[#CFE0B4] rounded-3xl p-6">

            <p className="text-sm text-[#5A3B31]">
                Facturación
            </p>

            <h2 className="text-4xl font-bold mt-2 text-[#5A3B31]">

                ${value.toLocaleString("es-AR")}

            </h2>

        </div>

    );

}

export default RevenueCard;