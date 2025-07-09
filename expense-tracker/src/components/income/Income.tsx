import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import BarChart from './barchart/BarChart'
import Table from './table/Table'

const Income = () => {
    return (
        <div >
            <div >
                <div className='flex justify-self-end'>
                    <Button className='hover:cursor-pointer' variant={"default"}>
                        <Plus />
                        Add Income</Button>
                </div>
                <div>
                    <BarChart />
                </div>
                <div className='mt-5'>
                    <Table />
                </div>
            </div>
        </div>
    )
}

export default Income
