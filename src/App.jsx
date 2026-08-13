import { CartProvider } from "./context/CartContext";
import AppRouter from "./router/AppRouter";

import BeforeOrder from "./components/BeforeOrder/BeforeOrder";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";


function App() {

    return (

        <CartProvider>

            <AppRouter />

            <BeforeOrder />

            <WhatsAppButton />

        </CartProvider>

    );

}

export default App;