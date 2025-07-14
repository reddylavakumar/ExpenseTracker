import React, { useEffect, useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import useExpenseStore from '@/store/useAppStore';
import { SquarePen, Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Person = {
    image: string;
    incomeFrom: string;
    Amount: number;
    id: string

};

const Table: React.FC = () => {
    const { expenseList, fetchExpenses } = useExpenseStore();
    const [data, setData] = useState<Person[]>([]);

    useEffect(() => {
        const incomeList = expenseList.filter((item) => item?.isIncome);
        const list = incomeList.map((item) => ({
            id: item?.id,
            image: item?.image_src || '',
            incomeFrom: item?.title || '',
            Amount: parseFloat(item?.convertedAmount || item?.amount || '0'),
        }));
        setData(list);
    }, [expenseList]);

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:3001/expenses/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                await fetchExpenses()
                console.log('Record deleted successfully.');
            } else {
                console.error(`Failed to delete the record. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error while deleting the record:', error);
        }
    };
    const columns = useMemo<MRT_ColumnDef<Person>[]>(
        () => [
            { accessorKey: 'incomeFrom', header: 'Income Source' },
            { accessorKey: 'Amount', header: 'Amount' },

            {
                accessorKey: 'Action', header: 'Action',
                enableSorting: false,
                enableColumnActions: false,
                Cell: ({ row }) => (
                    <div className='flex gap-5'>
                        <Button type="button" variant={"secondary"} className='bg-blue-200 hover:cursor-pointer hover:bg-blue-300 transition-all ease-in'
                        //  onClick={() => handleEdit(row?.original?.id)
                        // }
                        >
                            <SquarePen />
                        </Button>
                        {/* <Button type="button" variant={"secondary"} className='bg-red-200 hover:cursor-pointer hover:bg-red-300 transition-all ease-in'
                            onClick={() => handleDelete(row.original.id)}
                        >
                            <Trash2Icon />
                        </Button> */}
                        <Button
                            type="button"
                            variant="secondary"
                            className="bg-red-200 hover:cursor-pointer hover:bg-red-300 transition-all ease-in"
                            onClick={(e) => {
                                e.preventDefault(); // prevents form submit
                                e.stopPropagation(); // prevents bubbling
                                console.log("Delete clicked:", row.original.id);
                                handleDelete(row.original.id);
                            }}
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

    return <MaterialReactTable table={table} />;
};

export default Table;
