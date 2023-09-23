import React from "react";
import { useSelector } from "react-redux";
import classes from "./Common-Popup-Message-Component.module.css";

const CommonPopupMessageComponent = (props) => {
    const pupup = useSelector(state => state.popup);
    
    return (
        <div className={classes['popup-message-component']}>
            <p className={classes['popup-message-content']}>{pupup.message.content}</p>
        </div>
    )
}

export default CommonPopupMessageComponent;