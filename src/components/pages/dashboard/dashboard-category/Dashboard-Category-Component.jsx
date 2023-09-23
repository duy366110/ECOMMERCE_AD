import React, { useState, useEffect } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import config from "../../../../configs/config.env";
import { updateElementToTalCategory, updateCurrentPageCategory } from "../../../../store/store-pagination";
import useHttp from "../../../../hook/use-http";
import CommonButtonComponent from "../../../common/Common-Button-Component/Common-Button-Component";
import CommonTableComponent from "../../../common/Common-Table-Component/Common-Table-Component";
import CommonPaginationComponent from "../../../common/Common-Pagination-Component/Common-Pagination-Component";
import classes from "./Dashboard-Category-Component.module.css";

const HeadTable = ['STT', 'Title', 'Product', 'Action'];

const DashboardCategoryComponent = (props) => {
    const navigate = useNavigate();
    const loader = useLoaderData();
    const dispatch = useDispatch();
    const pagination = useSelector(state => state.pagination);

    const [reload, setReload] = useState(false);
    const [categories, setCategories] = useState([]);
    const { httpMethod } = useHttp();

    // PHƯƠNG THỨC LOAD CATEGORY
    const loadCategoryHandler = async() => {
        httpMethod({
            url: `${config.URI}/api/admin/category/${pagination.category.elementOfPage}/${(pagination.category.elementOfPage * pagination.category.currentPage)}`,
            method: 'GET',
            author: '',
            payload: null,
            customForm: false
        }, (infor) => {
            let { status, message, categories } = infor;
            setCategories(categories);
        })
    }

    // PHƯƠNG THỨC LOAD VÀ CẬP NHẬT KHI PHÂN TRANG VÀ LẦN ĐẦU LOADER
    useEffect(() => {
        let { status, messahe, amount} = loader;
        dispatch(updateElementToTalCategory({amount}));
        loadCategoryHandler();

    }, [reload, pagination.category.currentPage])

    // REDIRECT ĐÉN TRANG THÊM MỚI CATEGORY
    const navigateNewCategory = (event) => {
        navigate("/new-category");
    }

    // REDIRECT ĐẾN TRANG CHỈNH SỬA CATEGORY
    const editCategoryHandler = (event) => {
        let { id } = event.target.dataset;
        navigate(`/edit-category/${id}`);
    }

    // PHƯƠNG THỨC XOÁ CATEGORY
    const deleteCategoryHandler = (event) => {
        let { id } = event.target.dataset;

        if(id && window.confirm("Are you sure delete category")) {;
            httpMethod({
                url: `${config.URI}/api/admin/category`,
                method: 'DELETE',
                author: '',
                payload: JSON.stringify({category: id}),
                customForm: false
            }, (infor) => {
                let { status, message } = infor;

                if(status) {
                    setReload(!reload);
                }
            })
        }
    }

    // SET SỰ KIỆN RENDER INFOR KHI LICK VÀO THANH PAGINATION
    const paginationHandler = (event) => {
        let { pagi } = event.target.closest("#btn-pagi").dataset;
        dispatch(updateCurrentPageCategory({page: pagi}));
    }

    return (
        <div className="dashboard-container">
            <div className={classes['dashboard-category-component']}>
                <div className='dashboard-header'>
                    <h2 className='header__title'>Categories information</h2>
                    <CommonButtonComponent click={navigateNewCategory} kind="outline-success" title="New category"  type="button"/>
                </div>

                {categories.length > 0 && (
                    <CommonTableComponent edit={editCategoryHandler} delete={deleteCategoryHandler} head={HeadTable} list={categories} type="category"/>
                )}

                {categories.length == 0 && (<h2 className="blank">Not found categories</h2>)}

                <CommonPaginationComponent
                    click={paginationHandler}
                    items={ Array.from({length: pagination.category.elemtItemsPagination}, (elm, index) => index)} />
            </div>
        </div>
    )
}
export default DashboardCategoryComponent;

export const loader = () => {
    return new Promise( async(resolve, reject) => {
        try {

            // GỬI REQUEST LẤY SỐ LƯỢNG CATEGORY HIỆN CÓ TRONG DB
            let res = await fetch(`${config.URI}/api/admin/category/amount`, {
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
            reject(error.message);
        }
    })
}