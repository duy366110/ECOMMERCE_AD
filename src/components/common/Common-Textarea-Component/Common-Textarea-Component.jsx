import React, { useRef, useImperativeHandle } from "react";
import classes from "./Common-Textarea-Component.module.css";

const CommonTextareaComponent = React.forwardRef((props, ref) => {
    const textareaRef = useRef();

    useImperativeHandle(ref, () => {
        return {
            textarea: textareaRef
        }
    })


    return (
        <div className={classes['common-textarea-component']}>
            <div className="form-group">
                <label htmlFor={props.id}>{props.label}</label>
                <textarea
                    onBlur={props.blur}
                    onChange={props.change}
                    ref={textareaRef}
                    className={`form-control ${(props.valid?.status !== null && !props.valid?.status)? 'is-invalid' : ''}`}
                    id={props.id} rows="5" value={props.value} />
                {(props.valid?.status !== null && !props.valid?.status) && <small className={classes['textarea-message']}>{props.valid?.message}</small>}
            </div>
        </div>
    )
})

export default CommonTextareaComponent;