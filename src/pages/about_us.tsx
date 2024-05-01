import React from "react";
import appIcon from "../assets/app-icon.png";
import { useNavigate } from "react-router-dom";
import { GalleryVerticalEnd } from "lucide-react";

const AboutUsPage: React.FC = () => {
    const navigate = useNavigate();

    return (
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
            <div className="flex items-center justify-center col">
                <img src={appIcon} alt="pomo img" className="w-32 h-32" />
            </div>
            <div className="flex items-center justify-center col">
                <h1>app version 1.0.0</h1>
            </div>
            <div className="flex items-center justify-center p-4 m-4 col">
                <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                    <h1 className="mb-5 font-roboto-slab">
                        What is Pomodoro Technique?
                    </h1>
                    <h1 className="font-roboto-slab">
                        The Pomodoro Technique is a time management strategy
                        that divides work into manageable chunks called
                        "Pomodoros," which are designed to help people become
                        more productive and focused. During this time the person
                        can concentrate solely and without interruption on one
                        subject. Following the completion of a Pomodoro, one
                        takes a quick 5-minute break to recuperate.
                    </h1>
                </a>
            </div>
            <div className="flex items-center justify-center p-1 m-1 col">
                <a className="block max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                    <h1 className="mb-6 font-roboto-slab">
                        New Up Coming features
                    </h1>

                    <li>
                        <h1 className="font-roboto-slab">
                            Being able to add time in seconds
                        </h1>
                    </li>
                    <li>
                        <h1 className="font-roboto-slab">
                            Being able to add description to the pomodoro
                        </h1>
                    </li>
                    <li>
                        <h1 className="font-roboto-slab">
                            Being able to add tags to the pomodoro
                        </h1>
                    </li>
                </a>
            </div>
        </div>
    );
};

export default AboutUsPage;
