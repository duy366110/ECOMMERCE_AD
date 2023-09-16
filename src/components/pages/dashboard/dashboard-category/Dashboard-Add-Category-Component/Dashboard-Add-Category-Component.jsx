import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useValidation from "../../../../../hook/use-validation";
import useHttp from "../../../../../hook/use-http";
import CommonButtonComponent from "../../../../common/Common-Button-Component/Common-Button-Component";
import CommonInputComponent from "../../../../common/Common-Input-Component/Common-Input-Component";
import classes from "./Dashboard-Add-Category-Component.module.css";

const DashboardAddCategoryComponent = (props) => {

    const navigate = useNavigate();

    const titleRef = useRef();
    const photosRef = useRef();

    const { httpMethod } = useHttp();
    const {value: titleValue, valid: titleValid, onBlur: titleBlur, onChange: titleChange} = useValidation(['require']);
    const {value: photosValue, valid: photosValid, onBlur: photosBlur, onChange: photosChange} = useValidation([]);

    // PHƯƠNG THỨC TẠO MỚI CATEGORY
    const newCategoryHandler = async (event) => {
        event.preventDefault();

        let titleInput = titleRef.current.input.current;
        titleInput.focus();
        titleInput.blur();

        let photosInput = photosRef.current.input.current;

        if(titleValid.status) {

            // TẠO FORM DATA
            let categoryForm = new FormData();
            categoryForm.append('title', titleValue);

            if(photosInput.files.length) {
                for(let file of photosInput.files) {
                    categoryForm.append('photos', file);
                }
            }

            httpMethod({
                url: 'http://localhost:5000/api/admin/category',
                method: 'POST',
                author: '',
                payload: categoryForm,
                customForm: true
            },
                (infor) => {
                let { status, message } = infor;

                if(status) {
                    navigate("/categorys");
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
                                change={titleChange} label="title category"
                                value={titleValue} valid={titleValid}/>
                        </div>

                        <div className="col-6">
                            <CommonInputComponent
                                ref={photosRef} type="file"
                                blur={photosBlur} change={photosChange}
                                label="Photo category" valid={photosValid} />
                        </div>
                        <div className="col-12">
                            <CommonButtonComponent kind="contained" title="New category"  type="submit"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DashboardAddCategoryComponent;