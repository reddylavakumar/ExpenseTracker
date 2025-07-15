import { Download, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { ExpenseDialogBox } from './expensedialogbox/ExpenseDialogbox'
import { useState } from 'react'
import BarChart from './barchart/barchart'
import Table from './table/Table'
import useExpenseStore from '@/store/useAppStore'
import * as XLSX from 'xlsx';

const Expense = () => {
    const { expenseList } = useExpenseStore();


    const handleDownload = () => {
        console.log("inside download");
        if (!expenseList || expenseList.length === 0) {
            console.log("No expense data to download");
            return;
        }
        const expenseData = expenseList.filter((item) => item?.isIncome === false);

        const requiredData = expenseData?.map((item) => ({
            title: item?.title || 'No Title',
            amount: item?.convertedAmount || 0,
            category: item?.category || 'Uncategorized',
        }));

        console.log(requiredData, 'Required Data for Download');

        const ws = XLSX.utils.json_to_sheet(requiredData);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Expense Data');

        XLSX.writeFile(wb, 'expense_data.xlsx');
    };

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
                        <div className="text-xl font-bold flex justify-between">
                            <div>
                                Recent Expenses
                            </div>
                            <div>
                                <Button className='hover:cursor-pointer' onClick={handleDownload} disabled
                                    ={expenseList.length === 0}
                                >
                                    <Download />
                                    Download
                                </Button>
                            </div>
                        </div>
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
