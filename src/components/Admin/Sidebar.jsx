import {
    LayoutDashboard,
    ClipboardList,
    Cake,
    Tags,
    Settings,
} from "lucide-react";

const menu = [
    { icon: LayoutDashboard, text: "Dashboard" },
    { icon: ClipboardList, text: "Pedidos" },
    { icon: Cake, text: "Productos" },
    { icon: Tags, text: "Categorías" },
    { icon: Settings, text: "Configuración" },
];

function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r min-h-screen p-5">

            <h2 className="text-2xl font-bold mb-8 text-[#5A3B31]">
                Pretta
            </h2>

            <div className="space-y-3">

                {menu.map((item) => {

                    const Icon = item.icon;

                    return (
                        <button
                            key={item.text}
                            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-pink-50"
                        >
                            <Icon size={20} />
                            {item.text}
                        </button>
                    );

                })}

            </div>

        </aside>
    );
}

export default Sidebar;