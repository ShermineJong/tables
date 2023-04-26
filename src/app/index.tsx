/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import { Router, ReactLocation, Outlet } from '@tanstack/react-location';
import * as React from 'react';
import { routes } from 'utils/routes';

const location = new ReactLocation();

export function App() {
  return (
    <Router routes={routes} location={location}>
      <Outlet />
    </Router>
  );
}
