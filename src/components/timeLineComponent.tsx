import { useState, useEffect } from "react";

interface pomo{
    start_time: string;
    description: string;
    duration: number;
    tags: string[];
}

function timeLineComponent() {
    const [pomodoro, setPomodoro] = useState<pomo[]>([]);

    useEffect(() => {
        setPomodoro([
            {
                start_time: "2015-06-14T12:34:56-04:00",
                description: "Blog Post",
                duration: 25,
                tags: ["writing", "personal"],
            },
        ]);
    }, []);

    return (
        <div className="flex items-center justify-center">
            <ol className="relative border-gray-200 border-s dark:border-gray-700 ">
                {
                    pomodoro.length > 0 ? pomodoro.map((pomo, index) => {
                        return (
                            <li key={index} className="mb-20 ms-10">
                                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.0 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                <time className="mb-10 text-sm font-normal leading-none text-gray-900 dark:text-gray-1000">
                                    {pomo.start_time}
                                </time>
                                <p className="text-base font-normal text-gray-500 dark:text-gray-600">
                                    {pomo.description}
                                </p>
                            </li>
                        );
                    }
                ) : <p>No Pomodoros</p>
            }
            </ol>
        </div>
    );
}

export default timeLineComponent;
