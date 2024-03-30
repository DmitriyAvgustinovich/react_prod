import { UserRole, getUserAuthData, getUserRoles } from "entities/User";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RouterPath } from "shared/config/routeConfig/routeConfig";

interface RequireAuthProps {
  children: JSX.Element;
  roles?: UserRole[];
}

export function RequireAuth(props: RequireAuthProps) {
  const { children, roles } = props;

  const auth = useSelector(getUserAuthData);
  const location = useLocation();
  const userRoles = useSelector(getUserRoles);

  const hasRequiredRoles = React.useMemo(() => {
    if (!roles) return true;

    return roles.some((requiredRole) => {
      const hasRole = userRoles?.includes(requiredRole);
      return hasRole;
    });
  }, [roles, userRoles]);

  if (!auth) {
    return <Navigate to={RouterPath.main} state={{ form: location }} replace />;
  }

  if (!hasRequiredRoles) {
    return (
      <Navigate to={RouterPath.forbidden} state={{ form: location }} replace />
    );
  }

  return children;
}
