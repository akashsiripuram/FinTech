import React, { useState } from "react";

const Savings = ({ savingsData }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterBy, setFilterBy] = useState("all");

    // Filter the data based on the search term and filter type
    const filteredSavingsData = savingsData.filter((saving) => {
        const matchesSearchTerm = saving.goalName
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        if (filterBy === "all") {
            return matchesSearchTerm;
        } else if (filterBy === "completed") {
            return (
                matchesSearchTerm &&
                saving.currentAmount >= saving.targetAmount
            );
        } else if (filterBy === "in-progress") {
            return (
                matchesSearchTerm &&
                saving.currentAmount < saving.targetAmount
            );
        }
        return matchesSearchTerm;
    });

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Savings Goals
            </h1>
            <div className="flex justify-between items-center mb-4">
                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search by goal name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                {/* Filters */}
                <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
                </select>
            </div>

            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-blue-100 text-blue-800 border-b">
                        <th className="text-left px-4 py-3 font-medium">
                            Goal Name
                        </th>
                        <th className="text-left px-4 py-3 font-medium">
                            Target Amount
                        </th>
                        <th className="text-left px-4 py-3 font-medium">
                            Current Amount
                        </th>
                        <th className="text-left px-4 py-3 font-medium">
                            Start Date
                        </th>
                        <th className="text-left px-4 py-3 font-medium">
                            End Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSavingsData.length > 0 ? (
                        filteredSavingsData.map((saving) => (
                            <tr
                                key={saving._id}
                                className="border-b last:border-none hover:bg-gray-100"
                            >
                                <td className="px-4 py-3">{saving.goalName}</td>
                                <td className="px-4 py-3">
                                    ${saving.targetAmount.toLocaleString()}
                                </td>
                                <td className="px-4 py-3">
                                    ${saving.currentAmount.toLocaleString()}
                                </td>
                                <td className="px-4 py-3">
                                    {new Date(
                                        saving.startDate
                                    ).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3">
                                    {new Date(
                                        saving.endDate
                                    ).toLocaleDateString()}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="5"
                                className="px-4 py-3 text-center text-gray-500"
                            >
                                No matching savings data found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

// Dummy data
const dummySavingsData = [
    {
        _id: "1",
        goalName: "Vacation Fund",
        targetAmount: 5000,
        currentAmount: 1500,
        startDate: "2024-01-01",
        endDate: "2024-12-31",
    },
    {
        _id: "2",
        goalName: "Emergency Savings",
        targetAmount: 10000,
        currentAmount: 10000,
        startDate: "2023-06-01",
        endDate: "2025-06-01",
    },
    {
        _id: "3",
        goalName: "Car Purchase",
        targetAmount: 20000,
        currentAmount: 8000,
        startDate: "2023-01-01",
        endDate: "2025-12-31",
    },
    {
        _id: "4",
        goalName: "Wedding Fund",
        targetAmount: 15000,
        currentAmount: 15000,
        startDate: "2023-02-01",
        endDate: "2024-12-31",
    },
];

const App = () => {
    return <Savings savingsData={dummySavingsData} />;
};

export default Savings;