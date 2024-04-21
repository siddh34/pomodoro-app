import Chart from "../components/charts";
import TimerToggler from "../components/time_toggler";
import { useNavigate } from "react-router-dom";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import NumberInput from "../components/customTimeInput";

function home_page() {
    const navigate = useNavigate();
    const [constTime, setConstTime] = useState(300);
    const [time, setTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState(60);
    const [lastExecuted, setLastExecuted] = useState("");

useEffect(() => {
    let interval: NodeJS.Timeout;

    if(remainingTime === 0){
        return;
    }

    if (lastExecuted === "break_pomodoro") {
        interval = setInterval(() => {
            console.log(remainingTime);
            setRemainingTime((prev) => {
                if (prev <= 1) {
                    setTime(0.1);
                    clearInterval(interval);
                    return 0;
                } else {
                    setTime(constTime - prev + 1);
                    return prev - 1;
                }
            });
        }, 1000);
    } else if (lastExecuted === "stop_pomodoro") {
        if (remainingTime === 0) {
            setRemainingTime(0);
        }
        setTime(0.0);
    } else if (lastExecuted !== "") {
        interval = setInterval(() => {
            invoke("update_graph")
                .then((response) => {
                    if (typeof response === "string" && response.length > 0) {
                        const [minutes, seconds] = response.split(":", 2);

                        if (minutes === "0" && seconds === "00") {
                            setRemainingTimer(0);
                            setLastExecuted("stop_pomodoro");
                            return;
                        }
                        
                        setRemainingTime(
                            parseInt(minutes) * 60 + parseInt(seconds)
                        );
                        setTime(constTime - remainingTime);
                        console.log(time)
                    }
                })
                .catch(console.error);
        }, 1000);
    }

    return () => {
        if (interval) {
            clearInterval(interval);
        }
    };
}, [lastExecuted, constTime, remainingTime]);

    const start_pomodoro = () => {
        invoke("start_pomodoro", { timeGiven: `${(remainingTime / 60).toString()}` })
            .then((_) => {
                setConstTime(remainingTime);
                setTime(0);
                setRemainingTime(remainingTime);
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
                setRemainingTime(5 * 60);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const setRemainingTimer = (time: number) => {
        setRemainingTime(time);
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-300">
            <div className="flex-grow">
                <div className="flex items-center justify-center dark:bg-gray-800 m-15 h-25">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
                        Pomodoro App
                    </h1>
                </div>
                <div className="flex items-center justify-center m-10">
                    <div className="flex flex-col items-center justify-evenly">
                        <h1>Even Time</h1>
                        <TimerToggler time={2} setTimer={setRemainingTimer} />
                        <TimerToggler time={10} setTimer={setRemainingTimer} />
                        <TimerToggler time={30} setTimer={setRemainingTimer} />
                        <TimerToggler time={50} setTimer={setRemainingTimer} />
                    </div>
                    <div className="flex flex-col items-center justify-evenly">
                        <h1>Odd Time</h1>
                        <TimerToggler time={5} setTimer={setRemainingTimer} />
                        <TimerToggler time={25} setTimer={setRemainingTimer} />
                        <TimerToggler time={45} setTimer={setRemainingTimer} />
                        <TimerToggler time={55} setTimer={setRemainingTimer} />
                    </div>

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
                        <div className="flex">
                            <button
                                onClick={() => navigate("/history")}
                                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                            >
                                History
                            </button>
                        </div>
                        <div className="flex flex-col"></div>
                    </div>
                </div>
                <div className="flex flex-col p-5 m-5">
                    <NumberInput
                        value={remainingTime / 60}
                        label="Set Time for a Pomodoro in minutes"
                        onChange={setRemainingTimer}
                    />
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
