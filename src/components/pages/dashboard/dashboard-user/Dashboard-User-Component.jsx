import React, { useEffect, useState } from 'react';
import { useNavigate, useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import config from "../../../../configs/config.env";
import useHttp from '../../../../hook/use-http';
import { updateElementToTalUser, updateCurrentPageUser } from "../../../../store/store-pagination";
import CommonTableComponent from '../../../common/Common-Table-Component/Common-Table-Component';
import CommonButtonComponent from '../../../common/Common-Button-Component/Common-Button-Component';
import CommonPaginationComponent from '../../../common/Common-Pagination-Component/Common-Pagination-Component';
import classes from "./Dashboard-User-Component.module.css";

const HeadTable = ['STT', 'User name', 'Full name', 'E-mail', 'Phone number', 'Carts', 'Orders', 'role', 'Action'];

const DashboardUserComponent = (props) => {
    const navigate = useNavigate();
    const loader = useLoaderData();

    const dispatch = useDispatch();
    const pagination = useSelector(state => state.pagination);

    const { httpMethod } = useHttp();

    const [users, setUsers] = useState([]);
    const [reload, setReload] = useState(false);

    // LẤY THÔNG TIN VÀ CẬP NHẬT USER
    const getUsers = async () => {
        let { status, amount } = loader;

        if(status) {
            dispatch(updateElementToTalUser({amount}));

            httpMethod({
                url: `${config.URI}/api/admin/user/${pagination.user.elementOfPage}/${(pagination.user.elementOfPage * pagination.user.currentPage)}`,
                method: 'GET',
                author: '',
                payload: null
            }, (infor) => {
                let { status, users } = infor;
                if(status) {
                    setUsers(users);
                }
            })
        }
    }

    // LOADER THÔNG TIN USER
    useEffect(() => {
        getUsers();

    }, [reload, getUsers, pagination.user.currentPage])

    // CHUYỂN ĐẾN TRANG NEW
    const navigateAddUser = (event) => {
        navigate('/new-user');
    }

    // CHUYỂN HƯỚNG ĐẾN TRANG EDIT
    const editAccountHandler = (event) => {
        let { id } = event.target.dataset;
        navigate(`/edit-user/${id}`);
        
    }

    // PHƯƠNG THỨC XOÁ USER - ADMIN
    const deleteAccountHandler = async (event) => {
        let { id } = event.target.dataset;

        if(window.confirm('Are you sure delete delete account!')) {
            httpMethod({
                url: `${config.URI}/api/admin/user`,
                method: 'DELETE',
                author: '',
                payload: JSON.stringify({user: id})
            }, (infor) => {
                let { status } = infor;

                if(status) {
                    setReload(!reload);
                }
            })
        }
    }

    // SET SỰ KIỆN RENDER INFOR KHI LICK VÀO THANH PAGINATION
    const paginationHandler = (event) => {
        let { pagi } = event.target.closest("#btn-pagi").dataset;
        dispatch(updateCurrentPageUser({page: pagi}));
    }

    return (
        <div className="dashboard-container">
            <div className={classes['dashboard-user-component']}>
                <div className='dashboard-header'>
                    <h2 className='header__title'>Users information</h2>
                    <CommonButtonComponent click={navigateAddUser} kind="outline-success" title="New user"  type="button"/>
                </div>

                {users.length > 0 && (
                    <CommonTableComponent edit={editAccountHandler} delete={deleteAccountHandler} head={HeadTable} list={users} type="user"/>
                )}

                {users.length === 0 && (<h2 className="blank">Not found users</h2>)}

                <CommonPaginationComponent
                    click={paginationHandler}
                    items={ Array.from({length: pagination.user.elemtItemsPagination}, (elm, index) => index)} />

            </div>
        </div>
    )
}

export default DashboardUserComponent;

// LOADER SỐ LƯỢNG USER LÀM PHÂM TRANG
export const loader = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let res = await fetch(`${config.URI}/api/admin/user/amount`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": ''
                }
            })

            if(!res.ok) {
                throw Error(await res.json());
            }

            resolve(await res.json());

        } catch (error) {
            reject(error);
        }
    })
}