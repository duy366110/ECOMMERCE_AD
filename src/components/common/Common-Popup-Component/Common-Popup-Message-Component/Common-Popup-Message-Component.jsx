import React from "react";
import { useSelector } from "react-redux";
import classes from "./Common-Popup-Message-Component.module.css";

const CommonPopupMessageComponent = (props) => {
    const pupupState = useSelector(state => state.popup);
    
    return (
        <div className={`${classes['popup-message-component']} ${pupupState.message.status? '' : 'd-none'}`}>
            <p className={classes['popup-message-content']}>{pupupState.message.content}</p>
        </div>
    )
}

export default CommonPopupMessageComponent;