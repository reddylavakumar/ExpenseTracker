// components/DonutChart.tsx
import React, { useState } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

type cardItem = {
    id: number;
    text: string;
    amount: string;
    image_src: string;
};

const InfoCardData: cardItem[] = [
    { id: 1, text: "Total Balance", amount: "19280", image_src: "src/assets/wallet.png" },
    { id: 2, text: "Total Expense", amount: "10000", image_src: "src/assets/wallet.png" },
    { id: 3, text: "Total Savings", amount: "9280", image_src: "src/assets/wallet.png" },
];

const DonutChart: React.FC = () => {
    const [series, setSeries] = useState<number[]>(
        InfoCardData.map((item) => parseInt(item?.amount))
    );

    const options: ApexOptions = {
        chart: {
            type: "donut",
            width: 380,
        },
        labels: InfoCardData.map((item) => item.text),
        dataLabels: {
            enabled: false,
        },
        legend: {
            position: "bottom",
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        show: false,
                    },
                },
            },
        ],
    };


    return (

        <div className="relative">
            <div>
                <Chart options={options} series={series} type="donut" width={380} />
            </div>
        </div>
    );
};

export default DonutChart;
