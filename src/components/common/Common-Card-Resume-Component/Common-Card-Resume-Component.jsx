import React from "react";
import classes from "./Common-Card-Resume-Component.module.css";

const CommonCardResumeComponent = (props) => {

    return (
        <div className={classes['card-resume-component']}>
            <div>
                <h2 className={classes['card-resume__value']}>
                    {props.value} {props.currency && <sup>VND</sup> }
                </h2>
                <h2 className={classes['card-resume__title']}>{props.title}</h2>
            </div>
            <p className={classes['card-resume__icon']}>{props.children}</p>
        </div>
    )
}

export default CommonCardResumeComponent;