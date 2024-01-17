import { classNames } from "shared/lib/classNames/classNames";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInited, userActions } from "entities/User";
import { AppRouter } from "./providers/router";

export const App = () => {
  const dispatch = useDispatch();
  const inited = useSelector(getUserInited);

  React.useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames("app", {}, [])}>
      <React.Suspense fallback="">
        <Navbar />

        <div className="content-page">
          <Sidebar />
          {inited && <AppRouter />}
        </div>
      </React.Suspense>
    </div>
  );
};
