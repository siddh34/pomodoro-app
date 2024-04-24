import { GalleryVerticalEnd } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import * as _ from "lodash";
import TimeLineComponent from "../components/timeLineComponent";

interface PomoArrSchema {
    pomodoros: [];
}

interface Pomo {
    start_time: string;
    description: string;
    duration: Number;
    tags: string[] | null;
}

function history_page() {
    const navigate = useNavigate();
    const [pomoArr, setPomoArr] = useState<PomoArrSchema[]>([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    useEffect(() => {
        console.log("pomo:::",pomoArr);
    }, [pomoArr]);

    const fetchHistory = () => {
        invoke("get_history")
            .then((response) => {
                console.log(response);
                if (
                    _.isObject(response) &&
                    _.isArray(
                        (response as { pomodoros: PomoArrSchema[] }).pomodoros
                    ) &&
                    !_.isEmpty(
                        (response as { pomodoros: PomoArrSchema[] }).pomodoros
                    )
                ) {
                    setPomoArr(
                        (response as { pomodoros: PomoArrSchema[] }).pomodoros
                    );
                    console.log(pomoArr);
                }
            })
            .catch((err) => {
                console.log(err);
            });
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
                <TimeLineComponent
                    fetchedHistory={pomoArr as unknown as Pomo[]}
                ></TimeLineComponent>
            </div>
        </>
    );
}

export default history_page;
