import Chart from "../components/charts";

function home_page() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <div className="flex items-center justify-center bg-pink-400 m-15 h-25">
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
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">
                    
                </button>
            </div>
            <footer className="bg-white shadow dark:bg-gray-800">
                <div className="w-full max-w-screen-xl p-4 mx-auto md:flex md:items-center md:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        The Pomodoro App
                    </span>
                    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li>
                            <a
                                href="#"
                                className="hover:underline me-4 md:me-6"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:underline me-4 md:me-6"
                            >
                                Github
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}

export default home_page;
