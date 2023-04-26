import { AccessorKeyColumnDef } from '@tanstack/react-table';
import { BoldTextRenderer } from 'app/components/BoldTextRenderer/BoldTextRenderer';
import { DateRenderer } from 'app/components/DateRenderer/DateRenderer';
import { LongTextRenderer } from 'app/components/LongTextComponent/LongTextRenderer';
import { NumberRenderer } from 'app/components/NumberRenderer/NumberRenderer';
import { Employee } from 'utils/types/Test';

type EmployeeColumnDefType = AccessorKeyColumnDef<
    Employee,
    string | number | Date
>;
export const reactTablecolumnDefs: EmployeeColumnDefType[] = [
    {
        accessorKey: 'firstName',
        header: 'First Name',
        cell: ({ cell, row }) => (
            <BoldTextRenderer value={cell.getValue() as string} />
        ),
        size: 1,
        minSize: 1,
    },
    {
        accessorKey: 'lastName',
        header: 'Last Name',
        cell: ({ cell, row }) => (
            <BoldTextRenderer value={cell.getValue() as string} />
        ),
        size: 1,
        minSize: 1,
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ cell, row }) => (
            <LongTextRenderer value={cell.getValue() as string} />
        ),
        size: 2,
        minSize: 1,
    },
    {
        accessorKey: 'count',
        header: 'Count',
        cell: ({ cell }) => (
            <NumberRenderer value={cell.getValue() as number} />
        ),
        size: 1,
        minSize: 1,
    },
    {
        accessorKey: 'jobTitle',
        header: 'Job Title',
        cell: ({ cell, row }) => (
            <LongTextRenderer value={cell.getValue() as string} />
        ),
        size: 2,
        minSize: 1,
    },
    {
        accessorKey: 'startDate',
        header: 'Start Date',
        cell: ({ cell }) => <DateRenderer value={cell.getValue() as Date} />,
        size: 1,
        minSize: 1,
    },
];
