import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  AppRouteProps,
  routeConfig,
} from "shared/config/routeConfig/routeConfig";
import { PageLoader } from "widgets/PageLoader/PageLoader";
import { RequireAuth } from "./RequireAuth";

const AppRouter = () => {
  const renderWithWrapper = React.useCallback((route: AppRouteProps) => {
    const element = (
      <React.Suspense fallback={<PageLoader />}>{route.element}</React.Suspense>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? (
            <RequireAuth roles={route.roles}>{element}</RequireAuth>
          ) : (
            element
          )
        }
      />
    );
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default React.memo(AppRouter);
