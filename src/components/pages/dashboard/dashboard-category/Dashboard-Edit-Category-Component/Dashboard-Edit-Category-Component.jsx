import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLoaderData, useParams } from "react-router-dom";
import useValidation from "../../../../../hook/use-validation";
import useHttp from "../../../../../hook/use-http";
import CommonCatalogyImageComponent from "../../../../common/Common-Catalogy-Image-Component/Common-Catalogy-Image-Component";
import CommonInputComponent from "../../../../common/Common-Input-Component/Common-Input-Component";
import CommonButtonComponent from "../../../../common/Common-Button-Component/Common-Button-Component";
import classes from "./Dashboard-Edit-Category-Component.module.css";

const DashboardEditCategoryComponent = (props) => {
    const navigate = useNavigate();
    const loader = useLoaderData();
    const params = useParams();
    const titleRef = useRef();
    const photosRef = useRef();

    // const [images, setImages] = useState([]);
    const [category, setCategory] = useState(null);

    const { httpMethod } = useHttp();
    const {defaultValue: titleDefaultVal, value: titleValue, valid: titleValid, onBlur: titleBlur, onChange: titleChange} = useValidation(['require']);
    const {value: photosValue, valid: photosValid, onBlur: photosBlur, onChange: photosChange} = useValidation([]);


    // PHƯƠNG THỨC CHẠY LOADER CATEGORY
    useEffect(() => {
        // THỰC HIỆN LOAD GIÁ TRỊ HIỆN CÓ CỦA CATEGORY
        let { status, message, category } = loader;

        if(status) {
            setCategory(category);
            titleDefaultVal(category.title);
        }
    }, [])

    // PHƯƠNG THỨC CẬP NHẬT THÔNG TIN CATEGORY
    const editCategoryHandler = (event) => {
        event.preventDefault();

        let titleInput = titleRef.current.input.current;
        titleInput.focus();
        titleInput.blur();

        let photosInput = photosRef.current.input.current;

        if(titleValid.status) {

            // TẠO FORM DATA
            let categoryForm = new FormData();
            categoryForm.append('title', titleValue);
            categoryForm.append('category', params.category);

            if(photosInput.files.length) {
                for(let file of photosInput.files) {
                    categoryForm.append('photos', file);
                }
            }

            httpMethod({
                url: 'http://localhost:5000/api/admin/category',
                method: 'PATCH',
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
            <div className={classes['dashboard-add-location-component']}>
                <form onSubmit={editCategoryHandler}>
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
                                label="Images" valid={photosValid} />
                        </div>

                        {category && category?.images.length > 0 && (
                            <div className="col-12">
                                <CommonCatalogyImageComponent images={category?.images} endpoint="category" id={category._id} />
                            </div>
                        )}

                        <div className="col-12">
                            <CommonButtonComponent kind="contained" title="Update category"  type="submit"/>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default DashboardEditCategoryComponent;

// LOAD THÔNG CATEGORY TRƯỚC KHI CẬP NHẬT
export const loader = (request, params) => {
    return new Promise(async(resolve, reject) => {
        try {
            let { category } = params;
            let res = await fetch(`http://localhost:5000/api/admin/category/${category}`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": ''
                }
            })

            if(!res.ok) {
                let infor = await res.json();
                throw Error(infor.message);
            }

            resolve(await res.json());

        } catch (error) {
            reject({status: false, message: error.message});
        }
    })
}