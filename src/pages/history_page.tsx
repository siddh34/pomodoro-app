import { GalleryVerticalEnd } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TimeLineComponent from "../components/timeLineComponent";

function history_page() {
    const navigate = useNavigate();
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
                <TimeLineComponent></TimeLineComponent>
            </div>
        </>
    );
}

export default history_page;
