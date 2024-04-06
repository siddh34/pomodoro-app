import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { useEffect, useState } from "react";

Chart.register(ArcElement);

const ChartComponent = ({
    timeSetter,
    remainingTimeSetter,
}: {
    timeSetter: Number;
    remainingTimeSetter: Number;
}) => {
    const [data, setData] = useState({
        datasets: [
            {
                data: [timeSetter, remainingTimeSetter],
                backgroundColor: ["#99CCFF", "#993300"],
                display: true,
                borderColor: "#D1D6DC",
            },
        ],
    });

    useEffect(() => {
        setData({
            datasets: [
                {
                    data: [timeSetter, remainingTimeSetter],
                    backgroundColor: ["#99CCFF", "#993300"],
                    display: true,
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
                            display: false,
                        },
                        tooltip: {
                            enabled: false,
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
                 <div className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
  Time Left (show time)
</div> 
  

            </div>
        </div>
    );
};

export default ChartComponent;
