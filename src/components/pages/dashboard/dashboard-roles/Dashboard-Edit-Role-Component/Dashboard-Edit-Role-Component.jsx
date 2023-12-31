import React, { useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, useLoaderData } from 'react-router-dom';
import config from "../../../../../configs/config.env";
import useValidation from '../../../../../hook/use-validation';
import useHttp from '../../../../../hook/use-http';
import CommonButtonComponent from '../../../../common/Common-Button-Component/Common-Button-Component';
import CommonInputComponent from '../../../../common/Common-Input-Component/Common-Input-Component';
import classes from "./Dashboard-Edit-Role-Component.module.css";

const DashboardEditRoleComponent = (props) => {
    const loader = useLoaderData();
    const navigate = useNavigate();
    const params = useParams();
    
    const roleRef = useRef();

    const { httpMethod } = useHttp();
    const {defaultValue: roleDefaultVal, value: roleValue, valid: roleValid, onBlur: roleBlur, onChange: roleChange} = useValidation(['require']);

    // PHƯƠNG THỨC EDIT ROLE
    const editHandler = useCallback(async (event) => {
        event.preventDefault();

        let roleInput = roleRef.current.input.current;

        roleInput.focus();
        roleInput.blur();

        if(roleValid.status) {
            httpMethod({
                url: `${config.URI}/api/admin/role`,
                method: 'PATCH',
                author: '',
                payload: JSON.stringify({role: params.role, name: roleValue})

            }, (infor) => {
                let { status } = infor;
                
                // TẠO ROLE THÀNH CÔNG REDIRECT VỀ ROLES PAGE
                if(status) {
                    navigate("/roles");
                }
            })
        }
    }, [
        httpMethod,
        params.role,
        navigate,
        roleValid.status,
        roleValue
    ])

    useEffect(() => {
        // THỰC HIỆN LOAD GIÁ TRỊ HIỆN CÓ CỦA ROLE
        let { status, role } = loader;
        if(status) {
            roleDefaultVal(role.name);
        }
    }, [loader, roleDefaultVal])

    return (
        <div className="dashboard-container">
            <div className={classes['dashboard-edit-role-component']}>
                <form onSubmit={editHandler}>
                    <div className="row">
                        <div className="col-6">
                            <CommonInputComponent
                                ref={roleRef} blur={roleBlur}
                                change={roleChange} label="Role account"
                                value={roleValue} valid={roleValid}/>
                        </div>
                    </div>

                    <div>
                        <CommonButtonComponent kind="contained" title="Edit role"  type="submit"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DashboardEditRoleComponent;

// LOADER THÔNG TIN ROLE CHỈNH SỬA
export const loader = (request, params) => {
    return new Promise( async(resolve, reject) => {
        try {

            let res = await fetch(`${config.URI}/api/admin/role/${params.role}`);
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