import { useCallback, useEffect, useMemo } from 'react';
import {
    Box,
    ScrollArea,
    Stack,
    Table,
    Title,
    useMantineTheme,
    Text,
    Group,
    ActionIcon,
    Space,
} from '@mantine/core';
import { columnData } from 'utils/generateTestData';
import { Employee } from 'utils/types/Test';
import { DateRenderer } from 'app/components/DateRenderer/DateRenderer';
import { BoldTextRenderer } from 'app/components/BoldTextRenderer/BoldTextRenderer';
import { LongTextRenderer } from 'app/components/LongTextComponent/LongTextRenderer';
import { Sort } from 'utils/utils';
import { HeaderCell } from 'app/components/HeaderCell/HeaderCell';
import { TopPanel } from 'app/components/TopPanel/TopPanel';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import { useTableUtils } from '../utils';
import { NumberRenderer } from 'app/components/NumberRenderer/NumberRenderer';

export const Mantine = () => {
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
    } = useTableUtils();

    const checkColumnVisibility = useCallback(
        (accessor: string) => {
            return (
                !columnVisibility ||
                columnVisibility[accessor] === null ||
                columnVisibility[accessor] === undefined ||
                columnVisibility[accessor]
            );
        },
        [columnVisibility],
    );

    const column = useMemo(() => {
        return columnOrder.map(
            accessor =>
                columnData.filter(item => item.accessor === accessor)[0],
        );
    }, [columnOrder]);

    useEffect(() => {
        if (grouping.length > 0) {
            setColumnOrder([
                grouping[0],
                ...columnData
                    .filter(item => item.accessor !== grouping[0])
                    .map(item => item.accessor),
            ]);
        }
    }, [grouping, setColumnOrder]);

    const visibleColumns = useMemo(() => {
        return columnOrder
            .map(
                accessor =>
                    columnData.filter(item => item.accessor === accessor)[0],
            )
            .filter(item => checkColumnVisibility(item.accessor));
    }, [checkColumnVisibility, columnOrder]);

    const renderCell = (row: Employee, accessor: string) => {
        switch (accessor) {
            case 'startDate':
                if (!row[accessor]) {
                    return null;
                }
                return <DateRenderer value={row[accessor] as Date} />;
            case 'count':
                if (!row[accessor]) {
                    return null;
                }
                return <NumberRenderer value={row[accessor] as number} />;
            case 'firstName':
            case 'lastName':
                if (!row[accessor]) {
                    return null;
                }
                if (grouping.length > 0) {
                    return (
                        <Group>
                            {row.subRows ? (
                                <ActionIcon
                                    onClick={() => {
                                        setExpanded(prevExpanded => ({
                                            ...prevExpanded,
                                            [row[accessor]]: !prevExpanded[
                                                row[accessor]
                                            ],
                                        }));
                                    }}
                                    size="sm"
                                >
                                    {expanded[row[accessor]] ? (
                                        <IconChevronDown />
                                    ) : (
                                        <IconChevronRight />
                                    )}
                                </ActionIcon>
                            ) : (
                                <Space w="xl" />
                            )}
                            <BoldTextRenderer
                                value={`${row[accessor] as string} ${row.subRows && row.subRows.length > 0
                                    ? '(' + row.subRows.length + ')'
                                    : ''
                                    }`}
                            />
                        </Group>
                    );
                }
                return <BoldTextRenderer value={row[accessor] as string} />;
            case 'email':
            case 'jobTitle':
                if (!row[accessor]) {
                    return null;
                }
                if (grouping.length > 0) {
                    return (
                        <Group>
                            {row.subRows ? (
                                <ActionIcon
                                    onClick={() => {
                                        setExpanded(prevExpanded => ({
                                            ...prevExpanded,
                                            [row[accessor]]: !prevExpanded[
                                                row[accessor]
                                            ],
                                        }));
                                    }}
                                    size="sm"
                                >
                                    {expanded[row[accessor]] ? (
                                        <IconChevronDown />
                                    ) : (
                                        <IconChevronRight />
                                    )}
                                </ActionIcon>
                            ) : (
                                <Space w="xl" />
                            )}
                            <LongTextRenderer
                                value={`${row[accessor] as string} ${row.subRows && row.subRows.length > 0
                                    ? '(' + row.subRows.length + ')'
                                    : ''
                                    }`}
                            />
                        </Group>
                    );
                }
                return <LongTextRenderer value={row[accessor] as string} />;
            default:
                return row[accessor];
        }
    };
    const onClickSorting = column => {
        setSorting(prevSorting => {
            if (
                !prevSorting ||
                prevSorting.filter(sort => sort.id === column.accessor)
                    .length === 0
            ) {
                return [
                    {
                        id: column.accessor,
                        desc: false,
                    },
                ];
            }
            const item = prevSorting.filter(
                sort => sort.id === column.accessor,
            )[0];
            if (item.desc) {
                return undefined;
            }
            return [
                {
                    id: column.accessor,
                    desc: true,
                },
            ];
        });
    };

    const renderHeader = column => {
        const isSortActive =
            sorting &&
            sorting.filter(sort => sort.id === column.accessor).length > 0;
        const sortDirection = isSortActive
            ? sorting.filter(sort => sort.id === column.accessor)[0].desc
                ? Sort.DESC
                : Sort.ASC
            : undefined;
        return (
            <Box
                component="th"
                sx={theme => ({
                    cursor: 'pointer',
                })}
                onClick={() => onClickSorting(column)}
                colSpan={column.flex}
            >
                <HeaderCell
                    key={column.accessor}
                    isSortActive={isSortActive}
                    sortDirection={sortDirection}
                >
                    <Text>{column.label}</Text>
                </HeaderCell>
            </Box>
        );
    };

    const selectedGroupingColumn = useMemo(
        () =>
            grouping.length > 0
                ? columnData.filter(item => item.accessor === grouping[0])[0]
                : undefined,
        [grouping],
    );

    return (
        <Stack p="xl" w="100%" h="100%">
            <Group spacing="xs">
                <Title order={5} py="xs">
                    Mantine
                </Title>
            </Group>
            <TopPanel
                setGrouping={setGrouping}
                selectedGroupingColumn={selectedGroupingColumn}
                columns={column}
                columnVisibility={columnVisibility}
                setColumnVisibility={setColumnVisibility}
                setColumnOrder={setColumnOrder}
                setFilter={setFilter}
            />
            <Group
                sx={{
                    flex: '1 1',
                    overflow: 'hidden',
                }}
                position="center"
                align="flex-start"
                w="100%"
                h="100%"
                noWrap
            >
                <Box sx={{ flex: '1 1' }} miw={150}>
                    <Text size="sm">
                        Mantine Table is like a pure html table with simple
                        styling. It does not have any table manipulation
                        feature. All table manipulation function shown are
                        implemented using custom function and state.
                    </Text>
                </Box>
                <ScrollArea
                    maw={1200}
                    miw={800}
                    sx={{ alignSelf: 'center' }}
                    w="100%"
                    h="100%"
                >
                    <Table
                        verticalSpacing="md"
                        horizontalSpacing="md"
                        highlightOnHover
                        withBorder
                    >
                        <thead>
                            <tr>
                                {visibleColumns.map(column =>
                                    renderHeader(column),
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => {
                                return (
                                    <>
                                        <Box
                                            key={
                                                row.firstName +
                                                ' ' +
                                                row.lastName
                                            }
                                            component="tr"
                                            bg={
                                                grouping.length > 0 ||
                                                    row.arrived
                                                    ? theme.white
                                                    : theme.colors.blue[0]
                                            }
                                            onClick={
                                                grouping.length > 0
                                                    ? () => onRowClicked(index)
                                                    : undefined
                                            }
                                        >
                                            {visibleColumns.map(column => (
                                                <td
                                                    colSpan={column.flex}
                                                    key={
                                                        row.firstName +
                                                        ' ' +
                                                        row.lastName +
                                                        '-' +
                                                        column.accessor
                                                    }
                                                >
                                                    {renderCell(
                                                        row,
                                                        column.accessor,
                                                    )}
                                                </td>
                                            ))}
                                        </Box>
                                        {grouping.length > 0 &&
                                            expanded[row[grouping[0]]] &&
                                            row.subRows &&
                                            row.subRows.map((row, index) => (
                                                <Box
                                                    key={
                                                        row.firstName +
                                                        ' ' +
                                                        row.lastName
                                                    }
                                                    component="tr"
                                                    bg={
                                                        row.arrived
                                                            ? theme.white
                                                            : theme.colors
                                                                .blue[0]
                                                    }
                                                    onClick={
                                                        grouping.length > 0
                                                            ? () =>
                                                                onRowClicked(
                                                                    index,
                                                                )
                                                            : undefined
                                                    }
                                                >
                                                    {visibleColumns.map(
                                                        column => (
                                                            <td
                                                                colSpan={
                                                                    column.flex
                                                                }
                                                                key={
                                                                    row.firstName +
                                                                    ' ' +
                                                                    row.lastName +
                                                                    '-' +
                                                                    column.accessor
                                                                }
                                                            >
                                                                {renderCell(
                                                                    row,
                                                                    column.accessor,
                                                                )}
                                                            </td>
                                                        ),
                                                    )}
                                                </Box>
                                            ))}
                                    </>
                                );
                            })}
                        </tbody>
                    </Table>
                </ScrollArea>
                <Box sx={{ flex: '1 1' }} />
            </Group>
        </Stack>
    );
};
