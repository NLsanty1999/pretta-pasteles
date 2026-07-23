function OrderCounter({ total }) {

    return (

        <div className="bg-[#FDE5DF] rounded-3xl p-6">

            <p className="text-sm text-[#5A3B31]">
                Pedidos
            </p>

            <h2 className="text-4xl font-bold mt-2 text-[#5A3B31]">

                {total}

            </h2>

        </div>

    );

}

export default OrderCounter;