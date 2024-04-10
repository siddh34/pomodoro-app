import Chart from "../components/charts";
import { useNavigate } from "react-router-dom";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";

function home_page() {
    const navigate = useNavigate();
    const [constTime, setConstTime] = useState(300);
    const [time, setTime] = useState(300);
    const [remainingTime, setRemainingTime] = useState(120);
    const [lastExecuted, setLastExecuted] = useState("");

    useEffect(() => {
        console.log("useEffect");
        if (
            lastExecuted !== "" &&
            lastExecuted !== "break_pomodoro" &&
            lastExecuted !== "stop_pomodoro"
        ) {
            const interval = setInterval(() => {
                invoke("update_graph")
                    .then((response) => {
                        if (
                            typeof response === "string" &&
                            response.length > 0
                        ) {
                            let time1 = response.slice(0, 5);
                            let subTime = time1.split(":");
                            setRemainingTime(
                                parseInt(subTime[0]) * 60 + parseInt(subTime[1])
                            );
                            setTime(constTime - remainingTime);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }, 1000);
            return () => clearInterval(interval);
        }

        if (lastExecuted === "break_pomodoro") {
            const interval = setInterval(() => {
                setRemainingTime((prev) => prev - 1);
            }, 1000);
            if (remainingTime === 0) {
                clearInterval(interval);
            }
        }
    }, [time, lastExecuted, remainingTime]);

    const start_pomodoro = () => {
        invoke("start_pomodoro", { timeGiven: `30` })
            .then((_) => {
                setConstTime(30 * 60);
                setTime(0);
                setRemainingTime(0);
                setLastExecuted("start_pomodoro");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const stop_pomodoro = () => {
        invoke("stop_pomodoro")
            .then((_) => {
                setConstTime(5 * 60);
                setTime(0.1);
                setRemainingTime(0);
                setLastExecuted("stop_pomodoro");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const break_pomodoro = () => {
        invoke("break_pomodoro", { givenTime: "5" })
            .then((_) => {
                setLastExecuted("break_pomodoro");
                setConstTime(5 * 60);
                setTime(0);
                setRemainingTime(0);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-300">
            <div className="flex-grow">
                <div className="flex items-center justify-center dark:bg-gray-800 m-15 h-25">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
                        Pomodoro App
                    </h1>
                </div>
                <div className="flex items-center justify-center m-10">
                    <div className="flex">
                        <Chart
                            timeSetter={time}
                            remainingTimeSetter={remainingTime}
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center m-10">
                        <div className="flex">
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                onClick={start_pomodoro}
                            >
                                Start
                            </button>
                        </div>
                        <div className="flex">
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                onClick={stop_pomodoro}
                            >
                                Stop
                            </button>
                        </div>
                        <div className="flex">
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                onClick={break_pomodoro}
                            >
                                Break
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate("/history")}
                        className="px-4 py-2 font-bold text-white bg-emerald-500 rounded-xl"
                    >
                        View History
                    </button>
                </div>
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
