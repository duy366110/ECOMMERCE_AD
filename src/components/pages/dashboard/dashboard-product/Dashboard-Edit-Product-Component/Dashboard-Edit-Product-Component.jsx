import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLoaderData } from 'react-router-dom';
import config from "../../../../../configs/config.env";
import useValidation from '../../../../../hook/use-validation';
import useHttp from '../../../../../hook/use-http';
import CommonButtonComponent from '../../../../common/Common-Button-Component/Common-Button-Component';
import CommonInputComponent from '../../../../common/Common-Input-Component/Common-Input-Component';
import CommonSelectComponent from '../../../../common/Common-Select-Component/Common-Select-Component';
import CommonTextareaComponent from '../../../../common/Common-Textarea-Component/Common-Textarea-Component';
import CommonCatalogyImageComponent from '../../../../common/Common-Catalogy-Image-Component/Common-Catalogy-Image-Component';
import classes from "./Dashboard-Edit-Product-Component.module.css";

const DashboardEditProductComponent = (props) => {
    const loader = useLoaderData();
    const navigate = useNavigate();
    const params = useParams();
    
    const nameRef = useRef();
    const priceRef = useRef();
    const photosRef = useRef();
    const quantityRef = useRef();
    const categoryRef = useRef();
    const shortDesRef = useRef();
    const longDesRef = useRef();

    const { httpMethod } = useHttp();
    const {defaultValue: nameDef, value: nameValue, valid: nameValid, onBlur: nameBlur, onChange: nameChange} = useValidation(['require']);
    const {defaultValue: priceDef, value: priceValue, valid: priceValid, onBlur: priceBlur, onChange: priceChange} = useValidation(['require']);
    const {valid: photosValid, onBlur: photosBlur, onChange: photosChange} = useValidation([]);
    const {defaultValue: quantityDef, value: quantityValue, valid: quantityValid, onBlur: quantityBlur, onChange: quantityChange} = useValidation(['require']);
    const {defaultValue: categoryDef, value: categoryValue, valid: categoryValid, onBlur: categoryBlur, onChange: categoryChange} = useValidation(['require']);
    const {defaultValue: shortDesDef, value: shortDesValue, valid: shortDesValid, onBlur: shortDesBlur, onChange: shortDesChange} = useValidation([]);
    const {defaultValue: longDesDef, value: longDesValue, valid: longDesValid, onBlur: longDesBlur, onChange: longDesChange} = useValidation([]);

    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // THỰC HIỆN LOAD GIÁ TRỊ HIỆN BIND THÔNG TIN
        let { status, product, categories } = loader;
        if(status) {
            setProduct(product);
            setCategories(categories);

            nameDef(product.name);
            priceDef(product.price.$numberDecimal);
            quantityDef(product.quantity);
            categoryDef(product.category._id);
            shortDesDef(product.shortDes);
            longDesDef(product.longDes);

        }
    }, [
        loader,
        nameDef,
        priceDef,
        quantityDef,
        categoryDef,
        shortDesDef,
        longDesDef,
    ])

    // PHƯƠNG THỨC EDIT PRODUCT
    const editProductHandler = async (event) => {
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

        let photosInput = photosRef.current.input.current;

        if(params.product && (nameValid.status && categoryValid.status) &&
        (priceValid.status && quantityValid.status)) {

            let productForm = new FormData();
            productForm.append('product', params.product);
            productForm.append('name', nameValue);
            productForm.append('price', priceValue);
            productForm.append('quantity', quantityValue);
            productForm.append('category', categoryValue);
            productForm.append('shortDes', shortDesValue);
            productForm.append('longDes', longDesValue);

            if(photosInput.files.length) {
                for(let file of photosInput.files) {
                    productForm.append('photos', file);
                }
            }

            httpMethod({
                url: `${config.URI}/api/admin/product`,
                method: 'PATCH',
                author: '',
                payload: productForm,
                customForm: true
            }, (infor) => {
                let { status } = infor;
                if(status) {
                    navigate("/products");
                }
            })

        }
    }

    return (
        <div className="dashboard-container">
            <div className={classes['dashboard-edit-role-component']}>
            <form onSubmit={editProductHandler}>
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
                                change={shortDesChange} label="Product shortDes"
                                value={shortDesValue} valid={shortDesValid}/>
                        </div>

                        <div className="col-12">
                            <CommonTextareaComponent
                                ref={longDesRef} blur={longDesBlur}
                                change={longDesChange} label="Product longDes"
                                value={longDesValue} valid={longDesValid}/>
                        </div>

                        <div className="col-6">
                            <CommonInputComponent
                                ref={photosRef} type="file"
                                blur={photosBlur} change={photosChange}
                                label="photos" valid={photosValid} />
                        </div>
                    </div>

                    <div>
                        <CommonButtonComponent kind="contained" title="Edit product"  type="submit"/>
                    </div>
                </form>

                {product && product?.images.length > 0 && (
                    <CommonCatalogyImageComponent
                        id={product._id}
                        endpoint="product"
                        thumbnails={product.images} />
                )}
            </div>
        </div>
    )
}

export default DashboardEditProductComponent;

// LOADER THÔNG TIN ROLE CHỈNH SỬA
const loaderCategory = (request, params) => {
    return new Promise( async(resolve, reject) => {
        try {

            let res = await fetch(`${config.URI}/api/admin/category`);
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

// LOADER THÔNG TIN ROLE CHỈNH SỬA
const loaderProduct = (product) => {
    return new Promise( async(resolve, reject) => {
        try {

            let res = await fetch(`${config.URI}/api/admin/product/${product}`);
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

// LOADER THÔNG TIN ROLE CHỈNH SỬA
export const loader = (request, params) => {
    return new Promise( async(resolve, reject) => {
        try {

            let data = await Promise.all([loaderProduct(params.product), loaderCategory()]);
            let [{product}, {categories}] = data;
            resolve({ status: true , product, categories });

        } catch (error) {
            reject(error);
        }
    })
}