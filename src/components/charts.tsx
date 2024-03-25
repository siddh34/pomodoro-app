import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

const data = {
    datasets: [
        {
            data: [3, 10],
            backgroundColor: [
                "#99CCFF",
                "#993300",
            ],
            display: true,
            borderColor: "#D1D6DC",
        },
    ],
};

const chart = () => {
    return (
        <div>
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
            <div
                style={{
                    position: "absolute",
                    top: "55%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                }}
            >
            </div>
        </div>
    );
};

export default chart;
