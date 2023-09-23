import React, { useEffect, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import config from "../../../../configs/config.env";
import useHttp from "../../../../hook/use-http";
import { updateElementToTalProduct, updateCurrentPageProduct } from "../../../../store/store-pagination";
import CommonButtonComponent from "../../../common/Common-Button-Component/Common-Button-Component";
import CommonTableComponent from "../../../common/Common-Table-Component/Common-Table-Component";
import CommonPaginationComponent from "../../../common/Common-Pagination-Component/Common-Pagination-Component";
import classes from "./Dashboard-Product-Component.module.css";

const HeadTable = ['STT', 'Name', 'Price', 'Image', 'Category', 'Quantity', 'Cart/Order', 'Action'];

const DashboardProductComponent = (props) => {
    const navigate = useNavigate();
    const loader = useLoaderData();

    const dispatch = useDispatch();
    const pagination = useSelector(state => state.pagination);

    const { httpMethod } = useHttp();
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    // LẤY THÔNG TIN VÀ CẬP NHẬT ROLE
    const getProducts = async () => {
        let { status, message, amount } = loader;

        if(status) {
            dispatch(updateElementToTalProduct({amount}));

            httpMethod({
                url: `${config.URI}/api/admin/product/${pagination.product.elementOfPage}/${(pagination.product.elementOfPage * pagination.product.currentPage)}`,
                method: 'GET',
                author: '',
                payload: null
            }, (infor) => {
                let { status, message, products } = infor;
                if(status) {
                    console.log(products);
                    setProducts(products);
                    
                }
            })
        }
    }

    // LOADER THÔNG TIN PRODUCT
    useEffect(() => {
        getProducts();
    }, [reload, pagination.product.currentPage])

    // SET SỰ KIỆN RENDER INFOR KHI LICK VÀO THANH PAGINATION
    const paginationHandler = (event) => {
        let { pagi } = event.target.closest("#btn-pagi").dataset;
        dispatch(updateCurrentPageProduct({page: pagi}));
    }

    // CHUYỂN HƯỚNG ĐẾN TRANG THÊM MỚI PRODUCT
    const navigateNewRole = (event) => {
        navigate("/new-product");
    }

    // CHUYỂN HƯỚNG ĐẾN TRANG EDIT
    const editProductHandler = (event) => {
        let { id } = event.target.dataset;
        navigate(`/edit-product/${id}`);
    }

    // PHƯƠNG THỨC XOÁ PRODUCT - ADMIN
    const deleteProductHandler = async (event) => {
        let { id } = event.target.dataset;

        if(window.confirm('Are you sure delete product!')) {
            httpMethod({
                url: `${config.URI}/api/admin/product`,
                method: 'DELETE',
                author: '',
                payload: JSON.stringify({product: id})
            }, (infor) => {
                let { status, message } = infor;

                if(status) {
                    setReload(!reload);
                }
            })
        }
    }

    return (
        <div className="dashboard-container">
            <div className={classes['dashboard-product-component']}>
                <div className='dashboard-header'>
                    <h2 className='header__title'>Products information</h2>
                    <CommonButtonComponent click={navigateNewRole} kind="outline-success" title="New product"  type="button"/>
                </div>

                {products.length > 0 && (
                    <CommonTableComponent edit={editProductHandler} delete={deleteProductHandler} head={HeadTable} list={products} type="product"/>
                )}

                {products.length == 0 && (<h2 className="blank">Not found product</h2>)}

                <CommonPaginationComponent
                    click={paginationHandler}
                    items={ Array.from({length: pagination.product.elemtItemsPagination}, (elm, index) => index)} />
            </div>
        </div>
    )
}

export default DashboardProductComponent;

// LOADER SỐ LƯỢNG PRODUCT LÀM PHÂM TRANG
export const loader = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let res = await fetch(`${config.URI}/api/admin/product/amount`, {
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