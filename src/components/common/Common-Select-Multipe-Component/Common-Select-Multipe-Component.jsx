import React, { useRef, useImperativeHandle } from "react";
import classes from "./Common-Select-Multipe-Component.module.css";

const CommonSelectMultipeComponent = React.forwardRef((props) => {

    const selectRef = useRef();

    useImperativeHandle(ref, () => {
        return {
            select: selectRef
        }
    })

    return (
        <div className={classes['common-select-multipe-component']}>
            <label htmlFor={props.id}>{props.label}</label>
            <select
                multiple
                ref={selectRef}
                onBlur={props.blur}
                onChange={props.change}
                id={props.id}
                className={`form-control ${(props.valid?.status !== null && !props.valid?.status)? 'is-invalid' : ''}`}>

                <option value="DEFAULT">{props.valueDefaultOption}</option>
                {props.options.length > 0 && props.options.map((option) => {
                    return (
                        <option
                            key={option._id}
                            selected={option._id.toString() == props.value? true : false} value={option._id}>
                                {option.hasOwnProperty('name')? option.name : option.title}
                        </option>
                    )
                })}
            </select>
            {(props.valid?.status !== null && !props.valid?.status) && <small className={classes['input-message']}>{props.valid?.message}</small>}
        </div>
    )
})
export  default CommonSelectMultipeComponent;