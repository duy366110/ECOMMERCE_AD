import React from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { authLogout } from "../../../../../store/store-auth";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CategoryIcon from '@mui/icons-material/Category';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ThreePIcon from '@mui/icons-material/ThreeP';
import classes from "./Dashboard-Tab-Component.module.css";

const DashboardTabComponent = (props) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const socketSlice = useSelector((state) => state.socket);

    const userLogoutHandler = (event) => {
        socketSlice.socket.emit('admin-disconnect', {token: auth.token});
        dispatch(authLogout());
        navigate("/auth");
    }

    return (
        <div className={classes['dashboard-tab-component']}>
            <div className={classes['tab-container']}>
                <ul className={classes['tab-main']}>
                    <li>
                        <h2>Main</h2>
                        <ul className={classes['tab-content']}>
                            <li>
                                <NavLink to='' className={({ isActive }) => isActive ? classes["active"] : ""}><DashboardIcon /> Dashboard</NavLink>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <h2>Lists</h2>
                        <ul className={classes['tab-content']}>
                            <li><NavLink to="users" className={({ isActive }) => isActive ? classes["active"] : ""}><SupervisedUserCircleIcon /> Users</NavLink></li>
                            <li><NavLink to="categorys" className={({ isActive }) => isActive ? classes["active"] : ""}><CategoryIcon />Categories</NavLink></li>
                            <li><NavLink to="featured" className={({ isActive }) => isActive ? classes["active"] : ""}><CategoryIcon />Featured</NavLink></li>
                            <li><NavLink to="products" className={({ isActive }) => isActive ? classes["active"] : ""}><SpaceDashboardIcon />Products</NavLink></li>
                            <li><NavLink to="roles" className={({ isActive }) => isActive ? classes["active"] : ""}><AdminPanelSettingsIcon /> Roles</NavLink></li>
                            <li><NavLink to="customer-care" className={({ isActive }) => isActive ? classes["active"] : ""}><ThreePIcon />Customer care</NavLink></li>
                        </ul>
                    </li>

                    <li>
                        <h2>New</h2>
                        <ul className={classes['tab-content']}>
                            <li><NavLink to="new-user" className={({ isActive }) => isActive ? classes["active"] : ""}><PersonOutlineOutlinedIcon /> New User</NavLink></li>
                            <li><NavLink to="new-product" className={({ isActive }) => isActive ? classes["active"] : ""}><SpaceDashboardIcon />New Product</NavLink></li>
                            <li><NavLink to="new-role" className={({ isActive }) => isActive ? classes["active"] : ""}><AdminPanelSettingsIcon /> New Role</NavLink></li>
                        </ul>
                    </li>

                    <li>
                        <h2>User</h2>
                        <ul className={classes['tab-content']}>
                            <li>
                                <button onClick={userLogoutHandler} className={classes['tab-btn']}><ExitToAppOutlinedIcon /> Logout</button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DashboardTabComponent;