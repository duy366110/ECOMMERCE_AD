import React, { useState, useEffect } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import config from "../../../../configs/config.env";
import { updateElementToTalFeatured, updateCurrentPageFeatured } from "../../../../store/store-pagination";
import useHttp from "../../../../hook/use-http";
import CommonButtonComponent from "../../../common/Common-Button-Component/Common-Button-Component";
import CommonTableComponent from "../../../common/Common-Table-Component/Common-Table-Component";
import CommonPaginationComponent from "../../../common/Common-Pagination-Component/Common-Pagination-Component";
import classes from "./Dashboard-Featured-Component.module.css";

const HeadTable = ['STT', 'Title', 'Action'];

const DashboardFeaturedComponent = (props) => {
    const navigate = useNavigate();
    const loader = useLoaderData();
    const dispatch = useDispatch();
    const pagination = useSelector(state => state.pagination);

    const [reload, setReload] = useState(false);
    const [featureds, setFeatureds] = useState([]);
    const { httpMethod } = useHttp();

    // PHƯƠNG THỨC LOAD FEATURED
    const loadFeaturedHandler = async() => {
        httpMethod({
            url: `${config.URI}/api/admin/featured/${pagination.category.elementOfPage}/${(pagination.category.elementOfPage * pagination.category.currentPage)}`,
            method: 'GET',
            author: '',
            payload: null,
            customForm: false
        }, (infor) => {
            let { status, featureds } = infor;
            setFeatureds(status? featureds : []);
        })
    }

    // PHƯƠNG THỨC LOAD VÀ CẬP NHẬT KHI PHÂN TRANG VÀ LẦN ĐẦU LOADER
    useEffect(() => {
        let { status, amount} = loader;
        if(status) {
            dispatch(updateElementToTalFeatured({amount}));
            loadFeaturedHandler();
        }

    }, [reload, pagination.featured.currentPage])

    // REDIRECT ĐẾN TRANG THÊM MỚI FEATURED
    const navigateNewFeatured = (event) => {
        navigate("/new-featured");
    }

    // REDIRECT ĐẾN TRANG CHỈNH SỬA FEATURED
    const editFeaturedHandler = (event) => {
        // let { id } = event.target.dataset;
        // navigate(`/edit-category/${id}`);
    }

    // PHƯƠNG THỨC XOÁ FEATURED
    const deleteFeaturedHandler = (event) => {
        setReload(!reload);
        // let { id } = event.target.dataset;

        // if(id && window.confirm("Are you sure delete category")) {;
        //     httpMethod({
        //         url: `${config.URI}/api/admin/category`,
        //         method: 'DELETE',
        //         author: '',
        //         payload: JSON.stringify({category: id}),
        //         customForm: false
        //     }, (infor) => {
        //         let { status, message } = infor;

        //         if(status) {
        //             setReload(!reload);
        //         }
        //     })
        // }
    }

    // SET SỰ KIỆN RENDER INFOR KHI LICK VÀO THANH PAGINATION
    const paginationHandler = (event) => {
        let { pagi } = event.target.closest("#btn-pagi").dataset;
        dispatch(updateCurrentPageFeatured({page: pagi}));
    }

    return (
        <div className="dashboard-container">
            <div className={classes['dashboard-category-component']}>
                <div className='dashboard-header'>
                    <h2 className='header__title'>Featured information</h2>
                    <CommonButtonComponent click={navigateNewFeatured} kind="outline-success" title="New featured"  type="button"/>
                </div>

                {featureds.length > 0 && (
                    <CommonTableComponent
                        edit={editFeaturedHandler}
                        delete={deleteFeaturedHandler}
                        head={HeadTable}
                        list={featureds} type="featured"/>
                )}

                {featureds.length === 0 && (<h2 className="blank">Not found featureds</h2>)}

                <CommonPaginationComponent
                    click={paginationHandler}
                    items={ Array.from({length: pagination.featured.elemtItemsPagination}, (elm, index) => index)} />
            </div>
        </div>
    )
}
export default DashboardFeaturedComponent;

export const loader = () => {
    return new Promise( async(resolve, reject) => {
        try {

            // GỬI REQUEST LẤY SỐ LƯỢNG FEATURED HIỆN CÓ
            let res = await fetch(`${config.URI}/api/admin/featured/amount`, {
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