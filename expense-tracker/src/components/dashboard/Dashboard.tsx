import useExpenseStore from "@/store/useAppStore";
import InfoCard from "../InfoCard/InfoCard"
import Financialoverview from "./financialoverview/Financialoverview"
import RecentTransaction from "./recenttransaction/RecentTransaction"
import { useEffect, useState } from "react";
import { CircleXIcon, MessageSquareWarningIcon } from "lucide-react";
import { Button } from "../ui/button";

type cardItem = {
    id: number,
    text: string,
    amount: string,
    image_src: string,
    bgcolor: string
}
const Dashboard = () => {
    const { expenseList, settings } = useExpenseStore();
    const [InfoCardData, setInfoCardData] = useState<cardItem[]>()
    const [isBudgetExceeded, setIsBudgetExceeded] = useState(false);

    useEffect(() => {
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();

        const totalExpense = expenseList.reduce((sum, expense) => {
            const [, month, year] = expense.date.split("-").map(Number);

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

        },
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




    return (
        <div className="p-0">
            {isBudgetExceeded && (
                <div className="flex items-center justify-between p-4 bg-red-100 border border-red-500 text-red-800 rounded-md shadow-sm mb-4">
                    <div className="flex items-center space-x-2">
                        <MessageSquareWarningIcon className="w-5 h-5 text-red-600" />
                        <span className="text-sm font-medium">
                            You have reached your monthly budget limit.
                        </span>
                    </div>
                    <Button variant={"ghost"}
                        onClick={() => setIsBudgetExceeded(false)}
                        className="text-red-500 hover:text-red-700 hover:cursor-pointer transition duration-150 ease-in-out"
                    >
                        <CircleXIcon className="w-5 h-5" />
                    </Button>
                </div>
            )}


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
