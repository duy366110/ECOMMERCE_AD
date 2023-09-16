import React, { useEffect, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useHttp from "../../../../hook/use-http";
import { updateElementToTalRole, updateCurrentPageRole } from "../../../../store/store-pagination";
import CommonButtonComponent from "../../../common/Common-Button-Component/Common-Button-Component";
import CommonTableComponent from "../../../common/Common-Table-Component/Common-Table-Component";
import CommonPaginationComponent from "../../../common/Common-Pagination-Component/Common-Pagination-Component";
import classes from "./Dashboard-Roles-Component.module.css";

const HeadTable = ['STT', 'Role', 'Users', 'Action'];

const DashboardRolesComponent = (props) => {
    const navigate = useNavigate();
    const loader = useLoaderData();

    const dispatch = useDispatch();
    const pagination = useSelector(state => state.pagination);

    const { httpMethod } = useHttp();
    const [roles, setRoles] = useState([]);
    const [reload, setReload] = useState(false);

    // LẤY THÔNG TIN VÀ CẬP NHẬT ROLE
    const getRoles = async () => {
        let { status, message, amount } = loader;

        if(status) {
            dispatch(updateElementToTalRole({amount}));

            httpMethod({
                url: `http://localhost:5000/api/admin/role/${pagination.role.elementOfPage}/${(pagination.role.elementOfPage * pagination.role.currentPage)}`,
                method: 'GET',
                author: '',
                payload: null
            }, (infor) => {
                let { status, message, roles } = infor;
                setRoles(roles);
            })
        }
    }

    // LOADER THÔNG TIN ROLE
    useEffect(() => {
        getRoles();
    }, [reload, pagination.role.currentPage])

    // SET SỰ KIỆN RENDER INFOR KHI LICK VÀO THANH PAGINATION
    const paginationHandler = (event) => {
        let { pagi } = event.target.closest("#btn-pagi").dataset;
        dispatch(updateCurrentPageRole({page: pagi}));
    }

    // CHUYỂN HƯỚNG ĐẾN TRANG THÊM MỚI ROLE
    const navigateNewRole = (event) => {
        navigate("/new-role");
    }

    // CHUYỂN HƯỚNG ĐẾN TRANG EDIT
    const editRoleHandler = (event) => {
        let { id } = event.target.dataset;
        navigate(`/edit-role/${id}`);
    }

    // PHƯƠNG THỨC XOÁ ROLE - ADMIN
    const deleteRoleHandler = async (event) => {
        let { id } = event.target.dataset;

        if(window.confirm('Are you sure delete role!')) {
            httpMethod({
                url: "http://localhost:5000/api/admin/role",
                method: 'DELETE',
                author: '',
                payload: JSON.stringify({role: id})
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
            <div className={classes['dashboard-roles-component']}>
                <div className='dashboard-header'>
                    <h2 className='header__title'>Users information</h2>
                    <CommonButtonComponent click={navigateNewRole} kind="outline-success" title="New role"  type="button"/>
                </div>

                {roles.length > 0 && (
                    <CommonTableComponent edit={editRoleHandler} delete={deleteRoleHandler} head={HeadTable} list={roles} type="role"/>
                )}

                {roles.length == 0 && (<h2 className="blank">Not found role</h2>)}

                <CommonPaginationComponent
                    click={paginationHandler}
                    items={ Array.from({length: pagination.role.elemtItemsPagination}, (elm, index) => index)} />
            </div>
        </div>
    )
}

export default DashboardRolesComponent;

// LOADER SỐ LƯỢNG ROLE LÀM PHÂM TRANG
export const loader = (request, params) => {
    return new Promise(async (resolve, reject) => {
        try {

            let res = await fetch("http://localhost:5000/api/admin/role/amount", {
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