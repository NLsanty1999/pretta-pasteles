function StatusHistory({ status }) {

    return (

        <p className="text-sm text-gray-500 mt-3">

            Estado actual:

            <b> {status}</b>

        </p>

    );

}

export default StatusHistory;