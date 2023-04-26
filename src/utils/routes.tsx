import { Route } from '@tanstack/react-location';
import {
    AGGrid,
    Main,
    Mantine,
    MantineReactTablePage,
    ReactTableAndMantine,
} from '../app/pages';
import React from 'react';

export const routes: Route[] = [
    {
        path: '',
        element: <Main />,
        children: [
            { path: 'ag-grid', element: <AGGrid /> },
            { path: 'mantine', element: <Mantine /> },
            {
                path: 'react-table-with-mantine',
                element: <ReactTableAndMantine />,
            },
            {
                path: 'mantine-react-table',
                element: <MantineReactTablePage />,
            },
        ],
    },
];
