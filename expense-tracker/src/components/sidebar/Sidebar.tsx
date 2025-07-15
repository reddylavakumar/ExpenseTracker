import useExpenseStore from "@/store/useAppStore";
import { Link } from "@tanstack/react-router";
import { BanknoteArrowDownIcon, BanknoteArrowUpIcon, LayoutDashboardIcon } from "lucide-react";
import { useEffect } from "react";

const Sidebar = () => {
    const { expenseList, fetchExpenses } = useExpenseStore()

    useEffect(() => {
        fetchExpenses()
    }, [expenseList])
    return (

        <div className="w-50 bg-white-900 text-black p-4 space-y-4">
            <nav>
                <ul className="space-y-2">
                    <li className="flex">
                        <Link
                            to="/"
                            className="flex items-center gap-4 px-4 py-2 rounded-md min-w-45
                            bg-purple-50 mt-5 hover:bg-purple-100
                            transition-all ease-in-out duration-300"
                            activeProps={{
                                className: "bg-purple-700 text-white hover:bg-purple-700",
                            }}
                        >
                            <LayoutDashboardIcon />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/income"
                            className="flex items-center gap-4 px-4 py-2 rounded-md min-w-45
               bg-purple-50 mt-5 hover:bg-purple-100
               transition-all ease-in-out duration-300"
                            activeProps={{
                                className: "bg-purple-700 text-white hover:bg-purple-700",
                            }}
                        >
                            <BanknoteArrowUpIcon className="w-5 h-5" />
                            <span>Income</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/expense"
                            className="flex items-center gap-4 px-4 py-2 rounded-md min-w-45
               bg-purple-50 mt-5 hover:bg-purple-100
               transition-all ease-in-out duration-300"
                            activeProps={{
                                className: "bg-purple-700 text-white hover:bg-purple-700",
                            }}
                        >
                            <BanknoteArrowDownIcon />
                            Expense
                        </Link>
                    </li>

                </ul>
            </nav>
        </div>

    );
};

export default Sidebar;
