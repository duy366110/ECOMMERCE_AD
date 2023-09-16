import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import config from "../../../../../configs/config.env";
import useHttp from "../../../../../hook/use-http";
import useValidation from "../../../../../hook/use-validation";
import CommonButtonComponent from "../../../../common/Common-Button-Component/Common-Button-Component";
import CommonInputComponent from "../../../../common/Common-Input-Component/Common-Input-Component";
import CommonSelectComponent from "../../../../common/Common-Select-Component/Common-Select-Component";
import CommonTextareaComponent from "../../../../common/Common-Textarea-Component/Common-Textarea-Component";
import classes from "./Dashboard-Add-Product-Component.module.css";

const DashboardAddProductComponent = (props) => {
    const navigate = useNavigate();
    const loader = useLoaderData();

    const nameRef = useRef();
    const priceRef = useRef();
    const imagesRef = useRef();
    const quantityRef = useRef();
    const categoryRef = useRef();
    const shortDesRef = useRef();
    const longDesRef = useRef();

    const { httpMethod } = useHttp();
    const {value: nameValue, valid: nameValid, onBlur: nameBlur, onChange: nameChange} = useValidation(['require']);
    const {value: priceValue, valid: priceValid, onBlur: priceBlur, onChange: priceChange} = useValidation(['require']);
    const {value: imagesValue, valid: imagesValid, onBlur: imagesBlur, onChange: imagesChange} = useValidation([]);
    const {value: quantityValue, valid: quantityValid, onBlur: quantityBlur, onChange: quantityChange} = useValidation(['require']);
    const {value: categoryValue, valid: categoryValid, onBlur: categoryBlur, onChange: categoryChange} = useValidation(['require']);
    const {value: shortDesValue, valid: shortDesValid, onBlur: shortDesBlur, onChange: shortDesChange} = useValidation([]);
    const {value: longDesValue, valid: longDesValid, onBlur: longDesBlur, onChange: longDesChange} = useValidation([]);

    const [categories, setCategories] = useState([]);
    
    // LOAD DANH MỤC CATEGORY
    useEffect(() => {
        console.log(loader);
        let { status, message, categories } = loader;
        if(status) {
            setCategories(categories);
        }

    }, [])

    // PHƯƠNG THỨC TẠO ROLE
    const createProductHandler = async (event) => {
        event.preventDefault();

        let nameInput = nameRef.current.input.current;
        nameInput.focus();
        nameInput.blur();

        let priceInput = priceRef.current.input.current;
        priceInput.focus();
        priceInput.blur();

        let quantityInput = quantityRef.current.input.current;
        quantityInput.focus();
        quantityInput.blur();

        let categorySelect = categoryRef.current.select.current;
        categorySelect.focus();
        categorySelect.blur();

        let imagesInput = imagesRef.current.input.current;

        if((nameValid.status && categoryValid.status) &&
        (priceValid.status && quantityValid.status)) {

            let productForm = new FormData();
            productForm.append('name', nameValue);
            productForm.append('price', priceValue);
            productForm.append('quantity', quantityValue);
            productForm.append('category', categoryValue);
            productForm.append('shortDes', shortDesValue);
            productForm.append('longDes', longDesValue);

            if(imagesInput.files.length) {
                for(let file of imagesInput.files) {
                    productForm.append('images', file);
                }
            }


            httpMethod({
                url: `${config.URI}admin/product`,
                method: 'POST',
                author: '',
                payload: productForm,
                customForm: true
            }, (infor) => {

                let { status, message } = infor;

                // TẠO PRODUCT THÀNH CÔNG REDIRECT VỀ PRODUCT PAGE
                if(status) {
                    navigate("/products");
                }
            })
        }

    }

    return (
        <div className="dashboard-container">
            <div className={classes['dashboard-add-component']}>
                <form onSubmit={createProductHandler}>
                    <div className="row">
                        <div className="col-6">
                            <CommonInputComponent
                                ref={nameRef} blur={nameBlur}
                                change={nameChange} label="Product name *"
                                value={nameValue} valid={nameValid}/>
                        </div>

                        <div className="col-6">
                            <CommonSelectComponent
                                label="Category *" options={categories} ref={categoryRef}
                                blur={categoryBlur} change={categoryChange}
                                valueDefaultOption={'Choose category...'}
                                value={categoryValue} valid={categoryValid} />
                        </div>

                        <div className="col-6">
                            <CommonInputComponent
                                type="number"
                                ref={priceRef} blur={priceBlur}
                                change={priceChange} label="Product price *"
                                value={priceValue} valid={priceValid}/>
                        </div>

                        <div className="col-6">
                            <CommonInputComponent
                                type="number"
                                ref={quantityRef} blur={quantityBlur}
                                change={quantityChange} label="Product quantity *"
                                value={quantityValue} valid={quantityValid}/>
                        </div>

                        <div className="col-12">
                            <CommonTextareaComponent
                                ref={shortDesRef} blur={shortDesBlur}
                                change={shortDesChange} label="Product short description"
                                value={shortDesValue} valid={shortDesValid}/>
                        </div>

                        <div className="col-12">
                            <CommonTextareaComponent
                                ref={longDesRef} blur={longDesBlur}
                                change={longDesChange} label="Product long description"
                                value={longDesValue} valid={longDesValid}/>
                        </div>

                        <div className="col-6">
                            <CommonInputComponent
                                ref={imagesRef} type="file"
                                blur={imagesBlur} change={imagesChange}
                                label="Images" valid={imagesValid} />
                        </div>

                    </div>

                    <div>
                        <CommonButtonComponent kind="contained" title="New product"  type="submit"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DashboardAddProductComponent;

// LOADER DANH MỤCA CATEGORIES
export const loader = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let res = await fetch(`${config.URI}admin/category`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ''
                }
            })

            if(!res.ok) {
                let infor = await res.json();
                throw Error(infor.message);
            }

            resolve(await res.json());

        } catch (error) {
            reject(error);
        }
    })
}