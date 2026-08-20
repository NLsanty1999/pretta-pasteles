function PersonalizedSizesSection({
    sizes,
    setSizes,
    prices,
    setPrices
}) {

    const sizeOptions = [
        {
            size: "16",
            kilos: [1, 2, 3]
        },
        {
            size: "20",
            kilos: [2, 3, 5]
        },
        {
            size: "24",
            kilos: [2]
        }
    ];

    function toggleSize(size, checked) {

        if (checked) {

            if (!sizes.includes(size)) {
                setSizes([
                    ...sizes,
                    size
                ]);
            }

            return;
        }

        setSizes(
            sizes.filter(
                s => s !== size
            )
        );

        const newPrices = {
            ...prices
        };

        Object.keys(newPrices).forEach(key => {

            if (key.startsWith(`${size}-`)) {
                delete newPrices[key];
            }

        });

        delete newPrices[size];

        setPrices(newPrices);
    }

    function updatePrice(size, kg, value) {

        const key = `${size}-${kg}`;

        setPrices({
            ...prices,
            [key]:
                value === ""
                    ? ""
                    : Number(value)
        });
    }

    return (
        <div>

            <label className="font-semibold">
                Tamaños y precios
            </label>

            <p className="text-sm text-gray-500 mt-1 mb-4">
                Seleccioná el tamaño de la torta y
                colocá el precio correspondiente a cada kg.
            </p>

            <div className="space-y-6">

                {sizeOptions.map(
                    ({ size, kilos }) => (

                        <div
                            key={size}
                            className="
                                border
                                rounded-2xl
                                p-4
                            "
                        >

                            {/* TAMAÑO */}

                            <label
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    cursor-pointer
                                "
                            >

                                <input
                                    type="checkbox"
                                    checked={sizes.includes(size)}
                                    onChange={(e) =>
                                        toggleSize(
                                            size,
                                            e.target.checked
                                        )
                                    }
                                    className="
                                        w-5
                                        h-5
                                    "
                                />

                                <span className="font-semibold">
                                    {size} cm
                                </span>

                            </label>

                            {/* PRECIOS POR KG */}

                            {sizes.includes(size) && (

                                <div className="mt-4 ml-8 space-y-3">

                                    {kilos.map(kg => {

                                        const key =
                                            `${size}-${kg}`;

                                        return (
                                            <div
                                                key={key}
                                                className="
                                                    flex
                                                    items-center
                                                    gap-4
                                                "
                                            >

                                                <span
                                                    className="
                                                        w-20
                                                        text-gray-700
                                                    "
                                                >
                                                    {kg} kg
                                                </span>

                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={
                                                        prices[key] ?? ""
                                                    }
                                                    onChange={(e) =>
                                                        updatePrice(
                                                            size,
                                                            kg,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="
                                                        border
                                                        rounded-xl
                                                        p-2
                                                        w-40
                                                    "
                                                    placeholder="Precio"
                                                />

                                            </div>
                                        );

                                    })}

                                </div>

                            )}

                        </div>

                    )
                )}

            </div>

        </div>
    );
}

export default PersonalizedSizesSection;