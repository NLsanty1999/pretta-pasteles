import { Search } from "lucide-react";

function SearchOrders({ value, onChange }) {

    return (

        <div className="relative">

            <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Buscar por producto..."
                className="
                    w-full
                    bg-white
                    rounded-2xl
                    shadow
                    pl-12
                    pr-4
                    py-3
                    outline-none
                "
            />

        </div>

    );

}

export default SearchOrders;