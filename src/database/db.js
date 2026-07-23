const db = {

    categories: [

        {
            id: 1,
            name: "Tortas",
        },

        {
            id: 2,
            name: "Cupcakes",
        },

        {
            id: 3,
            name: "Cookies",
        },

        {
            id: 4,
            name: "Eventos",
        },

    ],

    products: [

        {
            id: 1,
            name: "Torta Personalizada",
            category: 1,
            description: "Ideal para cualquier ocasión.",
            prices: {
                10: 0,
                15: 0,
                20: 0,
                30: 0,
            },
        },

        {
            id: 2,
            name: "Cupcakes",
            category: 2,
            description: "Caja de cupcakes.",
            prices: {
                6: 0,
                12: 0,
            },
        },

    ],

};

export default db;