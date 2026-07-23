function AdminSummary({

    orders

}) {

    return (

        <div className="mb-6">

            <p className="text-gray-500">

                Mostrando

                <b>

                    {" "}

                    {orders}

                    {" "}

                </b>

                pedidos

            </p>

        </div>

    );

}

export default AdminSummary;