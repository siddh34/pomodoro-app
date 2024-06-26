import Chart from "../components/charts";
import TimerToggler from "../components/time_toggler";
import { useNavigate, Link } from "react-router-dom";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useContext } from "react";
import { TimerContext } from "../context/TimeContext";
import NumberInput from "../components/customTimeInput";
// import toast, { Toaster } from "react-hot-toast";
import { open } from "@tauri-apps/api/shell";
import { sendNotification } from "@tauri-apps/api/notification";

function home_page() {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(TimerContext);
    const constTime = state.constTime;
    const time = state.time;
    const remainingTime = state.remainingTime;
    const lastExecuted = state.lastExecuted;
    const isTimerStarted = state.isTimerStarted;
    const suggestedTime = state.suggestedTime;
    // const notifyNotDoable = () => toast.error("Please select a proper time");

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (lastExecuted === "break_pomodoro") {
            dispatch({ type: "SET_IS_TIMER_STARTED", payload: true });
            interval = setInterval(() => {
                console.log(state.remainingTime);
                if (state.remainingTime <= 1) {
                    clearInterval(interval);
                    dispatch({
                        type: "SET_LAST_EXECUTED",
                        payload: "stop_pomodoro",
                    });

                    sendNotification({
                        title: "Pomodoro App",
                        body: `Break has been ended`,
                        icon: "icons/32x32.png",
                    }); 

                    dispatch({ type: "SET_REMAINING_TIME", payload: 0 });
                } else {
                    dispatch({
                        type: "SET_TIME",
                        payload: state.constTime - state.remainingTime + 1,
                    });
                    dispatch({
                        type: "SET_REMAINING_TIME",
                        payload: state.remainingTime - 1,
                    });
                }
            }, 1000);
        } else if (lastExecuted === "stop_pomodoro") {
            dispatch({ type: "SET_IS_TIMER_STARTED", payload: false });
            if (remainingTime <= 1) {
                dispatch({ type: "SET_REMAINING_TIME", payload: 0 });
            }
            dispatch({ type: "SET_TIME", payload: 0.1 });
        } else if (lastExecuted !== "") {
            interval = setInterval(() => {
                invoke("update_graph")
                    .then((response) => {
                        if (
                            typeof response === "string" &&
                            response.length > 0
                        ) {
                            console.log(response);
                            const [minutes, seconds] = response.split(":", 2);
                            console.log(minutes, seconds);
                            if (
                                Number.isNaN(remainingTime) ||
                                minutes === undefined ||
                                seconds === undefined ||
                                remainingTime === 0.1
                            ) {
                                dispatch({
                                    type: "SET_LAST_EXECUTED",
                                    payload: "stop_pomodoro",
                                });

                                sendNotification({
                                    title: "Pomodoro App",
                                    body: `Pomodoro has been stopped`,
                                    icon: "icons/32x32.png",
                                });
                            } else {
                                dispatch({
                                    type: "SET_REMAINING_TIME",
                                    payload:
                                        parseInt(minutes) * 60 +
                                        parseInt(seconds),
                                });
                                dispatch({
                                    type: "SET_TIME",
                                    payload: constTime - remainingTime,
                                });
                                console.log(time);
                            }
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
    }, [lastExecuted, constTime, remainingTime, isTimerStarted]);

    const start_pomodoro = () => {
        if (remainingTime === 0 || remainingTime === 0.1) {
            // notifyNotDoable();

            sendNotification({
                    title: "Pomodoro App",
                    body: `Please select a proper time`,
                    icon: "icons/32x32.png",
                });

            return;
        }

        let remTime = remainingTime;
        let resTime;
        if (remTime % 60 !== 0) {
            const mins = Math.floor(remTime / 60);
            const seconds = remTime % 60;
            resTime = `${mins}m${seconds}s`;
        } else {
            resTime = (remTime / 60).toString();
        }
        dispatch({ type: "SET_IS_TIMER_STARTED", payload: true });
        
        // invoke("send_notification", {
        //     title: "Pomodoro Started",
        //     body: `Pomodoro has been started`,
        // }).then((res) => {
        //     console.log(res);
        // });

        sendNotification({
					title: "Pomodoro App",
					body: `Pomodoro has been started`,
					icon: "icons/32x32.png",
				});
        
        invoke("start_pomodoro", {
            timeGiven: `${resTime}`,
        })
            .then((_) => {
                dispatch({ type: "SET_IS_TIMER_STARTED", payload: true });
                dispatch({
                    type: "SET_LAST_EXECUTED",
                    payload: "start_pomodoro",
                });
                dispatch({ type: "SET_CONST_TIME", payload: remainingTime });
                dispatch({ type: "SET_TIME", payload: 0 });
                dispatch({
                    type: "SET_REMAINING_TIME",
                    payload: remainingTime,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const stop_pomodoro = () => {
        // invoke("send_notification", {title: "Pomodoro Stopped", body: "Pomodoro has been stopped"});
        
        sendNotification({
					title: "Pomodoro App",
					body: `Pomodoro has been stopped`,
					icon: "icons/32x32.png",
				});

        invoke("stop_pomodoro")
            .then((_) => {
                dispatch({ type: "SET_IS_TIMER_STARTED", payload: false });
                dispatch({ type: "SET_CONST_TIME", payload: 5 * 60 });
                dispatch({
                    type: "SET_LAST_EXECUTED",
                    payload: "stop_pomodoro",
                });
                dispatch({ type: "SET_TIME", payload: 0.1 });
                dispatch({ type: "SET_REMAINING_TIME", payload: 0 });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const break_pomodoro = () => {
        // setIsTimerStarted(true);

        // invoke("send_notification", {
        //     title: "Pomodoro break Started",
        //     body: `Pomodoro break has been started for time 5m`,
        // });

        sendNotification({
					title: "Pomodoro App",
					body: `Pomodoro break has been started for time 5m`,
					icon: "icons/32x32.png",
				});

        dispatch({ type: "SET_IS_TIMER_STARTED", payload: true });
        invoke("break_pomodoro", { givenTime: "5" })
            .then((_) => {
                dispatch({
                    type: "SET_LAST_EXECUTED",
                    payload: "break_pomodoro",
                });
                dispatch({ type: "SET_CONST_TIME", payload: 5 * 60 });
                dispatch({ type: "SET_TIME", payload: 0 });
                dispatch({ type: "SET_REMAINING_TIME", payload: 5 * 60 });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const suggestion = () => {
        let remTime = remainingTime / 60;
        invoke("get_suggestion_for_time", {
            timeGiven: `${remTime}`,
        })
            .then((response: unknown) => {
                dispatch({
                    type: "SET_REMAINING_TIME",
                    payload: (response as number + remTime) * 60,
                });
                dispatch({ type: "SET_SUGGESTED_TIME", payload: response });
            })
            .catch(console.error);
    };

    const setRemainingTimer = (time: number) => {
        dispatch({ type: "SET_REMAINING_TIME", payload: time });
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-300">
            <div className="flex-grow">
                <div className="flex items-center justify-center dark:bg-gray-800 m-15 h-25">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
                        Pomodoro App
                    </h1>
                </div>
                {/* <Toaster /> */}
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
                                onClick={() => {
                                    navigate("/history");
                                }}
                                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                            >
                                History
                            </button>
                        </div>
                        <div className="flex">
                            <button
                                onClick={() => {
                                    suggestion();
                                }}
                                className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800"
                            >
                                Suggestions?
                            </button>
                        </div>
                        <div className="flex">
                            <span className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center">
                                Suggested: {suggestedTime}m
                            </span>
                        </div>
                        <div className="flex flex-col"></div>
                    </div>
                </div>
                <div className="flex flex-col p-5 m-5">
                    <NumberInput
                        value={remainingTime / 60}
                        label="Set Time for a Pomodoro in minutes"
                        onChange={setRemainingTimer}
                        isTimerStarted={isTimerStarted}
                        constTime={constTime / 60}
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
                            <Link
                                className="hover:underline me-4 md:me-6"
                                to="/about"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <a
                                href="https://github.com/siddh34/pomodoro-app"
                                className="hover:underline me-4 md:me-6"
                                onClick={(event) => {
                                    event.preventDefault();
                                    open(
                                        "https://github.com/siddh34/pomodoro-app"
                                    );
                                }}
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
