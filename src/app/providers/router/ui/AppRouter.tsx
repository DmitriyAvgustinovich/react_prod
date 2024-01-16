import { getUserAuthData } from "entities/User";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { routeConfig } from "shared/config/routeConfig/routeConfig";
import { PageLoader } from "shared/ui/PageLoader/PageLoader";

const AppRouter = () => {
  const isAuth = useSelector(getUserAuthData);

  const routes = React.useMemo(
    () =>
      Object.values(routeConfig).filter((route) => {
        if (route.authOnly && !isAuth) {
          return false;
        }

        return true;
      }),
    [isAuth]
  );

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={(
            <React.Suspense fallback={<PageLoader />}>
              <div className="page-wrapper">{element}</div>
            </React.Suspense>
          )}
        />
      ))}
    </Routes>
  );
};

export default React.memo(AppRouter);
