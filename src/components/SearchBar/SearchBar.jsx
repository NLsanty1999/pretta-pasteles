import { Search } from "lucide-react";

function SearchBar({ search, setSearch }) {
    return (
        <div className="relative">

            <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
                type="text"
                placeholder="Buscar torta..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                    w-full
                    rounded-full
                    bg-white
                    py-4
                    pl-12
                    pr-5
                    outline-none
                    shadow
                    text-[#5A3B31]
                "
            />

        </div>
    );
}

export default SearchBar;