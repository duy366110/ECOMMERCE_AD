import React, { useImperativeHandle, useRef } from "react";
import classes from "./Common-Input-Component.module.css";

const CommonInputComponent = React.forwardRef((props, ref) => {

    const inputRef = useRef();

    useImperativeHandle(ref, () => {
        return {
            input: inputRef
        }
    })


    return (
        <div className={classes['common-input-component']}>
            <div className="form-group mb-0">
                <label htmlFor={props.id}>{props.label}</label>
                <input
                    onBlur={props.blur}
                    onChange={props.change}
                    className={`form-control ${(props.valid?.status !== null && !props.valid?.status)? 'is-invalid' : ''}`}
                    id={props.id}
                    ref={inputRef}
                    type={props.type? props.type : 'text'}
                    value={props.value}
                    multiple="multiple"/>
            </div>
            {(props.valid?.status !== null && !props.valid?.status) && <small className={classes['input-message']}>{props.valid?.message}</small>}
        </div>
    )
})

export default CommonInputComponent;