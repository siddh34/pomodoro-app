import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { useEffect, useState } from "react";

Chart.register(ArcElement);

const ChartComponent = ({
    timeSetter,
    remainingTimeSetter,
}: {
    timeSetter: number;
    remainingTimeSetter: number;
}) => {
    const [data, setData] = useState({
        labels: ["Time", "Remaining Time"],
        datasets: [
            {
                data: [timeSetter, remainingTimeSetter],
                backgroundColor: ["#99CCFF", "#993300"],
                borderColor: "#D1D6DC",
            },
        ],
        hoverOffset: 4,
    });

    useEffect(() => {
        setData({
            labels: ["Time", "Remaining Time"],
            datasets: [
                {
                    data: [timeSetter, remainingTimeSetter],
                    backgroundColor: ["#99CCFF", "#993300"],
                    borderColor: "#D1D6DC",
                },
            ],
            hoverOffset: 4,
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
                    rotation: -90,
                    circumference: 180,
                    cutout: "60%",
                    maintainAspectRatio: true,
                    responsive: true,
                    
                }}
            />
            <div className="items-center justify-center">
                <div className="px-4 py-2 font-bold text-white bg-blue-500 border-b-4 border-blue-700 rounded hover:bg-blue-400 hover:border-blue-500">
                    Time Left: {remainingTimeSetter.toString()} seconds
                </div>
            </div>
        </div>
    );
};

export default ChartComponent;
