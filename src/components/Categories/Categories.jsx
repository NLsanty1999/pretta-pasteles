import categories from "../../data/categories";

function Categories() {
    return (
        <div className="grid grid-cols-2 gap-4">

            {categories.map((category) => {

                const Icon = category.icon;

                return (

                    <button
                        key={category.id}
                        className="
                            bg-white
                            rounded-3xl
                            p-6
                            shadow
                            hover:shadow-lg
                            transition
                            flex
                            flex-col
                            items-center
                            gap-3
                        "
                    >

                        <Icon
                            size={36}
                            className="text-[#D08A9B]"
                        />

                        <span className="font-semibold text-[#5A3B31]">

                            {category.name}

                        </span>

                    </button>

                );

            })}

        </div>
    );
}

export default Categories;