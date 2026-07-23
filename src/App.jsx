import { CartProvider } from "./context/CartContext";
import AppRouter from "./router/AppRouter";

function App() {

    return (

        <CartProvider>

            <AppRouter />

        </CartProvider>

    );

}

export default App;