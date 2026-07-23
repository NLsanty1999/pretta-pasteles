import {createContext,useContext,useMemo,useState} from "react";

const CartContext=createContext();

export function CartProvider({children}){

const[cart,setCart]=useState([]);

function addToCart(product){
setCart(prev=>[...prev,product]);
}

function removeFromCart(index){
setCart(prev=>prev.filter((_,i)=>i!==index));
}

function clearCart(){
setCart([]);
}

const totalItems=cart.length;

const totalPrice=useMemo(()=>{

return cart.reduce((sum,item)=>sum+item.price,0);

},[cart]);

return(

<CartContext.Provider
value={{
cart,
addToCart,
removeFromCart,
clearCart,
totalItems,
totalPrice
}}
>

{children}

</CartContext.Provider>

);

}

export function useCart(){

return useContext(CartContext);

}