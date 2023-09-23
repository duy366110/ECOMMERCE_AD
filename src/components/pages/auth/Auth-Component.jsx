import React from "react";
import { Outlet } from "react-router-dom";
import SectionFooterComponent from "../../sections/Section-Footer-Component/Section-Footer-Component";
import classes from "./Auth-Component.module.css";

const AuthComponent = (props) => {

    return (
        <>
            <Outlet />
            <SectionFooterComponent />
        </>
    )
}

export default AuthComponent;