
const Table = () => {

    return (
        <div className=" bg-white border-1 p-4 rounded-lg shadow-sm h-full">
            <div className="text-xl font-bold">Income Sources</div>

        </div >
    )
}


export default Table

// import React, { useMemo } from 'react';
// import {
//     MaterialReactTable,
//     useMaterialReactTable,
//     type MRT_ColumnDef,
// } from 'material-react-table';

// // Define a data type
// type Person = {
//     firstName: string;
//     lastName: string;
//     age: number;
//     email: string;
// };

// // Sample data
// const data: Person[] = [
//     { firstName: 'Alice', lastName: 'Smith', age: 28, email: 'alice@ex.com' },
//     { firstName: 'Bob', lastName: 'Jones', age: 35, email: 'bob@ex.com' },
//     { firstName: 'Charlie', lastName: 'Brown', age: 22, email: 'charlie@ex.com' },
// ];

// const Table: React.FC = () => {
//     const columns = useMemo<MRT_ColumnDef<Person>[]>(
//         () => [
//             { accessorKey: 'firstName', header: 'First Name' },
//             { accessorKey: 'lastName', header: 'Last Name' },
//             { accessorKey: 'age', header: 'Age' },
//             { accessorKey: 'email', header: 'Email' },
//         ],
//         []
//     );

//     const table = useMaterialReactTable({
//         columns,
//         data,
//         enableRowSelection: true, // include checkboxes
//         enableColumnOrdering: true,
//     });

//     return <MaterialReactTable table={table} />;
// };

// export default Table;
