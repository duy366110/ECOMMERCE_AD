import React from "react";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CommonCardResumeComponent from "../../../../common/Common-Card-Resume-Component/Common-Card-Resume-Component";
import classes from "./Dashboard-Resume-Component.module.css";

const DashboardResumeComponent = (props) => {

    return (
        <div className={classes['dashboard-resume-component']}>
            <CommonCardResumeComponent title='Clients' value={props?.client} currency={false}>
                <span className={`${classes['icons']} ${classes['icon-users']}`}>
                    <PersonAddAltOutlinedIcon />
                </span>
            </CommonCardResumeComponent>

            <CommonCardResumeComponent title='Earning of Month' value={Number(props?.totalOrder).toFixed(6).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} currency={true}>
                <span className={`${classes['icons']} ${classes['icon-orders']}`}>
                    <AttachMoneyOutlinedIcon />
                </span>
            </CommonCardResumeComponent>

            <CommonCardResumeComponent title='New order' value={props?.order} currency={false}>
                <span className={`${classes['icons']} ${classes['icon-earnings']}`}>
                    <NoteAddOutlinedIcon />
                </span>
            </CommonCardResumeComponent>
        </div>
    )
}

export default DashboardResumeComponent;