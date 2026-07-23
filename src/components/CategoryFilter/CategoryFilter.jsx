import categories from "../../data/categories";

function CategoryFilter({ selected, setSelected }) {
    return (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">

            <button
                onClick={() => setSelected(0)}
                className={`px-5 py-3 rounded-full whitespace-nowrap transition ${
                    selected === 0
                        ? "bg-[#D08A9B] text-white"
                        : "bg-white text-[#5A3B31]"
                }`}
            >
                Todos
            </button>

            {categories.map((category) => {

                const Icon = category.icon;

                return (

                    <button
                        key={category.id}
                        onClick={() => setSelected(category.id)}
                        className={`px-5 py-3 rounded-full flex items-center gap-2 whitespace-nowrap transition ${
                            selected === category.id
                                ? "bg-[#D08A9B] text-white"
                                : "bg-white text-[#5A3B31]"
                        }`}
                    >
                        <Icon size={18} />
                        {category.name}
                    </button>

                );

            })}

        </div>
    );
}

export default CategoryFilter;