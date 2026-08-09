function SizesSection({
    sizes,
    setSizes,
    prices,
    setPrices,
    type
}) {

    const isAlfajor = type === "alfajor";
    const isMesaDulce = type === "mesaDulce";

    // Alfajores: siempre 1 unidad
    // Mesa dulce: usa la presentación que tenga el producto
    // Tortas: tamaños tradicionales
    const options = isAlfajor
        ? ["1"]
        : isMesaDulce
            ? sizes.length
                ? sizes
                : ["35"]
            : ["16", "20", "24"];

    const isFixedPresentation =
        isAlfajor || isMesaDulce;

    return (

        <div>

            <label className="font-semibold">

                {
                    isAlfajor
                        ? "Por unidad"
                        : isMesaDulce
                            ? "Presentación"
                            : "Tamaños"
                }

            </label>

            {

                options.map(size => (

                    <div
                        key={size}
                        className="flex items-center gap-4 mt-3"
                    >

                        {
                            !isFixedPresentation && (

                                <input
                                    type="checkbox"
                                    checked={sizes.includes(size)}
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

                                        }

                                    }}
                                />

                            )
                        }

                        <span className="w-32">

                            {
                                isAlfajor
                                    ? "1 unidad"
                                    : isMesaDulce
                                        ? `${size} unidades`
                                        : `${size} cm`
                            }

                        </span>

                        {

                            (
                                isFixedPresentation ||
                                sizes.includes(size)
                            ) && (

                                <input
                                    type="number"
                                    value={prices[size] || ""}
                                    onChange={(e) =>

                                        setPrices({

                                            ...prices,

                                            [size]:
                                                Number(
                                                    e.target.value
                                                )

                                        })

                                    }
                                    className="border rounded-xl p-2 w-40"
                                    placeholder="Precio"
                                />

                            )

                        }

                    </div>

                ))

            }

        </div>

    );

}

export default SizesSection;