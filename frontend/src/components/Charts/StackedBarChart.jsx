import React from "react";
import { Bar, Line, Pie, Radar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend
);

const StackedBarChart = () => {
    const expenseData = [
        { id: 1, date: "2024-12-01", expense: 1200, category: "Food" },
        { id: 2, date: "2024-12-02", expense: 800, category: "Bills" },
        { id: 3, date: "2024-12-05", expense: 1500, category: "Entertainment" },
        { id: 4, date: "2024-12-07", expense: 2000, category: "Food" },
        { id: 5, date: "2024-12-10", expense: 500, category: "Transportation" },
        { id: 6, date: "2024-12-12", expense: 2500, category: "Health & Fitness" },
        { id: 7, date: "2024-12-15", expense: 1200, category: "Education" },
    ];

    const incomeData = [
        { id: 1, date: "2024-12-01", income: 3000, category: "Part-time Job" },
        { id: 2, date: "2024-12-05", income: 1500, category: "Pocket Money" },
        { id: 3, date: "2024-12-10", income: 5000, category: "Scholarship" },
        { id: 4, date: "2024-12-12", income: 2500, category: "Freelance Work" },
        { id: 5, date: "2024-12-15", income: 1000, category: "Gift" },
        { id: 6, date: "2024-12-18", income: 8000, category: "Internship" },
    ];

    const labels = [
        "2024-12-01",
        "2024-12-05",
        "2024-12-10",
        "2024-12-12",
        "2024-12-15",
        "2024-12-18",
    ];

    const data = {
        labels,
        datasets: [
            {
                label: "Expenses",
                data: labels.map(
                    (date) =>
                        expenseData.find((item) => item.date === date)?.expense || 0
                ),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
            {
                label: "Income",
                data: labels.map(
                    (date) => incomeData.find((item) => item.date === date)?.income || 0
                ),
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Expenses vs Income (December 2024)",
            },
        },
    };

    return (
        <div className="flex flex-col items-center gap-8 p-4">
            <h1 className="text-2xl font-bold text-gray-800">
                Expense and Income Charts
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                        Bar Chart
                    </h2>
                    <Bar data={data} options={options} />
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                        Line Chart
                    </h2>
                    <Line data={data} options={options} />
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                        Pie Chart
                    </h2>
                    <Pie
                        data={{
                            labels,
                            datasets: [
                                {
                                    label: "Expenses",
                                    data: labels.map(
                                        (date) =>
                                            expenseData.find((item) => item.date === date)?.expense ||
                                            0
                                    ),
                                    backgroundColor: [
                                        "rgba(255, 99, 132, 0.5)",
                                        "rgba(54, 162, 235, 0.5)",
                                        "rgba(75, 192, 192, 0.5)",
                                        "rgba(153, 102, 255, 0.5)",
                                        "rgba(255, 159, 64, 0.5)",
                                        "rgba(255, 205, 86, 0.5)",
                                    ],
                                },
                            ],
                        }}
                        options={options}
                    />
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                        Radar Chart
                    </h2>
                    <Radar
                        data={{
                            labels,
                            datasets: [
                                {
                                    label: "Expenses",
                                    data: labels.map(
                                        (date) =>
                                            expenseData.find((item) => item.date === date)?.expense ||
                                            0
                                    ),
                                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                                    borderColor: "rgba(255, 99, 132, 1)",
                                },
                                {
                                    label: "Income",
                                    data: labels.map(
                                        (date) =>
                                            incomeData.find((item) => item.date === date)?.income || 0
                                    ),
                                    backgroundColor: "rgba(54, 162, 235, 0.5)",
                                    borderColor: "rgba(54, 162, 235, 1)",
                                },
                            ],
                        }}
                        options={options}
                    />
                </div>
            </div>
        </div>
    );
};

export default StackedBarChart;