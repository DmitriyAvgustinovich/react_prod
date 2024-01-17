import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  AppRouteProps,
  routeConfig,
} from "shared/config/routeConfig/routeConfig";
import { PageLoader } from "shared/ui/PageLoader/PageLoader";
import { RequireAuth } from "./RequireAuth";

const AppRouter = () => {
  const renderWithWrapper = React.useCallback((route: AppRouteProps) => {
    const element = (
      <React.Suspense fallback={<PageLoader />}>
        <div className="page-wrapper">{route.element}</div>
      </React.Suspense>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? <RequireAuth>{element}</RequireAuth> : element
        }
      />
    );
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default React.memo(AppRouter);
