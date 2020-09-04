import React from "react";
import { RouteProps as ReactDOMRouteProps, Route as ReactDOMRoute, Redirect } from "react-router-dom";

import AuthLayout from "layout/AuthLayout";
import DefaultLayout from "layout/DefaultLayout";

import { useAuth } from "hooks/auth";

interface RouteProps extends ReactDOMRouteProps {
  component: React.ComponentType<any>;
  isPublic?: boolean;
  layout?: "auth" | "default";
}

const Route: React.FC<RouteProps> = ({ layout, isPublic = false, component: Component, ...routeProps }) => {
  const { data } = useAuth();

  // se NÃO estiver logado, redirecione o usuário para a página de login
  if (!isPublic && !data.token && routeProps.location?.pathname.indexOf("login") === -1) {
    return <Redirect to="/login" />;
  }

  // se estiver logado e tentar acessar a página de login, redirecione para dashboard
  if (data.token && routeProps.location?.pathname.indexOf("login") !== -1) {
    return <Redirect to="/dashboard" />;
  }

  // Deve aplicar algum layout?
  let Layout = DefaultLayout;
  switch (layout) {
    case "auth":
      Layout = AuthLayout;
      break;
    default:
      Layout = DefaultLayout;
      break;
  }

  return (
    <ReactDOMRoute
      {...routeProps}
      render={(props) => {
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};

export default Route;
