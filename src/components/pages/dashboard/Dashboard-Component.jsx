import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import DashboardheaderComponent from "./utils/Dashboard-Header-Component/Dashboard-Header-Component";
import DashboardTabComponent from "./utils/Dashboard-Tab-Component/Dashboard-Tab-Component";
import SectionFooterComponent from "../../sections/Section-Footer-Component/Section-Footer-Component";
import classes from "./Dashboard-Component.module.css";

const DashboardComponent = (props) => {

    return (
        <>
            <DashboardheaderComponent />
            <div className={classes['dashboard-component']}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2">
                            <DashboardTabComponent />
                        </div>
                        <div className="col-10">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
            <SectionFooterComponent />
        </>
    )
}

export default DashboardComponent;