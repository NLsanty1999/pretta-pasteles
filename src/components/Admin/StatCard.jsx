function StatCard({ title, value, color }) {
    return (
        <div className="bg-white rounded-3xl shadow p-5">
            <p className="text-gray-500 text-sm">{title}</p>

            <h2
                className="text-4xl font-bold mt-2"
                style={{ color }}
            >
                {value}
            </h2>
        </div>
    );
}

export default StatCard;