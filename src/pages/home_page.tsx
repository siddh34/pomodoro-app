import Chart from "../components/charts";

function home_page() {
    return (
        <>
            <div className="flex items-center justify-center m-10 bg-pink-600 h-25">
                <h1 className="text-3xl font-bold">The Pomodoro App</h1>
            </div>

            <div className="flex items-center justify-center m-10">
                <div className="flex">
                    <Chart />
                </div>
                <div className="flex flex-col items-center justify-center m-10">
                    <div className="flex">
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Start
                        </button>
                    </div>
                    <div className="flex">
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Stop
                        </button>
                    </div>
                    <div className="flex">
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Break
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default home_page;
