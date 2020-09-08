import React from "react";
import { Switch } from "react-router-dom";
import Students from "pages/Students/Students";
import Dashboard from "../pages/Dashboard/Dashboard";
import LogIn from "../pages/LogIn/LogIn";
import Route from "./Route";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" component={LogIn} layout="auth" />
    <Route path="/" exact component={Dashboard} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/alunos" component={Students} />
  </Switch>
);

export default Routes;
