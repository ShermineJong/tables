import { ActionIcon, Group, Space } from '@mantine/core';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import { BoldTextRenderer } from 'app/components/BoldTextRenderer/BoldTextRenderer';
import { DateRenderer } from 'app/components/DateRenderer/DateRenderer';
import { LongTextRenderer } from 'app/components/LongTextComponent/LongTextRenderer';
import { NumberRenderer } from 'app/components/NumberRenderer/NumberRenderer';
import { MRT_ColumnDef } from 'mantine-react-table';
import { Employee } from 'utils/types/Test';

export const mantineReactTableColumnDefs: MRT_ColumnDef<Employee>[] = [
    {
        accessorKey: 'firstName',
        header: 'First Name',
        Cell: ({ cell }) => (
            <BoldTextRenderer value={cell.getValue() as string} />
        ),
        PlaceholderCell: ({ cell, row }) => {
            return (
                <Group>
                    {row.getCanExpand() ? (
                        <ActionIcon
                            onClick={row.getToggleExpandedHandler()}
                            size="sm"
                        >
                            {row.getIsExpanded() ? (
                                <IconChevronDown />
                            ) : (
                                <IconChevronRight />
                            )}
                        </ActionIcon>
                    ) : (
                        <Space w="xl" />
                    )}
                    <BoldTextRenderer
                        value={`${cell.getValue() as string} ${row.subRows.length > 0
                            ? '(' + row.subRows.length + ')'
                            : ''
                            }`}
                    />
                </Group>
            );
        },
        size: 1,
        minSize: 1,
        maxSize: 1200,
    },
    {
        accessorKey: 'lastName',
        header: 'Last Name',
        Cell: ({ cell }) => (
            <BoldTextRenderer value={cell.getValue() as string} />
        ),
        PlaceholderCell: ({ cell, row }) => {
            return (
                <Group>
                    {row.getCanExpand() ? (
                        <ActionIcon
                            onClick={row.getToggleExpandedHandler()}
                            size="sm"
                        >
                            {row.getIsExpanded() ? (
                                <IconChevronDown />
                            ) : (
                                <IconChevronRight />
                            )}
                        </ActionIcon>
                    ) : (
                        <Space w="xl" />
                    )}
                    <BoldTextRenderer
                        value={`${cell.getValue() as string} ${row.subRows.length > 0
                            ? '(' + row.subRows.length + ')'
                            : ''
                            }`}
                    />
                </Group>
            );
        },
        size: 1,
        minSize: 1,
        maxSize: 1200,
    },
    {
        accessorKey: 'email',
        header: 'Email',
        Cell: ({ cell }) => (
            <LongTextRenderer value={cell.getValue() as string} />
        ),
        PlaceholderCell: ({ cell, row }) => {
            return (
                <Group>
                    {row.getCanExpand() ? (
                        <ActionIcon
                            onClick={row.getToggleExpandedHandler()}
                            size="sm"
                        >
                            {row.getIsExpanded() ? (
                                <IconChevronDown />
                            ) : (
                                <IconChevronRight />
                            )}
                        </ActionIcon>
                    ) : (
                        <Space w="xl" />
                    )}
                    <LongTextRenderer
                        value={`${cell.getValue() as string} ${row.subRows.length > 0
                            ? '(' + row.subRows.length + ')'
                            : ''
                            }`}
                    />
                </Group>
            );
        },
        size: 2,
        minSize: 2,
        maxSize: 1200,
    },
    {
        accessorKey: 'count',
        header: 'Count',
        Cell: ({ cell }) => (
            <NumberRenderer value={cell.getValue() as number} />
        ),
        AggregatedCell: () => '',
        PlaceholderCell: ({ cell }) => (
            <NumberRenderer value={cell.getValue() as number} />
        ),
        enableEditing: false,
        size: 1,
        minSize: 1,
        maxSize: 1200,
    },
    {
        accessorKey: 'jobTitle',
        header: 'Job Title',
        Cell: ({ cell }) => (
            <LongTextRenderer value={cell.getValue() as string} />
        ),
        PlaceholderCell: ({ cell, row }) => {
            return (
                <Group>
                    {row.getCanExpand() ? (
                        <ActionIcon
                            onClick={row.getToggleExpandedHandler()}
                            size="sm"
                        >
                            {row.getIsExpanded() ? (
                                <IconChevronDown />
                            ) : (
                                <IconChevronRight />
                            )}
                        </ActionIcon>
                    ) : (
                        <Space w="xl" />
                    )}
                    <LongTextRenderer
                        value={`${cell.getValue() as string} ${row.subRows.length > 0
                            ? '(' + row.subRows.length + ')'
                            : ''
                            }`}
                    />
                </Group>
            );
        },
        size: 2,
        minSize: 2,
        maxSize: 1200,
    },
    {
        accessorKey: 'startDate',
        header: 'Start Date',
        Cell: ({ cell }) => <DateRenderer value={cell.getValue() as Date} />,
        PlaceholderCell: ({ cell }) => (
            <DateRenderer value={cell.getValue() as Date} />
        ),
        enableEditing: false,
        size: 1,
        minSize: 1,
        maxSize: 1200,
    },
    {
        accessorKey: 'signatureCatchPhrase',
        header: 'Phrase',
        Cell: ({ cell }) => (
            <LongTextRenderer value={cell.getValue() as string} />
        ),
        PlaceholderCell: ({ cell }) => (
            <LongTextRenderer value={cell.getValue() as string} />
        ),
        size: 3,
        minSize: 3,
        maxSize: 1200,
    },
];
