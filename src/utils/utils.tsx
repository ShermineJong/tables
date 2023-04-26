import { Employee } from './types/Test';

export enum Sort {
    ASC = 'asc',
    DESC = 'desc',
}

export const sortData = (
    accessor: string,
    direction: Sort,
    data: Employee[],
) => {
    return data.sort((value1, value2) => {
        if (direction === Sort.ASC) {
            if (value1[accessor] === value2[accessor]) {
                return 0;
            }
            if (value1[accessor] > value2[accessor]) {
                return 1;
            }
            return -1;
        }
        if (value2[accessor] === value1[accessor]) {
            return 0;
        }
        if (value2[accessor] > value1[accessor]) {
            return 1;
        }
        return -1;
    });
};

export const filterDataByStringValue = (
    accessor: string,
    value: string,
    data: Employee[],
) => {
    return data.filter(item =>
        (item[accessor] as string).toLowerCase().includes(value.toLowerCase()),
    );
};

export const filterDataByDateValue = (
    accessor: string,
    startDate: Date | undefined,
    endDate: Date | undefined,
    data: Employee[],
) => {
    return data.filter(item => {
        const date = item[accessor] as Date;
        if (startDate && endDate) {
            return date >= startDate && date <= endDate;
        }
        if (startDate) {
            return date >= startDate;
        }
        if (endDate) {
            return date <= endDate;
        }
        return false;
    });
};

export const filterDataByNumberValue = (
    accessor: string,
    moreThan: number | undefined,
    lessThan: number | undefined,
    data: Employee[],
) => {
    return data.filter(item => {
        const value = item[accessor] as number;
        if (moreThan && lessThan) {
            return value >= moreThan && value <= lessThan;
        }
        if (moreThan) {
            return value >= moreThan;
        }
        if (lessThan) {
            return value <= lessThan;
        }
        return false;
    });
};
