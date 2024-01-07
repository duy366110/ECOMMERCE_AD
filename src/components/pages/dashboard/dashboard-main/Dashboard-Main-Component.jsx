import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";
import config from "../../../../configs/config.env";
import { messageOpen, messageClose, openLoader, closeLoader } from "../../../../store/store-popup";
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
    const [amountOrder, setAmountOrder] = useState();
    const [orders, setOrders] = useState([]);
    const [totalOrder, setTotalOrder] = useState(0);

    useEffect(() => {

        let { status, amounUser, amountOrder, total} = loader;
        if(status) {
            setAmountUser(amounUser);
            setAmountOrder(amountOrder);
            setTotalOrder(total);
            dispatch(updateElementToTalOrder({amount: amountOrder}));

            const http = async () => {
                try {
                    dispatch(openLoader());
                    let res = await fetch(`${config.URI}/api/admin/order/${pagination.order.elementOfPage}/${(pagination.order.elementOfPage * pagination.order.currentPage)}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                    if(!res.ok) {
                        let infor = await res.json();
                        throw Error(infor.message);
                    }

                    let { status, orders } = await res.json();
                    if(status) {
                        setOrders(orders);
                    }

                } catch (error) {
                    dispatch(messageOpen({content: error.message}));
                    setTimeout(() => {
                        dispatch(messageClose());
                    }, 2500)
                }
                dispatch(closeLoader());
            }

            http();
        }
        
    }, [loader, dispatch, pagination.order.currentPage, pagination.order.elementOfPage])

    const paginationHandler = (event) => {
        let { pagi } = event.target.closest("#btn-pagi").dataset;
        dispatch(updateCurrentPageOrder({page: pagi}));
    }

    return (
        <div className="dashboard-container">
            <div className={classes['dashboard-main-component']}>
                <DashboardResumeComponent client={amoutUser} totalOrder={totalOrder} order={amountOrder} />

                {orders.length > 0 && (
                    <CommonTableComponent head={HeadTable} list={orders} type="order"/>
                )}

                {orders.length === 0 && (<h2 className="blank">Not found orders</h2>)}

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
            let res = await fetch(`${config.URI}/api/admin/order/information`, {
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
            console.log(data);
            let [{amount: amounUser}, { amount: amountOrder, total}] = data;
            resolve({status: true , amounUser, amountOrder, total});

        } catch (error) {
            reject({status: false, error});
        }
    })
}