import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../../../../hook/use-http";
import useValidation from "../../../../../hook/use-validation";
import CommonButtonComponent from "../../../../common/Common-Button-Component/Common-Button-Component";
import CommonInputComponent from "../../../../common/Common-Input-Component/Common-Input-Component";
import classes from "./Dashboard-Add-Role-Component.module.css";

const DashboardAddRoleComponent = (props) => {
    const navigate = useNavigate();
    const roleRef = useRef();

    const { httpMethod } = useHttp();
    const {value: roleValue, valid: roleValid, onBlur: roleBlur, onChange: roleChange} = useValidation(['require']);

    // PHƯƠNG THỨC TẠO ROLE
    const createRoleHandler = async (event) => {
        event.preventDefault();

        let roleInput = roleRef.current.input.current;

        roleInput.focus();
        roleInput.blur();

        if(roleValid.status) {
            httpMethod({
                url: 'http://localhost:5000/api/admin/role',
                method: 'POST',
                author: '',
                payload: JSON.stringify({role: roleValue})
            }, (infor) => {

                let { status, message } = infor;

                // TẠO ROLE THÀNH CÔNG REDIRECT VỀ ROLES PAGE
                if(status) {
                    navigate("/roles");
                }
            })
        }

    }

    return (
        <div className="dashboard-container">
            <div className={classes['dashboard-add-component']}>
                <form onSubmit={createRoleHandler}>
                    <div className="row">
                        <div className="col-6">
                            <CommonInputComponent
                                ref={roleRef} blur={roleBlur}
                                change={roleChange} label="Role account"
                                value={roleValue} valid={roleValid}/>
                        </div>
                    </div>

                    <div>
                        <CommonButtonComponent kind="contained" title="New role"  type="submit"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DashboardAddRoleComponent;