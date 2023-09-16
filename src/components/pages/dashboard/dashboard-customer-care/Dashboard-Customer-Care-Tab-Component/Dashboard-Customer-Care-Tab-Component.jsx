import React from "react";
import { useSelector } from "react-redux";
import classes from "./Dashboard-Customer-Care-Tab-Component.module.css";

const ROLE_ACCOUNT_NOT_CHOOSE = ['Admin', 'Counselors']

const DashboardCustomerCareTabComponent = (props) => {
    const socketSlice = useSelector((state) => state.socket);
    const auth = useSelector((state) => state.auth);

    // ADMIN THỰC HIỆN CHON USER SUPPORT
    const chooseUserSupportHandler = (event) => {
        let { id } = event.target.closest('#user-item').dataset;
        let userOnline = localStorage.getItem('usersOnline');

        if(id) {
            userOnline = JSON.parse(userOnline);
            let online = userOnline.find((online) => online._id === id);

            if(!ROLE_ACCOUNT_NOT_CHOOSE.some((role) => role === online.user.role.name) && !online.current_care) {
                socketSlice.socket.emit('admin-choose-user-support', {customer_care: id, token: auth.token});

            } else {
                alert('Customers have been suported');
            }
        }
    }

    console.log(props.usersOnline);

    return (
        <div className={classes['dashboard-customer-care-tab-component']}>
            <div className={classes['search-user-online']}>
                <input type="search" placeholder="Search contact" />
            </div>

            <ul>
                {props.usersOnline.length > 0 && props.usersOnline.map((userOnlie, index) => {
                    return (
                        <li onClick={chooseUserSupportHandler} key={userOnlie._id} id="user-item" data-id={userOnlie._id} className={`${userOnlie.current_care? classes.active : ''}`}>
                            <h2 className={`${classes['user-online-name']} ${userOnlie.status_new_message? classes['active'] : ''} `}>
                                <img src="/assets/images/client-blank.png" alt="client" />
                                <div className={classes['user-online-information']}>
                                    <p>{userOnlie.user.fullname}</p>
                                    <span>{userOnlie.user.role.name}</span>
                                </div>
                            </h2>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default DashboardCustomerCareTabComponent;