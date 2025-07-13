import React from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import useExpenseStore from "@/store/useAppStore";

const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const BarChart: React.FC = () => {
    const { expenseList } = useExpenseStore();

    const monthlyExpenses = Array(12).fill(0);

    expenseList.forEach((entry) => {
        if (!entry?.date || entry.isIncome) return;

        const [day, monthStr] = entry.date.split("-");
        const monthIndex = parseInt(monthStr, 10) - 1;
        const amount = parseFloat(entry?.convertedAmount || "0");

        if (!isNaN(monthIndex) && monthIndex >= 0 && monthIndex <= 11) {
            monthlyExpenses[monthIndex] += amount;
        }
    });

    const series = [
        {
            name: "Expense",
            data: monthlyExpenses,
        },
    ];

    const options: ApexOptions = {
        chart: {
            type: "bar",
            height: 350,
            toolbar: {
                show: false,
            },
        },
        xaxis: {
            categories: months,
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                columnWidth: "50%",
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: true,
            position: "top",
        },
        fill: {
            opacity: 1,
        },
        colors: ["#EF4444"],
    };

    return (
        <div className="bg-white border p-4 rounded-lg shadow-sm h-full mt-5">
            <Chart options={options} series={series} type="bar" height={350} />
        </div>
    );
};

export default BarChart;
