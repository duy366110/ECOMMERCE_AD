import React from "react";
import { Outlet } from "react-router-dom";
import classes from "./Auth-Component.module.css";

const AuthComponent = (props) => {

    return (
        <Outlet />
    )
}

export default AuthComponent;