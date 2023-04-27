import { useEffect, useState } from 'react';
import { columnData, mockData } from 'utils/generateTestData';
import {
    SortingState,
    GroupingState,
    VisibilityState,
    ColumnOrderState,
} from '@tanstack/react-table';
import { Employee } from 'utils/types/Test';
import { Sort, filterDataByStringValue, sortData } from 'utils/utils';

export const useTableUtils = () => {
    const [data, setData] = useState<Employee[]>(mockData);

    const [sorting, setSorting] = useState<SortingState>();
    const [grouping, setGrouping] = useState<GroupingState>([]);
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
        startDate: false,
    });
    const [filter, setFilter] = useState<Record<string, string>>({});

    const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([
        ...columnData.map(item => item.accessor),
    ]);

    const onRowClicked = (rowIndex: number) => {
        setData(prevData =>
            prevData.map((data, index) =>
                index === rowIndex ? { ...data, arrived: true } : data,
            ),
        );
    };

    useEffect(() => {
        setData(prevData => {
            let newData = [...mockData];
            if (filter['lastName'] && filter['lastName'] !== '') {
                newData = filterDataByStringValue(
                    'lastName',
                    filter['lastName'],
                    newData,
                );
            }
            if (filter['firstName'] && filter['firstName'] !== '') {
                newData = filterDataByStringValue(
                    'firstName',
                    filter['firstName'],
                    newData,
                );
            }
            if (filter['jobTitle'] && filter['jobTitle'] !== '') {
                newData = filterDataByStringValue(
                    'jobTitle',
                    filter['jobTitle'],
                    newData,
                );
            }
            if (filter['email'] && filter['email'] !== '') {
                newData = filterDataByStringValue(
                    'email',
                    filter['email'],
                    newData,
                );
            }
            if (sorting && sorting.length > 0) {
                newData = sortData(
                    sorting[0].id,
                    sorting[0].desc ? Sort.DESC : Sort.ASC,
                    newData,
                );
            }
            if (grouping && grouping.length > 0) {
                const newGroupData = [] as Employee[];
                const groupingKey = grouping[0];
                if (groupingKey === 'email') {
                    newData.forEach(data => {
                        if (
                            newGroupData.filter(
                                item =>
                                    item[groupingKey] ===
                                    (data[groupingKey] as string).split('@')[1],
                            ).length === 0
                        ) {
                            newGroupData.push({
                                [groupingKey]: (data[
                                    groupingKey
                                ] as string).split('@')[1],
                                subRows: [],
                            });
                        }
                        const item = newGroupData.filter(
                            item =>
                                item[groupingKey] ===
                                (data[groupingKey] as string).split('@')[1],
                        )[0];
                        item.subRows.push(data);
                    });
                } else {
                    newData.forEach(data => {
                        if (
                            newGroupData.filter(
                                item => item[groupingKey] === data[groupingKey],
                            ).length === 0
                        ) {
                            newGroupData.push({
                                [groupingKey]: data[groupingKey],
                                subRows: [],
                            });
                        }
                        const item = newGroupData.filter(
                            item => item[groupingKey] === data[groupingKey],
                        )[0];
                        item.subRows.push(data);
                    });
                }
                newData = newGroupData;
            }
            return newData;
        });
    }, [filter, sorting, grouping]);

    return {
        data,
        setData,
        onRowClicked,
        sorting,
        setSorting,
        grouping,
        setGrouping,
        expanded,
        setExpanded,
        columnVisibility,
        setColumnVisibility,
        filter,
        setFilter,
        columnOrder,
        setColumnOrder,
    };
};
