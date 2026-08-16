import Navbar from "../components/Navbar/Navbar";
import BottomNav from "../components/BottomNav/BottomNav";

function Layout({ children }) {
    return (
        <div className="min-h-screen bg-grid">

            <Navbar />

            <main className="
                max-w-md
                mx-auto
                pb-40
            ">
                {children}
            </main>

            <BottomNav />

        </div>
    );
}

export default Layout;