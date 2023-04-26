import React, { useCallback, useMemo } from 'react';
import {
    Stack,
    Title,
    Box,
    Group,
    useMantineTheme,
    Text,
    List,
    ThemeIcon,
    ScrollArea,
} from '@mantine/core';
import { AgGridReact } from 'ag-grid-react';
import { columnData } from 'utils/generateTestData';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { IHeaderParams } from 'ag-grid-community';
import { HeaderCell } from 'app/components/HeaderCell/HeaderCell';
import { useTableUtils } from '../utils';
import { Sort } from 'utils/utils';
import { TopPanel } from 'app/components/TopPanel/TopPanel';
import { IconCheck, IconQuestionMark, IconX } from '@tabler/icons-react';

const columnDefs = columnData.map(column => ({
    ...column,
    field: column.accessor,
    headerName: column.label,
}));

export const AGGrid = () => {
    const theme = useMantineTheme();
    const {
        data,
        onRowClicked,
        sorting,
        setSorting,
        grouping,
        setGrouping,
        columnVisibility,
        setColumnVisibility,
        setFilter,
        setColumnOrder,
    } = useTableUtils();
    const getRowStyle = ({ data }) => {
        const { arrived } = data;
        return {
            background: arrived ? theme.white : theme.colors.blue[0],
        };
    };

    const onClickSorting = useCallback(
        column => {
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
        },
        [setSorting],
    );

    const components = useMemo(() => {
        return {
            agColumnHeader: (props: IHeaderParams) => {
                const column = props.column.getColDef();
                const isSortActive =
                    sorting &&
                    sorting.filter(sort => sort.id === column.field).length > 0;
                const sortDirection = isSortActive
                    ? sorting.filter(sort => sort.id === column.field)[0].desc
                        ? Sort.DESC
                        : Sort.ASC
                    : undefined;
                return (
                    <Box
                        component="th"
                        sx={{
                            cursor: 'pointer',
                        }}
                        onClick={() =>
                            onClickSorting({ accessor: column.field })
                        }
                    >
                        <HeaderCell
                            key={props.template}
                            isSortActive={isSortActive}
                            sortDirection={sortDirection}
                        >
                            {column.headerName}
                        </HeaderCell>
                    </Box>
                );
            },
        };
    }, [onClickSorting, sorting]);

    const selectedGroupingColumn = useMemo(
        () =>
            grouping.length > 0
                ? columnData.filter(item => item.accessor === grouping[0])[0]
                : undefined,
        [grouping],
    );

    return (
        <Stack p="xl" w="100%" h="100%">
            <Group>
                <Title order={5} py="xs">
                    AG Grid
                </Title>
            </Group>
            <TopPanel
                setGrouping={setGrouping}
                selectedGroupingColumn={selectedGroupingColumn}
                columns={columnData}
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
                <ScrollArea
                    sx={{ flex: '1 1', height: '100%' }}
                    miw={150}
                    w="100%"
                >
                    <Stack sx={{ flex: '1 1' }} w="100%">
                        <Text size="sm" p="xs">
                            Do not support certain customised table function
                            such as column hiding, ordering and sorting. These
                            features implemented using custom header, custom
                            functions and state.
                        </Text>
                        <List size="sm" p="xs" spacing="sm">
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
                                        color="red"
                                        size="sm"
                                        radius="xl"
                                    >
                                        <IconX size="0.9rem" />
                                    </ThemeIcon>
                                }
                            >
                                Do not support Column hiding
                            </List.Item>
                            <List.Item
                                icon={
                                    <ThemeIcon
                                        color="red"
                                        size="sm"
                                        radius="xl"
                                    >
                                        <IconX size="0.9rem" />
                                    </ThemeIcon>
                                }
                            >
                                Do not support Column ordering
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
                                        color="red"
                                        size="sm"
                                        radius="xl"
                                    >
                                        <IconX size="0.9rem" />
                                    </ThemeIcon>
                                }
                            >
                                Do not support custom Column sorting
                            </List.Item>
                            <List.Item
                                icon={
                                    <ThemeIcon
                                        color="blue"
                                        size="sm"
                                        radius="xl"
                                    >
                                        <IconQuestionMark size="0.9rem" />
                                    </ThemeIcon>
                                }
                            >
                                Paid Data grouping functionality
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
                <Box w="100%" h="100%" maw={1200} miw={800}>
                    <AgGridReact
                        className="ag-theme-alpine"
                        getRowStyle={getRowStyle}
                        columnDefs={columnDefs}
                        rowData={data}
                        onRowClicked={props => onRowClicked(props.rowIndex)}
                        suppressMovableColumns={true}
                        groupDisplayType="custom"
                        components={components}
                    />
                </Box>
                <Box sx={{ flex: '1 1' }} />
            </Group>
        </Stack>
    );
};
