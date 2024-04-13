import { useState, useEffect } from "react";

function TimeToggler({ time, setTimer }: { time: number; setTimer: any }) {
    const [nodeTime, setNodeTime] = useState("");

    useEffect(() => {
        setNodeTime(String(time));
    }, [time]);

    return (
        <div>
            <button
                className="px-4 py-1 m-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                onClick={() => {
                    setTimer(time * 60);
                }}
            >
                {`${nodeTime} mins`}
            </button>
        </div>
    );
}

export default TimeToggler;
