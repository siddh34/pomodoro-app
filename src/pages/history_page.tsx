import { GalleryVerticalEnd } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import * as _ from "lodash";

// import TimeLineComponent from "../components/timeLineComponent";

interface Pomo {
    pomodoros: [];
}

function history_page() {
    const navigate = useNavigate();
    const [pomoArr, setPomoArr] = useState<Pomo[]>([]);

    useEffect(() => {
        fetchHistory()
            .then(() => {
                console.log(pomoArr);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const fetchHistory = async () => {
        const response = await invoke("get_history");
        console.log(response);
        if (
            _.isObject(response) &&
            _.isArray((response as { pomodoros: Pomo[] }).pomodoros) &&
            !_.isEmpty((response as { pomodoros: Pomo[] }).pomodoros)
        ) {
            setPomoArr((response as { pomodoros: Pomo[] }).pomodoros);
        }
    };

    return (
        <>
            <div className="flex flex-col min-h-screen p-3 bg-slate-300">
                <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <div className="flex items-center justify-center">
                        <GalleryVerticalEnd />
                        <span className="ml-4">Back</span>
                    </div>
                </button>
                {/* <TimeLineComponent></TimeLineComponent> */}
            </div>
        </>
    );
}

export default history_page;
