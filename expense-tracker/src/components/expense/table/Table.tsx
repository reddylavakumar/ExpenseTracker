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
};

const Table: React.FC = () => {
    const { expenseList } = useExpenseStore();
    const [data, setData] = useState<Person[]>([]);

    useEffect(() => {
        const incomeList = expenseList.filter((item) => !item?.isIncome);
        const list = incomeList.map((item) => ({
            image: item?.image_src || '',
            incomeFrom: item?.title || '',
            Amount: parseFloat(item?.convertedAmount || item?.amount || '0'),
        }));
        setData(list);
    }, [expenseList]);

    const columns = useMemo<MRT_ColumnDef<Person>[]>(
        () => [
            // {
            //     accessorKey: 'image',
            //     header: 'Image',
            //     Cell: ({ cell }) => (
            //         <img src={cell.getValue<string>()} alt="income" className='rounded-xl' width={40} height={40} />
            //     ),
            //     enableSorting: false,
            //     enableColumnFilter: false,
            //     enableHiding: false,
            //     enableColumnActions: false,
            // },
            { accessorKey: 'incomeFrom', header: 'Spent On' },
            { accessorKey: 'Amount', header: 'Amount' },
            {
                accessorKey: 'Action', header: 'Action',
                enableSorting: false,
                enableColumnActions: false,
                Cell: ({ cell }) => (
                    <div className='flex gap-5'>
                        <Button variant={"secondary"} className='bg-blue-200 hover:cursor-pointer hover:bg-blue-300 transition-all ease-in'>
                            <SquarePen />
                        </Button>
                        <Button variant={"secondary"} className='bg-red-200 hover:cursor-pointer hover:bg-red-300 transition-all ease-in'>
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
