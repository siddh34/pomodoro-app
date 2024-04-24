import { useState, useEffect } from "react";

interface Pomo {
    start_time: string;
    description: string;
    duration: Number;
    tags: string[] | null;
}

function TimeLineComponent({ fetchedHistory }: { fetchedHistory: Pomo[] }) {
    const [pomodoro, setPomodoro] = useState<Pomo[]>([]);

    useEffect(() => {
        console.log(fetchedHistory);
        setPomodoro(fetchedHistory);
    }, [fetchedHistory]);

    return (
        <div className="flex items-center justify-center">
            <ol className="relative border-gray-200 border-s dark:border-gray-700 ">
                {pomodoro.length > 0 ? (
                    pomodoro.map((pomo) => {
                        return (
                            <li className="mb-20 ms-10">
                                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.0 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                <a
                                    href="#"
                                    className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
                                >
                                    <time className="mb-10 text-sm font-normal leading-none text-gray-900 dark:text-gray-1000">
                                        Start Time{"  "}
                                        {new Date(
                                            pomo.start_time
                                        ).toLocaleTimeString()}
                                    </time>
                                    <p className="text-sm font-normal text-gray-500 dark:text-gray-600">
                                        Start Date{"  "}
                                        {new Date(
                                            pomo.start_time
                                        ).toLocaleDateString()}
                                    </p>
                                    {pomo.description.length > 0 ? (
                                        <p className="text-base font-normal text-gray-500 dark:text-gray-600">
                                            Description: {pomo.description}
                                        </p>
                                    ) : (
                                        <p className="text-base font-normal text-gray-500 dark:text-gray-600">
                                            Description: No Description
                                        </p>
                                    )}
                                    {
                                        pomo.tags !== null ? (
                                            <p className="text-base font-normal text-gray-500 dark:text-gray-600">
                                                Tags: {pomo.tags.join(", ")}
                                            </p>
                                        ) : (
                                            <p className="text-base font-normal text-gray-500 dark:text-gray-600">
                                                Tags: No Tags
                                            </p>
                                        )
                                    }
                                </a>
                            </li>
                        );
                    })
                ) : (
                    <p>No Pomodoros</p>
                )}
            </ol>
        </div>
    );
}

export default TimeLineComponent;
