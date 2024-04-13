import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";

Chart.register(ArcElement, Tooltip, Legend);

const ChartComponent = ({
    timeSetter,
    remainingTimeSetter,
}: {
    timeSetter: number;
    remainingTimeSetter: number;
}) => {
    const [data, setData] = useState({
        labels: ["Default Time Completed", "Default Remaining Time"],
        datasets: [
            {
                label: "Seconds",
                data: [timeSetter, remainingTimeSetter],
                backgroundColor: ["#99CCFF", "#993300"],
                borderColor: "#D1D6DC",
            },
        ],
    });

    useEffect(() => {
        setData({
            labels: ["Time Completed", "Remaining Time"],
            datasets: [
                {
                    label: "Seconds",
                    data: [timeSetter, remainingTimeSetter],
                    backgroundColor: ["#99CCFF", "#993300"],
                    borderColor: "#D1D6DC",
                },
            ],
        });
    }, [timeSetter, remainingTimeSetter]);

    return (
        <div className="flex flex-col items-center justify-center">
            <Doughnut
                data={data}
                options={{
                    plugins: {
                        legend: {
                            display: true,
                        },
                        tooltip: {
                            enabled: true,
                        },
                    },
                    maintainAspectRatio: true,
                    responsive: true,
                }}
            />
            <div className="items-center justify-center py-3">
                <div className="px-4 py-2 font-bold text-white bg-blue-500 border-b-4 border-blue-700 rounded hover:bg-blue-400 hover:border-blue-500">
                    Time Left: {remainingTimeSetter.toString()} seconds
                </div>
            </div>
        </div>
    );
};

export default ChartComponent;
