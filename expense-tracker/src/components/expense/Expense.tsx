import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { ExpenseDialogBox } from './expensedialogbox/ExpenseDialogbox'
import { useState } from 'react'
import BarChart from './barchart/barchart'
import Table from './table/Table'
const Expense = () => {
    const [open, setOpen] = useState(false)
    return (
        <div >
            <div >
                <div className='flex justify-self-end'>
                    <Button className='hover:cursor-pointer' variant={"default"} onClick={() => setOpen(true)}>
                        <Plus />
                        Add Expense</Button>
                </div>
                <div>
                    <BarChart />
                </div>
                <div className='mt-5'>
                    <div className=" bg-white border-1 p-4 rounded-lg shadow-sm">
                        <div className="text-xl font-bold">Recent Expenses</div>
                        <div className='mt-4'>
                            <Table />
                        </div>
                    </div>
                </div>
            </div>
            {open && <ExpenseDialogBox open={open} onOpenChange={setOpen} />}

        </div>
    )
}

export default Expense
