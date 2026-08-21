import Navbar from "../components/Navbar/Navbar";
import BottomNav from "../components/BottomNav/BottomNav";

function Layout({ children, fullWidth = false }) {
    return (
        <div className="min-h-screen bg-grid">

            <Navbar />

            <main
                className={
                    fullWidth
                        ? "w-full pb-40"
                        : "max-w-md mx-auto px-4 pb-40"
                }
            >
                {children}
            </main>

            <BottomNav />

        </div>
    );
}

export default Layout;