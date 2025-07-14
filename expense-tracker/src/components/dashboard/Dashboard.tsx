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
    const { expenseList, settings } = useExpenseStore();

    console.log(expenseList, "expenseList");

    console.log(settings.budgetLimit, "limit");

    const [InfoCardData, setInfoCardData] = useState<cardItem[]>()
    const [isBudgetExceeded, setIsBudgetExceeded] = useState(false);

    useEffect(() => {
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();

        const totalExpense = expenseList.reduce((sum, expense) => {
            const [day, month, year] = expense.date.split("-").map(Number);

            if (month === currentMonth && year === currentYear && expense.isIncome === false) {
                const convertedNum = Number(expense.convertedAmount);
                return sum + (isNaN(convertedNum) ? 0 : convertedNum);
            }
            return sum;
        }, 0);

        if (settings.budgetLimit === "") {
            setIsBudgetExceeded(false)
        } else {
            setIsBudgetExceeded(totalExpense >= (settings?.budgetLimit ?? 0));
        }
    }, [settings.budgetLimit]);

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
            image_src: "src/assets/income.png",
            bgcolor: "lightgreen"

        }
            ,
        {
            id: 3,
            text: "Total Expense",
            amount: totalExpense,
            image_src: "src/assets/spending.png",
            bgcolor: "orange"
        }
        ]
        setInfoCardData(data)
    }, [])

    console.log(expenseList, "expese list");



    return (
        <div className="p-0">
            {isBudgetExceeded && <div className="p-3 bg-orange-400 text-white ">You have reached your monthly budget limit.

            </div>}

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
