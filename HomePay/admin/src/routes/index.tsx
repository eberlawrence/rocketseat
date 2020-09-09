import React from "react";
import { Switch } from "react-router-dom";
import Students from "pages/Students/Students";
import Lives from "pages/Lives/Lives";
import ListLives from "pages/Lives/ListLives/ListLives";
import CreateLive from "pages/Lives/CreateLive/CreateLive";
import LiveRoom from "pages/Lives/LiveRoom/LiveRoom";
import Dashboard from "../pages/Dashboard/Dashboard";
import LogIn from "../pages/LogIn/LogIn";
import Route from "./Route";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" component={LogIn} layout="auth" />
    <Route path="/" exact component={Dashboard} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/alunos" component={Students} />

    <Route path="/lives/listar" component={ListLives} />
    <Route path="/lives/criar" component={CreateLive} />
    <Route path="/lives/:id" component={LiveRoom} />
    <Route path="/lives" component={Lives} />
  </Switch>
);

export default Routes;
