import useExpenseStore from "@/store/useAppStore";
import InfoCard from "../InfoCard/InfoCard"
import Financialoverview from "./financialoverview/Financialoverview"
import RecentTransaction from "./recenttransaction/RecentTransaction"
import { useEffect, useState } from "react";

type cardItem = {
    id: number,
    text: string,
    amount: string,
    image_src: string,
    bgcolor: string
}
const Dashboard = () => {
    const { expenseList } = useExpenseStore();

    const [InfoCardData, setInfoCardData] = useState<cardItem[]>()

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

    console.log(expenseList, "expese list");



    return (
        <div className="p-0">

            <div className="flex gap-6 mt-2">
                {InfoCardData?.map((item) => {
                    return <InfoCard item={item} key={item?.id} />
                })}
            </div>
            <div className="flex mt-6 gap-6">
                <div className="w-1/2">
                    <RecentTransaction />
                </div>
                <div className="w-1/2 min-h-full">
                    <Financialoverview />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
