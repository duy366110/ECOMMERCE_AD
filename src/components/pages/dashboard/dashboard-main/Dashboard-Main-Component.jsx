import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";
import config from "../../../../configs/config.env";
import useHttp from "../../../../hook/use-http";
import { updateElementToTalOrder, updateCurrentPageOrder } from "../../../../store/store-pagination";
import DashboardResumeComponent from "../utils/Dashboard-Resume-Component/Dashboard-Resume-Component";
import CommonTableComponent from "../../../common/Common-Table-Component/Common-Table-Component";
import CommonPaginationComponent from "../../../common/Common-Pagination-Component/Common-Pagination-Component";
import classes from "./Dashboard-Main-Component.module.css";

const HeadTable = ['STT', 'Name', 'Email', 'Phone', 'Address', 'Total', 'Delivery', 'Status', 'Detail'];

const DashboardMainComponent = (props) => {
    const loader = useLoaderData();
    const dispatch = useDispatch();
    const pagination = useSelector(state => state.pagination);

    const [ amoutUser, setAmountUser] = useState(0);
    const [orders, setOrders] = useState([]);
    const [resumTotalOrder, setResumTotalOrder] = useState(0);
    const { httpMethod } = useHttp();

    // PHƯƠNG THỨC LOAD ORDER
    const loadOrderHandler = async() => {
        httpMethod({
            url: `${config.URI}/api/admin/order/${pagination.order.elementOfPage}/${(pagination.order.elementOfPage * pagination.order.currentPage)}`,
            method: 'GET',
            author: '',
            payload: null,
            customForm: false
        }, (infor) => {
            let { status, orders } = infor;

            if(status) {                

                for(let orderItem of orders) {
                    orderItem.total = orderItem?.order.reduce((acc, orderProduct) => {
                        acc += Number(orderProduct.product?.price.$numberDecimal) * Number(orderProduct?.quantity);
                        return acc;
                    }, 0);

                    setResumTotalOrder((state) => state + orderItem.total);
                }
                setOrders(orders);
            }
        })
    }

    // PHƯƠNG THỨC LOAD VÀ CẬP NHẬT KHI PHÂN TRANG VÀ LẦN ĐẦU LOADER
    useEffect(() => {
        let { status, amounUser, amountOrder} = loader;
        if(status) {
            setAmountUser(amounUser);
            dispatch(updateElementToTalOrder({amountOrder}));
            loadOrderHandler();
        }

    }, [dispatch, loadOrderHandler, loader, pagination.order.currentPage])

    // SET SỰ KIỆN RENDER INFOR KHI LICK VÀO THANH PAGINATION
    const paginationHandler = (event) => {
        let { pagi } = event.target.closest("#btn-pagi").dataset;
        dispatch(updateCurrentPageOrder({page: pagi}));
    }

    return (
        <div className="dashboard-container">
            <div className={classes['dashboard-main-component']}>
                <DashboardResumeComponent client={amoutUser} totalOrder={resumTotalOrder} order={orders.length} />

                {orders.length > 0 && (
                    <CommonTableComponent head={HeadTable} list={orders} type="order"/>
                )}

                {orders.length == 0 && (<h2 className="blank">Not found orders</h2>)}

                <CommonPaginationComponent
                    click={paginationHandler}
                    items={ Array.from({length: pagination.order.elemtItemsPagination}, (elm, index) => index)} />
            </div>
        </div>
    )
}

export default DashboardMainComponent;

// LẤY DANH SÁCH ORDER ACCOUNT
export const loadOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await fetch(`${config.URI}/api/admin/order/amount`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": ""
                }
            })

            if(!res.ok) {
                let infor = await res.json();
                throw Error(infor.message);
            }

            resolve(await res.json());

        } catch (error) {
            reject({status: false, error});
        }
    })
}

// LẤY DANH SÁCH USER ACCOUNT
export const loadUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await fetch(`${config.URI}/api/admin/user/amount`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": ""
                }
            })

            if(!res.ok) {
                let infor = await res.json();
                throw Error(infor.message);
            }

            resolve(await res.json());

        } catch (error) {
            reject({status: false, error});
        }
    })
}

// THỰC HIỆN LOADER THÔNG TIN TRANG CHỦ
export const loader = () => {
    return new Promise( async(resolve, reject) => {
        try {
            let data = await Promise.all([loadUser(), loadOrder()]);
            let [{amount: amounUser}, { amount: amountOrder}] = data;
            resolve({status: true , amounUser, amountOrder});

        } catch (error) {
            reject({status: false, error});
        }
    })
}