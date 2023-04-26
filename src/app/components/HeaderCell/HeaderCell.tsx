import { Group, ThemeIcon } from '@mantine/core';
import {
    IconArrowsSort,
    IconSortAscending,
    IconSortDescending,
} from '@tabler/icons-react';
import { ReactNode } from 'react';
import { Sort } from 'utils/utils';

interface HeaderCellProps {
    children: string | ReactNode | null;
    isSortActive: boolean;
    sortDirection: Sort | undefined;
}
export const HeaderCell = (props: HeaderCellProps) => {
    const { children, isSortActive, sortDirection } = props;

    return (
        <Group spacing="xs" noWrap>
            {children}
            {!isSortActive && (
                <ThemeIcon size="xs" variant="transparent">
                    <IconArrowsSort />
                </ThemeIcon>
            )}
            {sortDirection === Sort.ASC && (
                <ThemeIcon size="xs" variant="transparent">
                    <IconSortAscending />
                </ThemeIcon>
            )}
            {sortDirection === Sort.DESC && (
                <ThemeIcon size="xs" variant="transparent">
                    <IconSortDescending />
                </ThemeIcon>
            )}
        </Group>
    );
};
