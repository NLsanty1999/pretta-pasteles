const products = [
{
id:1,
name:"Torta Personalizada",
description:"Elegí cada detalle de tu torta.",
category:1,
image:"",
prices:{
10:18000,
15:25000,
20:32000,
25:40000,
30:48000
},
sizes:["10","15","20","25","30"],
flavors:["Vainilla","Chocolate","Marmolada","Red Velvet"],
fillings:["Dulce de leche","Ganache","Oreo","Frutilla","Crema Bariloche","Nutella"],
coverings:["Buttercream","Crema","Ganache","Fondant"],
extras:[
{name:"Topper",price:2500},
{name:"Flores",price:3000},
{name:"Sprinkles",price:800},
{name:"Velas",price:600},
{name:"Chips",price:1200}
]
},
{
id:2,
name:"Cupcakes",
description:"Cupcakes personalizados.",
category:2,
image:"",
prices:{
6:9000,
12:17000,
24:32000
},
sizes:["6","12","24"],
flavors:["Vainilla","Chocolate"],
fillings:["Dulce de leche","Nutella"],
coverings:["Buttercream"],
extras:[
{name:"Sprinkles",price:500}
]
}
];

export default products;