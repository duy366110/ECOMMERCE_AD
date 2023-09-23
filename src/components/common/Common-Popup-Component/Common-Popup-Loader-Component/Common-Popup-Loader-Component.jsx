import classes from "./Common-Popup-Loader-Component.module.css";

const CommonPopupLoaderComponent = (props) => {
    return (
        <div className={classes['common-popup-loader-component']}>
            <div className={`spinner-border ${classes['spinner-border-custom']}`} role="status">
                {/* <span className="sr-only">Loading...</span> */}
            </div>
        </div>
    )
}

export default CommonPopupLoaderComponent;