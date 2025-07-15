import React, { useEffect, useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import useExpenseStore from '@/store/useAppStore';
import { SquarePen, Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExpenseDialogBox } from '../expensedialogbox/ExpenseDialogbox';
import { toast } from 'sonner';
// import { deleteExpense } from '@/services/api/expenseApi';

type Person = {
    image: string;
    incomeFrom: string;
    Amount: number;
    id: string;
    category: string
};

const Table: React.FC = () => {
    const { expenseList, fetchExpenses } = useExpenseStore();
    const [data, setData] = useState<Person[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editExpenseId, setEditExpenseId] = useState<string | undefined>(undefined)

    const handleEdit = (expenseId: string) => {
        setEditExpenseId(expenseId)
        setIsDialogOpen(true)
    }

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:3001/expenses/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                toast.success("Record deleted successfully")
                await fetchExpenses()
            } else {
            }
        } catch (error) {
            console.error('Error while deleting the record:', error);
        }
    };


    useEffect(() => {
        const incomeList = expenseList.filter((item) => !item?.isIncome);
        const list = incomeList.map((item) => ({
            id: item?.id,
            image: item?.image_src || '',
            incomeFrom: item?.title || '',
            category: item?.category || '',
            Amount: parseFloat(item?.convertedAmount || item?.amount || '0'),
        }));
        setData(list);
    }, [expenseList]);

    const columns = useMemo<MRT_ColumnDef<Person>[]>(
        () => [
            { accessorKey: 'incomeFrom', header: 'Spent On' },
            { accessorKey: 'Amount', header: 'Amount' },
            {
                accessorKey: 'category', header: 'Category',
                Cell: ({ row }) => (
                    <div>
                        <span className=' bg-green-500 p-2 rounded-lg text-white'>
                            {row.original.category}
                        </span>
                    </div>
                ),
            },
            {
                accessorKey: 'Action', header: 'Action',
                enableSorting: false,
                enableColumnActions: false,
                Cell: ({ row }) => (
                    <div className='flex gap-5'>
                        <Button variant={"secondary"} className='bg-blue-200 hover:cursor-pointer hover:bg-blue-300 transition-all ease-in' onClick={() => handleEdit(row?.original?.id)
                        }>
                            <SquarePen />
                        </Button>
                        <Button variant={"secondary"} className='bg-red-200 hover:cursor-pointer hover:bg-red-300 transition-all ease-in'
                            onClick={() => handleDelete(row.original.id)}
                        >
                            <Trash2Icon />
                        </Button>
                    </div>
                ),
            },
        ],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data,
        enableTopToolbar: false,
        enableFilterMatchHighlighting: true,
        enableDensityToggle: false,
    });

    return <>
        <MaterialReactTable table={table} />
        {isDialogOpen && <ExpenseDialogBox open={isDialogOpen} onOpenChange={setIsDialogOpen} id={editExpenseId} />}
    </>
};

export default Table;
