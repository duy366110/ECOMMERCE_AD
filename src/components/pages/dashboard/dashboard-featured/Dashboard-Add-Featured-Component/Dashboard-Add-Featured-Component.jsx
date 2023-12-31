import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../../../../configs/config.env";
import useValidation from "../../../../../hook/use-validation";
import useHttp from "../../../../../hook/use-http";
import CommonButtonComponent from "../../../../common/Common-Button-Component/Common-Button-Component";
import CommonInputComponent from "../../../../common/Common-Input-Component/Common-Input-Component";
import classes from "./Dashboard-Add-Featured-Component.module.css";

const DashboardAddFeaturedComponent = (props) => {

    const navigate = useNavigate();

    const titleRef = useRef();
    const desRef = useRef();
    const colorRef = useRef();
    const photosRef = useRef();

    const { httpMethod } = useHttp();
    const {value: titleValue, valid: titleValid, onBlur: titleBlur, onChange: titleChange} = useValidation(['require']);
    const {value: desValue, valid: desValid, onBlur: desBlur, onChange: desChange} = useValidation([]);
    const {value: colorValue, valid: colorValid, onBlur: colorBlur, onChange: colorChange} = useValidation([]);
    const {valid: photosValid, onBlur: photosBlur, onChange: photosChange} = useValidation([]);

    // PHƯƠNG THỨC TẠO MỚI CATEGORY
    const newCategoryHandler = async (event) => {
        event.preventDefault();

        let titleInput = titleRef.current.input.current;
        titleInput.focus();
        titleInput.blur();

        let photosInput = photosRef.current.input.current;

        if(titleValid.status) {

            // TẠO FORM DATA
            let featuredForm = new FormData();
            featuredForm.append('title', titleValue);
            featuredForm.append('des', desValue);
            featuredForm.append('color', colorValue);

            if(photosInput.files.length) {
                for(let file of photosInput.files) {
                    featuredForm.append('photos', file);
                }
            }

            httpMethod({
                url: `${config.URI}/api/admin/featured`,
                method: 'POST',
                author: '',
                payload: featuredForm,
                customForm: true
            },
                (infor) => {
                let { status } = infor;

                if(status) {
                    navigate("/featured");
                }
            })
        }
    }

    return (
        <div className="dashboard-container">
            <div className={classes['dashboard-add-cattegory-component']}>
                <form onSubmit={newCategoryHandler}>
                    <div className="row">
                        <div className="col-6">
                            <CommonInputComponent
                                ref={titleRef} blur={titleBlur}
                                change={titleChange} label="title featured"
                                value={titleValue} valid={titleValid}/>
                        </div>

                        <div className="col-6">
                            <CommonInputComponent
                                ref={desRef} blur={desBlur}
                                change={desChange} label="Featured description"
                                value={desValue} valid={desValid}/>
                        </div>

                        <div className="col-6">
                            <CommonInputComponent
                                ref={colorRef} blur={colorBlur}
                                change={colorChange} label="Featured color"
                                value={colorValue} valid={colorValid}/>
                        </div>

                        <div className="col-12">
                            <CommonInputComponent
                                ref={photosRef} type="file"
                                blur={photosBlur} change={photosChange}
                                label="Photo featured" valid={photosValid} />
                        </div>
                        <div className="col-12">
                            <CommonButtonComponent kind="contained" title="New featured"  type="submit"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DashboardAddFeaturedComponent;