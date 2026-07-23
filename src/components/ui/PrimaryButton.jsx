function PrimaryButton({ children, onClick, type = "button" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="
                w-full
                py-4
                rounded-full
                bg-[#D08A9B]
                text-white
                font-bold
                text-lg
                shadow-md
                hover:bg-[#c97b8e]
                transition-all
                duration-300
            "
        >
            {children}
        </button>
    );
}

export default PrimaryButton;