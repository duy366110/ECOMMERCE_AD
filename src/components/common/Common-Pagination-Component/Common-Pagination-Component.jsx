import React from "react";
import { useSelector } from "react-redux";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import classes from "./Common-Pagination-Component.module.css";

const CommonPaginationComponent = (props) => {

    return (
        <div>
            {props.items.length > 1 && (
                <div className={classes['common-pagination-component']}>
                    <div className={classes['pagination-wrapper']}>
                        <button className={`${classes['btn']} ${classes['btn-previous']}`} id="btn-pagi" onClick={props.click} data-pagi="previous">
                            <NavigateBeforeIcon />
                        </button>

                        <ul>
                            {props.items.map((elm, index) => {
                                return (
                                    <li key={index}>
                                        <button
                                            className={`${classes['btn']}
                                            ${classes['btn-item']}`} id="btn-pagi"
                                            onClick={props.click} data-pagi={index}>

                                            {index + 1}
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>

                        <button className={`${classes['btn']} ${classes['btn-next']}`} id="btn-pagi" onClick={props.click} data-pagi="next">
                            <NavigateNextIcon />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CommonPaginationComponent;