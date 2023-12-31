import React from "react";
import { Outlet } from "react-router-dom";
import SectionFooterComponent from "../../sections/Section-Footer-Component/Section-Footer-Component";

const AuthComponent = (props) => {

    return (
        <>
            <Outlet />
            <SectionFooterComponent />
        </>
    )
}

export default AuthComponent;