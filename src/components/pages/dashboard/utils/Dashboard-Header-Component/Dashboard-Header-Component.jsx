import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import classes from "./Dashboard-Header-Component.module.css";

const DashboardheaderComponent = (props) => {
    const location = useLocation();
    const [pathname, setPathname] = useState('');


    useEffect(() => {
        let { pathname } = location;
        setPathname(pathname.split('/')[1]);

    }, [location])

    return (
        <div className={classes['dashboard-header-component']}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <h1 className={classes['header-title']}>Admin page</h1>
                    </div>
                    <div className="col-10 d-flex align-items-center justify-content-between">
                        <h2 className={classes['header-section']}>{pathname? pathname : 'Dashboard'} section</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardheaderComponent;