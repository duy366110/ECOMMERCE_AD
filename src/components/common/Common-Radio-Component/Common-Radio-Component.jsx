import React from "react";
import classes from "./Common-Radio-Component.module.css";

const CommonRadioComponent = (props) => {

    return (
        <div className={classes["common-radio-component"]}>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                <label class="form-check-label" htmlFor="exampleRadios1">Default radio</label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option2" />
                <label class="form-check-label" htmlFor="exampleRadios1">Default radio</label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option3" />
                <label class="form-check-label" htmlFor="exampleRadios1">Default radio</label>
            </div>
        </div>
    )
}

export default CommonRadioComponent;