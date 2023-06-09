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
import 'ag-grid-enterprise';
import { IHeaderParams } from 'ag-grid-community';
import { HeaderCell } from 'app/components/HeaderCell/HeaderCell';
import { useTableUtils } from '../utils';
import { Sort } from 'utils/utils';
import { TopPanel } from 'app/components/TopPanel/TopPanel';
import { IconCheck, IconQuestionMark, IconX } from '@tabler/icons-react';
import { Employee } from 'utils/types/Test';

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
        setData,
    } = useTableUtils();
    const getRowStyle = ({ data }) => {
        if (data) {
            const { arrived } = data;
            return {
                background: arrived ? theme.white : theme.colors.blue[0],
            };
        }
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

    const selectedGroupingColumn = useMemo(
        () =>
            grouping.length > 0
                ? columnData.filter(item => item.field === grouping[0])[0]
                : undefined,
        [grouping],
    );

    const displayData = useMemo(() => {
        const displayData = [];
        data.forEach(item => {
            if (
                item.subRows &&
                item.subRows.length > 0 &&
                selectedGroupingColumn
            ) {
                item.subRows.forEach(subItem =>
                    displayData.push({
                        ...subItem,
                        parentId: item[selectedGroupingColumn.field],
                    }),
                );
            } else {
                displayData.push(item);
            }
        });
        return displayData;
    }, [data, selectedGroupingColumn]);

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

    const onChangeValue = (rowIndex: number, newValue: string) => {
        setData(prevData => {
            const data = [...prevData];
            data[rowIndex] = {
                ...data[rowIndex],
                [rowIndex]: newValue,
            };
            return data;
        });
    };

    const getDataPath = useMemo(() => {
        return (data: Employee) => {
            return data.parentId ? [data.parentId, data.email] : [data.email];
        };
    }, []);

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
            <Text size="xs" color="dimmed">
                * First Name, Last Name, Email, Job Title and Phrase is editable
            </Text>
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
                            such as column hiding, ordering, sorting and
                            grouping out of the box. These features can
                            implemented using state manupulation and other
                            features provided by the table.
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
                                        color="yellow"
                                        size="sm"
                                        radius="xl"
                                    >
                                        <IconQuestionMark size="0.9rem" />
                                    </ThemeIcon>
                                }
                            >
                                Support Column hiding through column state
                                manupulation
                            </List.Item>
                            <List.Item
                                icon={
                                    <ThemeIcon
                                        color="yellow"
                                        size="sm"
                                        radius="xl"
                                    >
                                        <IconQuestionMark size="0.9rem" />
                                    </ThemeIcon>
                                }
                            >
                                Support Column ordering through column state
                                manupulation
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
                                        color="yellow"
                                        size="sm"
                                        radius="xl"
                                    >
                                        <IconQuestionMark size="0.9rem" />
                                    </ThemeIcon>
                                }
                            >
                                Support custom Column sorting through server
                                side Data
                            </List.Item>
                            <List.Item
                                icon={
                                    <ThemeIcon
                                        color="yellow"
                                        size="sm"
                                        radius="xl"
                                    >
                                        <IconQuestionMark size="0.9rem" />
                                    </ThemeIcon>
                                }
                            >
                                Paid Data grouping functionality that support
                                custom grouping through tree data object
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
                                Support cell editing
                            </List.Item>
                        </List>
                    </Stack>
                </ScrollArea>
                <Box w="100%" h="100%" maw={1200} miw={800}>
                    <AgGridReact
                        className="ag-theme-alpine"
                        getRowStyle={getRowStyle}
                        columnDefs={
                            selectedGroupingColumn
                                ? [
                                    {
                                        showRowGroup: true,
                                        cellRenderer: 'agGroupCellRenderer',
                                        flex: 2,
                                    },
                                    ...columnData,
                                ]
                                : columnData
                        }
                        rowData={displayData}
                        onRowClicked={props =>
                            props.data &&
                            !props.data.arrived &&
                            onRowClicked(props.rowIndex)
                        }
                        suppressMovableColumns={true}
                        components={components}
                        onCellValueChanged={({ rowIndex, newValue }) => {
                            onChangeValue(rowIndex, newValue);
                        }}
                        treeData={true}
                        groupDisplayType="custom"
                        getDataPath={getDataPath}
                    />
                </Box>
                <Box sx={{ flex: '1 1' }} />
            </Group>
        </Stack>
    );
};
