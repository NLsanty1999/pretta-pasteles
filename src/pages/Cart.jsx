
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

    const formatPrice = (price) =>
        (Number(price) || 0).toLocaleString("es-AR");

    return (
        <Layout>
            <div className="max-w-xl mx-auto px-4 pb-10">
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

                {cart.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-gray-600 mb-5">
                            Tu carrito está vacío.
                        </p>

                        <button
                            onClick={() => navigate("/catalogo")}
                            className="
                                rounded-full
                                py-3
                                px-8
                                bg-[#D08A9B]
                                text-white
                                font-bold
                            "
                        >
                            Ver catálogo
                        </button>
                    </div>
                )}

                {cart.map((item, index) => {
                    const quantity = Math.max(
                        1,
                        Number(item.quantity) || 1
                    );

                    // Admitimos ambos nombres para compatibilidad
                    // con productos agregados antes de este cambio.
                    const extraDetails = Array.isArray(item.extraDetails)
                        ? item.extraDetails
                        : Array.isArray(item.extrasDetails)
                            ? item.extrasDetails
                            : [];

                    const extrasUnitPrice = extraDetails.reduce(
                        (sum, extra) =>
                            sum + (Number(extra.price) || 0),
                        0
                    );

                    const hasBasePrice =
                        item.basePrice !== undefined &&
                        item.basePrice !== null;

                    const basePrice = hasBasePrice
                        ? Number(item.basePrice) || 0
                        : Math.max(
                            0,
                            (Number(item.price) || 0) -
                            extrasUnitPrice
                        );

                    // CartContext guarda price como precio unitario.
                    const unitPrice = Number(item.price) || 0;
                    const productTotal = unitPrice * quantity;

                    const isCustomCake = String(item.name || "")
                        .toLowerCase()
                        .includes("torta personalizada");

                    const isFiveKgCustomCake =
                        isCustomCake &&
                        (
                            String(item.weight || "")
                                .replace(/\s/g, "")
                                .toLowerCase() === "5kg" ||
                            (
                                String(item.size) === "20" &&
                                item.fillingsSelected?.length >= 4
                            )
                        );

                    return (
                        <div
                            key={`${item.id ?? item.name}-${index}`}
                            className="
                                bg-white
                                rounded-3xl
                                shadow
                                p-5
                                mb-5
                            "
                        >
                            <div className="flex justify-between items-start gap-3">
                                <h2 className="text-2xl font-bold">
                                    {item.name}
                                </h2>

                                <button
                                    type="button"
                                    onClick={() => removeFromCart(index)}
                                    aria-label={`Eliminar ${item.name}`}
                                    className="text-red-500"
                                >
                                    🗑
                                </button>
                            </div>

                            {/* DESGLOSE DE PRECIOS */}
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between gap-4 text-gray-600">
                                    <span>Precio base por unidad</span>
                                    <span>${formatPrice(basePrice)}</span>
                                </div>

                                {extraDetails.length > 0 && (
                                    <div className="border-t pt-2">
                                        <p className="font-semibold text-gray-700 mb-2">
                                            Extras por unidad
                                        </p>

                                        <div className="space-y-1">
                                            {extraDetails.map((extra, extraIndex) => (
                                                <div
                                                    key={`${extra.name || "extra"}-${extraIndex}`}
                                                    className="flex justify-between gap-4 text-sm text-gray-600"
                                                >
                                                    <span>{extra.name || "Extra"}</span>
                                                    <span>
                                                        +${formatPrice(extra.price)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-between gap-4 mt-2 pt-2 border-t text-sm font-semibold text-gray-700">
                                            <span>Total extras por unidad</span>
                                            <span>
                                                +${formatPrice(extrasUnitPrice)}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between gap-4 border-t pt-3 font-semibold">
                                    <span>Precio unitario final</span>
                                    <span>${formatPrice(unitPrice)}</span>
                                </div>
                            </div>

                            {/* PERSONALIZACIÓN */}
                            {item.size && (
                                <p className="mt-3">
                                    <b>Tamaño:</b>{" "}
                                    {item.size}
                                    {!isNaN(Number(item.size)) && " cm"}
                                </p>
                            )}

                            {isCustomCake && item.weight && (
                                <p className="mt-1">
                                    <b>Peso:</b> {item.weight}
                                </p>
                            )}

                            {item.flavorsSelected?.length > 1 ? (
                                <div className="mt-2 space-y-1">
                                    {item.flavorsSelected.map((flavor, flavorIndex) => (
                                        <p key={flavorIndex}>
                                            <b>Bizcochuelo {flavorIndex + 1}:</b>{" "}
                                            {flavor}
                                        </p>
                                    ))}
                                </div>
                            ) : (
                                item.flavor && (
                                    <p className="mt-2">
                                        <b>Bizcochuelo:</b> {item.flavor}
                                    </p>
                                )
                            )}

                            {item.fillingsSelected?.length > 0 ? (
                                <div className="mt-2 space-y-1">
                                    {isFiveKgCustomCake ? (
                                        <>
                                            <p>
                                                <b>Rellenos bizcochuelo 1:</b>{" "}
                                                {item.fillingsSelected[0]} y{" "}
                                                {item.fillingsSelected[1]}
                                            </p>
                                            <p>
                                                <b>Rellenos bizcochuelo 2:</b>{" "}
                                                {item.fillingsSelected[2]} y{" "}
                                                {item.fillingsSelected[3]}
                                            </p>
                                        </>
                                    ) : (
                                        item.fillingsSelected.map((filling, fillingIndex) => (
                                            <p key={fillingIndex}>
                                                <b>Relleno {fillingIndex + 1}:</b>{" "}
                                                {filling}
                                            </p>
                                        ))
                                    )}
                                </div>
                            ) : (
                                item.filling && (
                                    <p className="mt-2">
                                        <b>Relleno:</b> {item.filling}
                                    </p>
                                )
                            )}

                            {item.covering && (
                                <p className="mt-2">
                                    <b>Cobertura:</b> {item.covering}
                                </p>
                            )}

                            {item.deliveryDate && (
                                <p className="mt-2">
                                    <b>Entrega:</b>{" "}
                                    {new Date(
                                        `${item.deliveryDate}T12:00:00`
                                    ).toLocaleDateString("es-AR")}
                                </p>
                            )}

                            {item.deliveryHour && (
                                <p className="mt-1">
                                    <b>Horario:</b> {item.deliveryHour}
                                </p>
                            )}

                            {item.extras?.length > 0 && extraDetails.length === 0 && (
                                <div className="mt-3">
                                    <p className="font-semibold">Extras</p>
                                    <ul className="list-disc ml-5 text-gray-600">
                                        {item.extras.map((extra, extraIndex) => (
                                            <li key={`${extra}-${extraIndex}`}>
                                                {typeof extra === "string"
                                                    ? extra
                                                    : extra.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* CANTIDAD Y TOTAL DEL PRODUCTO */}
                            <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t">
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => decreaseQuantity(index)}
                                        aria-label="Disminuir cantidad"
                                        className="w-8 h-8 rounded-full bg-gray-200"
                                    >
                                        -
                                    </button>

                                    <span className="text-xl font-bold">
                                        {quantity}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => increaseQuantity(index)}
                                        aria-label="Aumentar cantidad"
                                        className="
                                            w-8 h-8
                                            rounded-full
                                            bg-[#D08A9B]
                                            text-white
                                        "
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="text-right">
                                    <p className="text-sm text-gray-500">
                                        Total por {quantity === 1 ? "unidad" : `${quantity} unidades`}
                                    </p>
                                    <p className="text-2xl font-bold">
                                        ${formatPrice(productTotal)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {cart.length > 0 && (
                    <>
                        <div className="text-center mt-8">
                            <p className="text-3xl font-bold">
                                Total del pedido
                            </p>

                            <p className="text-4xl font-bold text-[#D08A9B]">
                                ${formatPrice(totalPrice)}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/checkout")}
                            className="
                                w-full
                                rounded-full
                                py-4
                                bg-[#D08A9B]
                                text-white
                                font-bold
                                mt-6
                            "
                        >
                            Continuar Pedido
                        </button>
                    </>
                )}
            </div>
        </Layout>
    );
}

export default Cart;
