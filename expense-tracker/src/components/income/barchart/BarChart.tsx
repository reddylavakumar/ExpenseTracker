import React, { useState } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const monthlyData = [1200, 1500, 1000, 2000, 1800, 2200, 1400, 1600, 1900, 2100, 2300, 2500];

const BarChart: React.FC = () => {
    const [series] = useState([
        {
            name: "Income",
            data: monthlyData,
        },
    ]);

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
        colors: ["#6366F1"],
    };

    return (
        <div className="bg-white border p-4 rounded-lg shadow-sm h-full mt-5">
            <Chart options={options} series={series} type="bar" height={350} />
        </div>
    );
};

export default BarChart;
