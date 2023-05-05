import {
    Box,
    CSSObject,
    Group,
    MantineTheme,
    ScrollArea,
    Stack,
    Sx,
    Title,
    Text,
    List,
    ThemeIcon,
} from '@mantine/core';
import { useMemo } from 'react';
import { columnData } from 'utils/generateTestData';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getExpandedRowModel,
    Row,
    GroupingState,
    HeaderGroup,
} from '@tanstack/react-table';
import { Sort } from 'utils/utils';
import { HeaderCell } from 'app/components/HeaderCell/HeaderCell';
import { TopPanel } from 'app/components/TopPanel/TopPanel';
import { reactTablecolumnDefs } from './utils';
import { useTableUtils } from '../utils';
import { Employee } from 'utils/types/Test';
import { IconCheck } from '@tabler/icons-react';

type TableGridStylesType = (
    arrived: boolean,
    numCol: number,
    hasBorder?: boolean,
) => Sx;

const tableGridStyles: TableGridStylesType = (
    arrived,
    numCol,
    hasBorder,
) => theme => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${numCol}, 1fr)`,
    gap: theme.spacing.sm,
    background: arrived ? theme.white : theme.colors.blue[0],
    borderRight: hasBorder && `solid 1px ${theme.colors.gray[3]}`,
    borderLeft: hasBorder && `solid 1px ${theme.colors.gray[3]}`,
    borderTop: hasBorder && `solid 1px ${theme.colors.gray[3]}`,
    width: '100%',
    '&:hover': {
        background: hasBorder && theme.colors.gray[0],
    },
    '&:last-of-type': {
        borderBottom: hasBorder && `solid 1px ${theme.colors.gray[3]}`,
        borderBottomLeftRadius: theme.radius[theme.defaultRadius],
        borderBottomRightRadius: theme.radius[theme.defaultRadius],
    },
    '&:first-of-type': {
        borderTopLeftRadius: theme.radius[theme.defaultRadius],
        borderTopRightRadius: theme.radius[theme.defaultRadius],
    },
});

type TableCellStylesType = (
    colspan: number,
) => (theme: MantineTheme) => CSSObject;
const tableCellStyles: TableCellStylesType = colspan => theme => ({
    gridColumnEnd: `span ${colspan}`,
    padding: theme.spacing.sm,
});

interface TableRowProps {
    row: Row<Employee>;
    onRowClicked: (index: number) => void;
    group: GroupingState;
    header: HeaderGroup<Employee>[];
    totalSize: number;
}

const TableRow = (props: TableRowProps) => {
    const { row, onRowClicked, group, header, totalSize } = props;
    if (row.original.subRows) {
        return (
            <>
                <Box sx={tableGridStyles(true, totalSize)}>
                    <Group
                        w="100%"
                        noWrap
                        key={row.original[group[0]]}
                        sx={tableCellStyles(totalSize)}
                    >
                        <Text size="md" fw="bolder" tt="uppercase">
                            {row.original[group[0]]}{' '}
                            <Text span color="dimmed">
                                ( {row.original.subRows.length} )
                            </Text>
                        </Text>
                    </Group>
                </Box>
                <TableHeader header={header} totalSize={totalSize} />
            </>
        );
    }
    return (
        <Box
            sx={tableGridStyles(row.original.arrived, totalSize, true)}
            onClick={
                !row.original.subRows
                    ? () => onRowClicked(row.index)
                    : undefined
            }
        >
            {row.getVisibleCells().map(cell => (
                <Box
                    key={cell.id}
                    sx={tableCellStyles(cell.column.columnDef.size)}
                >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Box>
            ))}
        </Box>
    );
};

interface TableHeaderProps {
    header: HeaderGroup<Employee>[];
    totalSize: number;
}
const TableHeader = (props: TableHeaderProps) => {
    const { header, totalSize } = props;
    return (
        <>
            {header.map(headerGroup => (
                <Box key={headerGroup.id} sx={tableGridStyles(true, totalSize)}>
                    {headerGroup.headers.map(column => (
                        <Box
                            sx={theme => ({
                                ...tableCellStyles(
                                    column.column.columnDef.size,
                                )(theme),
                                cursor: 'pointer',
                                padding: 0,
                                paddingRight: theme.spacing.sm,
                                paddingLeft: theme.spacing.sm,
                            })}
                            onClick={column.column.getToggleSortingHandler()}
                            key={column.id}
                        >
                            <HeaderCell
                                key={column.id}
                                isSortActive={
                                    column.column.getIsSorted() !== false
                                }
                                sortDirection={
                                    (column.column.getIsSorted() as Sort) ||
                                    undefined
                                }
                            >
                                <Text>
                                    {flexRender(
                                        column.column.columnDef.header,
                                        column.getContext(),
                                    )}
                                </Text>
                            </HeaderCell>
                        </Box>
                    ))}
                </Box>
            ))}
        </>
    );
};

export const ReactTableAndMantine = () => {
    const {
        data,
        onRowClicked,
        sorting,
        setSorting,
        grouping,
        setGrouping,
        setExpanded,
        columnVisibility,
        setColumnVisibility,
        setFilter,
        columnOrder,
        setColumnOrder,
    } = useTableUtils();

    const {
        getHeaderGroups,
        getRowModel,
        getAllLeafColumns,
        getTotalSize,
    } = useReactTable({
        columns: reactTablecolumnDefs,
        data: data,
        state: {
            sorting,
            grouping,
            columnVisibility,
            columnOrder,
            expanded: true,
        },
        enableExpanding: true,
        enableGrouping: true,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        onSortingChange: setSorting,
        onExpandedChange: setExpanded,
        getSubRows: row => row.subRows,
        groupedColumnMode: false,
    });

    const selectedGroupingColumn = useMemo(
        () =>
            grouping.length > 0
                ? columnData.filter(item => item.field === grouping[0])[0]
                : undefined,
        [grouping],
    );

    return (
        <Stack p="xl" w="100%" h="100%">
            <Group spacing="xs">
                <Title order={5} py="xs">
                    React Table + Mantine
                </Title>
            </Group>
            <TopPanel
                setGrouping={setGrouping}
                selectedGroupingColumn={selectedGroupingColumn}
                columns={getAllLeafColumns().map(column => ({
                    field: column.id,
                    headerName: column.columnDef.header as string,
                }))}
                columnVisibility={columnVisibility}
                setColumnVisibility={setColumnVisibility}
                setColumnOrder={setColumnOrder}
                setFilter={setFilter}
            />
            <Group
                sx={{ flex: '1 1', overflow: 'hidden' }}
                w="100%"
                h="100%"
                position="center"
                align="flex-start"
                noWrap
            >
                <ScrollArea
                    sx={{ flex: '1 1', height: '100%' }}
                    miw={150}
                    w="100%"
                >
                    <Stack sx={{ flex: '1 1' }} spacing="xs">
                        <Text size="sm">
                            Tanstack Table is a react hook that manages table
                            manipulation functions. It also has cell, header and
                            footer rendering function. It does not come with any
                            component thus not restricting how the table is
                            display. It also comes with aditional functions to
                            get the current state of the table.
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
                                Support cell functionality
                            </List.Item>
                        </List>
                    </Stack>
                </ScrollArea>
                <Stack h="100%" spacing="xs" w="100%" maw={1200} miw={800}>
                    {(!grouping || grouping.length === 0) && (
                        <TableHeader
                            header={getHeaderGroups()}
                            totalSize={getTotalSize()}
                        />
                    )}
                    <ScrollArea sx={{ flex: '1 1', height: '100%' }}>
                        {getRowModel().rows.map(row => {
                            return (
                                <TableRow
                                    key={row.id}
                                    row={row}
                                    onRowClicked={onRowClicked}
                                    group={grouping}
                                    header={getHeaderGroups()}
                                    totalSize={getTotalSize()}
                                />
                            );
                        })}
                    </ScrollArea>
                </Stack>
                <Box sx={{ flex: '1 1' }} />
            </Group>
        </Stack>
    );
};
