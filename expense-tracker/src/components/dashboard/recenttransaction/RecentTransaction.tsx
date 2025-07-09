
import { TrendingDownIcon } from 'lucide-react';
const RecentTransaction = () => {
    const transactions = [
        {
            id: 1,
            title: "Shopping",
            date: "10-02-2025",
            amount: 430
        },
        {
            id: 2,
            title: "Travel",
            date: "11-02-2025",
            amount: 670
        },
        {
            id: 3,
            title: "Salary",
            date: "12-02-2025",
            amount: 12000
        },
        {
            id: 4,
            title: "Electricity Bill",
            date: "13-02-2025",
            amount: 200
        },
        {
            id: 5,
            title: "Loan Repayment",
            date: "17-02-2025",
            amount: 600
        }
    ];

    return (
        <div className=" bg-white border-1 p-4 rounded-lg shadow-sm">
            <div className="text-xl font-bold">Recent Transaction</div>

            <div>
                {transactions?.map((item) => {
                    return <div key={item.id}>
                        <div className="flex items-center m-8 ml-3">
                            <div className="w-1/8
                flex justify-center items-center p-1">
                                {/* <img
                                        className="h-10 w-10 p-1 rounded-full bg-gray-500 object-contain"
                                        src="/src/assets/wallet.png"
                                        alt="Wallet Icon"
                                    /> */}
                                <div className="h-12 w-12 bg-gray-400 rounded-full flex items-center justify-center">
                                    <img
                                        src="/src/assets/wallet.png"
                                        alt="Wallet Icon"
                                        className="h-6 w-6 object-contain"
                                    />
                                </div>
                                {/* <img className="h-10 p-1 rounded-4xl bg-gray-500" src="src/assets/wallet.png" /> */}
                            </div>
                            <div className="w-1/2 flex flex-col justify-left">
                                <span className="text-1xl font-bold">
                                    {item.title}
                                </span>
                                <p className="text-gray-500 text-sm">
                                    {item?.date}
                                </p>
                            </div>
                            <div className="w-1/3 flex justify-end font-semibold text-md items-center">
                                <span className="bg-red-50 pt-1 pb-1 pl-4 pr-4 rounded-md flex gap-1 items-center">
                                    <span className='text-red-400'>
                                        - ₹{item?.amount}
                                    </span>
                                    <span>
                                        <TrendingDownIcon color='red' size={20} />
                                    </span>
                                </span>
                            </div>

                        </div>
                    </div>
                })}
            </div>
            {/* 1 */}


        </div>
    )
}

export default RecentTransaction
