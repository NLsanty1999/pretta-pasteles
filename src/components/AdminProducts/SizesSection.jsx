function SizesSection({
    sizes,
    setSizes,
    prices,
    setPrices,
    type
}) {

    const isAlfajor = type === "alfajor";
    const isCookies = type === "cookies";
    const isMesaDulce = type === "mesaDulce";


    /*
     * ALFAJORES / COOKIES
     */

    if (isAlfajor || isCookies) {

        const presentation =
            sizes.length > 0
                ? sizes[0]
                : "";

        return (

            <div>

                <label className="font-semibold">
                    Presentación
                </label>

                <div className="flex items-center gap-4 mt-3">

                    <div className="flex items-center gap-2">

                        <input
                            type="number"
                            min="1"
                            value={presentation}
                            onChange={(e) => {

                                const value =
                                    e.target.value;

                                setSizes(
                                    value
                                        ? [value]
                                        : []
                                );

                            }}
                            className="border rounded-xl p-2 w-24"
                            placeholder="Cantidad"
                        />

                        <span>
                            unidades
                        </span>

                    </div>

                    <input
                        type="number"
                        value={
                            presentation
                                ? prices[presentation] || ""
                                : ""
                        }
                        onChange={(e) => {

                            if (!presentation) {
                                return;
                            }

                            setPrices({

                                ...prices,

                                [presentation]:
                                    Number(
                                        e.target.value
                                    )

                            });

                        }}
                        className="border rounded-xl p-2 w-40"
                        placeholder="Precio del pack"
                    />

                </div>

            </div>

        );

    }


    /*
     * MESA DULCE
     */

    if (isMesaDulce) {

        const presentation =
            sizes.length > 0
                ? sizes[0]
                : "35";

        return (

            <div>

                <label className="font-semibold">
                    Presentación
                </label>

                <div className="flex items-center gap-4 mt-3">

                    <span className="w-32">
                        {presentation} unidades
                    </span>

                    <input
                        type="number"
                        value={
                            prices[presentation] || ""
                        }
                        onChange={(e) =>
                            setPrices({

                                ...prices,

                                [presentation]:
                                    Number(
                                        e.target.value
                                    )

                            })
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

            </div>

        );

    }


    /*
     * TORTAS / TARTAS
     */

    const options = [
        "16",
        "20",
        "24"
    ];

    return (

        <div>

            <label className="font-semibold">
                Tamaños
            </label>

            {options.map(size => (

                <div
                    key={size}
                    className="
                        flex
                        items-center
                        gap-4
                        mt-3
                    "
                >

                    <input
                        type="checkbox"
                        checked={
                            sizes.includes(size)
                        }
                        onChange={(e) => {

                            if (e.target.checked) {

                                setSizes([
                                    ...sizes,
                                    size
                                ]);

                            } else {

                                setSizes(
                                    sizes.filter(
                                        s => s !== size
                                    )
                                );

                                const newPrices = {
                                    ...prices
                                };

                                delete newPrices[size];

                                setPrices(newPrices);

                            }

                        }}
                    />

                    <span className="w-32">
                        {size} cm
                    </span>

                    {sizes.includes(size) && (

                        <input
                            type="number"
                            value={
                                prices[size] || ""
                            }
                            onChange={(e) =>
                                setPrices({

                                    ...prices,

                                    [size]:
                                        Number(
                                            e.target.value
                                        )

                                })
                            }
                            className="
                                border
                                rounded-xl
                                p-2
                                w-40
                            "
                            placeholder="Precio"
                        />

                    )}

                </div>

            ))}

        </div>

    );

}

export default SizesSection;