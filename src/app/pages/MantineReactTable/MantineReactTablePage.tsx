import {
    Group,
    ScrollArea,
    Stack,
    Title,
    useMantineTheme,
    Text,
    Box,
    List,
    ThemeIcon,
} from '@mantine/core';
import React, { useEffect, useMemo } from 'react';
import { columnData } from 'utils/generateTestData';
import { MRT_Cell, MantineReactTable } from 'mantine-react-table';
import { Employee } from 'utils/types/Test';
import { TopPanel } from 'app/components/TopPanel/TopPanel';
import { mantineReactTableColumnDefs } from './utils';
import { useTableUtils } from '../utils';
import { IconCheck } from '@tabler/icons-react';

export const MantineReactTablePage = () => {
    const theme = useMantineTheme();

    const {
        data,
        onRowClicked,
        sorting,
        setSorting,
        grouping,
        setGrouping,
        expanded,
        setExpanded,
        columnVisibility,
        setColumnVisibility,
        setFilter,
        columnOrder,
        setColumnOrder,
        setData,
    } = useTableUtils();

    const onChangeValue = (cell: MRT_Cell<Employee>, value: string) => {
        setData(prevData => {
            const data = [...prevData];
            data[cell.row.index] = {
                ...data[cell.row.index],
                [cell.column.id]: value,
            };
            return data;
        });
    };

    useEffect(() => {
        if (grouping.length > 0) {
            setColumnOrder([
                grouping[0],
                ...columnData
                    .filter(item => item.field !== grouping[0])
                    .map(item => item.field),
            ]);
        }
    }, [grouping, setColumnOrder]);

    const selectedGroupingColumn = useMemo(
        () =>
            grouping.length > 0
                ? columnData.filter(item => item.field === grouping[0])[0]
                : undefined,
        [grouping],
    );

    const tableRowProps = ({ row }) => {
        const { original } = row;
        const { arrived, subRows } = original;
        return {
            onClick:
                !subRows || subRows.length === 0
                    ? () => onRowClicked(row.index)
                    : undefined,
            sx: {
                cursor: 'pointer',
                background:
                    arrived || (subRows && subRows.length > 0)
                        ? theme.white
                        : theme.colors.blue[0],
            },
        };
    };

    return (
        <Stack p="xl" w="100%" h="100%">
            <Group spacing="xs">
                <Title order={5} py="xs">
                    Mantine React Table
                </Title>
            </Group>
            <TopPanel
                setGrouping={setGrouping}
                selectedGroupingColumn={selectedGroupingColumn}
                columns={columnOrder
                    .map(
                        accessor =>
                            mantineReactTableColumnDefs.filter(
                                item => item.accessorKey === accessor,
                            )[0],
                    )
                    .map(defs => ({
                        field: defs.accessorKey,
                        headerName: defs.header,
                    }))}
                columnVisibility={columnVisibility}
                setColumnVisibility={setColumnVisibility}
                setColumnOrder={setColumnOrder}
                setFilter={setFilter}
            />
            <Text size="xs" color="dimmed">
                * First Name, Last Name, Email, Job Title and Phrase is editable
            </Text>
            <Group
                position="center"
                sx={{
                    flex: '1 1',
                    overflow: 'hidden',
                }}
                align="flex-start"
                w="100%"
                h="100%"
                noWrap
            >
                <ScrollArea
                    sx={{ flex: '1 1', height: '100%' }}
                    miw={150}
                    w="100%"
                >
                    <Stack w="100%" spacing="xs">
                        <Text size="sm">
                            Mantine React Table is a Table libary that uses both
                            component and tanstack table. It has all the table
                            manipulation that tanstack provide. It also accepts
                            mantine table props to customise the look and
                            behaviour of the component. In this demo, the
                            background color of the row and the click event are
                            provided to the component using the mantine props.
                            It works well with react and typescript.
                        </Text>
                        <List size="sm" spacing="xs">
                            <List.Item
                                icon={
                                    <ThemeIcon
                                        color="green"
                                        size="sm"
                                        radius="xl"
                                    >
                                        <IconCheck size="0.9rem" />
                                    </ThemeIcon>
                                }
                            >
                                Work with react
                            </List.Item>
                            <List.Item
                                icon={
                                    <ThemeIcon
                                        color="green"
                                        size="sm"
                                        radius="xl"
                                    >
                                        <IconCheck size="0.9rem" />
                                    </ThemeIcon>
                                }
                            >
                                Support Customise cell content
                            </List.Item>
                            <List.Item
                                icon={
                                    <ThemeIcon
                                        color="green"
                                        size="sm"
                                        radius="xl"
                                    >
                                        <IconCheck size="0.9rem" />
                                    </ThemeIcon>
                                }
                            >
                                Support Column hiding
                            </List.Item>
                            <List.Item
                                icon={
                                    <ThemeIcon
                                        color="green"
                                        size="sm"
                                        radius="xl"
                                    >
                                        <IconCheck size="0.9rem" />
                                    </ThemeIcon>
                                }
                            >
                                Support Column ordering
                            </List.Item>
                            <List.Item
                                icon={
                                    <ThemeIcon
                                        color="green"
                                        size="sm"
                                        radius="xl"
                                    >
                                        <IconCheck size="0.9rem" />
                                    </ThemeIcon>
                                }
                            >
                                Support Customise header cell content
                            </List.Item>
                            <List.Item
                                icon={
                                    <ThemeIcon
                                        color="green"
                                        size="sm"
                                        radius="xl"
                                    >
                                        <IconCheck size="0.9rem" />
                                    </ThemeIcon>
                                }
                            >
                                Support custom Column sorting
                            </List.Item>
                            <List.Item
                                icon={
                                    <ThemeIcon
                                        color="green"
                                        size="sm"
                                        radius="xl"
                                    >
                                        <IconCheck size="0.9rem" />
                                    </ThemeIcon>
                                }
                            >
                                Support grouping functionality
                            </List.Item>
                            <List.Item
                                icon={
                                    <ThemeIcon
                                        color="green"
                                        size="sm"
                                        radius="xl"
                                    >
                                        <IconCheck size="0.9rem" />
                                    </ThemeIcon>
                                }
                            >
                                Support Dynamic Table layout
                            </List.Item>
                        </List>
                    </Stack>
                </ScrollArea>
                <ScrollArea
                    sx={{
                        maxWidth: 1200,
                        minWidth: 800,
                        width: '100%',
                    }}
                    h="100%"
                >
                    <MantineReactTable
                        columns={mantineReactTableColumnDefs}
                        data={data}
                        enableBottomToolbar={false}
                        enablePagination={false}
                        enableTopToolbar={false}
                        enableColumnActions={false}
                        enableExpanding
                        manualSorting
                        manualGrouping
                        state={{
                            sorting: sorting,
                            grouping,
                            columnVisibility,
                            columnOrder,
                            expanded,
                        }}
                        layoutMode="grid"
                        enableEditing
                        editingMode="cell"
                        mantineTableBodyProps={{ sizes: 'sm' }}
                        mantineTableBodyRowProps={tableRowProps}
                        mantineTableHeadCellProps={{
                            sx: {
                                '& .mantine-TableHeadCell-Content-Labels': {
                                    gap: theme.spacing.sm,
                                },
                            },
                        }}
                        mantineEditTextInputProps={({ cell }) => ({
                            onBlur: event =>
                                onChangeValue(cell, event.target.value),
                            styles: { wrapper: { width: '100%' } },
                            w: '100%',
                        })}
                        onSortingChange={setSorting}
                        onExpandedChange={setExpanded}
                        mantineTableProps={{ miw: 800, maw: 1200, w: '100%' }}
                    />
                </ScrollArea>
                <Box sx={{ flex: '1 1' }} />
            </Group>
        </Stack>
    );
};
