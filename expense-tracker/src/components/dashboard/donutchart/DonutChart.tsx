import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import useExpenseStore from "@/store/useAppStore";

type cardItem = {
    id: number;
    text: string;
    amount: string;
    image_src: string;
};

const DonutChart: React.FC = () => {
    const { expenseList } = useExpenseStore();

    const [InfoCardData, setInfoCardData] = useState<cardItem[]>([])

    useEffect(() => {
        const totalIncome = expenseList?.filter((item) => item?.isIncome).reduce((sum, item) => sum + Number(item.convertedAmount), 0);

        const totalExpense = expenseList?.filter((item) => !(item?.isIncome)).reduce((sum, item) => sum + Number(item.convertedAmount), 0)

        const totalBalance = totalIncome - totalExpense

        let data = [{
            id: 1,
            text: "Total Balance",
            amount: totalBalance,
            image_src: "src/assets/wallet.png",
            bgcolor: "blue"
        },
        {
            id: 2,
            text: "Total Income",
            amount: totalIncome,
            image_src: "src/assets/wallet.png",
            bgcolor: "orange"

        }
            ,
        {
            id: 3,
            text: "Total Expense",
            amount: totalExpense,
            image_src: "src/assets/wallet.png",
            bgcolor: "red"
        }
        ]
        setInfoCardData(data)

    }, [])

    const series: number[] = InfoCardData.map((item) => parseInt(item.amount));

    const options: ApexOptions = {
        chart: {
            type: "donut",
            width: 380,
        },
        labels: InfoCardData?.map((item) => item.text),
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
