import { Button } from '../ui/button'
import InfoCard from "../InfoCard/InfoCard"
import Financialoverview from "./financialoverview/Financialoverview"
import RecentTransaction from "./recenttransaction/RecentTransaction"
import { Plus } from 'lucide-react'

type cardItem = {
    id: number,
    text: string,
    amount: string,
    image_src: string
}
const Dashboard = () => {

    const InfoCardData: cardItem[] = [{
        id: 1,
        text: "Total Balance",
        amount: "19,280",
        image_src: "src/assets/wallet.png"
    },
    {
        id: 2,
        text: "Total Expense",
        amount: "10000",
        image_src: "src/assets/wallet.png"
    }
        ,
    {
        id: 3,
        text: "Total Savings",
        amount: "9280",
        image_src: "src/assets/wallet.png"
    }
    ]
    return (
        <div className="p-0">
            <div className='flex justify-self-end gap-5'>
                <Button className='hover:cursor-pointer' variant={"destructive"}>
                    <Plus />

                    Add Expense</Button>
            </div>
            <div className="flex gap-6 mt-5">
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
