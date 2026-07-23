import Navbar from "../components/Navbar/Navbar";
import BottomNav from "../components/BottomNav/BottomNav";

function Layout({ children }) {
    return (
        <div className="min-h-screen bg-grid">

            <Navbar /> 

            <main className="max-w-md mx-auto px-5 pt-24 pb-24">

                {children}

            </main>

            <BottomNav /> 

        </div>
    );
}

export default Layout;