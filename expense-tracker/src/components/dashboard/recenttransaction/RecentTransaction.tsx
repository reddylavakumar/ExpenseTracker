import useExpenseStore from '@/store/useAppStore';
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';

const RecentTransaction = () => {
    const { expenseList } = useExpenseStore();

    const sortedExpenses = [...(expenseList || [])].sort((a, b) => {
        const dateA = new Date(a.date.split("-").reverse().join("-"));
        const dateB = new Date(b.date.split("-").reverse().join("-"));
        return dateB.getTime() - dateA.getTime();
    });

    return (
        <div className="bg-white border-1 p-4 rounded-lg shadow-sm">
            <div className="text-xl font-bold">Recent Transactions</div>

            <div className='overflow-x-auto h-110'>
                {sortedExpenses.map((item) => (
                    <div key={item.id}>
                        <div className="flex items-center m-8 ml-3">
                            <div className="w-1/8 flex justify-center items-center p-1">
                                <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                                    <img
                                        src={item?.image_src}
                                        alt="Wallet Icon"
                                        className="h-7 w-7 object-contain"
                                    />
                                </div>
                            </div>
                            <div className="w-1/2 flex flex-col justify-left">
                                <span className="text-1xl font-bold">
                                    {item?.title}
                                </span>
                                <p className="text-gray-500 text-sm">
                                    {item?.date}
                                </p>
                            </div>
                            <div className="w-1/3 flex justify-end font-semibold text-md items-center">
                                <span
                                    className={`${item.isIncome
                                        ? 'bg-green-50 text-green-400'
                                        : 'bg-red-50 text-red-400'
                                        } pt-1 pb-1 pl-4 pr-4 rounded-md flex gap-1 items-center`}
                                >
                                    <span>
                                        {item.isIncome ? '+' : '-'} ₹{item.convertedAmount}
                                    </span>
                                    {item.isIncome ? (
                                        <TrendingUpIcon color="lightgreen" size={20} />
                                    ) : (
                                        <TrendingDownIcon color="red" size={20} />
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentTransaction;
