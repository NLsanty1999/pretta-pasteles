function StatusButton({
    color,
    children,
    onClick
}) {

    return (

        <button
            onClick={onClick}
            className="px-4 py-2 rounded-full text-white"
            style={{ backgroundColor: color }}
        >

            {children}

        </button>

    );

}

export default StatusButton;