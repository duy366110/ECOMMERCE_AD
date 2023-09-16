import React from "react";
import Button from '@mui/material/Button';
import classes from "./Common-Button-Component.module.css";

const CommonButtonComponent = (props) => {

    return (
        <>
            {props.kind === 'outline-success' && (
                <div className={classes['button-component']}>
                    <Button
                        onClick={props.click}
                        data-id={props.id}
                        type={props.type}
                        className={classes['btn-outline-success']}
                        variant="outlined">{props.title}</Button>
                </div>
            )}

            {props.kind === 'contained' && (
                <div className={classes['button-component']}>
                    <Button
                        onClick={props.click}
                        data-id={props.id}
                        type={props.type}
                        className={classes['btn-contaned-primary']}
                        variant="contained">{props.title}</Button>
                </div>
            )}
        </>
    )
}

export default CommonButtonComponent;