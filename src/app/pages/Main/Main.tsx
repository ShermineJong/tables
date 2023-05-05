import React from 'react';
import { Box, Divider, Group, List, NavLink, Stack, Text } from '@mantine/core';
import { Link, Outlet } from '@tanstack/react-location';

export const Main = () => {
    return (
        <Group w="100w" h="100vh" align="stretch" spacing={0} noWrap>
            <Stack spacing={0} w={150} py="xl" sx={{ flex: '0 0 200px' }}>
                <NavLink
                    label="AG Grid"
                    py="xs"
                    px="xl"
                    variant="filled"
                    component={Link}
                    to="ag-grid"
                />
                <NavLink
                    label="Mantine"
                    py="xs"
                    px="xl"
                    variant="filled"
                    component={Link}
                    to="mantine"
                />
                <NavLink
                    label="React Table + Mantine"
                    py="xs"
                    px="xl"
                    variant="filled"
                    component={Link}
                    to="react-table-with-mantine"
                />
                <NavLink
                    label="Mantine React Table"
                    py="xs"
                    px="xl"
                    variant="filled"
                    component={Link}
                    to="mantine-react-table"
                />
                <Box p="md">
                    <Text size="sm">Tested</Text>
                    <List size="sm" p="xs">
                        <List.Item>Work well with react</List.Item>
                        <List.Item>Customise cell content</List.Item>
                        <List.Item>Column hiding</List.Item>
                        <List.Item>Column ordering</List.Item>
                        <List.Item>Customise header cell content</List.Item>
                        <List.Item>Column sorting</List.Item>
                        <List.Item>Data grouping</List.Item>
                        <List.Item>Editable cell</List.Item>
                    </List>
                    <Text size="sm">Not Tested</Text>
                    <List size="sm" p="xs">
                        <List.Item>Table filtering</List.Item>
                    </List>
                </Box>
            </Stack>
            <Divider orientation="vertical" />
            <Box sx={{ flex: '1 1' }} h="100vh">
                <Outlet />
            </Box>
        </Group>
    );
};
